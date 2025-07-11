import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeaderAdminProduct } from './style';
import TableComponent from '../TableComponent/TableComponent';
import { Button, Form, Modal, Select, Space } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import { WrapperUploadFile } from '../../pages/Profile/style';
import { getBase64, renderOptions } from '../../utils';
import * as ProductService from '../../sevices/ProductService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from '../LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux'



const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [typeSelect, setTypeSelect] = useState('')
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: '',
    newType: ''
  })

  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  })

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { name,
        price,
        description,
        rating,
        image,
        type,
        countInStock } = data
      const res = ProductService.createProduct({
        name,
        price,
        description,
        rating,
        image,
        type,
        countInStock
      })
      return res
    }

  )

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, token, ...rests } = data;

      // In ra để kiểm tra dữ liệu trước khi gửi
      console.log('Data gửi lên API:', { id, token, ...rests });

      const res = ProductService.updateProduct({ id, token, ...rests });
      return res;
    }
  );

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id, token } = data;
      const res = ProductService.deleteProduct({ id, token });
      return res;
    }
  );

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ids } = data; // Tách đúng các field
    return ProductService.deleteManyProduct({ data: { ids }, access_token: token });
  });




  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(stateProductDetails)
  }, [form, stateProductDetails])


  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected])


  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    return res

  }



  const { data, isPending, isSuccess, isError } = mutation
  const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isPending: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany



  const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProduct })
  const typeProduct = useQuery({ queryKey: ['type-products'], queryFn: fetchAllTypeProduct })

  const { isLoading: isLoadingProduct, data: products } = queryProduct

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '20px', cursor: 'pointer', marginRight: '10px' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'blue', fontSize: '20px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
      </div>
    )
  }



  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>=5000000',
          value: '>=',
        },
        {
          text: '<=5000000',
          value: '<=',
        },

      ],

      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 5000000
        }
        return record.price <= 5000000
      }


    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: '>=3',
          value: '>=',
        },
        {
          text: '<=3',
          value: '<=',
        },

      ],

      onFilter: (value, record) => {
        if (value === '>=') {
          return record.rating >= 3
        }
        return record.rating <= 3
      }

    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },

  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return { ...product, key: product._id }
  })


  ///Them san pham
  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Thêm thành công')
      handleCancel()
    } else if (isError) {
      message.error('Thêm thất bại');
    }
  }, [isSuccess, isError])

  //Update san pham
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Update thành công');

      // Đóng drawer trước để tránh chậm trễ UI
      handleCloseDrawer();

    } else if (isErrorUpdated) {
      message.error('Update thất bại');
    }
  }, [isSuccessUpdated, isErrorUpdated]);


  //Xoa san pham
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success('Xóa thành công')
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error('Xóa thất bại');
    }
  }, [isSuccessDeleted, isErrorDeleted])


  //Xoa nhieu san pham
  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      message.success('Xóa thành công')
      handleCancelDelete()
    } else if (isErrorDeletedMany) {
      message.error('Xóa thất bại');
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany])




  const handleDeleteProduct = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch()
        }
      }
    )
  }

  const handleDeleteManyProducts = (ids) => {

    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch()
        }
      }
    )
  }


  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInstock: ''
    })
    form.resetFields()
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInstock: ''
    })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      countInStock: stateProduct.countInStock,
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
      },


    })
  }

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })

  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview
    })

  }

  const onUpdateProduct = () => {
    mutationUpdate.mutate({
      id: rowSelected,
      token: user?.access_token,
      data: stateProductDetails
    }, {
      onSettled: () => {
        queryProduct.refetch();
      },

    });

  };

  const handleChangeSelect = (value) => {

    setStateProduct({
      ...stateProduct,
      type: value
    })


  }

  return (
    <div>
      <WrapperHeaderAdminProduct>Quản lý sản phẩm</WrapperHeaderAdminProduct>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDeleteManyProducts={handleDeleteManyProducts} columns={columns} isLoading={isLoadingProduct} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id)
            },
          };
        }} />
      </div>
      <Modal forceRender title="Thêm sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} >
        {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
        <Loading isPending={mutation.isPending}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your productname!',
                },
              ]}
            >
              <InputComponent value={stateProduct['name']} onChange={handleOnchange} name="name" />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input your type!',
                },
              ]}
            >

              <Select
                name="type"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                value={stateProduct.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeProduct?.data?.data)}
              />
            </Form.Item>
            {stateProduct.type === 'add_type' && (
              <Form.Item
                label="New type"
                name="newType"
                rules={[
                  {
                    required: true,
                    message: 'Please input your type!',
                  },
                ]}
              >
                <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />


              </Form.Item>
            )}

            <Form.Item
              label="Count Instock"
              name="countInstock"
              rules={[
                {
                  required: true,
                  message: 'Please input your CountInstock!',
                },
              ]}
            >
              <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input your price!',
                },
              ]}
            >
              <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input your description!',
                },
              ]}
            >
              <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Please input your rating!',
                },
              ]}
            >
              <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
            </Form.Item>


            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Please input your avatar!',
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select File</Button>
                {stateProduct?.image && (
                  <img src={stateProduct?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="avatar" />
                )}
              </WrapperUploadFile>

            </Form.Item>



            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>

      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="30%">
        <Loading isPending={mutation.isPending}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}

            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your productname!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input your type!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.type} onChange={handleOnchangeDetails} name="type" />
            </Form.Item>
            <Form.Item
              label="CountInstock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Please input your CountInstock!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input your price!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input your description!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Please input your rating!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails} name="rating" />
            </Form.Item>


            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Please input your avatar!',
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select File</Button>
                {stateProductDetails?.image && (
                  <img src={stateProductDetails?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="avatar" />
                )}
              </WrapperUploadFile>

            </Form.Item>



            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>


      {/* Delete product */}
      <Modal title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        <Loading isPending={mutation.isPending}>
          <div>Bạn có chắc chắn xóa?</div>
        </Loading>
      </Modal>
    </div>
  );
}


export default AdminProduct;
