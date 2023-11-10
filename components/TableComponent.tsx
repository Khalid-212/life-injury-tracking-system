import React from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { da } from 'date-fns/locale';

function TableComponent({data}) {


interface DataType {
  key: string;
  bodyPart: string;
  injuryTime: number;
  injuryDate: string;
  tags: string[];
}

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'bodyPart',
      dataIndex: 'bodyPart',
      key: 'bodyPart',
    },
    {
      title: 'injuryTime',
      dataIndex: 'injuryTime',
      key: 'injuryTime',
    },
    {
      title: 'injuryDate',
      dataIndex: 'injuryDate',
      key: 'injuryDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.bodyPart}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const dataSource = [
    {
      key: data.map((injury) => injury.id),
      bodyPart: data.map((injury) => injury.bodyPart),
      injuryTime: data.injuryTime,
      injuryDate: data.injuryDate,

    },
  ];
  // name: injury.fullName,
  // bodyPart: injury.bodyPart,
  // injuryDate: formatDate(userInjury.injuryDate),
  // injuryTime: formatDate(userInjury.injuryTime),
  // description: injury.description,
  console.log("data is")
  console.log(data)
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default TableComponent
