import { ShoppingCartOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Flex, InputNumber, Tabs, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addConsessToCart } from '../../../../redux/actions/cartActions';
import Swal from 'sweetalert2';

export default function FoodAndBeverage({ prop = 'default value' }) {
  const [food, setFood] = useState([]);
  const [beverage, setBeverage] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setDataLoading(true);
    axios
      .get("/product/")
      .then(res => {
        const food = (res.data.products || []).filter(val => val.P_type === 'Food').map(val => ({ ...val, key: val._id }));
        const beverage = (res.data.products || []).filter(val => val.P_type === 'Beverage').map(val => ({ ...val, key: val._id }));
        setFood(food);
        setBeverage(beverage);
        setDataLoading(false);
      })
      .catch((err) => {
        setDataLoading(false);
        messageApi.open({
          type: 'error',
          content: err.message,
        });
      });
  }

  const handleAddToCart = (item) => {
    // Create a movie slip object with relevant details
    const conSec = {
      product: item, // Use seatId or another identifier
      name: item.P_name, // Customize as needed
      imageUrl: item.P_image, // Provide an image URL if available
      price: item.P_price, // Customize as needed
      countInStock: 1, // Set the available stock count
      qty: 1, // Set the quantity to 1
    };

    // Dispatch the action to add the movie slip to the cart
    dispatch(addConsessToCart(conSec));

    Swal.fire({
      icon: 'success',
      title: 'Item Added To Cart',
      showConfirmButton: false,
      timer: 900
    })

    // Optional: Provide UI feedback to the user
     // Update the route as needed
  };

  const items = [
    {
      key: '1',
      label: 'Food',
      children: <Flex wrap="wrap" gap="large" style={{ padding: 20 }}>
        {food.map((item) => <FoodAndBeverageItem item={item} handleAddToCart={handleAddToCart} />)}
      </Flex>,
    },
    {
      key: '2',
      label: 'Beverage',
      children: <Flex wrap="wrap" gap="large" style={{ padding: 20 }}>
        {beverage.map((item) => <FoodAndBeverageItem item={item} handleAddToCart={handleAddToCart} />)}
      </Flex>
    },
  ];

  const handleContinue = () => {
    navigate('/shop');
    console.log();
  };

  return (
    <div className="FoodAndBeverage" style={{ minHeight: '100vh', background: '#f7f8fa', padding: '32px 0' }}>
      {contextHolder}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <Tabs
          type="card"
          items={items}
          tabBarExtraContent={
            <Button
              type="primary"
              shape="round"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={handleContinue}
              style={{ marginLeft: 8 }}
            >
              continue
            </Button>
          }
          tabBarStyle={{ marginBottom: 24 }}
        />
      </div>
    </div>
  );
}

function FoodAndBeverageItem({ item, handleAddToCart }) {
  const [q, setQ] = useState(1);

  const handleQtyChange = (val) => {
    setQ(val);
  };

  return (
    <Card
      style={{ width: 300, minHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
      cover={
        <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: '8px 8px 0 0', overflow: 'hidden' }}>
          <img
            alt={item.P_name}
            src={item.P_image}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
      }
      actions={[
        <InputNumber addonBefore="Qty" min={1} value={q} max={20} style={{ width: 120 }} onChange={handleQtyChange} />,
        <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} onClick={() => handleAddToCart({ ...item, qty: q })}>
          Add
        </Button>
      ]}
      bodyStyle={{ padding: 18, display: 'flex', flexDirection: 'column', flex: 1 }}
    >
      <Card.Meta
        title={<span style={{ fontWeight: 600, fontSize: 18 }}>{item.P_name} <span style={{ color: '#1890ff', fontWeight: 400, fontSize: 16 }}>- Rs. {item.P_price}</span></span>}
        description={<span style={{ color: '#555', fontSize: 15 }}>{item.P_description}</span>}
      />
    </Card>
  );
}
