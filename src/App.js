import React, { Component } from 'react';
import './App.css';
import Header from './Header';

import TimePicker from 'react-times';
import './assets/material/default.css';
import './assets/classic/default.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      data:{
        todos:[]
      },
      forms:{}
    };
  }

  onTimeChange(name,object) {
    let JamMenit = object.hour + ":"+object.minute;
    this.setState({forms:{ ...this.state.forms, [name]: JamMenit }});
  }

  setInput = (key) => (event) => {
    this.setState({ forms:{ ...this.state.forms, [key]: event.target.value } });
  }

  addTodo = (e) => {
    e.preventDefault();
    if (this.state.forms.jam_awal === undefined || this.state.forms.jam_awal === "") {
      toast.error('Jam Awal belum diisi', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }

    if (this.state.forms.jam_akhir === undefined || this.state.forms.jam_akhir === "") {
      toast.error('Jam Akhir belum diisi', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }

    if (this.state.forms.jenis_aktivitas === undefined || this.state.forms.jenis_aktivitas === "") {
      toast.error('Jenis Aktivitas belum diisi', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }



    this.state.data.todos.push(this.state.forms);
    this.setState({data:{todos:this.state.data.todos},forms:{}});
    toast.success('Berhasil tambah data To Do', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  removeTodo = (i) => {
    this.state.data.todos.splice(i,1);
    this.setState({todos:this.state.data.todos});
    toast.success('Berhasil Hapus Data', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  render(){
    return (
      <div>
      <br/>
      <div className="col-md-12">
      <Header/>
        <br/>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        <form onSubmit={this.addTodo} className="form-inline">
          <TimePicker
          onTimeChange={this.onTimeChange.bind(this,'jam_awal')}
          time={this.state.forms.jam_awal}
          />
          <TimePicker
          onTimeChange={this.onTimeChange.bind(this,'jam_akhir')}
          time={this.state.forms.jam_akhir}
          />
          <input type="text" className="form-control form-control-lg mr-sm-2" vlaue={this.state.forms.jenis_aktivitas} onChange={this.setInput('jenis_aktivitas')} placeholder="Jenis Aktivitas" />
          <button type="submit" onClick={this.addTodo} className="btn btn-info btn-lg mr-sm-2">Simpan</button>
        </form>
        <br/>
        </div>
        <hr/>
        <div>
            {this.state.data.todos.map((data,i) =>
                <div className="col-md-12" key={i}>
                <button type="button" onClick={()=>this.removeTodo(i)} className="btn btn-danger mr-3">Hapus</button>
                <span>{data.jam_awal} - {data.jam_akhir} : {data.jenis_aktivitas}</span>
                <hr/>
                </div>
            )}
        </div>
      </div>
    );
  }
}

export default App;
