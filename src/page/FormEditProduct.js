import { Divider, Typography, Layout,  Form, Input, Button, Row, Col  } from 'antd';
import {ArrowLeftOutlined  } from '@ant-design/icons';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {store} from "../store/index"
const {Content} = Layout
const {Title} = Typography
const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
};

const validateMessages = {
  required: '${label} is required!'
};

const FormEditProduct = ()=>{
    const [form] = Form.useForm();
    let history = useHistory()

    const onFinish = (values) => {
        axios.put(`${process.env.REACT_APP_API_URL}/product/${store.id}`, {product_name: values.product_name, sku: values.sku, description: values.description, price_prod: values.price_prod})
        .then(() => {
            history.push(`/`);
            store.clearData()
        })
    };


    const handleBack =()=>{
         history.push(`/`);
         store.clearData();
    }
    return(
        <Layout style={{backgroundColor:'white',padding:"24px"}}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={24}>
                        <Button style={{border:'0px',paddingLeft:'0px'}} size="large" onClick={handleBack}>
                            <ArrowLeftOutlined style={{fontSize:'30px'}}/> 
                        </Button>
                    </Col>
            </Row>
            <Content style={{border:'1px solid', borderRadius:'10px',padding:"20px"}}>
                <Title>Form Data Product</Title>
                <Divider></Divider>
                <Form form={form} {...layout} name="nest-messages"onFinish={onFinish} initialValues={store.getData()} validateMessages={validateMessages}>
                <Row>
                        <Col span={12}>
                            <div style={{paddingLeft:'50%'}}>
                                <Form.Item
                                    name="product_name"
                                    label="Product Name"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                    <Input  style={{width:"80%"}}/>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="sku"
                                label="SKU"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <Input style={{width:"50%"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                       <Col span={12}>
                            <div style={{paddingLeft:'50%'}}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                     <Input style={{width:"80%"}} />
                                </Form.Item>
                            </div>
                       </Col>
                       <Col span={12}>
                            <div style={{paddingLeft:'0%'}}>
                                <Form.Item
                                    name="price_prod"
                                    label="Price"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                     <Input style={{width:"50%"}} />
                                </Form.Item>
                            </div>
                       </Col>
                    </Row>
                    <Divider></Divider>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
}

export default FormEditProduct;