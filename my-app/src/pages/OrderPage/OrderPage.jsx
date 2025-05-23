import React, { useState } from 'react';
import { Table, Checkbox, Button, Typography, Row, Col, Card } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct } from '../../redux/slides/orderSlide';
import { WrapperInputNumber } from '../../components/ProductDetailComponent/style';
import Title from 'antd/es/skeleton/Title';
import { convertPrice } from '../../utils';

const { Text } = Typography;

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [listChecked, setListChecked] = useState([])

  // Xử lý xóa sản phẩm
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
    console.log('Deleted Product ID:', idProduct);
  };

  // Xử lý xóa tất cả sản phẩm
  const handleDeleteAllOrder = () => {
    if (listChecked?.length === order?.orderItems?.length) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }

  }

  // Cập nhật số lượng sản phẩm
  const handleChangeCount = (type, idProduct) => {
    if (type === 'increase') {
      dispatch(increaseAmount({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
    }
  };


  const handleAmountChange = (value, idProduct) => {
    // Gửi một action tùy chỉnh để cập nhật số lượng dựa trên đầu vào của người dùng
    dispatch(increaseAmount({ idProduct, amount: value }));
  };

  // Xử lý chọn sản phẩm trong giỏ hàng
  const onChange = (e) => {
    console.log(`checked = ${e.target.value}`);
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked, e.target.value])
    }
  };
  console.log('listChecked', listChecked)

  // Xử lý chọn tất cả sản phẩm trong giỏ hàng
  const handleOnChangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = []
      order?.orderItems.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }

  // Định nghĩa các cột cho bảng
  const columns = [
    {
      title: <Checkbox onChange={handleOnChangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}>Tất cả ({order?.orderItems?.length || 0} sản phẩm)</Checkbox>,
      dataIndex: "product",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Checkbox onChange={onChange} value={record?.key} checked={listChecked.includes(record?.key)} />
          <img
            src={record.image}
            alt={record.name}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <Text>{record.name}</Text>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      render: (price, record) => (
        <div>
          {record.oldPrice && <Text delete>{record.oldPrice.toLocaleString()} </Text>}
          <br />
          <Text strong>{convertPrice(price)} </Text>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      render: (amount, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
            onClick={() => handleChangeCount('decrease', record.product)}
          >
            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
          </button>

          <WrapperInputNumber
            onChange={(value) => handleAmountChange(value, record.product)}
            value={amount}
            size="small"
            min={1}
            style={{ width: '60px' }}
          />

          <button
            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
            onClick={() => handleChangeCount('increase', record.product)}
          >
            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
          </button>
        </div>
      ),
    },

    {
      title: "Thành tiền",
      dataIndex: "total",
      render: (total) => <Text style={{ color: "red" }}>{convertPrice(total)} </Text>,
    },
    {
      title: <Button
        onClick={() => handleDeleteAllOrder()}
        icon={<DeleteOutlined />}
        type="text"
        danger
      />,
      dataIndex: "actions",
      render: (_, record) => (
        <Button
          onClick={() => handleDeleteOrder(record.product)}
          icon={<DeleteOutlined />}
          type="text"
          danger
        />
      ),
    },
  ];

  // Tính toán tổng tiền
  const calculateTotal = () => {
    return order?.orderItems?.reduce((sum, item) => sum + item.price * item.amount, 0) || 0;
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        marginTop: "77px",
      }}
    >
      <Title level={4} style={{ marginBottom: "20px" }}>
        Giỏ hàng
      </Title>
      <Row gutter={[16, 16]}>
        {/* Bảng sản phẩm */}
        <Col xs={24} lg={16}>
          <Table
            columns={columns}
            dataSource={order?.orderItems?.map((item) => ({
              key: item.product, // Sử dụng làm khóa duy nhất
              product: item.product,
              name: item.name,
              image: item.image,
              price: item.price,
              amount: item.amount,
              total: item.price * item.amount,
            }))}
            pagination={false}
            bordered
            style={{ backgroundColor: "white" }}
          />
        </Col>

        {/* Thông tin thanh toán */}
        <Col xs={24} lg={8}>
          <Card>
            <div style={{ marginBottom: "10px" }}>
              <Row justify="space-between" style={{ marginBottom: "8px" }}>
                <Text>Tạm tính</Text>
                <Text>{convertPrice(calculateTotal())}</Text>
              </Row>
              <Row justify="space-between" style={{ marginBottom: "8px" }}>
                <Text>Giảm giá</Text>
                <Text>0 VND</Text>
              </Row>
              <Row justify="space-between" style={{ marginBottom: "8px" }}>
                <Text>Thuế</Text>
                <Text>0 VND</Text>
              </Row>
              <Row justify="space-between" style={{ marginBottom: "8px" }}>
                <Text>Phí giao hàng</Text>
                <Text>0 VND</Text>
              </Row>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Row justify="space-between">
                <Text strong style={{ fontSize: "16px" }}>
                  Tổng tiền
                </Text>
                <Text style={{ fontSize: "16px", color: "red" }}>
                  {convertPrice(calculateTotal())}
                </Text>
              </Row>
              <Text type="secondary">(Đã bao gồm VAT nếu có)</Text>
            </div>
            <Button type="primary" block style={{ marginTop: "10px" }}>
              Mua hàng
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
