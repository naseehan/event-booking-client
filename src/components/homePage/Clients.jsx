import React from 'react'
import client1 from '../../assets/home/client/client-1.png'
import client2 from '../../assets/home/client/client-2.png'
import client3 from '../../assets/home/client/client-3.png'
import client4 from '../../assets/home/client/client-4.png'
import client5 from '../../assets/home/client/client-5.png'
import client6 from '../../assets/home/client/client-6.png'
import client7 from '../../assets/home/client/client-7.png'
import client8 from '../../assets/home/client/client-8.png'
import '../../stylePages/client/App.css'
import '../../stylePages/client/style.css'


const Clients = () => {
  return (
    <section className="clients spad">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="section-title">
                    <span>Partner</span>
                    <h2>Happy Clients</h2>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                <a href="#" className="client__item" >
                    <img  src={client1} alt="client"/>
                    </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                <a href="#" className="client__item"><img src={client2} alt="client"/></a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                <a href="#" className="client__item"><img src={client3} alt="client"/></a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                <a href="#" className="client__item"><img src={client4} alt="client"/></a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                <a href="#" className="client__item"><img src={client5} alt="client"/></a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                <a href="#" className="client__item"><img src={client6} alt="client"/></a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                <a href="#" className="client__item"><img src={client7} alt="client"/></a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                <a href="#" className="client__item"><img src={client8} alt="client"/></a>
            </div>
        </div>
    </div>
</section>
  )
}

export default Clients
