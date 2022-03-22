import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dotyeti from './images/DotYetiScroll.jpeg'
import { objects } from './objects';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const FileUpload = () => {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])  
  const [grid, setGrid] = useState(objects)

  const gridLength = grid.filter((item) => item.toggled).length

  console.log(images.length);
  
  const onImageChange = e => {
    setImages([...e.target.files])
    grid.map((item) => item.toggled = false);
  }

  const defaultImg = () => {
    setImages([])
    grid.map((item) => item.toggled = false);
  }

  const toggleActive = (index) =>{
    let arrayCopy = [...grid]
      arrayCopy[index].toggled ? arrayCopy[index].toggled = false : arrayCopy[index].toggled = true
      setGrid(arrayCopy)
  }
  
  const toggleActiveStyles = (index) =>{
    if(grid[index].toggled){
      return "grid-item active"
    } else {
      return "grid-item inactive"
    }
  } 
  
  useEffect(() => {
    const newImageUrls = []
    images.map((image) => newImageUrls.push(URL.createObjectURL(image)))
    setImageURLs(newImageUrls)
  }, [images])

  return (
    <Container>
      <div className="content">
      <div>
      <h2 className="step-one">Upload your image</h2>
        <form onChange={onImageChange}>
          <div className="label-wrapper">
            {images.length > 0 && (
            <a href="#" className="thumbnail-container">
              <img className="thumbnail" src={imageURLs} alt="" />
              <CloseRoundedIcon onClick={defaultImg} className="thumbnail-icon"/>
            </a>
            )}
            <label htmlFor="file" className="label">
              <a className="upload-btn"><span className="img-icon">📷</span>{images.length > 0 ? 'CHANGE IMAGE' : 'UPLOAD NOW!'}</a>
            </label>
          </div>
          <input type="file" hidden="hidden" id="file" accept="image/*"  />
        </form>
        </div>

          <div>
            <h2 className="step-two">Select all the squares that contain text</h2>
            <div className="square-div">
                <div className="img-container">
                  <img src={images.length < 1 ? dotyeti : imageURLs} alt="your image" className="theImg"/>
                  <div className="grid-container" >
                    {grid.map((_, index) => {
                      return (
                        <div key={index} className={toggleActiveStyles(index)} onClick={() => {toggleActive(index)}}></div>
                        )
                      })}
                  </div>
                </div>
                <p className="disclaimer">Note: Our tool gives you the possibility to see what percentage of the image contains text. Since Facebook & Instagram are constantly updating their algorithm and using AI tools, the actual result may differ from our tool. Use this tool as a general guidance when designing your advertising assets.</p>
            </div>
          </div>

          <div className="results-div">
            <h2 className="step-three">Your results</h2>
            <div className="outcomes">
              {gridLength > 0 && (<h5>{gridLength} {gridLength === 1 ? 'square' : 'squares'} selected with text</h5>)}
              {gridLength > 0 && (<h5>{gridLength * 4}% of your image contains text</h5>)}      
              {gridLength === 0 ? (<h5 className="margin-bottom">Please select all the squares that are containing text</h5>) :
              gridLength < 6 ? (<h5 className="success margin-bottom">🎉 Woohoo! This image meets the requirements of 20% text or less and can be used for your campaigns.</h5>) : (
              <h5 className="error margin-bottom">❌ Oohh nooo! Your image contains more than 20% text. This means that your campaigns are reaching a smaller audience. Please update your image with less text.</h5>
              )}
          </div>
        </div>


      </div>
    </Container>
  )
};

const Container = styled.div `
  width: 95%;  
  margin: 0 auto; 
  
.square-div {
  padding: 15px 20px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px #B8B8B8; 
}

.disclaimer {
  font-size: 0.75rem;
  line-height: 1.5em;
  margin-top: 2.5em ;
}

.thumbnail-container {
  position: relative;
}

.thumbnail-icon {
  position: absolute;
  color: red;
  top: -11px;
  left: 34px; 
  transition: 0.3s;
}

.thumbnail-icon:hover {
  transform: scale(1.3);
}

.thumbnail {
  height: 47px;
  width: 47px;
  border: 1px solid rgba(255, 133, 0, 0.5);
  margin-right: 15px;
  object-fit: cover;
}

.img-icon {
  font-size: 1.1rem;
  padding-right: 0.35em;
}

.step-two,
.step-one,
.step-three {
  margin-bottom: 0.5em;
  text-align: center;
}

.margin-bottom {
  margin-bottom: 0;
}

.img-container {
  position: relative;
  margin-top: 0.5em;
}

.results-div{
  margin: 5em 0 1.2em 0;
}

.label-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-radius: 5px;
}

form {
  padding: 5px;
  box-shadow: 0 0 5px #B8B8B8;
  border-radius: 5px;
  width: 100%; 
  margin: 1em 0 5em 0;
  padding: 0.5em;
}

.label{
  font-weight: 500;
  color: #fff;
  width: 100%;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 133, 0);
  transition: 0.3s;
}

.theImg {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.grid-container {
  position: absolute;
  width: 100%; 
  height: 100%;
  left: 0;
  top: 0; 
  border: 1px solid gray;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.grid-item {
  cursor: pointer;
  border: 1px solid #BBBBBB;
  grid-gap: 0;
}

@media (min-width: 500px){
  .grid-item{
    &:hover {
    background-color: rgba(203, 203, 203, 0.6);
  }
  }
}

.inactive {
  background-color: none;
}

.active {
  background-color: rgba(255, 133, 0, 0.7);
}

.outcomes {
  border-radius: 5px;
  padding: 2em 1.5em;
  box-shadow: 0 0 5px #B8B8B8;
 }

.success {
  color: rgb(0, 128, 0);
}

.error {
  color: rgb(255, 0, 0);
}

@media (min-width: 920px){
  .content {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 120px 1fr;
  }

  .step-two {
    white-space: nowrap;
  }

  .step-two,
  .step-one,
  .step-three {
    text-align: left;
    margin-bottom: 1em;
  }
}
`

export default FileUpload;
