import axios from "axios";
import { useState } from "react";
import "./imagesearch.css";
import { useNavigate } from "react-router-dom";


const ImageSearch = () => {

    let array = [];
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [hover, setHover] = useState(true);
    const [bookmark, setBookmark] = useState(array);
    //const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`https://api.unsplash.com/search/photos/?client_id=885ioSqY3Rxdnk8vb-qg7HkinjIeztxOU2a_OEfH1KU&page=1&per_page=99&query=${query}`)
            .then((res) => {
                setImages(res.data.results);
                //console.log(res);
                console.log(res.data.results);  // res.data.results[9].urls.small
            }).catch((e) => console.log(e.message));
    }

    const handleaddBookmark = (e) => {
        array.push(e);
        setBookmark(array);
        console.log(array);
    }


    const handleshowBookmarks = () => {
        //navigate("/bookmarks");
        setBookmark(array);
        console.log(array.length);
        console.log("in th bookmark page !");
    }
    return (
        <div id="container">
            <table>
                <tr>
                    <th>
                        <h1>React Photo Search</h1></th>
                    <th><button id="bookmark">Bookmarks</button></th>
                </tr>
                <tr>
                    <td>
                        <input id="search" placeholder="Search for high resolution images" onChange={(e) => setQuery(e.target.value)} />
                    </td>
                    <td><button id="submit" onClick={handleSubmit}>Search</button></td>
                </tr>
            </table>
            <div id="photos" >
                <div>{images.map((photo, idx) => <img id="image" onClick={(e) => handleaddBookmark(e.target.src)} src={photo.urls.small} ></img>)} </div>
            </div>
        </div>
    );
}

export default ImageSearch;