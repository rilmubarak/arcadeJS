import React, {useState} from 'react'
import {Row, Col, Button} from 'react-bootstrap'

function WhackAMole() {
    const [arr,setArr] = useState([0,0,0,0,0,0])

    return (
        <div>
            <Row>
          {arr.map((val,index) => {
              return(
                <Col xs="4">
                  <Button>Mole-{index+1}</Button>
                </Col>
              )
          })}
        </Row>
        </div>
    )
}

export default WhackAMole