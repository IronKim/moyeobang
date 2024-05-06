import React, {useState} from 'react';
import MainContainer from "../../components/MainContainer";
import MainBox from "../../components/MainBox";
import {Divider, Result, Table as AntDTable, Typography} from 'antd'
import styled from "styled-components";
import {useMediaQuery} from "@material-ui/core";
import BoardMenu from "../../components/BoardMenu";

const MoyeobangBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 100%;
    margin: 0 auto;
    padding-top: 40px;
`

const Table = styled(AntDTable)`
  ${(props) => {
    const onRowImplementation = props.onRow && props.onRow({})
      console.log('onRowImplementation', onRowImplementation)
    if (onRowImplementation?.onClick) {
        return `
        tbody tr:hover {
          cursor: pointer;
        }
        `
    }
}}
`

const Truncate = styled.div`
    display: table-cell;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
const Element = styled.div`
    display: table;
    table-layout: fixed;
    width: 100%;
`

const MoyeobangBoard = () => {
    const isMobileDevice = useMediaQuery('(max-width:1200px)');

    const columns = [
        {
            title: '제목',
            dataIndex: 'subject',
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            width: isMobileDevice ? '40%' : '70%',
            render: (text, record) => {
                return (
                    <Element>
                        <Truncate>
                            {text}
                        </Truncate>
                    </Element>
                );
            }
        },
        {
            title: '주소',
            dataIndex: 'address',
            filters: [
                {
                    text: '서울시',
                    value: '서울시',
                    children: [
                        {
                            text: '강남구',
                            value: '강남구',
                        },
                        {
                            text: '송파구',
                            value: '송파구',
                        },
                    ],
                },
                {
                    text: '경기도',
                    value: '경기도',
                    children: [
                        {
                            text: '수원시',
                            value: '수원시',
                        },
                        {
                            text: '성남시',
                            value: '성남시',
                        },
                    ],
                },
                {
                    text: '인천시',
                    value: '인천시',
                    children: [
                        {
                            text: '남동구',
                            value: '남동구',
                        },
                        {
                            text: '연수구',
                            value: '연수구',
                        },
                    ],
                },
                {
                    text: '대전시',
                    value: '대전시',
                    children: [
                        {
                            text: '서구',
                            value: '서구',
                        },
                        {
                            text: '유성구',
                            value: '유성구',
                        },
                    ],
                }
            ],
            filterMode: 'tree',
            filterSearch: false,
            onFilter: (value, record) => record.address.includes(value),
            width: isMobileDevice ? '20%' : '15%',
            render: (text, record) => {
                return (
                    <Element>
                        <Truncate>
                            {text}
                        </Truncate>
                    </Element>
                );
            }
        },
        {
            title: '테마',
            dataIndex: 'theme',
            onFilter: (value, record) => record.theme.includes(value),
            filterSearch: true,
            filters: [
                {
                    text: '공포',
                    value: '공포',
                },
                {
                    text: '판타지',
                    value: '판타지',
                },
            ],
            width: isMobileDevice ? '12%' : '15%',
            render: (text, record) => {
                return (
                    <Element>
                        <Truncate>
                            {text}
                        </Truncate>
                    </Element>
                );
            }
        },
    ];
    const data = [
        {
            key: '1',
            subject: '스머프 어쩌구 어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구 모임방',
            address: '강남구',
            theme: '공포',
        },
        {
            key: '2',
            subject: '비밀의 화원 어쩌구 건대점',
            address: '광진구',
            theme: '판타지',
        },
        {
            key: '3',
            subject: '셜록 홈즈 어쩌구 어쩌구 모임방',
            address: '중구',
            theme: '판타지',
        },
        {
            key: '4',
            subject: '6인 강남구 방탈출 모임',
            address: '강남구',
            theme: '공포',
        },
        {
            key: '5',
            subject: '포레스트 어쩌구 어쩌구 모임방',
            address: '강남구',
            theme: '판타지',
        },
        {
            key: '6',
            subject: '포레스트 어쩌구 어쩌구 모임방',
            address: '강남구',
            theme: '판타지',
        },
        {
            key: '7',
            subject: '포레스트 어쩌구 어쩌구 모임방',
            address: '강남구',
            theme: '판타지',
        },
        {
            key: '8',
            subject: '포레스트 어쩌구 어쩌구 모임방',
            address: '강남구',
            theme: '판타지',
        },
        {
            key: '9',
            subject: '포레스트 어쩌구 어쩌구 모임방',
            address: '강남구',
            theme: '판타지',
        },
        {
            key: '10',
            subject: '포레스트 어쩌구 어쩌구 모임방',
            address: '강남구',
            theme: '판타지',
        },
        {
            key: '11',
            subject: '포레스트 어쩌구 어쩌구 모임방',
            address: '강남구',
            theme: '판타지',
        },
        {
            key: '12',
            subject: '포레스트 어쩌구 어쩌구 모임방',
            address: '강남구',
            theme: '판타지',
        },
        {
            key: '13',
            subject: '포레스트 어쩌구 어쩌구 모임방',
            address: '강남구',
            theme: '판타지',
        },
        {
            key: '14',
            subject: '포레스트 어쩌구 어쩌구 모임방',
            address: '강남구',
            theme: '판타지',
        }
        // 인천 남동구 20개
        ,{
            key: '15',
            subject: '인천 남동구 1',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '16',
            subject: '인천 남동구 2',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '17',
            subject: '인천 남동구 3',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '18',
            subject: '인천 남동구 4',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '19',
            subject: '인천 남동구 5',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '20',
            subject: '인천 남동구 6',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '21',
            subject: '인천 남동구 7',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '22',
            subject: '인천 남동구 8',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '23',
            subject: '인천 남동구 9',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '24',
            subject: '인천 남동구 10',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '25',
            subject: '인천 남동구 11',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '26',
            subject: '인천 남동구 12',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '27',
            subject: '인천 남동구 11',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '28',
            subject: '인천 남동구 12',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '29',
            subject: '인천 남동구 11',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '30',
            subject: '인천 남동구 12',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '31',
            subject: '인천 남동구 11',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '32',
            subject: '인천 남동구 12',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '33',
            subject: '인천 남동구 11',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '34',
            subject: '인천 남동구 12',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '35',
            subject: '인천 남동구 11',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '36',
            subject: '인천 남동구 12',
            address: '인천 남동구',
            theme: '판타지',
        },
        {
            key: '37',
            subject: '인천 남동구 11',
            address: '인천 남동구',
            theme: '판타지',
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

    const clickRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    }

    const setClassName = (record, index) => {
        return index === selectedRowIndex ? 'selected' : '';
    }

    return (
        <MainContainer>
            <BoardMenu defaultSelectedKeys={'moyeobang'} />
            <MainBox>
                <MoyeobangBoardContainer>
                    <Typography.Title level={2}>모여방</Typography.Title>
                    <Divider />
                    <Table columns={columns}
                           dataSource={data}
                           onChange={onChange}
                           locale={{filterReset: '초기화', filterCheckall: '전체 선택', filterConfirm: '확인', filterSearchPlaceholder: '입력', filterEmptyText: '해당 필터가 없습니다.', selectAll: false,
                               emptyText: <Result
                                   status={"404"}
                                   subTitle="데이터가 없습니다."
                               />}}
                        // loading={lo}
                           pagination={{
                               position: ['bottomCenter'],
                               pageSize: 10,
                               // total: 100,
                               showSizeChanger: false,
                           }}
                           onRow={(record, rowIndex) => {
                               return {
                                   onClick: event => {
                                       clickRow(rowIndex);
                                   },
                               };
                           }}
                           rowClassName={setClassName}
                    >
                    </Table>
                </MoyeobangBoardContainer>
            </MainBox>
        </MainContainer>
    );
};

export default MoyeobangBoard;