import React , {Component} from 'react';
import axios from 'axios';
import Folder from './folder';
import Search from './search';

export default class FoldersList extends Component {
	constructor(props){
	super(props)
		this.state = {
			files: [],
			search: []
		}; 
	}

   componentDidMount() {
    axios.get(`http://localhost:3000/getFiles`)
      .then(res => {
        const files = res.data;
        this.setState({ files: files, 
						search : files});
      });
   }

	update_files_list(files){
		if(files == "") {
			this.setState({ search : this.state.files });
		} else {
			const searchedFiles = this.state.files.filter( item =>  item.name.includes(files))
			this.setState({ search : searchedFiles });
		}
	}

	render(){
		return (
            <div className="content-box">
                 <div className="headerImg"><img src="../style/header.png" height="100px" /></div>
			<Search list_data={this.state.files} on_filter={this.update_files_list.bind(this)}/>
			<ul className="folders-list">{
				this.state.search.map( (item,index) => {
				return (
						    <Folder key={item.id} data={item}/>
				    )
				})
			}
			</ul>
			</div>
		)

	}

}
