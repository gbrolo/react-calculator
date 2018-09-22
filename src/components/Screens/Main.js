import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../styles/global.css';

const Button = (props) => {
    return (
        <Col onClick={ props.onClick } md="3" style={{ margin: 0, padding: 5, paddingRight: 0, paddingBottom: 0 }}>
            <div className="button"> { props.value } </div>
        </Col>
    )
}

const ButtonSpecial = (props) => {
    return (
        <Col onClick={ props.onClick } md="3" style={{ margin: 0, padding: 5, paddingBottom: 0 }}>
            <div className="button button-special"> { props.value } </div>
        </Col>
    )
}

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: '0',
            secondNumber: '',
            currentOperation: null,
            lastOperation: '',
            operationStack: false
        }
    }

    resetDisplay() {
        this.setState({ display: '0', secondNumber: '', currentOperation: null, lastOperation: '' });
    }

    handleOperation(currentOperation) {
        if (this.state.currentOperation === '=') {
            this.setState({ currentOperation, lastOperation: '' });
        } else {
            if (!this.state.currentOperation && this.state.lastOperation === '') {
                this.setState({ currentOperation });
            } else if (this.state.lastOperation === '+') {
                var newNumber = (parseInt(this.state.display) + parseInt(this.state.secondNumber)).toString();
                var display = this.validateMaxNumber(newNumber) ? 'ERROR' : newNumber;
                
                if (display != 'ERROR') {
                    display = this.validateLength(display) ? display : display.substring(0, 8);
                }
                
                this.setState({ display, secondNumber: '', currentOperation, lastOperation: '' });
            } else if (this.state.lastOperation === '-') {
                var newNumber = (parseInt(this.state.secondNumber) - parseInt(this.state.display)).toString();
                var display = this.validateMaxNumber(newNumber) ? 'ERROR' : newNumber;
                
                if (display != 'ERROR') {
                    display = this.validateLength(display) ? display : display.substring(0, 8);
                }
                
                this.setState({ display, secondNumber: '', currentOperation, lastOperation: '' });
            }
        }        
    }

    handleDigit(digit) {
        if (this.state.currentOperation != '=') {
            if (!this.state.currentOperation ) {
                var currentDisplay = this.state.display === '0' ? '' : this.state.display;
                var newNumber = currentDisplay + digit;
                newNumber = newNumber === '' ? '0' : newNumber;
                var display = this.validateLength(newNumber) ? newNumber : this.state.display;
                display = this.validateMaxNumber(display) ? 'ERROR' : display;
                this.setState({ display, currentOperation: null });
            } else if (this.state.currentOperation) {
                this.setState({ secondNumber: this.state.display, display : digit, currentOperation: null, lastOperation: this.state.currentOperation });
            } 
        } else {
            this.setState({ display: digit, secondNumber: '', currentOperation: null, lastOperation: '' });
        }     
    }

    validateLength(number) {
        return number.length < 10 ? true : false;
    }

    validateMaxNumber(number) {
        return parseInt(number) > 999999999 ? true : false;
    }

    render() {
        return (
            <div className="wrapper">
                <Container style={{ padding: 0, width: '30%', height: '80vh', backgroundColor: '#011627'}}>
                    <Row style={{ margin: 0, padding: 0 }}>
                        <div className="display"> { this.state.display } </div>
                    </Row>
                    <Row style={{ margin: 0, padding: 0 }}>
                        <Button onClick={ () => this.resetDisplay() } value='C'/>
                        <Button value=''/>
                        <Button onClick={ () => this.setState({ currentOperation: '%' }) } value='%'/>
                        <ButtonSpecial value='/'/>                        
                    </Row>
                    <Row style={{ margin: 0, padding: 0 }}>                        
                        <Button onClick={ () => this.handleDigit('7') } value='7'/>
                        <Button onClick={ () => this.handleDigit('8') } value='8'/>
                        <Button onClick={ () => this.handleDigit('9') } value='9'/>
                        <ButtonSpecial onClick={ () => this.setState({ currentOperation: 'X' }) } value='X'/>                        
                    </Row>
                    <Row style={{ margin: 0, padding: 0 }}>
                        <Button onClick={ () => this.handleDigit('4') } value='4'/>
                        <Button onClick={ () => this.handleDigit('5') } value='5'/>
                        <Button onClick={ () => this.handleDigit('6') } value='6'/>
                        <ButtonSpecial onClick={ () => this.handleOperation('-') } value='-'/>                         
                    </Row>
                    <Row style={{ margin: 0, padding: 0 }}>
                        <Button onClick={ () => this.handleDigit('1') } value='1'/>
                        <Button onClick={ () => this.handleDigit('2') } value='2'/>
                        <Button onClick={ () => this.handleDigit('3') } value='3'/>
                        <ButtonSpecial onClick={ () => this.handleOperation('+') } value='+'/>                         
                    </Row>
                    <Row style={{ margin: 0, padding: 0 }}>
                        <Col onClick={ () => this.handleDigit('0') } md="6" style={{ margin: 0, padding: 5, paddingRight: 0, paddingBottom: 0 }}>
                            <div className="button"> 0 </div>
                        </Col>
                        <Button value='.'/>
                        <ButtonSpecial onClick={ () => this.handleOperation('=') } value='='/>                         
                    </Row>
                </Container>
             </div>
        );
    }

}

export default Main;