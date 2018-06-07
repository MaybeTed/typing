import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Leaders from './Leaders';

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			user: false,
			timeRemaining: 60,
			text: '',
			i: 0,
			gameStarted: false
		}
		this.getText = this.getText.bind(this);
		this.handleTyping = this.handleTyping.bind(this);
		this.startTimer = this.startTimer.bind(this);
	}

	componentDidMount() {
		this.getText();
	}

	endGame() {
		let { text, i } = this.state;
		let typed = text.slice(0, i);
		let words = typed.split(' ');
		alert('Congratulations! You typed ' + words.length + ' words!');
		this.setState({ i: 0, timeRemaining: 60, gameStarted: false }, () => {this.getText()})
	}

	getText() {
		const text1 = 'Before beginning I should explain that though it was my first case I was no longer in the first bloom of youth.  I was along in the thirties before I got my start and had lost a deal of hair from my cranium. This enabled me to pass for ten years older if I wished to, and still with the assistance of my friend Oscar Nilson the wig-maker I could make a presentable figure of youth and innocence. During my earlier days I had been a clerk in a railway freight office, a poor slave with only my dreams to keep me going. My father had no sympathy with my aspirations to be a detective.  He was a close-mouthed and a close-fisted man.';
		const text2 = 'Toward the end of the year 1920 the Government of the United States had practically completed the programme, adopted during the last months of President Winthrop\'s administration. The country was apparently tranquil. Everybody knows how the Tariff and Labour questions were settled. The war with Germany, incident on that country\'s seizure of the Samoan Islands, had left no visible scars upon the republic, and the temporary occupation of Norfolk by the invading army had been forgotten in the joy over repeated naval victories, and the subsequent ridiculous plight of General Von Gartenlaube\'s forces in the State of New Jersey.';
		const text3 = 'I was travelling towards London out of the North, intending to stop by the way, to look at the house. My health required a temporary residence in the country; and a friend of mine who knew that, and who had happened to drive past the house, had written to me to suggest it as a likely place. I had got into the train at midnight, and had fallen asleep, and had woke up and had sat looking out of window at the brilliant Northern Lights in the sky, and had fallen asleep again, and had woke up again to find the night gone, with the usual discontented conviction on me that I hadn\'t been to sleep at all;';
		const text4 = 'Now the way that the book winds up is this: Tom and me found the money that the robbers hid in the cave, and it made us rich. We got six thousand dollars apiece--all gold. It was an awful sight of money when it was piled up. Well, Judge Thatcher he took it and put it out at interest, and it fetched us a dollar a day apiece all the year round-- more than a body could tell what to do with. The Widow Douglas she took me for her son, and allowed she would sivilize me; but it was rough living in the house all the time, considering how dismal regular and decent the widow was in all her ways; and so when I couldn\'t stand it no longer I lit out.';
		const text5 = 'One morning I happened to turn over the salt-cellar at breakfast. I reached for some of it as quick as I could to throw over my left shoulder and keep off the bad luck, but Miss Watson was in ahead of me, and crossed me off. She says, "Take your hands away, Huckleberry; what a mess you are always making!" The widow put in a good word for me, but that warn\'t going to keep off the bad luck, I knowed that well enough. I started out, after breakfast, feeling worried and shaky, and wondering where it was going to fall on me, and what it was going to be. There is ways to keep off some kinds of bad luck, but this wasn\'t one of them kind;';
		const texts = [text1, text2, text3, text4, text5];
		let index = Math.floor(Math.random() * 5);
		this.setState({ text: texts[index] });
	}

	handleTyping(event) {
		let { i } = this.state;
		if (this.state.text[i] === event.key && this.state.gameStarted) {
			i++;
			this.setState({ i })
		}
	}

	renderText() {
		let { text, i } = this.state;
		let highlighted = text.slice(0, i);
		return (
			<div>
				<p><span className="highlighted">{highlighted}</span>{text.slice(i)}</p>
			</div>
		)
	}

	startTimer() {
		const self = this;
		this.setState({ gameStarted: true })
		let { timeRemaining } = this.state;
		function decreaseTime() {
			timeRemaining--;
			self.setState({ timeRemaining });
			if (timeRemaining === 0) {
				clearInterval(decrease);
				self.endGame();
			}
		}
		let decrease = setInterval(decreaseTime, 1000);
	}

	render() {
		return (
			<div className="home-wrapper" tabIndex="0" onKeyDown={this.handleTyping}>
				<div className="main-container">
					<div className="stats">
						<div className="start-button" onClick={this.startTimer}>Start</div>
						<div className="timer">Time: {this.state.timeRemaining}</div>
					</div>
					<div className="text">{this.renderText()}</div>
				</div>
				<Leaders />
			</div>
		)
	}
}

export default connect(mapStateToProps)(Home);
