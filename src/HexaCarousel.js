import React, { Component } from 'react';
import { TweenLite } from 'gsap';
import Swipeable from 'react-swipeable';
import { assignIn } from 'lodash';

class HexaCarousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doneAnimating: true,
			index: 0,
			height: 400
		}
		this.n = props.data.length;
		this.angelIncrement = 360 / this.n;
	}
	componentDidMount() {
		this.setState({doneAnimating: false});
		TweenLite.set(this.refs.carousel, { transform: "scale3d(0.1,0.1,0.1) rotate3d(1, 0, 0, 90deg)" });
		window.onload = ()=>{
			TweenLite.to(this.refs.carousel, 3, { transform: "scale3d(1,1,1) rotate3d(1, 0, 0, 0deg)", onComplete: ()=>{
				this.setState({doneAnimating: true});
			} });
		}
	}
	toRadians (angle) {
	  return angle * (Math.PI / 180);
	}
	moveToNext() {
		if (this.state.doneAnimating) {
			this.setState({
				doneAnimating: false,
				index: (this.state.index === this.n - 1) ? 0 : this.state.index + 1
			});
			TweenLite.to(this.refs.carousel, 0.5, { rotationY: '-=' + this.angelIncrement, onComplete: ()=>{
				this.setState({
					doneAnimating: true
				});
			} });
		}
	}
	moveToPrev() {
		if (this.state.doneAnimating) {
			this.setState({
				doneAnimating: false,
				index: (this.state.index === 0) ? this.n - 1 : this.state.index - 1
			});
			TweenLite.to(this.refs.carousel, 0.5, { rotationY: '+=' + this.angelIncrement, onComplete: ()=>{
				this.setState({
					doneAnimating: true
				});
			} });
		}
	}
	renderItems() {

		const n = this.props.data.length;
		const angelIncrement = 360 / n;
		const translateZ = 125 * Math.tan( this.toRadians( 90 * ( n - 2)/ n )  ) + n*2;
		let topZIndex = 999;

		const items = this.props.data.map((item,i) => {
			const css = {
				wrapper: {
					position: 'absolute',
					maxWidth: 250,
					height: this.state.height,
					zIndex: (i <= n / 2) ? topZIndex-- : topZIndex++,
					WebkitTransform: 'rotateY('+ i * angelIncrement +'deg) translateZ('+translateZ+'px)',
					msTransform: 'rotateY('+ i * angelIncrement +'deg) translateZ('+translateZ+'px)',
					transform: 'rotateY('+ i * angelIncrement +'deg) translateZ('+translateZ+'px)',
					transition: 'all 1s'
				},
				image: {
					display: 'block',
					width: '100%',
					height: 'auto',
				}
			}
			if (this.state.index !== i) {
				assignIn(css.wrapper,{
					opacity: 0.5,
					filter: 'grayscale(100%)',
				});
			}

			if (item.multiImage) {
				return (
					<div style={css.wrapper} key={i}>
						<div>
							<a href={item.url1} target="_blank">
								<img style={{width:'50%',height:'auto',display:'block',float: 'left'}} src={item.image1} alt={item.title} />
							</a>
							<a href={item.url2} target="_blank">
								<img style={{width:'50%',height:'auto',display:'block',float: 'left'}} src={item.image2} alt={item.title} />
							</a>
						</div>
						<a href={item.url3} target="_blank">
							<img style={css.image} src={item.image3} alt={item.title} />
						</a>
					</div>
				);
			} else {
				return (
					<div style={css.wrapper} key={i}>
						<a href={item.url} target="_blank">
							<img style={css.image} src={item.imageUrl} alt={item.title} />
						</a>
					</div>
				);
			}
		});

		return items;
	}
	render() {
		const n = this.props.data.length;
		const translateZ = 125 * Math.tan( this.toRadians( 90 * ( n - 2)/ n )  ) + n*2;
		const css = {
			wrapper: {
				position: 'relative',
				overflow: 'hidden'
			},
			container: {
				position: 'relative',
				WebkitPerspective: translateZ * 13,
				msPerspective: translateZ * 13,
				perspective: translateZ * 13,
				maxWidth: 250,
				height: this.state.height,
				margin: '10% auto',
			},
			carousel: {
			    position: 'absolute',
				width: '100%',
				height: this.state.height,
				WebkitTransformStyle: 'preserve-3d',
				msTransformStyle: 'preserve-3d',
				transformStyle: 'preserve-3d'
			}
		}
		return (
			<Swipeable
				onSwipingLeft={this.moveToNext.bind(this)}
				onSwipingRight={this.moveToPrev.bind(this)}
			>
				<div style={css.wrapper}>
					<div style={css.container}>
						<div ref="carousel" style={css.carousel}>
							{this.renderItems()}
						</div>
					</div>
				</div>
			</Swipeable>
		);
	}
}

export default HexaCarousel;