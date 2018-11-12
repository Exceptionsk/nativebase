import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,Switch} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Container, Footer, FooterTab, Badge, H2, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Button, Icon, Body, Left, Right,Item,Form,Label,Input } from 'native-base';


export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    isSwitchOn: false
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
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
        <Header style = {{alignItems:'center',height: 70,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
            <Body style={{paddingLeft:300}}>
            <Badge style={{ backgroundColor: 'black' }}>
                  <Text style={{ color: 'white' }}>{String(this.state.isSwitchOn)}</Text>
            </Badge>
            </Body>
            <Right>
              <View style={{justifyContent: 'center'}}>
                <Switch
                  onValueChange={isSwitchOn => this.setState({isSwitchOn})}
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
              <Grid>
                <Row style={{padding:10}}>
                    <Col style={{width:70}}>
                      <Label >Amount:</Label>
                    </Col>
                    <Col>
                      <Form>
                        <Item>
                          <Input>
                            {this.state.data}
                          </Input>
                        </Item>
                      </Form>
                   </Col>
                </Row>
                <Row>
                  <Col style={{height:60}}>
                    <Button full warning>
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

