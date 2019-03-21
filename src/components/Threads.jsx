import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormValidator from '../utils/FormValidator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateCurrentPath, fetchThreads, createThread, restThreadCreated } from '../actions/';
import './Threads.css';

class Threads extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: 'title',
        method: 'isEmpty',
        validWhen: false,
        message: 'thred title is required.',
      },
      {
        field: 'title',
        method: 'isLength',
        args: [{ min: 1, max: 100 }],
        validWhen: true,
        message: 'title must be between 1 - 100 charachers',
      },
      {
        field: 'description',
        method: 'isEmpty',
        validWhen: false,
        message: 'thred title is required.',
      },
      {
        field: 'description',
        method: 'isLength',
        args: [{ min: 1, max: 100 }],
        validWhen: true,
        message: 'title must be between 1 - 100 charachers',
      },
    ]);

    this.state = {
      title: '',
      description: '',
      tags: [],
      validation: this.validator.valid(),
    }

    this.submited = false;
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.props.fetchThreads();
    }
  }

  handleModalInputValueChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleTagsAddition = (e) => {
    if (e.key === 'Enter') { 
      const tagName = e.target.value;
      this.setState((state) => ({ tags: [...state.tags, tagName] }));
      document.getElementById('tags').value = '';
    }
  } 

  // handleTagsRemove = (e) => {
  //   const tagName = e.target.value;
  //   console.log('taget :: ', e.target);
  //   const newTagList = this.state.theadTags;
  //   const index = newTagList.indexOf(tagName);
  //   console.log('tagName :: ', tagName);
  //   console.log('newTagList :: ', newTagList);
  //   if (index !== -1) newTagList.splice(index, 1);
  //   this.setState((state) => ({ threadTags: newTagList }));
  // }

  handleThreadCreation = () => {
    const { title, tags, description } = this.state;
    const { firstName, lastName } = this.props.user;
    const userName = `${firstName} ${lastName}`;
    this.props.createThread({ title, description, tags, userName });
    this.setState({ title: '', description: '', tags: [], userName: '' })
  }

  render() {
    const { threads, threadsReceived, threadCreated, loading } = this.props;
  
    if (threadCreated === true) {
      toast.success('New thread created! 👍');
      this.props.restThreadCreated();
    }

    let validation = this.submited ? this.validator.validate(this.state) : this.state.validation;

    let allThreads = null;

    if (threadsReceived === true && threads.length > 0) {
      allThreads = (threadsReceived === true) ? threads.map(thread => (
      <div key={thread._id} className="col-sm-12 col-md-10 col-lg-8 mb-2">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{thread.title}</h4>
            <p className="card-text">{thread.description}</p>
            <div className="row">
              <div className="col-sm-8">
                {thread.tags.map(tag => (<span key={tag} className="badge badge-pill badge-light z-depth-1 mr-1"> {tag} </span>))}
              </div>
              <div className="col-sm-4">
                <span className="display-5">{thread.userName},  </span>
                <span className="display-5">{thread.date.split("T")[1].split('.')[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )) : <span></span>;
    } else {
      allThreads = (<div className="col-sm-8 mb-2 d-flex justify-content-center">No threads to display...<br />
        You can create one by clicking the floating green button below...</div>);
    }

    // const allThreads = (threadsReceived === true) ? threads.map(thread => (
    //   <div key={thread._id} className="col-sm-8 mb-2">
    //     <div className="card">
    //       <div className="card-body">
    //         <h4 className="card-title">{thread.title}</h4>
    //         <p className="card-text">{thread.description}</p>
    //         <div className="row">
    //           <div className="col-sm-8">
    //             {thread.tags.map(tag => (<span key={tag} className="badge badge-pill badge-light z-depth-1 mr-1"> {tag} </span>))}
    //           </div>
    //           <div className="col-sm-4">
    //             <span className="display-5">{thread.userName},  </span>
    //             <span className="display-5">{thread.date.split("T")[1].split('.')[0]}</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // )) : <span></span>;

    const loader = (
      <div className="col-sm-8 d-flex justify-content-center">
        <div className="loader" >
        </div>
      </div>
    );

    const finalTemplate = (loading === true) ? loader : allThreads;

    return (
      <div>
        
        {/* list of threads */}
        <div className="row justify-content-center">
          <div className="md-form col-sm-12 col-md-10 col-lg-8 mb-5">
            <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
          </div>
          {finalTemplate}
        </div>

        {/* modal button */}
        <a href="#" data-toggle="modal" data-target="#createThreadModal" className="float">
          <i className="fa fa-plus my-float"></i>
        </a>

        {/* modal */}
        <div className="modal fade" id="createThreadModal" tabIndex="-1" role="dialog" aria-labelledby="createThreadModal" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Create new thread</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className={validation.title.isInvalid.toString() && 'has-error'}>
                        <input type="text" id="title" name="title" value={this.state.title} className="form-control mb-4" onChange={this.handleModalInputValueChange} placeholder="Title" />
                        <span className="help-block deep-orange-text">{validation.title.message}</span>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className={validation.description.isInvalid.toString() && 'has-error'}>
                        <input type="text" id="description" name="description" value={this.state.description} className="form-control mb-4" onChange={this.handleModalInputValueChange} placeholder="Description" />
                        <span className="help-block deep-orange-text">{validation.description.message}</span>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <input type="text" id="tags" name="tags" className="form-control mb-4" onKeyPress={this.handleTagsAddition} placeholder="Tags" />
                    </div>
                    <div className="col-sm-12">
                      {this.state.tags.map(tag => (
                        <span key={tag} className="badge badge-pill badge-light z-depth-1 mr-1">{tag}</span>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={this.handleThreadCreation} className="btn btn-primary">
                  {(this.props.loading === true) ? <i className="fas fa-circle-notch fa-spin"></i> : 'CREATE'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    threads: state.threads,
    loading: state.loading,
    user: state.user,
    threadsReceived: state.threadsReceived,
    threadCreated: state.threadCreated
  }
}

const mapDispatchToProps = {
  updateCurrentPath: updateCurrentPath,
  fetchThreads: fetchThreads,
  createThread: createThread,
  restThreadCreated: restThreadCreated,
}

export default connect(mapStateToProps, mapDispatchToProps)(Threads);
