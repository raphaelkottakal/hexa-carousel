import React, { Component } from 'react';
import { TweenLite } from 'gsap';

class HexaCarousel extends Component {
	constructor() {
		super();
		this.state = {
			doneAnimating: true,
			rotationY: 0,
			index: 0
		}
	}
	componentDidMount() {
		console.log(this.props.data);
	}
	toRadians (angle) {
	  return angle * (Math.PI / 180);
	}
	handelClick() {
		if (this.state.doneAnimating) {
			const n = this.props.data.length;
			const angelIncrement = 360 / n;
			console.log('current index', Math.abs(this.state.rotationY / angelIncrement));
			this.setState({
				doneAnimating: false,
				index: this.state.index + 1
			});
			TweenLite.to(this.refs.carousel, 0.5, { rotationY: '-=' + angelIncrement, onComplete: ()=>{
				this.setState({
					doneAnimating: true,
					rotationY: this.state.rotationY - angelIncrement
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
					height: 360,
					zIndex: (i <= n / 2) ? topZIndex-- : topZIndex++,
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
				css.wrapper = {
					position: 'absolute',
					maxWidth: 250,
					height: 360,
					zIndex: (i <= n / 2) ? topZIndex-- : topZIndex++,
					transform: 'rotateY('+ i * angelIncrement +'deg) translateZ('+translateZ+'px)',
					opacity: 0.5,
					filter: 'grayscale(100%)',
					transition: 'all 1s'
				}
			}
			return (
				<div style={css.wrapper} key={i}>
					<img style={css.image} src={item.imageUrl} alt={item.title} />
				</div>
			);
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
				perspective: translateZ * 13,
				maxWidth: 250,
				height: 360,
				margin: '10% auto',
			},
			carousel: {
			    position: 'absolute',
				width: '100%',
				height: 360,
				transformStyle: 'preserve-3d',
				// transform: 'rotateY(60deg)'
			}
		}
		return (
			<div onClick={this.handelClick.bind(this)} style={css.wrapper}>
				<div style={css.container}>
					<div ref="carousel" style={css.carousel}>
						{this.renderItems()}
					</div>
				</div>
			</div>
		);
	}
}

export default HexaCarousel;