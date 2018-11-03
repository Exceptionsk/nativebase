import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { Container,Textarea, Left, Right, Form, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
export default class Register extends Component{
  static navigationOptions = {
    header:null
  }
  state={
    name:'a',
    myanpay:'',
    password1:'',
    password2:'',
    email:'',
    phone:'',
    township:'',
    lat:'4',
    long:'5',
  }
  signup(){
    try {
      fetch('http://192.168.8.104:2940/api/Restaurant', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          Rest_Name : this.state.name,
          Rest_Password : this.state.password1,
          Rest_email : this.state.email,
          Rest_phno : this.state.phone,
          Rest_myanpay_name : this.state.myanpay,
          Rest_Township : this.state.township,
          Rest_lat : this.state.lat,
          Rest_long : this.state.long,
        }),
      }).then((response) => response.json())
        .then((responsejson)=>{
          // if(responsejson.User_Type=="normal"){
          //   this.props.navigation.navigate('CustHome')
          // }else if (responsejson.User_Type=="admin") {
          //   this.props.navigation.navigate('AdminHome')
          // }else if (responsejson.User_Type=="owner"){
          //   this.props.navigation.navigate('RestHome')
          // };
          // this.props.navigation.navigate('CustHome')
        });
    } catch (e) {
      console.log('failed');
    }
  }
  render(){
    return(
      <Container>
        <Header style = {{height: 70,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Body>
            <Button transparent >
              <Icon style = {{color: 'white', paddingLeft:20}} name='ios-business' />
              <Text style = {{color: 'white', width:'100%'}} >{this.state.name}</Text>
            </Button>
          </Body>
          <Right>
          </Right>
        </Header>

        <Grid>
        <Content>
          <Card style={{padding:10}}>
          <Form>
            <Row>
              <Col style={{width:100}}>
                <Image style={{ height: 100, width:100, flex: 1 }} source={{uri : 'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'}} />
              </Col>
              <Col>
                <Item  >
                  <Icon active name='ios-contact' />
                  <Input onChangeText={(value) => this.setState({name:value})} placeholder="Enter Name"/>
                </Item>
                <Item >
                  <Icon active name='ios-contacts' />
                  <Input onChangeText={(value) => this.setState({myanpay:value})} placeholder="Enter Myanpay username"/>
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item>
                  <Icon active name='md-key' />
                  <Input onChangeText={(value) => this.setState({password1:value})} placeholder="Enter password"/>
                </Item>
                <Item>
                  <Icon active name='md-key' />
                  <Input onChangeText={(value) => this.setState({password2:value})} placeholder="Confirm passowrd"/>
                </Item>
                <Item >
                  <Icon active name='ios-mail' />
                  <Input onChangeText={(value) => this.setState({email:value})} placeholder="Enter email address"/>
                </Item>
                <Item >
                  <Icon active name='ios-call' />
                  <Input onChangeText={(value) => this.setState({phone:value})} placeholder="Enter phone number"/>
                </Item>
                <Item >
                  <Icon active name='ios-compass' />
                  <Input onChangeText={(value) => this.setState({township:value})} placeholder="Enter township"/>
                </Item>
                  <Textarea rowSpan={5} bordered placeholder="Enter Address" style={{padding:10}} />
              </Col>
            </Row>
            <Row>
              <Col style={{padding:10}}>
                <Button full warning textStyle={{color:'white'}} style={{alignSelf:'center',width: 150}} >
                  <Text> Cancel </Text>
                </Button>
              </Col>
              <Col style={{padding:10}}>
              <Button full danger textStyle={{color:'white'}} style={{alignSelf:'center',width: 150}} onPress={this.signup.bind(this)}>
                  <Text>Sign Up </Text>
                </Button>
              </Col>
            </Row>
          </Form>
          </Card>
          </Content>
        </Grid>
      </Container>
    );
  }
}