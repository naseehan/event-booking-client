import axios from 'axios';
import React, { useEffect } from 'react';

const Successful = () => {
  const styles = {
    body: {
      textAlign: 'center',
      padding: '40px 0',
      background: '#EBF0F5',
    },
    h1: {
      color: '#88B04B',
      fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
      fontWeight: 900,
      fontSize: '40px',
      marginBottom: '10px',
    },
    p: {
      color: '#404F5E',
      fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
      fontSize: '20px',
      margin: 0,
    },
    i: {
      color: '#9ABC66',
      fontSize: '100px',
      lineHeight: '200px',
      marginLeft: '-15px',
    },
    card: {
      background: 'white',
      padding: '60px',
      borderRadius: '4px',
      boxShadow: '0 2px 3px #C8D0D8',
      display: 'inline-block',
      margin: '0 auto',
    },
    circle: {
      borderRadius: '200px',
      height: '200px',
      width: '200px',
      background: '#F8FAF5',
      margin: '0 auto',
    },
  };


  // useEffect(() => {
  //   try{
  //   const deleteCart = async() =>{
  //     const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteCart`)
  //   }}
  // })


  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <div style={styles.circle}>
          <i className="checkmark" style={styles.i}>✓</i>
        </div>
        <h1 style={styles.h1}>Success</h1>
        <p style={styles.p}>We received your purchase request;<br/> we'll be in touch shortly!</p>
      </div>
    </div>
  );
};

export default Successful;
