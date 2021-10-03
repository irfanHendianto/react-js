import { Layout, Menu} from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ListProduct from './page/listProduct';
import FormEditProduct from './page/FormEditProduct';
const { Header, Content, Footer } = Layout;


const Main = () =>{
    return (
        <Router>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                 
                        <Menu theme="dark" mode="horizontal">
                            <Menu.Item key="/">
                                <Link to="/" >
                                    list Data 
                                </Link>
                            </Menu.Item>
                        </Menu>
                
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380, marginTop: '2%' }}>
                    <Switch>
                        <Route exact path="/">
                            <ListProduct/>
                        </Route>
                        <Route exact path="/edit/:id">
                            <FormEditProduct/>
                        </Route>
                    </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}> ©2018 </Footer>
        </Layout>
      </Router>
    );
}

export default Main;
