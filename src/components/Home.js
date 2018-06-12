import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
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
		var username, email;
		if (this.props.auth && this.props.auth.success) {
			username = this.props.auth.user.username;
			email = this.props.auth.user.email;
		} else {
			username = 'Anonymous';
			email = null;
		}
		alert('Congratulations! You typed ' + words.length + ' words!');
		axios.post('/api/postScore', {
			username,
			email,
			score: words.length
		}).then((response) => {
			this.setState({ i: 0, timeRemaining: 60, gameStarted: false }, () => {this.getText()})
		})
	}

	getText() {
		const text1 = 'Before beginning I should explain that though it was my first case I was no longer in the first bloom of youth.  I was along in the thirties before I got my start and had lost a deal of hair from my cranium. This enabled me to pass for ten years older if I wished to, and still with the assistance of my friend Oscar Nilson the wig-maker I could make a presentable figure of youth and innocence. During my earlier days I had been a clerk in a railway freight office, a poor slave with only my dreams to keep me going. My father had no sympathy with my aspirations to be a detective.  He was a close-mouthed and a close-fisted man.';
		const text2 = 'Toward the end of the year 1920 the Government of the United States had practically completed the programme, adopted during the last months of President Winthrop\'s administration. The country was apparently tranquil. Everybody knows how the Tariff and Labour questions were settled. The war with Germany, incident on that country\'s seizure of the Samoan Islands, had left no visible scars upon the republic, and the temporary occupation of Norfolk by the invading army had been forgotten in the joy over repeated naval victories, and the subsequent ridiculous plight of General Von Gartenlaube\'s forces in the State of New Jersey.';
		const text3 = 'I was travelling towards London out of the North, intending to stop by the way, to look at the house. My health required a temporary residence in the country; and a friend of mine who knew that, and who had happened to drive past the house, had written to me to suggest it as a likely place. I had got into the train at midnight, and had fallen asleep, and had woke up and had sat looking out of window at the brilliant Northern Lights in the sky, and had fallen asleep again, and had woke up again to find the night gone, with the usual discontented conviction on me that I hadn\'t been to sleep at all;';
		const text4 = 'Now the way that the book winds up is this: Tom and me found the money that the robbers hid in the cave, and it made us rich. We got six thousand dollars apiece --all gold. It was an awful sight of money when it was piled up. Well, Judge Thatcher he took it and put it out at interest, and it fetched us a dollar a day apiece all the year round-- more than a body could tell what to do with. The Widow Douglas she took me for her son, and allowed she would sivilize me; but it was rough living in the house all the time, considering how dismal regular and decent the widow was in all her ways; and so when I couldn\'t stand it no longer I lit out.';
		const text5 = 'One morning I happened to turn over the salt-cellar at breakfast. I reached for some of it as quick as I could to throw over my left shoulder and keep off the bad luck, but Miss Watson was in ahead of me, and crossed me off. She says, "Take your hands away, Huckleberry; what a mess you are always making!" The widow put in a good word for me, but that warn\'t going to keep off the bad luck, I knowed that well enough. I started out, after breakfast, feeling worried and shaky, and wondering where it was going to fall on me, and what it was going to be. There is ways to keep off some kinds of bad luck, but this wasn\'t one of them kind;';
		const text6 = 'The work done was embodied in the clock and case which now filled, fitting to a nicety, the niche in the back wall. Outwardly there was nothing very unusual about the clock itself. A gilt box enclosing the mechanism and carrying the plain white face, the hands at twelve, occupied the topmost third of the case, which was of thick plate-glass bound and backed with gilt metal. There was no apparent means of opening the case. From what one could see, however, the workmanship was perfect, exquisite. The compensating pendulum alone was ornamented --with a conventional sun in diamonds, and one could imagine the effect when it swung in brilliant light.';
		const text7 = 'Among the shrubbery of the Gardens, a glimmer of orange and blue betrayed the lurking presence of the Guards. Down the endless vistas of the double and quadruple rows of trees stretching out to the Arc, and up the Cour la Reine, long lines of scarlet were moving toward the central point, the Place de la Concorde. The horses of a squadron of hussars pawed and champed across the avenue, the men, in their pale blue jackets, presenting a cool relief to the universal glare. The Champs Elysees was deserted, excepting by troops. Not a civilian was to be seen on the bridge.';
		const text8 = 'Day was breaking. He opened the window and looked into the white street. Lamps burned down there with a sickly yellow; a faint light showed behind the barred windows of the old gray barracks. One or two stiff sparrows hopped silently about the gutters, flying up hurriedly when the frost-covered sentinel stamped his boots before the barracks gate. Now and then a half-starved workman limped past, his sabots echoing on the frozen pavement. A hooded and caped policeman, a red-faced cabman stamping beside his sleepy horse -- the street was empty but for them.';
		const text9 = 'Wet weather was the worst; the cold, damp, clammy wet, that wrapped him up like a moist great-coat --the only kind of great-coat Toby owned, or could have added to his comfort by dispensing with. Wet days, when the rain came slowly, thickly, obstinately down; when the street\'s throat, like his own, was choked with mist; when smoking umbrellas passed and re-passed, spinning round and round like so many teetotums, as they knocked against each other on the crowded footway, throwing off a little whirlpool of uncomfortable sprinklings; when gutters brawled and waterspouts were full and noisy;';
		const text10 = 'Well, pretty soon the old man was up and around again, and then he went for Judge Thatcher in the courts to make him give up that money, and he went for me, too, for not stopping school.  He catched me a couple of times and thrashed me, but I went to school just the same, and dodged him or outrun him most of the time.  I didn\'t want to go to school much before, but I reckoned I\'d go now to spite pap.  That law trial was a slow business --appeared like they warn\'t ever going to get started on it; so every now and then I\'d borrow two or three dollars off of the judge for him, to keep from getting a cowhiding.';
		const text11 = 'As soon as the great black velvet pall outside my little window was shot with gray, I got up and went downstairs; every board upon the way, and every crack in every board calling after me, “Stop thief!” and “Get up, Mrs. Joe!” In the pantry, which was far more abundantly supplied than usual, owing to the season, I was very much alarmed by a hare hanging up by the heels, whom I rather thought I caught, when my back was half turned, winking. I had no time for verification, no time for selection, no time for anything, for I had no time to spare. I stole some bread, some rind of cheese, about half a jar of mincemeat (which I tied up in my pocket-handkerchief with my last night\'s slice)';
		const text12 = 'My raft was now strong enough to bear any reasonable weight.  My next care was what to load it with, and how to preserve what I laid upon it from the surf of the sea; but I was not long considering this.  I first laid all the planks or boards upon it that I could get, and having considered well what I most wanted, I got three of the seamen’s chests, which I had broken open, and emptied, and lowered them down upon my raft; the first of these I filled with provisions—viz. bread, rice, three Dutch cheeses, five pieces of dried goat’s flesh (which we lived much upon), and a little remainder of European corn,';

		const texts = [text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, text11, text12];
		let index = Math.floor(Math.random() * texts.length);
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
						<div className={this.state.gameStarted ? "hide start-button" : "start-button"} onClick={this.startTimer}>Start</div>
						<div className="timer">Time: <span style={this.state.timeRemaining < 11 ? {color: "#dc3545"} : null}>{this.state.timeRemaining}</span></div>
					</div>
					<div className="text">{this.renderText()}</div>
				</div>
				<section className="directions">
					{this.props.auth && !this.props.auth.user ? <p>Don't forget to log in so that your scores get saved!</p> : null }
					<p>Directions: Click the start button and type as much as you can from the paragraph above until the timer runs out.</p>
				</section>
				<Leaders gameStarted={this.state.gameStarted}/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Home);
