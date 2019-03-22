(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t,i){},116:function(e,t,i){},117:function(e,t,i){"use strict";i.r(t);var a=i(0),s=i.n(a),n=i(59),r=i.n(n),c=i(6),o=i(7),d=i(9),k=i(8),u=i(10),h=i(20),g=i(26),p=i(19),l=i(60),m=i.n(l),S=i(61),v=i.n(S),A=i(21);var I=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(d.a)(this,Object(k.a)(t).call(this))).state={hasUserMedia:!1},e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia)&&(t.mountedInstances.push(this),this.state.hasUserMedia||t.userMediaRequested||this.requestUserMedia())}},{key:"componentDidUpdate",value:function(e){JSON.stringify(e.audioConstraints)===JSON.stringify(this.props.audioConstraints)&&JSON.stringify(e.videoConstraints)===JSON.stringify(this.props.videoConstraints)||this.requestUserMedia()}},{key:"componentWillUnmount",value:function(){var e=t.mountedInstances.indexOf(this);t.mountedInstances.splice(e,1),t.userMediaRequested=!1,0===t.mountedInstances.length&&this.state.hasUserMedia&&(this.stream.getVideoTracks&&this.stream.getAudioTracks?(this.stream.getVideoTracks().map(function(e){return e.stop()}),this.stream.getAudioTracks().map(function(e){return e.stop()})):this.stream.stop(),window.URL.revokeObjectURL(this.state.src))}},{key:"getScreenshot",value:function(){if(!this.state.hasUserMedia)return null;var e=this.getCanvas();return e&&e.toDataURL(this.props.screenshotFormat,this.props.screenshotQuality)}},{key:"getCanvas",value:function(){if(!this.state.hasUserMedia||!this.video.videoHeight)return null;if(!this.ctx){var e=document.createElement("canvas"),t=this.video.videoWidth/this.video.videoHeight,i=this.props.minScreenshotWidth||this.video.clientWidth,a=i/t;this.props.minScreenshotHeight&&a<this.props.minScreenshotHeight&&(i=(a=this.props.minScreenshotHeight)*t),e.width=i*this.props.scale,e.height=a*this.props.scale,this.canvas=e,this.ctx=e.getContext("2d")}var s=this.ctx,n=this.canvas;return s.imageSmoothingEnabled=this.props.imageSmoothing,s.drawImage(this.video,0,0,n.width,n.height),n}},{key:"requestUserMedia",value:function(){var e=this;navigator.getUserMedia=navigator.mediaDevices.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;var i=function(i,a){var s={video:a||!0};e.props.audio&&(s.audio=i||!0),navigator.mediaDevices.getUserMedia(s).then(function(e){t.mountedInstances.forEach(function(t){return t.handleUserMedia(null,e)})}).catch(function(e){t.mountedInstances.forEach(function(t){return t.handleUserMedia(e)})})};if("mediaDevices"in navigator)i(this.props.audioConstraints,this.props.videoConstraints);else{var a=function(e){return{optional:[{sourceId:e}]}},s=function(e){var t=(e||{}).deviceId;return"string"===typeof t?t:Array.isArray(t)&&t.length>0?t[0]:"object"===typeof t&&t.ideal?t.ideal:null};MediaStreamTrack.getSources(function(t){var n=null,r=null;t.forEach(function(e){"audio"===e.kind?n=e.id:"video"===e.kind&&(r=e.id)});var c=s(e.props.audioConstraints);c&&(n=c);var o=s(e.props.videoConstraints);o&&(r=o),i(a(n),a(r))})}t.userMediaRequested=!0}},{key:"handleUserMedia",value:function(e,t){if(e)return this.setState({hasUserMedia:!1}),void this.props.onUserMediaError(e);this.stream=t;try{this.video.srcObject=t,this.setState({hasUserMedia:!0})}catch(i){this.setState({hasUserMedia:!0,src:window.URL.createObjectURL(t)})}this.props.onUserMedia()}},{key:"render",value:function(){var e=this;return s.a.createElement("video",{autoPlay:!0,width:this.props.width,height:this.props.height,src:this.state.src,muted:this.props.audio,className:this.props.className,playsInline:!0,style:this.props.style,ref:function(t){e.video=t}})}}]),t}(a.Component);I.defaultProps={audio:!0,className:"",height:480,imageSmoothing:!0,onUserMedia:function(){},onUserMediaError:function(){},screenshotFormat:"image/webp",width:640,screenshotQuality:.92,scale:1},I.mountedInstances=[],I.userMediaRequested=!1;var R=i(62),f=i.n(R),w=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(k.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("img",{ref:"image",src:this.props.src?this.props.src:f.a,alt:"",style:{visibility:"visible",display:"block",width:this.props.width,height:this.props.height}})}}]),t}(a.Component);w.defaultProps={width:400,height:400};var J,b=w,B=i(3),Z=i.n(B),H=[],O=[],D=5,X=500,E=1.5,q=256,y=192,M=q*y,N=new Z.a.matrix_t(q,y,Z.a.U8_t|Z.a.C1_t),L=new Z.a.matrix_t(32,1e3,Z.a.U8_t|Z.a.C1_t);Z.a.yape06.laplacian_threshold=30,Z.a.yape06.min_eigen_value_threshold=25,Z.a.fast_corners.set_threshold(20);for(var x=function(){return function(e,t,i,a){"undefined"===typeof e&&(e=0),"undefined"===typeof t&&(t=0),"undefined"===typeof i&&(i=0),"undefined"===typeof a&&(a=0),this.screen_idx=e,this.pattern_lev=t,this.pattern_idx=i,this.distance=a}}();--M>=0;)H[M]=new Z.a.keypoint_t(0,0,0,0,-1),O[M]=new x;function j(e,t){var i,a=0,s=t.width,n=t.height,r=t.getContext("2d").getImageData(0,0,s,n),c=new Z.a.matrix_t(s,n,Z.a.U8_t|Z.a.C1_t);return Z.a.imgproc.grayscale(r.data,s,n,c),Z.a.imgproc.resample(c,N,N.cols,N.rows),Z.a.imgproc.gaussian_blur(N,N,D),i=function(e,t,i){var a=Z.a.yape06.detect(e,t,17);a>i&&(Z.a.math.qsort(t,0,a-1,function(e,t){return t.score<e.score}),a=i);for(var s=0;s<a;++s)t[s].angle=z(e,t[s].x,t[s].y);return a}(N,H,X),Z.a.orb.describe(N,H,i,L),J&&L&&(a=function(e,t,i){var a=e.rows,s=(e.data,e.buffer.i32),n=0,r=0,c=0,o=0,d=0,k=0;for(r=0;r<a;++r){var u=256,h=256,g=-1,p=-1;for(c=0;c<1;++c){var l=t[c],m=l.rows,S=l.buffer.i32,v=0;for(o=0;o<m;++o){var A=0;for(d=0;d<8;++d)A+=C(s[n+d]^S[v+d]);A<u?(h=u,u=A,p=c,g=o):A<h&&(h=A),v+=8}}u<.8*h&&(i[k].screen_idx=r,i[k].pattern_lev=p,i[k].pattern_idx=g,k++),n+=8}return k}(L,J,O),function(e,t,i){e.clearRect(0,0,q,y);for(var a=0;a<i;++a){var s=t[a],n=H[s.screen_idx];e.fillRect(parseInt(n.x),parseInt(n.y),E,E)}}(e,O,a)),a}function z(e,t,i){var a=new Int32Array([15,15,15,15,14,14,14,13,13,12,11,10,9,8,6,3,0]),s=0,n=0,r=e.data,c=e.cols,o=0,d=0,k=i*c+t|0,u=0,h=0,g=0,p=0;for(o=-15;o<=15;++o)n+=o*r[k+o];for(d=1;d<=15;++d){for(u=0,o=-(h=a[d]);o<=h;++o)u+=(g=r[k+o+d*c])-(p=r[k+o-d*c]),n+=o*(g+p);s+=d*u}return Math.atan2(s,n)}function C(e){return 16843009*((e=(858993459&(e-=e>>1&1431655765))+(e>>2&858993459))+(e>>4)&252645135)>>24}var P=i(63),U=i.n(P),V=i(64),F=i.n(V),T=function(e){function t(e){var i;return Object(c.a)(this,t),(i=Object(d.a)(this,Object(k.a)(t).call(this,e))).state={visible:!1},i}return Object(u.a)(t,e),Object(o.a)(t,[{key:"openModal",value:function(){this.setState({visible:!0})}},{key:"closeModal",value:function(){this.setState({visible:!1})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement(A.a,{className:"helpButton",icon:"question",onClick:function(){return e.openModal()},style:{visibility:"visible"}}),s.a.createElement(U.a,{visible:!!this.state.visible&&this.state.visible,onClickAway:function(){return e.closeModal()}},s.a.createElement("div",{className:"Helper",style:{visibility:!!this.state.visible&&this.state.visible}},s.a.createElement("img",{ref:"image",src:this.props.src?this.props.src:F.a,alt:"",style:{visibility:"visible",width:.5*this.props.width,height:.5*this.props.height}}),s.a.createElement(A.a,{className:"closeButton",icon:"window-close",onClick:function(){return e.closeModal()},style:{visibility:"visible"}}))))}}]),t}(a.Component),G=function(e){function t(e){var i;return Object(c.a)(this,t),(i=Object(d.a)(this,Object(k.a)(t).call(this,e))).setRef=function(e){i.webcam=e},i.onUserMedia=function(){console.log("[INFO] Camers is ready"),i.setState({cameraIsReady:!0})},i.addImage=function(){var e=i.state.images.slice();e.push(i.state.previousImageSrc),i.setState({images:e})},i.tick=function(){if(i.webcam.getCanvas()){var e=j(i.refs.cameraCanvas.getContext("2d"),i.webcam.getCanvas());i.checkCount(e)}requestAnimationFrame(i.tick)},i.checkCount=function(e){if(i.state.previousImageSrc){var t=e>100?"#76ee00":i.pickColor(e,100);i.refs.cameraCanvas.getContext("2d").fillStyle=t,i.setState({bordercolor:t})}},i.pickColor=function(e,t){var a=[153,0,0],s=[118,238,0],n=e/t,r=1-n,c=[Math.round(s[0]*n+a[0]*r),Math.round(s[1]*n+a[1]*r),Math.round(s[2]*n+a[2]*r)];return i.rgbToHex(c[0],c[1],c[2])},i.componentToHex=function(e){var t=e.toString(16);return 1===t.length?"0"+t:t},i.rgbToHex=function(e,t,a){return"#"+i.componentToHex(e)+i.componentToHex(t)+i.componentToHex(a)},i.capture=function(){var e=i.webcam.getScreenshot();i.setState({previousImageSrc:e,fileCount:i.state.fileCount+1},i.compare)},i.compare=function(){i.refs.imageCanvas.getContext("2d"),i.props.width,i.props.height,J=[],J=[JSON.parse(JSON.stringify(L))],i.addImage()},i.saveImages=function(){console.log("[INFO] Saving image");for(var e=new m.a,t=e.folder("images"),a=0;a<i.state.images.length;a++){var s="img_"+a+".jpg",n=i.state.images[a].split(";base64,").pop();t.file(s,n,{base64:!0})}e.generateAsync({type:"blob"}).then(function(e){v()(e,"images.zip")})},i.state={images:[],previousImageSrc:void 0,bordercolor:void 0,cameraIsReady:!1,fileCount:-1},i.tick=i.tick.bind(Object(p.a)(Object(p.a)(i))),i}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.setState({previousImageSrc:null}),requestAnimationFrame(this.tick)}},{key:"render",value:function(){var e={borderColor:this.state.bordercolor?this.state.bordercolor:"#fff",width:this.props.width,height:this.props.height};return s.a.createElement("div",{className:"App-main"},s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"wrapper",style:e},s.a.createElement("canvas",{ref:"cameraCanvas",width:this.props.width,height:this.props.height}),s.a.createElement(I,{id:"webcam",audio:!1,ref:this.setRef,width:this.props.width,height:this.props.height,scale:this.props.scale,screenshotFormat:"image/jpeg",videoConstraints:{facingMode:"environment",screenshotQuality:1},onUserMedia:this.onUserMedia,style:{visibility:"visible"}}),s.a.createElement("button",{className:"btn",onClick:this.capture,style:{visibility:this.state.cameraIsReady?"visible":"hidden"}}),s.a.createElement(A.a,{className:"saveButton",icon:"save",onClick:this.saveImages,style:{visibility:this.state.previousImageSrc?"visible":"hidden"}}),s.a.createElement(T,{width:this.props.width,height:this.props.height}))),s.a.createElement("div",{className:"container",style:{marginLeft:"2%"}},s.a.createElement("div",{className:"wrapper"},s.a.createElement("canvas",{ref:"imageCanvas",width:this.props.width,height:this.props.height}),s.a.createElement(b,{ref:"previous",name:"Previous Image",src:this.state.previousImageSrc,width:this.props.width,height:this.props.height}))))}}]),t}(a.Component);G.defaultProps={scale:6};var Q=G;i(115);h.b.add(g.b,g.a,g.c);var W=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(k.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return console.log("[INFO] Camera dimensions",256,"X",192),s.a.createElement("div",{className:"App"},s.a.createElement("div",{className:"App-header"},s.a.createElement(Q,{width:256,height:192})))}}]),t}(a.Component);i(116);r.a.render(s.a.createElement(W,null),document.getElementById("root"))},62:function(e,t){e.exports="data:image/png;base64,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"},64:function(e,t,i){e.exports=i.p+"static/media/help.34de6ba3.png"},65:function(e,t,i){e.exports=i(117)},75:function(e,t){},77:function(e,t){}},[[65,1,2]]]);
//# sourceMappingURL=main.d9e693fe.chunk.js.map