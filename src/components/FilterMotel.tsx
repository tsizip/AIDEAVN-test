import React, { useState } from 'react'
import data from '../data/data.json'
import tinh from '../data/tinh_tp.json'
import quan from '../data/quan_huyen.json'
import { Button, Select } from 'antd'
import _ from 'lodash'

type Props = {}

export default function FilterMotel({ }: Props) {
     console.log('data', quan)
     const handleChange = (value: string) => {
          console.log(`selected ${value}`);
     };

     const dataTinh = _.map(tinh, (data) => {
          return {
               value: data.name,
               label: data.name
          }
     })

     const dataQuan = _.map(quan, (data) => {
          return {
               value: data.name,
               label: data.name
          }
     })

     const contentQuan = (dataFirst) => {
          return _.map(quan, (data) => {
               return dataFirst == data.code ? data.name : ''
          })
     }
     const contentCity = (dataFirst) => {
          return _.map(tinh, (data) => {
               return dataFirst == data.code ? data.name : ''
          })
     }

    
    
     // console.log('ct mock', contentMock)
     // const [contentMockk, setMock] = useState(contentMock)
    
     const contentMock = _.map(data, (data) => {
          return {
               title: data.title,
               price: data.price,
               area: data.area,
               district: contentQuan(data.district).find(value => value !== ''),
               city: contentCity(data.city).find(value => { return value !== '' }),
               content: data.content,
               thumbnail: data.thumbnail
          }


     })
     const [dataContent, setDataContent] = useState(contentMock)
     // console.log(typeof contentMockk)
     const content = _.map(dataContent, (data) => {
          return <div style={{ backgroundColor: '#ffc0cb5e', alignItems: 'end' }} className='row border p-3 '>
               <div className="col-4 p-0" style={{ width: 200, height: 200, overflow: 'hidden' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={data?.thumbnail} className="card-img-top" alt="..." />
               </div>
               <div className="col-8">
                    <h5 style={{ color: 'red' }} className="card-title">{data?.title}</h5>
                    <h5 style={{ color: 'green', fontWeight: '700' }}>{data?.price.toLocaleString()} triệu/tháng</h5>
                    <p>Diện tích: <span style={{ fontWeight: '600' }}>{data?.area}m²</span>   Khu vực: <span style={{ fontWeight: '700', color: 'green' }}>Quận {data?.district}, {data?.city}</span></p>
                    <p className="card-text">{data?.content}</p>

               </div>
          </div>


     })

     const handleChangeTinhThanh = async (valueFirst: string) => {
          // console.log(`selected ${value}`);
          
          
          const data = dataContent.filter(value=>{return valueFirst === value.city})

          setDataContent(data)

     };
     const handleChangeQuanHuyen = async (valueFirst: string) => {
          // console.log(`selected ${value}`);
          
          
          const data = dataContent.filter(value=>{return valueFirst === value.district})

          setDataContent(data)

     };
     const handleChangeMucGia = async (valueFirst: string) => {
          // console.log(`selected ${valueFirst}`);
          
          
          const data = dataContent.filter(value=>{
               valueFirst === '23' ? Number(value.price) >= 2000000 && Number(value.price) <= 3000000 : valueFirst === '35' ? Number(value.price) >=3000000 && Number(value.price) <=5000000 : ''
          })

          setDataContent(data)

     };




     return (
          <div className='container'>

               <div className='container-fluid mt-5 mb-3 rounded p-3' style={{ backgroundColor: '#ffa50052' }}>
                    <div className="row">
                         {/* tỉnh thành */}
                         <div className="col-2">
                              <h5 className='mb-2 '>Tỉnh thành</h5>
                              <Select
                                   defaultValue="Hà Nội"
                                   style={{ width: 150 }}
                                   onChange={handleChangeTinhThanh}
                                   options={dataTinh}
                              />

                         </div>
                         {/* quận huyện */}
                         <div className="col-2">
                              <h5 className='mb-2 '>Quận huyện</h5>
                              <Select
                                   defaultValue="Quận Ba Đình"
                                   style={{ width: 150 }}
                                   onChange={handleChangeQuanHuyen}
                                   options={dataQuan}
                              />

                         </div>
                         {/* khoảng giá */}
                         <div className="col-2">
                              <h5 className='mb-2 '>Khoảng giá</h5>
                              <Select
                                   defaultValue="Chọn mức giá"
                                   style={{ width: 150 }}
                                   onChange={handleChangeMucGia}
                                   options={[
                                        { value: '1', label: 'Dưới 1 triệu' },
                                        { value: '12', label: '1 triệu - 2 triệu' },
                                        { value: '23', label: '2 triệu - 3 triệu' },
                                        { value: '35', label: '3 triệu - 5 triệu' },
                                        { value: '57', label: '5 triệu - 7 triệu' },
                                        { value: '710', label: '7 triệu - 10 triệu' },
                                   ]}
                              />

                         </div>
                         <div className="col-2">
                              <h5 className='mb-2 '></h5>
                              <Button onClick={()=>{
                                   setDataContent(contentMock)
                              }} type='primary'>Đặt lại bộ lọc</Button>

                         </div>



                    </div>
               </div>


               {/* content */}
               <div className="container " style={{ maxWidth: '800px' }}>
                    {content}

               </div>


          </div>
     )
}