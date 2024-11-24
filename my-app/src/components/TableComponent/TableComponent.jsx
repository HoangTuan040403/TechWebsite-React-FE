import { Divider, Table } from 'antd';
import React, { useState } from 'react';
import Loading from '../LoadingComponent/Loading';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isLoading = false, columns = [], handleDeleteManyProducts } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
    const handleDeleteAll = () => {
        handleDeleteManyProducts(rowSelectedKeys)
    }
    return (

        <div>
            {rowSelectedKeys.length > 0 && (
                <div onClick={handleDeleteAll} style={{
                    background: '#1d1ddd',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '10px',
                    cursor: 'pointer'
                }}

                >
                    Xóa tất cả
                </div>
            )}
            {/* <Divider /> */}

            <Table
                rowSelection={{ type: selectionType, ...rowSelection }}
                columns={columns}
                dataSource={data}
                ///Rãi props để nhận function của onRow
                {...props}
            />
        </div>

    );
}

export default TableComponent;
