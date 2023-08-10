import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import useVideoList from '../hooks/useVideoList';
import Video from './Video';

const Videos = ()=>{
    const [page, setPage] = useState(1);
    const {loading, error, videos, hasMore} = useVideoList(page);
    
    return (
        <div>
            {videos.length > 0 && 
                (<InfiniteScroll loader="Loading.." dataLength={videos.length} hasMore={hasMore} next={()=>setPage(page+8)}>
                    {videos.map((video) => video.noq > 0 ?
                        (
                            <Link to={{
                                pathname: `/quiz/${video.youtubeID}`
                            }} state={{videoTitle: video.title}} key={video.youtubeID}>
                                <Video title={video.title} id={video.youtubeID} noq={video.noq} />
                            </Link>
                        ) : <Video title={video.title} id={video.youtubeID} noq={video.noq} key={video.youtubeID} />
                    )}
                </InfiniteScroll>)}

            {!loading && videos.length === 0 && (
                <div>No Data Found!</div>
            )}

            {error && (
                <div>There was an error!</div>
            )}

            {loading && <div>Loading...</div>}
        </div>
    );
}

export default Videos;