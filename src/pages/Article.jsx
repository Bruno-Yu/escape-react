import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


function Article() {
  const [data, setData] = useState([]);
  function getData() {
    axios.get(`${process.env.REACT_APP_URL}api/react/articles`)
      .then((res) => { 
        setData(res.data.articles);
      })
    
  };
  useEffect(() => {
    getData();
  },[])

  return (<>
      <div className="container">
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="">產品列表</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-nowrap">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">名稱</th>
                <th scope="col">作者</th>
                <th scope="col">公開</th>
                <th scope="col">描述</th>
                <th scope="col">類型</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>

              {
                data.map((item, index) => {
                  return <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.isPublic ? '公開' : '隱藏'}</td>
                    <td>{item.description}</td>
                    <td>{item.tag.map((item) => { 
                      return (<><button className="btn btn-sm" key={item}>{item}</button></>)
                    })}</td>
                    <td>
                      <Link to={item.id} className="btn btn-sm btn-neutral">查看</Link>
                    </td>
                  </tr>
                })
              }

            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white py-3 text-end">
          <span className="text-muted text-sm ">總共{data.length}筆資料</span>
        </div>
      </div>
    </div>
  
  </>)


}
  
export default  Article;