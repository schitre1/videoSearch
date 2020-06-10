import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

import youtube from '../apis/youtube';
const KEY = 'API_KEY_HERE';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    };

    componentDidMount(){
        this.onTermSubmit('children stories');
    }

    onTermSubmit = async (term) => {

        //async api request
        const response = await youtube.get('/search', {
            params: {
                q: term,
                part: 'snippet',
                type: 'video',
                maxResults: 5,
                key: `${KEY}`
            }
        });
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    };

    //the name of the function and the name of the prop passed do not have to be identical
    onVideoSelect = (video) => {
        console.log('from the app ', video);
        this.setState({selectedVideo: video});
    }; 

    render(){
        return (
        <div className="ui container"> 
            <SearchBar onFormSubmit={this.onTermSubmit}/>
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={this.state.selectedVideo}/> 
                    </div>
                    <div className="five wide column">
                        <VideoList videos={this.state.videos} onVideoSelect = {this.onVideoSelect} />
                    </div>
                </div>  
            </div>
            
        </div>
        );
    }
}

export default App;