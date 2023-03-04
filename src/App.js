import './App.css';
import audioAsset from './assets/piano.mp3'
import {Howl} from 'howler'
import {useEffect, useRef, useState, Fragment} from 'react'

function App() {
  const howl = useRef(new Howl({
    src: audioAsset,
    loop: true
  }))

  const [pos, setPos] = useState([0, 0, 0])
  const setPosHandler = (val, index) => {
    let aux = [...pos]
    aux[index] = parseInt(val)
    setPos(aux)
  }

  const [ori, setOri] = useState([0, 0, 0])
  const setOriHandler = (val, index) => {
    let aux = [...ori]
    aux[index] = parseInt(val)
    setOri(aux)
  }

  const playMusicHandler = () => {
    howl.current.play()
    howl.current.pannerAttr({
      panningModel: 'HRTF',
      refDistance: 0.8,
      rolloffFactor: 2.5,
      distanceModel: 'exponential'
    })
  }
  const stopMusicHandler = () => {
    howl.current.stop()
  }

  useEffect(() => {
    howl.current.pos(...pos);
  }, [pos])
  useEffect(() => {
    howl.current.orientation(...ori);
  }, [ori])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello world
        </p>
        <div style={{fontSize: 12}}>
          <caption>Position: </caption>
          <div>
            {
              ['x', 'y', 'z'].map((l, i) => {
                return (
                  <Fragment>
                    <label>{l}: </label>
                    <input type="number" value={pos[i]} onChange={(e) => setPosHandler(e.target.value, i)}></input>
                  </Fragment>
                )
              })
            }
          </div>
        </div>
        <p>{pos}</p>

        <div style={{fontSize: 12}}>
          <caption>Orientation: </caption>
          <div>
            {
              ['x', 'y', 'z'].map((l, i) => {
                return (
                  <Fragment>
                    <label>{l}: </label>
                    <input type="number" value={ori[i]} onChange={(e) => setOriHandler(e.target.value, i)}></input>
                  </Fragment>
                )
              })
            }
          </div>
        </div>
        <p>{ori}</p>
        <div>
          <button onClick={playMusicHandler}>Start</button>
          <button onClick={stopMusicHandler}>Stop</button>
        </div>
      </header>
    </div>
  );
}

export default App;
