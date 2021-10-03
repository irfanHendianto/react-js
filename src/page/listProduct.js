import { Card, Divider, Typography,  Row, Col, Layout, Pagination, Button,Modal  } from 'antd';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import {store} from "../store/index"
import axios from "axios";
import {useHistory} from "react-router-dom";

const {Content } = Layout;
const { Meta } = Card;
const { Title , Paragraph} = Typography;

const ListProduct = ()=>{
    let history = useHistory()
    const [product, setProduct] = useState([]);
    const [currentPageElements, setCurrentPageElements ] = useState([]);
    const [elementsPerPage,] = useState(4);
    const [pagesCount, setPagesCount] = useState(1)
    const [totalElementsCount, setTotalElementsCount] = useState(0)
    const [offset, setOffset] = useState(0)
    

    useEffect(()=>{
        const fetch = async ()=>{
            const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/product`);
            setProduct(data.data)
            setTotalElementsCount(data.data.length)
            setPaginationStates();
            
        }
        fetch()
    },[currentPageElements])

    
    const setPaginationStates = () => {
        let pageCountTemp = Math.ceil(totalElementsCount / elementsPerPage)
        setPagesCount(pageCountTemp)
        setElementsForCurrentPage()
    }
    
    const setElementsForCurrentPage = () => {
        
        const currentPageElements = product.slice(offset, offset + elementsPerPage);
        setCurrentPageElements(currentPageElements)
    }
    
    const handlePageClick = (pageNumber) => {
        
        const currentPagee = pageNumber - 1;
        const offset = currentPagee * elementsPerPage;
        setOffset(offset)
        setElementsForCurrentPage()
        
    }

    const modalConfirm =(id,index) =>{
        Modal.confirm({
          title: 'Confirm Delete',
          icon: <ExclamationCircleOutlined />,
          content:'Do you Want to delete these items?',
          onOk() {
            deleteData(id,index)
          },
        });
  }
    const deleteData = (id,index) =>{
        axios.delete(`${process.env.REACT_APP_API_URL}/product/${id}`).
        then(()=>{
           currentPageElements.splice(index,1);
        })
    }

    const handleEdit = (id) =>{
        axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`)
        .then(res=>{
            let data = res.data.data[0]
            let tempData = {
                id: data.id,
                product_name:data.product_name,
                sku: data.sku,
                description: data.description,
                price_prod: data.price_prod
            }
            store.setData(tempData)
            history.push(`/edit/${id}`);
        })
    }
    return(
        <Layout>
                <Content style={{backgroundColor:'white',padding:'24px'}}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={24}>
                                <Title>Product</Title>
                        </Col>
                    </Row>
                    <Divider style={{border:'1px solid'}}></Divider>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{justifyContent:'center'}}>
                            <Row></Row>
                            {
                                currentPageElements.map((data,index)=>{
                                    return(
                                        <Col className="gutter-row" key={index}>
                                        {/* <button value={data.id} onClick={()=>{viewDetailMovie(data.id)}} style={{backgroundColor:'white',border:'0px'}}> */}
                                            <Card
                                                hoverable
                                                style={{ width: 300,marginTop:'20px',marginRight:'50px' }}
                                                size="small"
                                                actions={[
                                                    <Button onClick={()=>{modalConfirm(data.id,index)}}>Delete</Button>,
                                                    <Button onClick={()=>{handleEdit(data.id)}}>Edit</Button>,
                                                  ]}
                                            >   
                        
                                                
                                                <Meta title={data.product_name} description={
                                                <Paragraph ellipsis={true ? { rows: 3, expandable: false } : false}>
                                                    {data.description}
                                                </Paragraph>
                                                }style={{height: '187px'}} />
                                            </Card>                                      
                                        {/* </button> */}
                                        
                                    </Col>
                                    );
                                })
                            }

                    </Row>
                {pagesCount > 1 &&
                    <Pagination
                        defaultCurrent={1}
                        onChange={handlePageClick}
                        size="medium"
                        total={totalElementsCount}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        pageSize={elementsPerPage}
                        showSizeChanger={false}
                        style={{margin:'10px',marginTop:'20px',marginLeft:'60px',marginBottom:'50px'}}
                    />
                }
                </Content>
        </Layout>
    );
}

export default ListProduct;