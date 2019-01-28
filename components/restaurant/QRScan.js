import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,Switch,TextInput} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Container, Footer, FooterTab, Badge, H2, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Button, Icon, Body, Left, Right,Item,Form,Label,Input } from 'native-base';


export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    isSwitchOn: false,
    amount:0,
    CurrentState:'Get Coin from Customer',
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

BeginTransaction(){
  var data=this.state.data.split(';')[0].trim();
  var special=this.state.data.split(';')[1].trim();
  var promo= this.state.data.split(';')[2].trim();
  console.log(data);
  console.log(special);
    fetch(global.HostURL + '/api/restaurant/qr', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        Rest_id : global.Profile.id,
        User_id: data,
        Amount: this.state.amount,
        Take: this.state.isSwitchOn,
        Special: special,
        PromoId:promo,
      }),
    }).then((response) => response.json())
      .then((responsejson)=>{
        if(responsejson=="not enough"){
          Alert.alert(
            'Error',
            'Low Coin Amount in balance.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
        }else if (responsejson=="OK"){
          Alert.alert(
            'Success',
            'Coin transfer was successful.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
        }
    }).catch((error) => {
      Alert.alert(
        'Success',
        'Coin transfer was successful.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      )
    });
}
changeText(value){
  this.setState({isSwitchOn: value});
  if(value){
    this.setState({CurrentState:'Give Coins to Customer'});
  }else{
    this.setState({CurrentState:'Get Coin from Customer'})
  }
}
handleAmount(e){
  this.setState({amount:e.nativeEvent.text})
}
  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <Container>
        <Header style = {{alignItems:'center',height: 70,backgroundColor: '#a3080c' , paddingBottom: 0, paddingTop: 0}}>
            <Left>
              <Text style={{color:'white', width:'100%'}}>{this.state.CurrentState}</Text>
            </Left>
            <Right>
              <View style={{justifyContent: 'center'}}>
                <Switch
                  onValueChange={isSwitchOn => this.changeText(isSwitchOn)}
                  value={this.state.isSwitchOn}
                />
              </View>
            </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Grid>
            <Row>
              <Col>
                  <View style={{ flex: 1}}>
                    <BarCodeScanner
                      onBarCodeScanned={this.handleBarCodeScanned}
                      style={StyleSheet.absoluteFill}
                    />
                  </View>
              </Col>
            </Row>
          </Grid>
          </Content>
          <Footer style={{height:110}}>
            <FooterTab>
              <Grid style={{backgroundColor:'white'}}>
                <Row style={{padding:10}}>
                    <Col>
                      <TextInput style = {styles.input}
                      underlineColorAndroid = "transparent"
                      placeholder = " Enter coin amount"
                      placeholderTextColor = "#3f3f3f"
                      autoCapitalize = "none"
                      keyboardType="numeric"
                      onChangeText={(text) => this.setState({amount:text})}
                    />
                   </Col>
                </Row>
                <Row>
                  <Col style={{height:60}}>
                    <Button full warning onPress={this.BeginTransaction.bind(this)}>
                      <Text style={{paddingBottom:10}}>Scan Now!</Text>
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </FooterTab>
        </Footer>
      </Container>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({type});
    this.setState({data});
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
}
const styles= StyleSheet.create({
  input: {
      borderColor: '#ff7d21',
      borderRadius: 5,
      borderWidth: 1,
      width:'100%',
      height:40
   },
})
