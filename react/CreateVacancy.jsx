import React from 'react';
import createReactClass from 'create-react-class';
import { Link } from 'react-router-dom';
import HeaderPage from '../HeaderPage.jsx';
import '../../style/CreateVacancy.less';
import config from '../../../config/config.json';

export default createReactClass({
    componentDidMount(){
        let myState = this;

        if ($('#mySidenav').hasClass('sidenav-open')) {
            $('.wrapper-page').css('marginLeft', '200px');
            $('.wrapper-page').css('width', $(window).width() - 200 + 'px');
        } else {
            $('.wrapper-page').css('marginLeft', '70px');
            $('.wrapper-page').css('width', $(window).width() - 70 + 'px');
        }
        if (this.props.location.state.status == 'edit') {
            this.setState({ main: 'Edit' });
        } else {
            this.setState({ main: 'Create' });
        }
        if (this.props.location.state.id) {
            $.ajax({
                url: '/get_one_vacancy',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ id : myState.props.location.state.id}),
                success: function(response) {
                    myState.setState(response);
                    response.languages.forEach(function(value, i) {
                        if (i > 0) {
                            myState.state.language.push('');
                            myState.setState(myState.state);
                        }
                        $('.vacancy-lang')[i].value = value.language;
                        $('.vacancy-lang-lvl')[i].value = value.level;
                    });
                    $("#slider-range").slider({
                        values: [ response.ageFrom, response.ageTo ]
                    });
                    $("#slider-range2").slider({
                        values: [ response.expFrom, response.expTo ]
                    });
                }
            });
        }
        $(function () {
            $("#slider-range").slider({
                range: true,
                min: 18,
                max: 60,
                values: [ 25, 30 ],
                slide: function(event, ui) {
                    myState.setState({ ageFrom: ui.values[0] });
                    myState.setState({ ageTo: ui.values[1] });
                }
            });
            $( "#slider-range2" ).slider({
                range: true,
                min: 0,
                max: 30,
                values: [ 1, 3 ],
                slide: function(event, ui) {
                    myState.setState({ expFrom: ui.values[0] });
                    myState.setState({ expTo: ui.values[1] });
                }
            });
	    });
        $.ajax({
            url: '/get_current_company',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ page: 'register_company' }),
            success: function(response) {
                let residences = response.locations.map((value, i) => {
                    return (value.country + ', ' + value.city + ', ' + value.street)
                });
                myState.setState({ residence: residences[0]});
                residences.forEach(function(value) {
                    $('#res-title').append($('<option>', {
                        value: value,
                        text: value
                    }));
                });
            }
        });
    },
    getInitialState(){
        return ({
            jobTitle: '',
            sector: 'Energy Equipment & Services',
            residence: '',
            gender: 'male',
            contract: 'Full time',
            currency: 'USD',
            salaryFrom: '',
            salaryTo: '',
            jobDescr: '',
            respons: [],
            degree: 'Height school',
            ageFrom: '25',
            ageTo: '30',
            expFrom: '1',
            expTo: '3',
            hard_skills: [],
            soft_skills: [],
            requirements: [],
            language: [],
            languages: [],
            conditions: '',
            benefits: '',
            interview: ''
        });
    },
    handleJobTitle(event) {
        this.setState({ jobTitle: event.target.value });
    },
    handleSector(event) {
        this.setState({ sector: event.target.value });
    },
    handleResidence(event){
        this.setState({ residence: event.target.value });
    },
    handleGender(event){
        this.setState({ gender: event.target.value });
    },
    handleContractType(event) {
        this.setState({ contract: event.target.value });
    },
    handleCurrency(event) {
        this.setState({ currency: event.target.value });
    },
    handleSalaryFrom(event){
        if (/^[0-9]*$/.test(event.target.value)) {
            this.setState({ salaryFrom: event.target.value });
        }
    },
    handleSalaryTo(event){
        if (/^[0-9]*$/.test(event.target.value)) {
            this.setState({ salaryTo: event.target.value });
        }
    },
    handleJobDescr(event){
        this.setState({ jobDescr: event.target.value });
    },
    handleRespons(event){
        if (event.keyCode == 13) {
            if (event.target.value.trim()) {
                this.state.respons.push(event.target.value.trim());
                event.target.value = '';
                this.setState(this.state);
            }
        }
    },
    deleteRespons(event) {
        if (parseInt(event.target.dataset.respons) > -1) {
            this.state.respons.splice(parseInt(event.target.dataset.respons), 1);
            this.setState(this.state);
        }
    },
    handleDegree(event){
        this.setState({ degree: event.target.value });
    },
    handleHardSkills(event){
        if (event.keyCode == 13) {
            if (event.target.value.trim()) {
                this.state.hard_skills.push(event.target.value.trim());
                event.target.value = '';
                this.setState(this.state);
            }
        }
    },
    deleteHardSkills(event) {
        if (parseInt(event.target.dataset.hard) > -1) {
            this.state.hard_skills.splice(parseInt(event.target.dataset.hard), 1);
            this.setState(this.state);
        }
    },
    handleSoftSkills(event){
        if (event.keyCode == 13) {
            if (event.target.value.trim()) {
                this.state.soft_skills.push(event.target.value.trim());
                event.target.value = '';
                this.setState(this.state);
            }
        }
    },
    deleteSoftSkills(event) {
        if (parseInt(event.target.dataset.soft) > -1) {
            this.state.soft_skills.splice(parseInt(event.target.dataset.soft), 1);
            this.setState(this.state);
        }
    },
    handleRequirements(event){
        if (event.keyCode == 13) {
            if (event.target.value.trim()) {
                this.state.requirements.push(event.target.value.trim());
                event.target.value = '';
                this.setState(this.state);
            }
        }
    },
    deleteReq(event){
        if (parseInt(event.target.dataset.req) > -1) {
            this.state.requirements.splice(parseInt(event.target.dataset.req), 1);
            this.setState(this.state);
        }
    },
    handleConditions(event){
        this.setState({ conditions: event.target.value });
    },
    handleBenefits(event) {
        this.setState({ benefits: event.target.value });
    },
    handleInterview(event) {
        this.setState({ interview: event.target.value });
    },
    handleAddLanguage(event) {
        this.state.language.push("");
        this.setState(this.state);
    },
    handleDeleteLanguage(event){
        $("div").find("[data-lang='" + event.target.dataset.lang + "']")[0].remove();
    },
    handleCreate(){
        let _this = this;
        this.state.languages = [];

        $('.vacancy-lang').each(function(){
            _this.state.languages.push({ language: this.value, level: '' });
        });
        $('.vacancy-lang-lvl').each(function(i) {
            _this.state.languages[i].level = this.value;
        });
        $.ajax({
            url: '/create_vacancy',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(_this.state),
            success: function(response) {
                if (response != 'error') {
                    location.href = response;
                }
            }
        });
    },
    render(){
        let responsibilities = this.state.respons.map((value, i) => {
            return (
                <p key={i} data-respons={i} className="respons-p">&bull; {value} <span onClick={this.deleteRespons} data-respons={i}> <sup data-respons={i}>x</sup></span></p>
            );
        });
        let hardSkills = this.state.hard_skills.map((value, i) => {
            return (
                <span key={i} data-hard={i} className="skills-list" style={{ marginRight: '10px' }}>{value} <span onClick={this.deleteHardSkills} data-hard={i}> <sup data-hard={i}>x</sup></span></span>
            );
        });
        let softkills = this.state.soft_skills.map((value, i) => {
            return (
                <span key={i} data-soft={i} className="skills-list" style={{ marginRight: '10px' }}>{value} <span onClick={this.deleteSoftSkills} data-soft={i}> <sup data-soft={i}>x</sup></span></span>
            );
        });
        let requirement = this.state.requirements.map((value, i) => {
            return (
                <p key={i} data-req={i} className="respons-p">&bull; {value} <span onClick={this.deleteReq} data-req={i}> <sup data-req={i}>x</sup></span></p>
            );
        });
        let language = this.state.language.map((value, i) => {
            return (
                <div className="form-group row" key={i} data-lang={i}>
                    <label className="col-xs-12 col-md-3 control-label"></label>
                    <div className="col-xs-7 col-md-5 ">
                        <select className="form-control bg-grey vacancy-lang">
                            <option value="Afrikanns">Afrikanns</option>
                            <option value="Albanian">Albanian</option>
                            <option value="Arabic">Arabic</option>
                            <option value="Armenian">Armenian</option>
                            <option value="Bulgarian">Bulgarian</option>
                            <option value="Cambodian">Cambodian</option>
                            <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                            <option value="Czech">Czech</option>
                            <option value="Danish">Danish</option>
                            <option value="Dutch">Dutch</option>
                            <option value="English">English</option>
                            <option value="Estonian">Estonian</option>
                            <option value="Finnish">Finnish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Greek">Greek</option>
                            <option value="Indonesian">Indonesian</option>
                            <option value="Irish">Irish</option>
                            <option value="Italian">Italian</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Javanese">Javanese</option>
                            <option value="Korean">Korean</option>
                            <option value="Latin">Latin</option>
                            <option value="Latvian">Latvian</option>
                            <option value="Macedonian">Macedonian</option>
                            <option value="Mongolian">Mongolian</option>
                            <option value="Nepali">Nepali</option>
                            <option value="Norwegian">Norwegian</option>
                            <option value="Persian">Persian</option>
                            <option value="Polish">Polish</option>
                            <option value="Portuguese">Portuguese</option>
                            <option value="Romanian">Romanian</option>
                            <option value="Russian">Russian</option>
                            <option value="Samoan">Samoan</option>
                            <option value="Serbian">Serbian</option>
                            <option value="Slovak">Slovak</option>
                            <option value="Slovenian">Slovenian</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Swedish">Swedish </option>
                            <option value="Tatar">Tatar</option>
                            <option value="Turkish">Turkish</option>
                            <option value="Ukranian">Ukranian</option>
                            <option value="Urdu">Urdu</option>
                            <option value="Uzbek">Uzbek</option>
                            <option value="Vietnamese">Vietnamese</option>
                        </select>
                    </div>
                    <div className="col-xs-3 col-md-3 ">
                        <select className="form-control bg-grey vacancy-lang-lvl">
                            <option value="Elementary">Elementary</option>
                            <option value="Pre-Intermediate">Pre-Intermediate</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Upper-Intermediate">Upper-Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="col-xs-2 col-md-1">
                        <button className="btn little-btn" onClick={this.handleDeleteLanguage} data-lang={i}><i className="fa fa-minus" data-lang={i} aria-hidden="true"></i></button>
                    </div>
                </div>
            );
        });
        return (
            <div className="wrapper-page">
                <HeaderPage name='Vacancy form' url='Vacancy form'/>
                <div className="container create-vacancy">
                    <div className="form-group button-import row">
                        <div className="col-md-12">
                            <button className="btn-import"><img src={config.domain + '/static/public/images/import.svg'} alt='import' /> Import file from your computer</button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 control-label" htmlFor="job-title"><span className="red-star">*</span>Job title</label>
                        <div className="col-md-9">
                            <input type="text" className="form-control bg-grey" id="job-title" value={this.state.jobTitle} onChange={this.handleJobTitle} placeholder="Example: UX Designer" />
                        </div>
                    </div>
                    <hr/>
                    <div className="sectors-list" id="sector-of-activity">
                        <div className="form-group row">
                            <label className="col-xs-12 col-md-3 control-label" htmlFor="inputDefault"><span className="red-star">*</span>Sector of activity</label>
                            <div className="col-md-9">
                                <select className="form-control bg-grey custom-select" onChange={this.handleSector} value={this.state.sector} >
                                    <option value="Energy Equipment & Services">Energy Equipment & Services</option>
                                    <option value="Oil, Gas & Consumable Fuels">Oil, Gas & Consumable Fuels</option>
                                    <option value="Chemicals">Chemicals</option>
                                    <option value="Construction Materials">Construction Materials</option>
                                    <option value="Containers & Packaging">Containers & Packaging</option>
                                    <option value="Metals & Mining">Metals & Mining</option>
                                    <option value="Paper & Forest Products">Paper & Forest Products</option>
                                    <option value="Aerospace & Defense">Aerospace & Defense</option>
                                    <option value="Building Products">Building Products</option>
                                    <option value="Construction & Engineering">Construction & Engineering</option>
                                    <option value="Electrical Equipment">Electrical Equipment</option>
                                    <option value="Industrial Conglomerates">Industrial Conglomerates</option>
                                    <option value="Machinery">Machinery</option>
                                    <option value="Trading Companies & Distributors">Trading Companies & Distributors</option>
                                    <option value="Commercial Services & Supplies">Commercial Services & Supplies</option>
                                    <option value="Professional Services">Professional Services</option>
                                    <option value="Air Freight & Logistics">Air Freight & Logistics</option>
                                    <option value="Airlines">Airlines</option>
                                    <option value="Marine">Marine</option>
                                    <option value="Road & Rail">Road & Rail</option>
                                    <option value="Transportation Infrastructure">Transportation Infrastructure</option>
                                    <option value="Auto Components">Auto Components</option>
                                    <option value="Automobiles">Automobiles</option>
                                    <option value="Household Durables">Household Durables</option>
                                    <option value="Leisure Products">Leisure Products</option>
                                    <option value="Textiles, Apparel & Luxury Goods">Textiles, Apparel & Luxury Goods</option>
                                    <option value="Hotels, Restaurants & Leisure">Hotels, Restaurants & Leisure</option>
                                    <option value="Diversified Consumer Services">Diversified Consumer Services</option>
                                    <option value="Media">Media</option>
                                    <option value="Distributors">Distributors</option>
                                    <option value="Internet & Direct Marketing Retail">Internet & Direct Marketing Retail</option>
                                    <option value="Multiline Retail">Multiline Retail</option>
                                    <option value="Specialty Retail">Specialty Retail</option>
                                    <option value="Food & Staples Retailing">Food & Staples Retailing</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Food Products">Food Products</option>
                                    <option value="Tobacco">Tobacco</option>
                                    <option value="Household Products">Household Products</option>
                                    <option value="Personal Products">Personal Products</option>
                                    <option value="Health Care Equipment & Supplies">Health Care Equipment & Supplies</option>
                                    <option value="Health Care Providers & Services">Health Care Providers & Services</option>
                                    <option value="Health Care Technology">Health Care Technology</option>
                                    <option value="Biotechnology">Biotechnology</option>
                                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                                    <option value="Life Sciences Tools & Services">Life Sciences Tools & Services</option>
                                    <option value="Banks">Banks</option>
                                    <option value="Thrifts & Mortgage Finance">Thrifts & Mortgage Finance</option>
                                    <option value="Diversified Financial Services">Diversified Financial Services</option>
                                    <option value="Consumer Finance">Consumer Finance</option>
                                    <option value="Capital Markets">Capital Markets</option>
                                    <option value="Mortgage Real Estate Investment Trusts (REITs)">Mortgage Real Estate Investment Trusts (REITs)</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Internet Software & Services">Internet Software & Services</option>
                                    <option value="IT Services">IT Services</option>
                                    <option value="Software">Software</option>
                                    <option value="Communications Equipment">Communications Equipment</option>
                                    <option value="Technology Hardware, Storage & Peripherals">Technology Hardware, Storage & Peripherals</option>
                                    <option value="Electronic Equipment, Instruments & Components">Electronic Equipment, Instruments & Components</option>
                                    <option value="Semiconductors & Semiconductor Equipment">Semiconductors & Semiconductor Equipment</option>
                                    <option value="Diversified Telecommunication Services">Diversified Telecommunication Services</option>
                                    <option value="Wireless Telecommunication Services">Wireless Telecommunication Services</option>
                                    <option value="Electric Utilities">Electric Utilities</option>
                                    <option value="Gas Utilities">Gas Utilities</option>
                                    <option value="Multi-Utilities">Multi-Utilities</option>
                                    <option value="Water Utilities">Water Utilities</option>
                                    <option value="Independent Power and Renewable Electricity Producers">Independent Power and Renewable Electricity Producers</option>
                                    <option value="Equity Real Estate Investment Trusts (REITs)">Equity Real Estate Investment Trusts (REITs)</option>
                                    <option value="Real Estate Management & Development">Real Estate Management & Development</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-md-3 control-label" htmlFor="res-title"><span className="red-star">*</span>Residence</label>
                        <div className="col-md-9">
                            <select className="form-control bg-grey custom-select" id="res-title" value={this.state.residence} onChange={this.handleResidence} />
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-md-3 control-label"><span className="red-star">*</span>Gender</label>
                        <div className="col-md-9 gender">
                            <input type="radio" name="optionsRadios" id="checkbox-1" value="male" checked={this.state.gender === 'male'} onChange={this.handleGender} />
                            <label htmlFor="checkbox-1"><span className="radio">Male</span></label>
                            <input type="radio" name="optionsRadios" id="checkbox-2" value="female" checked={this.state.gender === 'female'} onChange={this.handleGender} />
                            <label htmlFor="checkbox-2"><span className="radio">Female</span></label>
                            <input type="radio" name="optionsRadios" id="checkbox-3" value="both" checked={this.state.gender === 'both'} onChange={this.handleGender} />
                            <label htmlFor="checkbox-3"><span className="radio">Both</span></label>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-md-3 control-label" htmlFor="contract"><span className="red-star">*</span>Contract type</label>
                        <div className="col-md-9">
                            <select className="form-control bg-grey" id="contract" onChange={this.handleContractType} value={this.state.contract}>
                                <option value="Full time">Full time</option>
                                <option value="Part time">Part time</option>
                                <option value="Remote work">Remote work</option>
                                <option value="Shift work">Shift work</option>
                            </select>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-xs-12 col-md-3 control-label" htmlFor="inputDefault"><span className="red-star">*</span>Salary range</label>
                        <div className="col-xs-5 col-md-3">
                            <input type="text" id="salary-from" className="form-control bg-grey" placeholder="Example: 1000" value={this.state.salaryFrom} onChange={this.handleSalaryFrom}/>
                        </div>
                        <div className="col-xs-5 col-md-3">
                            <input type="text" id="salary-to" className="form-control bg-grey" placeholder="Example: 2000" value={this.state.salaryTo} onChange={this.handleSalaryTo}/>
                        </div>
                        <div className="col-xs-2 col-md-3">
                            <select className="form-control bg-grey" onChange={this.handleCurrency} value={this.state.currency}>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="RUB">RUB</option>
                                <option value="UAH">UAH</option>
                            </select>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-md-3 control-label" htmlFor="description"><span className="red-star">*</span>Job description</label>
                        <div className="col-md-9">
                            <textarea className="form-control bg-grey" rows="4" id="description" value={this.state.jobDescr} onChange={this.handleJobDescr}></textarea>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-md-3 control-label" htmlFor="Responsibilities"><span className="red-star">*</span>Responsibilities</label>
                        <div className="col-md-9">
                            <input className="form-control bg-grey" id="Responsibilities" onKeyUp={this.handleRespons} placeholder="Type your Responsibilities here then key press enter" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 col-control-label"></label>
                        <div className="col-md-9">
                            { responsibilities }
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-md-3 control-label" htmlFor="degree"><span className="red-star">*</span>Min degree</label>
                        <div className="col-md-9">
                            <select className="form-control bg-grey custom-select" name="degree" id="degree" value={this.state.degree} onChange={this.handleDegree}>
                                <option value="Height school">Height school</option>
                                <option value="College">College</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Master">Master</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                       <label className="col-md-3 control-label" htmlFor="inputDefault"><span className="red-star">*</span>Age range</label>
                       <div className="col-md-9">
                           <p className="output">From: <b className="age-from">{this.state.ageFrom}</b> to: <b className="age-to">{this.state.ageTo}</b></p>
                           <div id="slider-range"></div>
                       </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                       <label className="col-md-3 control-label" htmlFor="inputDefault"><span className="red-star">*</span>Years of experience</label>
                       <div className="col-md-9">
                           <p className="output">From: <b className="age-from">{this.state.expFrom}</b> to: <b className="age-to">{this.state.expTo}</b></p>
                            <div id="slider-range2"></div>
                       </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-md-3 control-label" htmlFor="Skills"><span className="red-star">*</span>Hard Skills</label>
                        <div className="col-md-9 ">
                            <input className="form-control bg-grey" id="Skills" onKeyUp={this.handleHardSkills} placeholder="Type Hard Skills here then key press enter"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 col-control-label"></label>
                        <div className="col-md-9">
                            { hardSkills }
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-md-3 control-label " htmlFor="qualities"><span className="red-star">*</span>Soft Skills</label>
                        <div className="col-md-9">
                            <input className="form-control bg-grey" id="qualities" onKeyUp={this.handleSoftSkills} placeholder="Type Soft Skills here then key press enter"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 col-control-label"></label>
                        <div className="col-md-9">
                            { softkills }
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-md-3 control-label" htmlFor="requirements"><span className="red-star">*</span>Professional requirements</label>
                        <div className="col-md-9 ">
                            <input className="form-control bg-grey" id="requirements" onKeyUp={this.handleRequirements} placeholder="Type Professional requirements here then key press enter"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 col-control-label"></label>
                        <div className="col-md-9">
                            { requirement }
                        </div>
                    </div>
                    <hr/>
                    <div id="nodeLanguage">
                        <div className="form-group row">
                            <label className="col-xs-12 col-md-3 control-label"><span className="red-star">*</span>Languages</label>
                            <div className="col-xs-7 col-md-5 ">
                                <select className="form-control bg-grey vacancy-lang">
                                    <option value="Afrikanns">Afrikanns</option>
                                    <option value="Albanian">Albanian</option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="Armenian">Armenian</option>
                                    <option value="Bulgarian">Bulgarian</option>
                                    <option value="Cambodian">Cambodian</option>
                                    <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                                    <option value="Czech">Czech</option>
                                    <option value="Danish">Danish</option>
                                    <option value="Dutch">Dutch</option>
                                    <option value="English">English</option>
                                    <option value="Estonian">Estonian</option>
                                    <option value="Finnish">Finnish</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="Greek">Greek</option>
                                    <option value="Indonesian">Indonesian</option>
                                    <option value="Irish">Irish</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="Javanese">Javanese</option>
                                    <option value="Korean">Korean</option>
                                    <option value="Latin">Latin</option>
                                    <option value="Latvian">Latvian</option>
                                    <option value="Macedonian">Macedonian</option>
                                    <option value="Mongolian">Mongolian</option>
                                    <option value="Nepali">Nepali</option>
                                    <option value="Norwegian">Norwegian</option>
                                    <option value="Persian">Persian</option>
                                    <option value="Polish">Polish</option>
                                    <option value="Portuguese">Portuguese</option>
                                    <option value="Romanian">Romanian</option>
                                    <option value="Russian">Russian</option>
                                    <option value="Samoan">Samoan</option>
                                    <option value="Serbian">Serbian</option>
                                    <option value="Slovak">Slovak</option>
                                    <option value="Slovenian">Slovenian</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Swedish">Swedish </option>
                                    <option value="Tatar">Tatar</option>
                                    <option value="Turkish">Turkish</option>
                                    <option value="Ukranian">Ukranian</option>
                                    <option value="Urdu">Urdu</option>
                                    <option value="Uzbek">Uzbek</option>
                                    <option value="Vietnamese">Vietnamese</option>
                                </select>
                            </div>
                            <div className="col-xs-3 col-md-3 ">
                                <select className="form-control bg-grey vacancy-lang-lvl">
                                    <option value="Elementary">Elementary</option>
                                    <option value="Pre-Intermediate">Pre-Intermediate</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Upper-Intermediate">Upper-Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                            <div className="col-xs-2 col-md-1">
                                <button className="btn little-btn" onClick={this.handleAddLanguage}><i className="fa fa-plus" aria-hidden="true"></i></button>
                            </div>
                        </div>
                        { language }
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-md-3 control-label " htmlFor="conditions"><span className="red-star">*</span>Working conditions</label>
                        <div className="col-md-9">
                            <textarea className="form-control bg-grey" rows="4" id='conditions' value={this.state.conditions} onChange={this.handleConditions}></textarea>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                       <label className="col-md-3 control-label " htmlFor="benefits "><span className="red-star">*</span>Company benefits</label>
                       <div className="col-md-9 ">
                           <textarea className="form-control bg-grey " id="benefits" rows="4" placeholder="Example: Free english lessons " value={this.state.benefits} onChange={this.handleBenefits}></textarea>
                       </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                       <label className="col-md-3 control-label " htmlFor="interview "><span className="red-star">*</span>Сonditions of interview</label>
                       <div className="col-md-9 ">
                           <textarea className="form-control bg-grey " id="interview" rows="4"  value={this.state.interview} onChange={this.handleInterview}></textarea>
                       </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <div className="col-md-12 btn-div-create">
                            <button className='btn-create' onClick={this.handleCreate}>{this.state.main + ' vacancy'}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
