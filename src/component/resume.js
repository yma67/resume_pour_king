import React, {Component} from 'react';
import Education from '../model/Education'
import Hobby from '../model/Hobby'
import {Menu, Card, Header, Icon, Image, Divider, Loader, Dimmer, Dropdown, Label} from 'semantic-ui-react';
import McGillIcon from '../img/McGill_University_CoA.svg'
import hand from '../img/hand.png'
import {Link} from "react-router-dom";
import ResumeRouter from "../ResumeRouter";
export class General extends Component {
    constructor(props) {
        super(props);
        var urlPrev = this.props.location.pathname.slice(1);
        var prim = "";
        for (var i = 0; i < urlPrev.length; i = i + 1) {
            if (urlPrev.charAt(i) === '/') break;
            prim = prim + urlPrev.charAt(i);
        }
        if (prim === 'resume') {
            this.state = { activeItem: 'Chris Li', width: 0, height: 0};
        } else if (prim === 'project') {
            this.state = { activeItem: 'Project', width: 0, height: 0};
        } else {
            this.state = { activeItem: 'Work Experience', width: 0, height: 0};
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    getTab = () => {
        let urlPrev = this.props.location.pathname.slice(1);
        let prim = "";
        for (let i = 0; i < urlPrev.length; i = i + 1) {
            if (urlPrev.charAt(i) === '/') break;
            prim = prim + urlPrev.charAt(i);
        }
        if (prim === 'resume') {
            return 'Chris Li';
        } else if (prim === 'project') {
            return 'Project'
        } else {
            return 'Work Experience'
        }
    };
    state = { activeItem: this.getTab };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    render() {
        const { activeItem } = this.state;
        if (this.state.width/this.state.height < 0.62) {
            return (
                <div>
                <div className="Resume-header">
                    <header>
                        <Menu secondary size='massive'>
                            <Menu.Item
                                href={'/'}
                                active={false}
                                inverted
                                onClick={this.handleItemClick}
                            >
                                <img src={hand} />
                            </Menu.Item>
                            <Dropdown item text='Chris Li'>
                                <Dropdown.Menu>
                                    <Dropdown.Item href={'/resume'}>Resume</Dropdown.Item>
                                    <Dropdown.Item href={'/project'}>Project</Dropdown.Item>
                                    <Dropdown.Item href={'/workexp'}>Work Experience</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu>
                            <Divider />
                    </ header>
                </div>
                    <ResumeRouter />
                    <div className={'Resume-Footer'}>
                        <Divider horizontal footer className={'Resume-Footer'}>
                            <Header as='h4' >
                                <code><Icon name='heart' color={'red'} />#李昕宇工作室</code>
                            </Header>
                        </Divider>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                <div className="Resume-header">
                    <header>
                        <Menu secondary size='massive'>
                            <Menu.Item
                                href={'/'}
                                active={false}
                                inverted
                                onClick={this.handleItemClick}
                            >
                                <img src={hand} />
                            </Menu.Item>
                            <Menu.Item
                                name='Chris Li'
                                color='red'
                                active={activeItem === 'Chris Li'}
                                as={Link}
                                to='/resume'
                                onClick={this.handleItemClick}>
                                <b>Chris Li</b>
                            </Menu.Item>

                            <Menu.Item
                                name='Project'
                                active={activeItem === 'Project'}
                                color='red'
                                as={Link}
                                to='/project'
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Work Experience'
                                active={activeItem === 'Work Experience'}
                                color='red'
                                as={Link}
                                to='/workexp'
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </ header>
                </div>
                    <div className={'Resume-Divider'}>
                        <Divider />
                    </div>
                    <ResumeRouter />
                <div className={'Resume-Footer'}>
                    <Divider horizontal footer className={'Resume-Footer'}>
                        <Header as='h4' >
                            <code><Icon name='heart' color={'red'} />#李昕宇工作室</code>
                        </Header>
                    </Divider>
                </div>
                </div>
            );
        }
    }
}
export default class Resume extends Component {
    constructor(props) {
        super(props);
        this.state = {load: true};
    }
    handleImageLoad() {
        this.setState({load: false});
    }
    render() {
        return (
            <div className={'Resume-Content'} >
                    <br />
                    <Header as='h2'>
                        <Icon name='book' />
                        <Header.Content>Education</Header.Content>
                    </Header>
                    <br />
                    <br />
                <Dimmer.Dimmable as={Card.Group} blurring dimmed={this.state.load} >
                    <Dimmer active={this.state.load} inverted>
                        <Loader size='massive'>加载中</Loader>
                    </Dimmer>
                        {
                            Education.all().map(p => (
                                <Card key={p.eid} color='red' href={p.linkto} fluid ui disabled loader>
                                    <Card.Content header>
                                        <Header as='h2'>
                                            <Image size='mini' src={p.imgsrc} />
                                            <Header.Content>{p.degree}
                                                <Header.Subheader>{p.institute}</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                        <Label size={'tiny'} color='blue'>
                                            <Icon name='calendar alternate'/>
                                            {p.dateRange}
                                        </Label>
                                        <Label size={'tiny'} color='red'>
                                            <Icon name='location arrow'/>
                                            {p.location}
                                        </Label>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <ul>
                                                {
                                                    p.comment.map(s =>
                                                        <li>{s}</li>
                                                    )
                                                }
                                            </ul>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            ))
                        }
                </Dimmer.Dimmable>
                    <br />
                <br />
                    <Header as='h2'>
                        <Icon name='heart' />
                        <Header.Content>Like</Header.Content>
                    </Header>
                <br />
                <Dimmer.Dimmable as={Card.Group} blurring dimmed={this.state.load} >
                    <Dimmer active={this.state.load} inverted>
                        <Loader size='massive'>加载中</Loader>
                    </Dimmer>
                    <Card.Group centered>
                        {
                            Hobby.all().map(p => (
                                <Card key={p.hid} href={p.knowledgeSrc} color='red'>
                                    <Image src={p.imgsrc} onLoad={this.handleImageLoad.bind(this)}/>
                                    <Card.Content>
                                        <Card.Header>
                                            {p.title}
                                        </Card.Header>
                                        <Card.Meta>
                                            {p.meta}
                                        </Card.Meta>
                                        <Card.Description>
                                            {p.description}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            ))
                        }
                    </Card.Group>
                </Dimmer.Dimmable>
                </div>
        );
    }
}