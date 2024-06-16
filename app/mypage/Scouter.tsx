import React from 'react'

//
//
//

const Scouter = () => {
  return (
    <section className="main-content-div">
      <div id="profile-images-div"></div>
      <section id="txt-div">
        <section>
          <div>brand Name</div>
          <div>Deadline</div>
        </section>
        <section>
          <div>Title</div>
          <div>매칭 버튼</div>
        </section>
        <section>
          <div className="condition-div">
            <div>분야</div>
            <div className="tag-div"></div>
          </div>
          <div className="condition-div">
            <div>분야</div>
            <div className="tag-div"></div>
          </div>
          <div className="condition-div">
            <div>조건</div>
            <div className="tag-div"></div>
          </div>
          <div className="condition-div">
            <div>선호 이미지</div>
            <div className="tag-div"></div>
          </div>
          <div className="condition-div">
            <div>제안 상세</div>
            <div className="introduction-div"></div>
          </div>
        </section>
      </section>
    </section>
  )
}

export default Scouter
