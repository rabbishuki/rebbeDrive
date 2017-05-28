import React, { Component, PropTypes } from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props)
    }
    update_list(event) {
        let filtered_files_list = this.props.list_data.filter(item => item.name === event.target.value.trim())
        this.props.on_filter(event.target.value.trim());
    }
    render() {
        return <div className="searchBox">
            <section className="content bgcolor-3">
                <span className="input input--kyo">
                    <input className="input__field input__field--kyo searchBar"
                        type="text"
                        id="input-19"
                        onChange={(event) => this.update_list(event)} />
                    <label className="input__label input__label--kyo">
                        
                    </label>
                </span>
            </section>
        </div>
        {/*<span className="input input--kyo">
            <input className="input__field input__field--kyo"
                   type="text"
                   name="search" 
                   placeholder="?מה תרצה לחפש"
                   style={{textAlign: "right"}}
                   onChange={(event) => this.update_list(event)} />
                   
            </span>*/}
    }
}