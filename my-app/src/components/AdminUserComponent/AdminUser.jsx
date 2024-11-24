import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeaderAdminUser, WrapperUploadFile } from './style';
import { Button, Form, Modal, Space } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import Loading from '../LoadingComponent/Loading';
import InputComponent from '../InputComponent/InputComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { getBase64 } from '../../utils';
import * as message from '../../components/Message/Message';
import { useQuery } from '@tanstack/react-query';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useSelector } from 'react-redux';
import * as UserService from '../../sevices/UserService'



const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [stateUser, setstateUser] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,

  })

  const [stateUserDetails, setstateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
  })

  const [form] = Form.useForm();


  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, token, ...rests } = data;
      const res = UserService.updateUser({ id, ...rests, token });
      return res;
    }
  );

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id, token } = data;
      const res = UserService.deletelUser({ id, token });
      return res;
    }
  );


  const getAllUsers = async () => {
    const res = await UserService.getAllUser()
    return res
  }

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailUser(rowSelected);
    if (res?.data) {
      setstateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,

      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])


  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected])



  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }


  const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted


  const queryUser = useQuery({ queryKey: ['user'], queryFn: getAllUsers })
  const { isLoading: isLoadingUser, data: users } = queryUser

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
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },

    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        }
      ]

    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps('phone')


    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },

  ];
  const dataTable = users?.data?.length && users?.data?.map((user) => {
    return { ...user, key: user._id, isAdmin: user.isAdmin ? 'True' : 'Fales' }
  })


  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Update thành công');

      // Đóng drawer trước để tránh chậm trễ UI
      handleCloseDrawer();

    } else if (isErrorUpdated) {
      message.error('Update thất bại');
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success('Xóa thành công')
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error('Xóa thất bại');
    }
  }, [isSuccessDeleted, isErrorDeleted])

  const handleDeleteUser = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch()
        }
      }
    )
  }


  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setstateUser({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,

    })
    form.resetFields()
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setstateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,

    })
    form.resetFields()
  };



  const handleOnchange = (e) => {
    setstateUser({
      ...stateUser,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setstateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setstateUser({
      ...stateUser,
      image: file.preview
    })

  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setstateUserDetails({
      ...stateUserDetails,
      image: file.preview
    })

  }

  const onUpdateUser = () => {
    mutationUpdate.mutate({
      id: rowSelected,
      token: user?.access_token,
      data: stateUserDetails
    }, {
      onSettled: () => {
        queryUser.refetch();
      },

    });

  };
  return (

    <div>
      <WrapperHeaderAdminUser>Quản lý người dùng</WrapperHeaderAdminUser>

      <div style={{ marginTop: '20px' }}>
        <TableComponent columns={columns} isLoading={isLoadingUser} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id)
            },
          };
        }} />
      </div>


      <DrawerComponent title='Thông tin người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="30%">

        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}

          onFinish={onUpdateUser}
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
            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <InputComponent value={stateUserDetails.type} onChange={handleOnchangeDetails} name="email" />
          </Form.Item>


          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone!',
              },
            ]}
          >
            <InputComponent value={stateUserDetails.type} onChange={handleOnchangeDetails} name="phone" />
          </Form.Item>



          {/* <Form.Item
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
                {stateUserDetails?.image && (
                  <img src={stateUserDetails?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="avatar" />
                )}
              </WrapperUploadFile>

            </Form.Item> */}



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

      </DrawerComponent>


      {/* Delete product */}
      <Modal forceRender title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>

        <div>Bạn có chắc chắn xóa?</div>

      </Modal>
    </div>
  );
}

export default AdminUser;
