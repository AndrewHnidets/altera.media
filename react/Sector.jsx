import React from 'react';
import createReactClass from 'create-react-class';
import { Link } from 'react-router-dom';
import autocomplete from 'jquery-ui/ui/widgets/autocomplete';

export default createReactClass({
    componentDidMount(){
        if (this.props.val) {
            $(`.sector[data-id="${event.target.dataset.id}"]`).val(this.props.val);
        }
        $(function () {
	        $(".sector").autocomplete({
		        source: function (request, response) {
                    jQuery.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&sort=size&q=" + request.term, function (data) {
                        response(data);
			        });
		        },
		        minLength: 3,
		        select: function (event, ui) {
		            let selectedObj = ui.item;
		            $(`.sector[data-id="${event.target.dataset.id}"]`).val(selectedObj.value);
		            return false;
		        }
	        });
            $(".sector").autocomplete("option", "delay", 100);
	    });
    },
    render(){
        $(`.sector[data-id="${event.target.dataset.id}"]`).val(this.props.val);
        return(
            <div className="form-group row">
                <label className="col-xs-12 col-md-3 control-label" htmlFor="inputDefault"> </label>
                <div className="col-md-8">
                    <input type="text" className="form-control bg-grey sector" data-id={this.props.id} placeholder="Example: New York, USA" />
                </div>
                <div className="col-md-1">
                    <button className="btn little-btn"><i className="fa fa-minus" data-id={this.props.id} onClick={this.props.delete} aria-hidden="true "></i></button>
                </div>
            </div>
        );
    }
});
