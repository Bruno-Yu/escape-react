import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


function ArticleDetail() {
  const [data, setData] = useState([]);
  const [newTag, setNewTag] = useState('');
  const { articleId } = useParams();

  function handleChange(e) { 
    const { id, value } = e.target; 
    setData((prev) => ({...prev, [id]:value} ))
  }

  useEffect(() => { 
    axios.get((`${process.env.REACT_APP_URL}api/react/article/${articleId}`))
      .then((res) => {
        setData(res.data.article);
      })
  }, [articleId])
  return (<>
  <div className="container">
  <div className="row">
    <div className="col-md-6">
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="card-title">文章內容</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">文章名稱</label>
                  <input type="text" className="form-control" id="title" value={data.title} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">文章作者</label>
                  <input type="text" className="form-control" id="author" value={data.author} onChange={ handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">文章描述</label>
                  <textarea className="form-control" id="content" value={data.content} onChange={handleChange } />
            </div>
                <div className="row gx-1 mb-3">
                  { console.log(data.tag) }
                  {
                  (data.tag)? data.tag.map((item) => 
                  <React.Fragment  key={item}>
              <div className="col-3 col-lg-2 mb-1">
                <div className="input-group input-group-sm">
                        <input type="text" className="form-control form-control"  value={item} readOnly="readOnly" />
                        <button type="button" className="btn btn-outline-danger" onClick={() => { setData((prev) => ({...prev, tag: prev.tag.filter((j)=>j !== item)}))} }>x</button>
                    </div>
              </div>
                  </React.Fragment>
                  ): (<>
                      </>)}
              <div className="col-3 col-lg-2 mb-1">
                <div className="input-group input-group-sm">
                      <input type="text" className="form-control form-control" id="tag" placeholder="請輸入標籤" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
                      <button type="button" className="btn btn-outline-success" onClick={() => { newTag.trim().length ? setData((prev) => ({ ...prev, tag: [...prev.tag, newTag] })) : window.alert('新標籤不能為空值') ; setNewTag('')} }>+</button>
                    </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="card-title">文章圖片</h5>
        </div>
        <div className="card-body">
              {data.image?.length? <img src={data.image} alt={data.image}></img>  :<>目前沒有圖片</> }
        </div>
      </div>
    </div>
  </div>
</div> 
  </>)

}
 
export default ArticleDetail;