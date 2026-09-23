var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},u=(n,r,o)=>(o=n==null?{}:e(i(n)),l(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n)),d=e=>a.call(e,`module.exports`)?e[`module.exports`]:l(t({},`__esModule`,{value:!0}),e);function f(e){throw Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}var p,m,h,g,_=o((()=>{p=1e-7,m=1e-4,h=class{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}},g=class{refCount(e){return f(`refCount`)}incRef(e){return f(`incRef`)}timerAvailable(){return!0}time(e){return f(`time`)}read(e){return f(`read`)}readSync(e){return f(`readSync`)}readToGPU(e,t){return f(`readToGPU`)}numDataIds(){return f(`numDataIds`)}disposeData(e,t){return f(`disposeData`)}write(e,t,n){return f(`write`)}move(e,t,n,r,i){return f(`move`)}createTensorFromGPUData(e,t,n){return f(`createTensorFromGPUData`)}memory(){return f(`memory`)}floatPrecision(){return f(`floatPrecision`)}epsilon(){return this.floatPrecision()===32?p:m}dispose(){return f(`dispose`)}}}));function v(e){let t=e.length,n=0;for(;t>0;)n=Math.random()*t|0,t--,S(e,t,n)}function y(e,t){if(e.length!==t.length)throw Error(`Array sizes must match to be shuffled together First array length was ${e.length}Second array length was ${t.length}`);let n=e.length,r=0;for(;n>0;)r=Math.random()*n|0,n--,S(e,n,r),S(t,n,r)}function b(e,t,n){return Math.max(e,Math.min(t,n))}function x(e){return e%2==0?e:e+1}function S(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function C(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n];return t}function w(e,t){let n=Math.random();return t*n+(1-n)*e}function T(e,t){let n=0;for(let r=0;r<e.length;r++){let i=Number(e[r])-Number(t[r]);n+=i*i}return n}function E(e,t){if(!e)throw Error(typeof t==`string`?t:t())}function D(e,t,n=``){E(A(e,t),()=>n+` Shapes ${e} and ${t} must match`)}function O(e){E(e!=null,()=>`The input to the tensor constructor must be a non-null value.`)}function k(e){if(e.length===0)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function ee(e){return e.length===0}function te(e,t){if(e===t)return!0;if(e==null||t==null||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==null&&t[n]!==null&&e[n]!==t[n])return!1;return!0}function A(e,t){if(e===t)return!0;if(e==null||t==null||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function ne(e){return e%1==0}function re(e){if(Math.tanh!=null)return Math.tanh(e);if(e===1/0)return 1;if(e===-1/0)return-1;{let t=Math.exp(2*e);return(t-1)/(t+1)}}function ie(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}function ae(e){let t=new Uint32Array(e);for(let n=0;n<e;++n)t[n]=n;return v(t),t}function oe(e,t){return t<=e.length?e:e+` `.repeat(t-e.length)}function se(e,t=e=>0,n,r){return new Promise((i,a)=>{let o=0,s=()=>{if(e()){i();return}o++;let c=t(o);if(n!=null&&o>=n){a();return}r==null?setTimeout(s,c):r(s,c)};s()})}function ce(e,t){let n=1,r=-1;for(let t=0;t<e.length;++t)if(e[t]>=0)n*=e[t];else if(e[t]===-1){if(r!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${t}`);r=t}else if(e[t]<0)throw Error(`Shapes can not be < 0. Found ${e[t]} at dim ${t}`);if(r===-1){if(t>0&&t!==n)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(n===0)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%n!==0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${n}`);let i=e.slice();return i[r]=t/n,i}function j(e,t){let n=t.length;return e=e==null?t.map((e,t)=>t):[].concat(e),E(e.every(e=>e>=-n&&e<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${e}`),E(e.every(e=>ne(e)),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?n+e:e)}function le(e,t){let n=[],r=[],i=t!=null&&Array.isArray(t)&&t.length===0,a=t==null||i?null:j(t,e).sort(),o=0;for(let t=0;t<e.length;++t){if(a!=null){if(a[o]===t&&e[t]!==1)throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(a[o]==null||a[o]>t)&&e[t]===1&&(n.push(e[t]),r.push(t)),a[o]<=t&&o++}e[t]!==1&&(n.push(e[t]),r.push(t))}return{newShape:n,keptDims:r}}function M(e,t){return ue(e,t)}function ue(e,t){let n=null;if(e==null||e===`float32`)n=new Float32Array(t);else if(e===`int32`)n=new Int32Array(t);else if(e===`bool`)n=new Uint8Array(t);else if(e===`string`)n=Array(t);else throw Error(`Unknown data type ${e}`);return n}function de(e,t){for(let n=0;n<e.length;n++){let r=e[n];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${t} being uploaded contains ${r}.`)}}function fe(e){return e===`bool`||e===`complex64`||e===`float32`||e===`int32`||e===`string`}function pe(e,t){return!(t===`complex64`||t===`float32`&&e!==`complex64`||t===`int32`&&e!==`float32`&&e!==`complex64`||t===`bool`&&e===`bool`)}function me(e){if(e===`float32`||e===`int32`)return 4;if(e===`complex64`)return 8;if(e===`bool`)return 1;throw Error(`Unknown dtype ${e}`)}function he(e){if(e==null)return 0;let t=0;return e.forEach(e=>t+=e.length),t}function ge(e){return typeof e==`string`||e instanceof String}function _e(e){return typeof e==`boolean`}function ve(e){return typeof e==`number`}function ye(e){return Array.isArray(e)?ye(e[0]):e instanceof Float32Array?`float32`:e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray?`int32`:ve(e)?`float32`:ge(e)?`string`:_e(e)?`bool`:`float32`}function be(e){return!!(e&&e.constructor&&e.call&&e.apply)}function xe(e,t){for(let n=t;n<e;++n)if(e%n===0)return n;return e}function N(e){let t=e.length;if(t<2)return[];let n=Array(t-1);n[t-2]=e[t-1];for(let r=t-3;r>=0;--r)n[r]=n[r+1]*e[r+1];return n}function Se(e,t,n,r=!1){let i=[];if(t.length===1){let a=t[0]*(r?2:1);for(let t=0;t<a;t++)i[t]=n[e+t]}else{let a=t[0],o=t.slice(1),s=o.reduce((e,t)=>e*t)*(r?2:1);for(let t=0;t<a;t++)i[t]=Se(e+t*s,o,n,r)}return i}function Ce(e,t,n=!1){if(e.length===0)return t[0];let r=e.reduce((e,t)=>e*t)*(n?2:1);if(r===0)return[];if(r!==t.length)throw Error(`[${e}] does not match the input size ${t.length}${n?` for a complex tensor`:``}.`);return Se(0,e,t,n)}function we(e,t){if(Array.isArray(e))return e;if(t===`float32`)return e instanceof Float32Array?e:new Float32Array(e);if(t===`int32`)return e instanceof Int32Array?e:new Int32Array(e);if(t===`bool`||t===`string`)return Uint8Array.from(new Int32Array(e));throw Error(`Unknown dtype ${t}`)}function Te(e,t){let n=Ee(e,t);for(let e=0;e<n.length;e++)n[e]=1;return n}function Ee(e,t){if(t==null||t===`float32`||t===`complex64`)return new Float32Array(e);if(t===`int32`)return new Int32Array(e);if(t===`bool`)return new Uint8Array(e);throw Error(`Unknown data type ${t}`)}function De(e,t){let n=e.reduce((e,t)=>e*t,1);if(t==null||t===`float32`)return Ce(e,new Float32Array(n));if(t===`int32`)return Ce(e,new Int32Array(n));if(t===`bool`)return Ce(e,new Uint8Array(n));throw Error(`Unknown data type ${t}`)}function Oe(e){e.forEach(t=>{E(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function ke(e,t,n){if(t===0)return 0;if(t===1)return e[0];let r=e[e.length-1];for(let t=0;t<e.length-1;++t)r+=n[t]*e[t];return r}function Ae(e,t,n){if(t===0)return[];if(t===1)return[e];let r=Array(t);for(let t=0;t<r.length-1;++t)r[t]=Math.floor(e/n[t]),e-=r[t]*n[t];return r[r.length-1]=e,r}function je(e){return e&&e.then&&typeof e.then==`function`}var Me=o((()=>{}));function Ne(e){let t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...n)=>(Pe(t,n[0],n[1]),n.join(`=`))),t}function Pe(e,t,n){e[decodeURIComponent(t)]=decodeURIComponent(n||``)}function Fe(e,t){let n=t.toLowerCase();return n===`true`||n===`false`?n===`true`:`${+n}`===n?+n:t}function P(){return ze}function Ie(e){ze=e}var Le,Re,ze,Be=o((()=>{Me(),Le=`tfjsflags`,Re=class{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=Ne,this.populateURLFlags()}setPlatform(e,t){this.platform!=null&&(P().getBool(`IS_TEST`)||P().getBool(`PROD`)||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`)),this.platformName=e,this.platform=t}registerFlag(e,t,n){if(this.flagRegistry[e]={evaluationFn:t,setHook:n},this.urlFlags[e]!=null){let t=this.urlFlags[e];P().getBool(`IS_TEST`)||P().getBool(`PROD`)||console.warn(`Setting feature override from URL ${e}: ${t}.`),this.set(e,t)}}async getAsync(e){return e in this.flags||(this.flags[e]=await this.evaluateFlag(e)),this.flags[e]}get(e){if(e in this.flags)return this.flags[e];let t=this.evaluateFlag(e);if(je(t))throw Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(this.flagRegistry[e]==null)throw Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,this.flagRegistry[e].setHook!=null&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(this.flagRegistry[e]==null)throw Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(this.global===void 0||this.global.location===void 0||this.global.location.search===void 0)return;let e=this.getQueryParams(this.global.location.search);Le in e&&e[Le].split(`,`).forEach(e=>{let[t,n]=e.split(`:`);this.urlFlags[t]=Fe(t,n)})}},ze=null}));function Ve(){if(We==null){let e;if(typeof window<`u`)e=window;else if(typeof global<`u`)e=global;else if(typeof process<`u`)e=process;else if(typeof self<`u`)e=self;else throw Error(`Could not find a global object`);We=e}return We}function He(){let e=Ve();return e._tfGlobals??=new Map,e._tfGlobals}function Ue(e,t){let n=He();if(n.has(e))return n.get(e);{let r=t();return n.set(e,r),n.get(e)}}var We,Ge=o((()=>{})),Ke,qe,Je,Ye,F,Xe,Ze,Qe,$e,et,tt,nt,rt,it,at,ot,st,ct,lt,ut,dt,ft,pt,mt,ht,gt,_t,vt,yt,bt,xt,St,Ct,wt,Tt,Et,Dt,Ot,kt,At,jt,Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt,Xt,Zt,Qt,$t,en,tn,nn,rn,an,on,sn,cn,ln,un,dn,fn,pn,mn,hn,gn,_n,vn,yn,bn,xn,Sn,Cn,wn,Tn,En,Dn,On,kn,An,jn,Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn,Vn,Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr,ir,ar,or,sr,cr,lr,ur,dr,fr,pr,mr,hr,gr,_r,vr,yr,br,xr,Sr,Cr,wr,Tr,Er,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,I=o((()=>{Ke=`Acos`,qe=`Acosh`,Je=`AddN`,Ye=`ArgMax`,F=`ArgMin`,Xe=`Asin`,Ze=`Asinh`,Qe=`Atan`,$e=`Atanh`,et=`Atan2`,tt=`AvgPool`,nt=`AvgPoolGrad`,rt=`AvgPool3D`,it=`AvgPool3DGrad`,at=`BatchMatMul`,ot=`BatchToSpaceND`,st=`Bincount`,ct=`BitwiseAnd`,lt=`BroadcastTo`,ut=`BroadcastArgs`,dt=`Cast`,ft=`Ceil`,pt=`ClipByValue`,mt=`Complex`,ht=`ComplexAbs`,gt=`Concat`,_t=`Conv2D`,vt=`Conv2DBackpropFilter`,yt=`Conv2DBackpropInput`,bt=`Conv3D`,xt=`Conv3DBackpropFilterV2`,St=`Conv3DBackpropInputV2`,Ct=`Cosh`,wt=`Cumprod`,Tt=`Cumsum`,Et=`CropAndResize`,Dt=`DenseBincount`,Ot=`DepthToSpace`,kt=`DepthwiseConv2dNative`,At=`DepthwiseConv2dNativeBackpropFilter`,jt=`DepthwiseConv2dNativeBackpropInput`,Mt=`Diag`,Nt=`Dilation2D`,Pt=`Dilation2DBackpropInput`,Ft=`Dilation2DBackpropFilter`,It=`Draw`,Lt=`RealDiv`,Rt=`Einsum`,zt=`EluGrad`,Bt=`Equal`,Vt=`ExpandDims`,Ht=`Expm1`,Ut=`Fill`,Wt=`FlipLeftRight`,Gt=`Floor`,Kt=`FloorDiv`,qt=`FusedBatchNorm`,Jt=`GatherV2`,Yt=`GatherNd`,Xt=`Greater`,Zt=`GreaterEqual`,Qt=`Identity`,$t=`IFFT`,en=`Imag`,tn=`IsFinite`,nn=`IsInf`,rn=`IsNan`,an=`LeakyRelu`,on=`Less`,sn=`LessEqual`,cn=`LinSpace`,ln=`Log1p`,un=`LogicalAnd`,dn=`LogicalNot`,fn=`LogicalOr`,pn=`LogicalXor`,mn=`LogSoftmax`,hn=`LowerBound`,gn=`LRNGrad`,_n=`MatrixBandPart`,vn=`Maximum`,yn=`MaxPool`,bn=`MaxPoolGrad`,xn=`MaxPool3D`,Sn=`MaxPool3DGrad`,Cn=`MaxPoolWithArgmax`,wn=`Mean`,Tn=`Minimum`,En=`MirrorPad`,Dn=`Multinomial`,On=`Multiply`,kn=`NotEqual`,An=`NonMaxSuppressionV3`,jn=`NonMaxSuppressionV4`,Mn=`NonMaxSuppressionV5`,Nn=`OnesLike`,Pn=`OneHot`,Fn=`Pack`,In=`PadV2`,Ln=`Pool`,Rn=`Prelu`,zn=`Prod`,Bn=`RaggedGather`,Vn=`RaggedRange`,Hn=`RaggedTensorToTensor`,Un=`Range`,Wn=`Real`,Gn=`Reciprocal`,Kn=`Relu`,qn=`Reshape`,Jn=`ResizeNearestNeighbor`,Yn=`ResizeNearestNeighborGrad`,Xn=`ResizeBilinear`,Zn=`ResizeBilinearGrad`,Qn=`Relu6`,$n=`Reverse`,er=`Round`,tr=`Rsqrt`,nr=`ScatterNd`,rr=`TensorScatterUpdate`,ir=`SearchSorted`,ar=`Select`,or=`Selu`,sr=`Slice`,cr=`Sinh`,lr=`Sign`,ur=`Sigmoid`,dr=`Softplus`,fr=`Sqrt`,pr=`SpaceToBatchND`,mr=`SplitV`,hr=`Softmax`,gr=`SparseFillEmptyRows`,_r=`SparseReshape`,vr=`SparseSegmentMean`,yr=`SparseSegmentSum`,br=`SparseToDense`,xr=`SquaredDifference`,Sr=`Square`,Cr=`StaticRegexReplace`,wr=`StridedSlice`,Tr=`StringNGrams`,Er=`StringSplit`,Dr=`StringToHashBucketFast`,Or=`Tanh`,kr=`Tile`,Ar=`TopK`,jr=`Transform`,Mr=`Transpose`,Nr=`Unique`,Pr=`Unpack`,Fr=`UnsortedSegmentSum`,Ir=`UpperBound`,Lr=`ZerosLike`,Rr=`Step`,zr=`FromPixels`,Br=`RotateWithOffset`,Vr=`_FusedMatMul`,Hr=`FusedConv2D`,Ur=`FusedDepthwiseConv2D`}));function Wr(...e){P().getBool(`IS_TEST`)||P().getBool(`PROD`)||console.warn(...e)}function Gr(...e){P().getBool(`IS_TEST`)||P().getBool(`PROD`)||console.log(...e)}var Kr=o((()=>{Be()}));function qr(e,t){let n=ti(e,t);return ni.get(n)}function Jr(e){return ri.get(e)}function Yr(e){let t=ni.entries(),n=[];for(;;){let{done:r,value:i}=t.next();if(r)break;let[a,o]=i,[s]=a.split(`_`);s===e&&n.push(o)}return n}function Xr(e){let{kernelName:t,backendName:n}=e,r=ti(t,n);ni.has(r)&&Wr(`The kernel '${t}' for backend '${n}' is already registered`),ni.set(r,e)}function Zr(e){let{kernelName:t}=e;ri.has(t)&&P().getBool(`DEBUG`)&&Wr(`Overriding the gradient for '${t}'`),ri.set(t,e)}function Qr(e,t){let n=ti(e,t);if(!ni.has(n))throw Error(`The kernel '${e}' for backend '${t}' is not registered`);ni.delete(n)}function $r(e){if(!ri.has(e))throw Error(`The gradient '${e}' for backend is not registered`);ri.delete(e)}function ei(e,t){Yr(e).forEach(e=>{Xr(Object.assign({},e,{backendName:t}))})}function ti(e,t){return`${t}_${e}`}var ni,ri,ii=o((()=>{Be(),Ge(),Kr(),ni=Ue(`kernelRegistry`,()=>new Map),ri=Ue(`gradRegistry`,()=>new Map)}));function ai(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}var oi=o((()=>{})),si=s(((e,t)=>{t.exports=r;var n=null;try{n=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function r(e,t,n){this.low=e|0,this.high=t|0,this.unsigned=!!n}r.prototype.__isLong__,Object.defineProperty(r.prototype,"__isLong__",{value:!0});function i(e){return(e&&e.__isLong__)===!0}r.isLong=i;var a={},o={};function s(e,t){var n,r,i;return t?(e>>>=0,(i=0<=e&&e<256)&&(r=o[e],r)?r:(n=l(e,(e|0)<0?-1:0,!0),i&&(o[e]=n),n)):(e|=0,(i=-128<=e&&e<128)&&(r=a[e],r)?r:(n=l(e,e<0?-1:0,!1),i&&(a[e]=n),n))}r.fromInt=s;function c(e,t){if(isNaN(e))return t?b:y;if(t){if(e<0)return b;if(e>=g)return T}else{if(e<=-_)return E;if(e+1>=_)return w}return e<0?c(-e,t).neg():l(e%h|0,e/h|0,t)}r.fromNumber=c;function l(e,t,n){return new r(e,t,n)}r.fromBits=l;var u=Math.pow;function d(e,t,n){if(e.length===0)throw Error(`empty string`);if(e===`NaN`||e===`Infinity`||e===`+Infinity`||e===`-Infinity`)return y;if(typeof t==`number`?(n=t,t=!1):t=!!t,n||=10,n<2||36<n)throw RangeError(`radix`);var r;if((r=e.indexOf(`-`))>0)throw Error(`interior hyphen`);if(r===0)return d(e.substring(1),t,n).neg();for(var i=c(u(n,8)),a=y,o=0;o<e.length;o+=8){var s=Math.min(8,e.length-o),l=parseInt(e.substring(o,o+s),n);if(s<8){var f=c(u(n,s));a=a.mul(f).add(c(l))}else a=a.mul(i),a=a.add(c(l))}return a.unsigned=t,a}r.fromString=d;function f(e,t){return typeof e==`number`?c(e,t):typeof e==`string`?d(e,t):l(e.low,e.high,typeof t==`boolean`?t:e.unsigned)}r.fromValue=f;var p=65536,m=1<<24,h=p*p,g=h*h,_=g/2,v=s(m),y=s(0);r.ZERO=y;var b=s(0,!0);r.UZERO=b;var x=s(1);r.ONE=x;var S=s(1,!0);r.UONE=S;var C=s(-1);r.NEG_ONE=C;var w=l(-1,2147483647,!1);r.MAX_VALUE=w;var T=l(-1,-1,!0);r.MAX_UNSIGNED_VALUE=T;var E=l(0,-2147483648,!1);r.MIN_VALUE=E;var D=r.prototype;D.toInt=function(){return this.unsigned?this.low>>>0:this.low},D.toNumber=function(){return this.unsigned?(this.high>>>0)*h+(this.low>>>0):this.high*h+(this.low>>>0)},D.toString=function(e){if(e||=10,e<2||36<e)throw RangeError(`radix`);if(this.isZero())return`0`;if(this.isNegative()){if(this.eq(E)){var t=c(e),n=this.div(t),r=n.mul(t).sub(this);return n.toString(e)+r.toInt().toString(e)}return`-`+this.neg().toString(e)}for(var i=c(u(e,6),this.unsigned),a=this,o=``;;){var s=a.div(i),l=(a.sub(s.mul(i)).toInt()>>>0).toString(e);if(a=s,a.isZero())return l+o;for(;l.length<6;)l=`0`+l;o=``+l+o}},D.getHighBits=function(){return this.high},D.getHighBitsUnsigned=function(){return this.high>>>0},D.getLowBits=function(){return this.low},D.getLowBitsUnsigned=function(){return this.low>>>0},D.getNumBitsAbs=function(){if(this.isNegative())return this.eq(E)?64:this.neg().getNumBitsAbs();for(var e=this.high==0?this.low:this.high,t=31;t>0&&!(e&1<<t);t--);return this.high==0?t+1:t+33},D.isZero=function(){return this.high===0&&this.low===0},D.eqz=D.isZero,D.isNegative=function(){return!this.unsigned&&this.high<0},D.isPositive=function(){return this.unsigned||this.high>=0},D.isOdd=function(){return(this.low&1)==1},D.isEven=function(){return!(this.low&1)},D.equals=function(e){return i(e)||(e=f(e)),this.unsigned!==e.unsigned&&this.high>>>31==1&&e.high>>>31==1?!1:this.high===e.high&&this.low===e.low},D.eq=D.equals,D.notEquals=function(e){return!this.eq(e)},D.neq=D.notEquals,D.ne=D.notEquals,D.lessThan=function(e){return this.comp(e)<0},D.lt=D.lessThan,D.lessThanOrEqual=function(e){return this.comp(e)<=0},D.lte=D.lessThanOrEqual,D.le=D.lessThanOrEqual,D.greaterThan=function(e){return this.comp(e)>0},D.gt=D.greaterThan,D.greaterThanOrEqual=function(e){return this.comp(e)>=0},D.gte=D.greaterThanOrEqual,D.ge=D.greaterThanOrEqual,D.compare=function(e){if(i(e)||(e=f(e)),this.eq(e))return 0;var t=this.isNegative(),n=e.isNegative();return t&&!n?-1:!t&&n?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},D.comp=D.compare,D.negate=function(){return!this.unsigned&&this.eq(E)?E:this.not().add(x)},D.neg=D.negate,D.add=function(e){i(e)||(e=f(e));var t=this.high>>>16,n=this.high&65535,r=this.low>>>16,a=this.low&65535,o=e.high>>>16,s=e.high&65535,c=e.low>>>16,u=e.low&65535,d=0,p=0,m=0,h=0;return h+=a+u,m+=h>>>16,h&=65535,m+=r+c,p+=m>>>16,m&=65535,p+=n+s,d+=p>>>16,p&=65535,d+=t+o,d&=65535,l(m<<16|h,d<<16|p,this.unsigned)},D.subtract=function(e){return i(e)||(e=f(e)),this.add(e.neg())},D.sub=D.subtract,D.multiply=function(e){if(this.isZero())return y;if(i(e)||(e=f(e)),n)return l(n.mul(this.low,this.high,e.low,e.high),n.get_high(),this.unsigned);if(e.isZero())return y;if(this.eq(E))return e.isOdd()?E:y;if(e.eq(E))return this.isOdd()?E:y;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(v)&&e.lt(v))return c(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,r=this.high&65535,a=this.low>>>16,o=this.low&65535,s=e.high>>>16,u=e.high&65535,d=e.low>>>16,p=e.low&65535,m=0,h=0,g=0,_=0;return _+=o*p,g+=_>>>16,_&=65535,g+=a*p,h+=g>>>16,g&=65535,g+=o*d,h+=g>>>16,g&=65535,h+=r*p,m+=h>>>16,h&=65535,h+=a*d,m+=h>>>16,h&=65535,h+=o*u,m+=h>>>16,h&=65535,m+=t*p+r*d+a*u+o*s,m&=65535,l(g<<16|_,m<<16|h,this.unsigned)},D.mul=D.multiply,D.divide=function(e){if(i(e)||(e=f(e)),e.isZero())throw Error(`division by zero`);if(n)return!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1?this:l((this.unsigned?n.div_u:n.div_s)(this.low,this.high,e.low,e.high),n.get_high(),this.unsigned);if(this.isZero())return this.unsigned?b:y;var t,r,a;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return b;if(e.gt(this.shru(1)))return S;a=b}else{if(this.eq(E))return e.eq(x)||e.eq(C)?E:e.eq(E)?x:(t=this.shr(1).div(e).shl(1),t.eq(y)?e.isNegative()?x:C:(r=this.sub(e.mul(t)),a=t.add(r.div(e)),a));if(e.eq(E))return this.unsigned?b:y;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();a=y}for(r=this;r.gte(e);){t=Math.max(1,Math.floor(r.toNumber()/e.toNumber()));for(var o=Math.ceil(Math.log(t)/Math.LN2),s=o<=48?1:u(2,o-48),d=c(t),p=d.mul(e);p.isNegative()||p.gt(r);)t-=s,d=c(t,this.unsigned),p=d.mul(e);d.isZero()&&(d=x),a=a.add(d),r=r.sub(p)}return a},D.div=D.divide,D.modulo=function(e){return i(e)||(e=f(e)),n?l((this.unsigned?n.rem_u:n.rem_s)(this.low,this.high,e.low,e.high),n.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},D.mod=D.modulo,D.rem=D.modulo,D.not=function(){return l(~this.low,~this.high,this.unsigned)},D.and=function(e){return i(e)||(e=f(e)),l(this.low&e.low,this.high&e.high,this.unsigned)},D.or=function(e){return i(e)||(e=f(e)),l(this.low|e.low,this.high|e.high,this.unsigned)},D.xor=function(e){return i(e)||(e=f(e)),l(this.low^e.low,this.high^e.high,this.unsigned)},D.shiftLeft=function(e){return i(e)&&(e=e.toInt()),(e&=63)==0?this:e<32?l(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):l(0,this.low<<e-32,this.unsigned)},D.shl=D.shiftLeft,D.shiftRight=function(e){return i(e)&&(e=e.toInt()),(e&=63)==0?this:e<32?l(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):l(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},D.shr=D.shiftRight,D.shiftRightUnsigned=function(e){if(i(e)&&(e=e.toInt()),e&=63,e===0)return this;var t=this.high;if(e<32){var n=this.low;return l(n>>>e|t<<32-e,t>>>e,this.unsigned)}return l(e===32?t:t>>>e-32,0,this.unsigned)},D.shru=D.shiftRightUnsigned,D.shr_u=D.shiftRightUnsigned,D.toSigned=function(){return this.unsigned?l(this.low,this.high,!1):this},D.toUnsigned=function(){return this.unsigned?this:l(this.low,this.high,!0)},D.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},D.toBytesLE=function(){var e=this.high,t=this.low;return[t&255,t>>>8&255,t>>>16&255,t>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]},D.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,t>>>24,t>>>16&255,t>>>8&255,t&255]},r.fromBytes=function(e,t,n){return n?r.fromBytesLE(e,t):r.fromBytesBE(e,t)},r.fromBytesLE=function(e,t){return new r(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},r.fromBytesBE=function(e,t){return new r(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)}}));function ci(e){return Si.fromString(e,!0,16)}function li(e){return e.xor(e.shru(47))}function ui(e,t,n){let r=e.slice(t,t+n);return Si.fromBytes(Array.from(r),!0,!0)}function di(e,t){return ui(e,t,8)}function fi(e,t){return ui(e,t,4)}function pi(e,t){return t===0?e:e.shru(t).or(e.shl(64-t))}function mi(e,t,n=ci(`9ddfea08eb382d69`)){let r=e.xor(t).mul(n);r=r.xor(r.shru(47));let i=t.xor(r).mul(n);return i=i.xor(i.shru(47)),i=i.mul(n),i}function hi(e,t,n,r,i,a){i=i.add(e),a=pi(a.add(i).add(r),21);let o=i;return i=i.add(t),i=i.add(n),a=a.add(pi(i,44)),[i.add(r),a.add(o)]}function gi(e,t,n,r){return hi(di(e,t),di(e,t+8),di(e,t+16),di(e,t+24),n,r)}function _i(e,t=e.length){if(t>=8){let n=Ti.add(t*2),r=di(e,0).add(Ti),i=di(e,t-8);return mi(pi(i,37).mul(n).add(r),pi(r,25).add(i).mul(n),n)}if(t>=4){let n=Ti.add(t*2);return mi(fi(e,0).shl(3).add(t),fi(e,t-4),n)}if(t>0){let n=e[0],r=e[t>>1],i=e[t-1],a=n+(r<<8),o=t+(i<<2);return li(Ti.mul(a).xor(Ci.mul(o))).mul(Ti)}return Ti}function vi(e,t=e.length){let n=Ti.add(t*2),r=di(e,0).mul(wi),i=di(e,8),a=di(e,t-8).mul(n),o=di(e,t-16).mul(Ti);return mi(pi(r.add(i),43).add(pi(a,30)).add(o),r.add(pi(i.add(Ti),18)).add(a),n)}function yi(e,t=e.length){let n=Ti.add(t*2),r=di(e,0).mul(Ti),i=di(e,8),a=di(e,t-8).mul(n),o=di(e,t-16).mul(Ti),s=pi(r.add(i),43).add(pi(a,30)).add(o),c=mi(s,r.add(pi(i.add(Ti),18)).add(a),n),l=di(e,16).mul(n),u=di(e,24),d=s.add(di(e,t-32)).mul(n),f=c.add(di(e,t-24)).mul(n);return mi(pi(l.add(u),43).add(pi(d,30)).add(f),l.add(pi(u.add(r),18)).add(d),n)}function bi(e,t=e.length){let n=Si.fromNumber(81,!0);if(t<=32)return t<=16?_i(e,t):vi(e,t);if(t<=64)return yi(e,t);let r=n,i=n.mul(wi).add(113),a=li(i.mul(Ti).add(113)).mul(Ti),o=[Si.UZERO,Si.UZERO],s=[Si.UZERO,Si.UZERO];r=r.mul(Ti).add(di(e,0));let c=0,l=(t-1>>6)*64,u=l+(t-1&63)-63;do r=pi(r.add(i).add(o[0]).add(di(e,c+8)),37).mul(wi),i=pi(i.add(o[1]).add(di(e,c+48)),42).mul(wi),r=r.xor(s[1]),i=i.add(o[0]).add(di(e,c+40)),a=pi(a.add(s[0]),33).mul(wi),o=gi(e,c,o[1].mul(wi),r.add(s[0])),s=gi(e,c+32,a.add(s[1]),i.add(di(e,c+16))),[a,r]=[r,a],c+=64;while(c!==l);let d=wi.add(a.and(255).shl(1));return c=u,s[0]=s[0].add(t-1&63),o[0]=o[0].add(s[0]),s[0]=s[0].add(o[0]),r=pi(r.add(i).add(o[0]).add(di(e,c+8)),37).mul(d),i=pi(i.add(o[1]).add(di(e,c+48)),42).mul(d),r=r.xor(s[1].mul(9)),i=i.add(o[0].mul(9).add(di(e,c+40))),a=pi(a.add(s[0]),33).mul(d),o=gi(e,c,o[1].mul(d),r.add(s[0])),s=gi(e,c+32,a.add(s[1]),i.add(di(e,c+16))),[a,r]=[r,a],mi(mi(o[0],s[0],d).add(li(i).mul(Ci)).add(a),mi(o[1],s[1],d).add(r),d)}var xi,Si,Ci,wi,Ti,Ei=o((()=>{xi=u(si()),Si=xi.default||xi,Ci=ci(`c3a5c85c97cb3127`),wi=ci(`b492b66fbe98f273`),Ti=ci(`9ae16a3b2f90404f`)})),Di=c({arraysEqual:()=>A,arraysEqualWithNull:()=>te,assert:()=>E,assertNonNegativeIntegerDimensions:()=>Oe,assertNonNull:()=>O,assertShapesMatch:()=>D,bytesFromStringArray:()=>he,bytesPerElement:()=>me,checkConversionForErrors:()=>de,clamp:()=>b,computeStrides:()=>N,convertBackendValuesAndArrayBuffer:()=>we,createScalarValue:()=>Oi,createShuffledIndices:()=>ae,decodeString:()=>Pi,distSquared:()=>T,encodeString:()=>Ni,fetch:()=>Mi,fingerPrint64:()=>bi,flatten:()=>Ii,getArrayFromDType:()=>ue,getTypedArrayFromDType:()=>M,hasEncodingLoss:()=>pe,hexToLong:()=>ci,indexToLoc:()=>Ae,inferDtype:()=>ye,inferFromImplicitShape:()=>ce,isBoolean:()=>_e,isFunction:()=>be,isInt:()=>ne,isNumber:()=>ve,isPromise:()=>je,isScalarShape:()=>ee,isString:()=>ge,isTypedArray:()=>Fi,isValidDtype:()=>fe,locToIndex:()=>ke,makeOnesTypedArray:()=>Te,makeZerosNestedTypedArray:()=>De,makeZerosTypedArray:()=>Ee,nearestDivisor:()=>xe,nearestLargerEven:()=>x,now:()=>ji,parseAxisParam:()=>j,randUniform:()=>w,repeatedTry:()=>se,rightPad:()=>oe,shuffle:()=>v,shuffleCombo:()=>y,sizeFromShape:()=>k,sizeToSquarishShape:()=>ie,squeezeShape:()=>le,sum:()=>C,swap:()=>S,tanh:()=>re,toNestedArray:()=>Ce,toTypedArray:()=>Ai});function Oi(e,t){return t===`string`?Ni(e):Ai([e],t)}function ki(e,t){return e instanceof Float32Array&&t===`float32`||e instanceof Int32Array&&t===`int32`||e instanceof Uint8Array&&t===`bool`}function Ai(e,t){if(t===`string`)throw Error(`Cannot convert a string[] to a TypedArray`);if(Array.isArray(e)&&(e=Ii(e)),P().getBool(`DEBUG`)&&de(e,t),ki(e,t))return e;if(t==null||t===`float32`||t===`complex64`)return new Float32Array(e);if(t===`int32`)return new Int32Array(e);if(t===`bool`){let t=new Uint8Array(e.length);for(let n=0;n<t.length;++n)Math.round(e[n])!==0&&(t[n]=1);return t}throw Error(`Unknown data type ${t}`)}function ji(){return P().platform.now()}function Mi(e,t){return P().platform.fetch(e,t)}function Ni(e,t=`utf-8`){return t||=`utf-8`,P().platform.encode(e,t)}function Pi(e,t=`utf-8`){return t||=`utf-8`,P().platform.decode(e,t)}function Fi(e){return P().platform.isTypedArray==null?ai(e):P().platform.isTypedArray(e)}function Ii(e,t=[],n=!1){if(t??=[],typeof e==`boolean`||typeof e==`number`||typeof e==`string`||je(e)||e==null||Fi(e)&&n)t.push(e);else if(Array.isArray(e)||Fi(e))for(let r=0;r<e.length;++r)Ii(e[r],t,n);else{let r=-1;for(let t of Object.keys(e))/^([1-9]+[0-9]*|0)$/.test(t)&&(r=Math.max(r,Number(t)));for(let i=0;i<=r;i++)Ii(e[i],t,n)}return t}var L=o((()=>{Be(),oi(),Me(),Me(),Ei()}));function Li(e,t,n){if(t!==`float32`)return!1;for(let t=0;t<e.length;t++){let r=e[t];if(isNaN(r)||!isFinite(r))return console.warn(`Found ${r} in the result of '${n}'`),!0}return!1}var Ri,zi,Bi=o((()=>{Be(),L(),Ri=class{constructor(e,t){this.backendTimer=e,this.logger=t,t??(this.logger=new zi)}profileKernel(e,t,n){let r,i=()=>{r=n()},a,o=ji();if(this.backendTimer.timerAvailable())a=this.backendTimer.time(i);else{i();for(let e of r)e.dataSync();a=Promise.resolve({kernelMs:ji()-o})}if(P().getBool(`CHECK_COMPUTATION_FOR_ERRORS`))for(let t=0;t<r.length;t++){let n=r[t];n.data().then(t=>{Li(t,n.dtype,e)})}return{kernelName:e,outputs:r,inputs:t,timeMs:a.then(e=>e.kernelMs),extraInfo:a.then(e=>e.getExtraProfileInfo==null?``:e.getExtraProfileInfo())}}logKernelProfile(e){let{kernelName:t,outputs:n,timeMs:r,inputs:i,extraInfo:a}=e;n.forEach(e=>{Promise.all([e.data(),r,a]).then(n=>{this.logger.logKernelProfile(t,e,n[0],n[1],i,n[2])})})}},zi=class{logKernelProfile(e,t,n,r,i,a){let o=typeof r==`number`?oe(`${r}ms`,9):r.error,s=oe(e,25),c=t.rank,l=t.size,u=oe(t.shape.toString(),14),d=``;for(let e in i){let n=i[e];if(n!=null){let r=n.shape||t.shape,i=r.length;d+=`${e}: ${i}D ${i>0?r:``} `}}console.log(`%c${s}\t%c${o}\t%c${c}D ${u}\t%c${l}\t%c${d}\t%c${a}`,`font-weight:bold`,`color:red`,`color:blue`,`color: orange`,`color: green`,`color: steelblue`)}}}));function Vi(e,t,n){let r={},i={};for(let e=0;e<t.length;e++)r[t[e].id]=!0;for(let n=0;n<e.length;n++){let a=e[n],o=a.inputs;for(let e in o){let n=o[e],s=!1;for(let e=0;e<t.length;e++)if(r[n.id]){a.outputs.forEach(e=>r[e.id]=!0),s=!0,i[a.id]=!0;break}if(s)break}}let a={};a[n.id]=!0;let o={};for(let t=e.length-1;t>=0;t--){let n=e[t],r=n.inputs;for(let e=0;e<n.outputs.length;e++)if(a[n.outputs[e].id]){for(let e in r)a[r[e].id]=!0,o[n.id]=!0;break}}let s=[];for(let t=0;t<e.length;t++){let n=e[t];if(i[n.id]&&o[n.id]){let e={};for(let t in n.inputs){let i=n.inputs[t];r[i.id]&&(e[t]=i)}let t=Object.assign({},n);t.inputs=e,t.outputs=n.outputs,s.push(t)}}return s}function Hi(e,t,n,r){for(let i=t.length-1;i>=0;i--){let a=t[i],o=[];if(a.outputs.forEach(t=>{let n=e[t.id];n==null?o.push(null):o.push(n)}),a.gradient==null)throw Error(`Cannot compute gradient: gradient function not found for ${a.kernelName}.`);let s=a.gradient(o);for(let t in a.inputs){if(!(t in s))throw Error(`Cannot backprop through input ${t}. Available gradients found: ${Object.keys(s)}.`);let i=n(()=>s[t]());if(i.dtype!==`float32`)throw Error(`Error in gradient for op ${a.kernelName}. The gradient of input ${t} must have 'float32' dtype, but has '${i.dtype}'`);let o=a.inputs[t];if(!A(i.shape,o.shape))throw Error(`Error in gradient for op ${a.kernelName}. The gradient of input '${t}' has shape '${i.shape}', which does not match the shape of the input '${o.shape}'`);if(e[o.id]==null)e[o.id]=i;else{let t=e[o.id];e[o.id]=r(t,i),t.dispose()}}}}var Ui=o((()=>{L()}));function Wi(e,t,n,r){let i=N(t),a=Gi(e,t,n,i),o=t.length,s=Ji(e,t,n,i,a),c=[`Tensor`];return r&&(c.push(`  dtype: ${n}`),c.push(`  rank: ${o}`),c.push(`  shape: [${t}]`),c.push(`  values:`)),c.push(s.map(e=>`    `+e).join(`
`)),c.join(`
`)}function Gi(e,t,n,r){let i=k(t),a=r[r.length-1],o=Array(a).fill(0),s=t.length,c=n===`complex64`?Yi(e):e;if(s>1)for(let e=0;e<i/a;e++){let t=e*a;for(let e=0;e<a;e++)o[e]=Math.max(o[e],Ki(c[t+e],0,n).length)}return o}function Ki(e,t,n){let r;return r=Array.isArray(e)?`${parseFloat(e[0].toFixed(Qi))} + ${parseFloat(e[1].toFixed(Qi))}j`:ge(e)?`'${e}'`:n===`bool`?qi(e):parseFloat(e.toFixed(Qi)).toString(),oe(r,t)}function qi(e){return e===0?`false`:`true`}function Ji(e,t,n,r,i,a=!0){let o=n===`complex64`?2:1,s=t[0],c=t.length;if(c===0)return n===`complex64`?[Ki(Yi(e)[0],0,n)]:n===`bool`?[qi(e[0])]:[e[0].toString()];if(c===1){if(s>Xi){let t=Zi*o,r=Array.from(e.slice(0,t)),a=Array.from(e.slice((s-Zi)*o,s*o));return n===`complex64`&&(r=Yi(r),a=Yi(a)),[`[`+r.map((e,t)=>Ki(e,i[t],n)).join(`, `)+`, ..., `+a.map((e,t)=>Ki(e,i[s-Zi+t],n)).join(`, `)+`]`]}return[`[`+(n===`complex64`?Yi(e):Array.from(e)).map((e,t)=>Ki(e,i[t],n)).join(`, `)+`]`]}let l=t.slice(1),u=r.slice(1),d=r[0]*o,f=[];if(s>Xi){for(let t=0;t<Zi;t++){let r=t*d,a=r+d;f.push(...Ji(e.slice(r,a),l,n,u,i,!1))}f.push(`...`);for(let t=s-Zi;t<s;t++){let r=t*d,a=r+d;f.push(...Ji(e.slice(r,a),l,n,u,i,t===s-1))}}else for(let t=0;t<s;t++){let r=t*d,a=r+d;f.push(...Ji(e.slice(r,a),l,n,u,i,t===s-1))}let p=c===2?`,`:``;f[0]=`[`+(s>0?f[0]+p:``);for(let e=1;e<f.length-1;e++)f[e]=` `+f[e]+p;let m=`,
`;for(let e=2;e<c;e++)m+=`
`;return f[f.length-1]=` `+f[f.length-1]+`]`+(a?``:m),f}function Yi(e){let t=[];for(let n=0;n<e.length;n+=2)t.push([e[n],e[n+1]]);return t}var Xi,Zi,Qi,$i=o((()=>{L(),Xi=20,Zi=3,Qi=7}));function ea(e){ia=e}function ta(e){aa=e}function na(){return Ue(`Tensor`,()=>oa)}var ra,ia,aa,oa,sa,ca=o((()=>{Ge(),$i(),L(),ra=class{constructor(e,t,n){if(this.dtype=t,this.shape=e.slice(),this.size=k(e),n!=null){let e=n.length;E(e===this.size,()=>`Length of values '${e}' does not match the size inferred by the shape '${this.size}'.`)}if(t===`complex64`)throw Error(`complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).`);this.values=n||ue(t,this.size),this.strides=N(e)}set(e,...t){t.length===0&&(t=[0]),E(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);let n=this.locToIndex(t);this.values[n]=e}get(...e){e.length===0&&(e=[0]);let t=0;for(let n of e){if(n<0||n>=this.shape[t]){let t=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw Error(t)}t++}let n=e[e.length-1];for(let t=0;t<e.length-1;++t)n+=this.strides[t]*e[t];return this.values[n]}locToIndex(e){if(this.rank===0)return 0;if(this.rank===1)return e[0];let t=e[e.length-1];for(let n=0;n<e.length-1;++n)t+=this.strides[n]*e[n];return t}indexToLoc(e){if(this.rank===0)return[];if(this.rank===1)return[e];let t=Array(this.shape.length);for(let n=0;n<t.length-1;++n)t[n]=Math.floor(e/this.strides[n]),e-=t[n]*this.strides[n];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return ia().makeTensor(this.values,this.shape,this.dtype)}},ia=null,aa=null,oa=class{constructor(e,t,n,r){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||`float32`,this.size=k(e),this.strides=N(e),this.dataId=n,this.id=r,this.rankType=this.rank<5?this.rank.toString():`higher`}get rank(){return this.shape.length}async buffer(){let e=await this.data();return aa.buffer(this.shape,this.dtype,e)}bufferSync(){return aa.buffer(this.shape,this.dtype,this.dataSync())}async array(){let e=await this.data();return Ce(this.shape,e,this.dtype===`complex64`)}arraySync(){return Ce(this.shape,this.dataSync(),this.dtype===`complex64`)}async data(){this.throwIfDisposed();let e=ia().read(this.dataId);if(this.dtype===`string`){let t=await e;try{return t.map(e=>Pi(e))}catch{throw Error(`Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().`)}}return e}dataToGPU(e){return this.throwIfDisposed(),ia().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();let e=ia().readSync(this.dataId);if(this.dtype===`string`)try{return e.map(e=>Pi(e))}catch{throw Error(`Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().`)}return e}async bytes(){this.throwIfDisposed();let e=await ia().read(this.dataId);return this.dtype===`string`?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),ia().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw Error(`Tensor is disposed.`)}print(e=!1){return aa.print(this,e)}clone(){return this.throwIfDisposed(),aa.clone(this)}toString(e=!1){return Wi(this.dataSync(),this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),aa.cast(this,e)}variable(e=!0,t,n){return this.throwIfDisposed(),ia().makeVariable(this,e,t,n)}},Object.defineProperty(oa,Symbol.hasInstance,{value:e=>!!e&&e.data!=null&&e.dataSync!=null&&e.throwIfDisposed!=null}),na(),sa=class extends oa{constructor(e,t,n,r){super(e.shape,e.dtype,e.dataId,r),this.trainable=t,this.name=n}assign(e){if(e.dtype!==this.dtype)throw Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!A(e.shape,this.shape))throw Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);ia().disposeTensor(this),this.dataId=e.dataId,ia().incRef(this,null)}dispose(){ia().disposeVariable(this),this.isDisposedInternal=!0}},Object.defineProperty(sa,Symbol.hasInstance,{value:e=>e instanceof oa&&e.assign!=null&&e.assign instanceof Function})}));function la(e,t){if(e===`string`||t===`string`){if(e===`string`&&t===`string`)return`string`;throw Error(`Can not upcast ${e} with ${t}`)}return va[e][t]}function ua(e){return la(e,`int32`)}function da(e){return typeof e==`object`&&!!e&&`texture`in e&&e.texture instanceof WebGLTexture}function fa(e){return typeof GPUBuffer<`u`&&typeof e==`object`&&!!e&&`buffer`in e&&e.buffer instanceof GPUBuffer}var pa,ma,ha,ga,_a,va,ya=o((()=>{(function(e){e.R0=`R0`,e.R1=`R1`,e.R2=`R2`,e.R3=`R3`,e.R4=`R4`,e.R5=`R5`,e.R6=`R6`})(pa||={}),(function(e){e.float32=`float32`,e.int32=`int32`,e.bool=`int32`,e.complex64=`complex64`})(ma||={}),(function(e){e.float32=`float32`,e.int32=`int32`,e.bool=`bool`,e.complex64=`complex64`})(ha||={}),(function(e){e.float32=`float32`,e.int32=`float32`,e.bool=`float32`,e.complex64=`complex64`})(ga||={}),(function(e){e.float32=`complex64`,e.int32=`complex64`,e.bool=`complex64`,e.complex64=`complex64`})(_a||={}),va={float32:ga,int32:ma,bool:ha,complex64:_a}})),ba=c({assertTypesMatch:()=>Sa,getTensorsInContainer:()=>wa,isTensorInList:()=>Ca,makeTypesMatch:()=>xa});function xa(e,t){if(e.dtype===t.dtype)return[e,t];let n=la(e.dtype,t.dtype);return[e.cast(n),t.cast(n)]}function Sa(e,t){E(e.dtype===t.dtype,()=>`The dtypes of the first(${e.dtype}) and second(${t.dtype}) input must match`)}function Ca(e,t){return t.some(t=>t.id===e.id)}function wa(e){let t=[];return Ta(e,t,new Set),t}function Ta(e,t,n){if(e==null)return;if(e instanceof oa){t.push(e);return}if(!Ea(e))return;let r=e;for(let e in r){let i=r[e];n.has(i)||(n.add(i),Ta(i,t,n))}}function Ea(e){return Array.isArray(e)||typeof e==`object`}var Da=o((()=>{ca(),ya(),L()}));function Oa(e){return e.kernelName!=null}function ka(e){let t=Te(k(e),`float32`);return R.makeTensor(t,e,`float32`)}function Aa(){let e=Ve();if(e._tfengine==null){let t=new Re(e);e._tfengine=new Na(t)}return Ie(e._tfengine.ENV),ea(()=>e._tfengine),e._tfengine}function ja(e,t){let n={a:e,b:t};return R.runKernel(`Add`,n)}var Ma,Na,R,z=o((()=>{_(),Be(),Ge(),I(),ii(),Kr(),Bi(),Ui(),ca(),Da(),L(),Ma=class{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(let e in this.registeredVariables)this.registeredVariables[e].dispose()}},Na=class e{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Ma}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let n=e[t];if(await this.initializeBackend(n).success){await this.setBackend(n);return}}throw Error(`Could not initialize any backends, all backend initializations failed.`)}get backend(){if(this.pendingBackendInit!=null)throw Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){let{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry)){if(e in this.registryFactory){let{asyncInit:t}=this.initializeBackend(e);if(t)return null}else return null}return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,n=1){return e in this.registryFactory?(Wr(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:t,priority:n},!0)}async setBackend(e){if(this.registryFactory[e]==null)throw Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,this.registry[e]==null){this.backendInstance=null;let{success:t,asyncInit:n}=this.initializeBackend(e);if(!(n?await t:t))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new Ri(this.backendInstance),!0}setupRegisteredKernels(){Yr(this.backendName).forEach(e=>{e.setupFunc!=null&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){Yr(e).forEach(t=>{t.disposeFunc!=null&&t.disposeFunc(this.registry[e])})}initializeBackend(e){let t=this.registryFactory[e];if(t==null)throw Error(`Cannot initialize backend ${e}, no registration found.`);try{let n=t.factory();if(n&&!(n instanceof g)&&typeof n.then==`function`){let t=++this.pendingBackendInitId,r=n.then(n=>t<this.pendingBackendInitId?!1:(this.registry[e]=n,this.pendingBackendInit=null,!0)).catch(n=>t<this.pendingBackendInitId?!1:(this.pendingBackendInit=null,Wr(`Initialization of backend ${e} failed`),Wr(n.stack||n.message),!1));return this.pendingBackendInit=r,{success:r,asyncInit:!0}}return this.registry[e]=n,{success:!0,asyncInit:!1}}catch(t){return Wr(`Initialization of backend ${e} failed`),Wr(t.stack||t.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw Error(`${e} backend not found in registry`);this.backendName===e&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw Error(`No backend found in registry.`);return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let n=e[t],{success:r,asyncInit:i}=this.initializeBackend(n);if(i||r)return{name:n,asyncInit:i}}throw Error(`Could not initialize any backends, all backend initializations failed.`)}moveData(e,t){let n=this.state.tensorInfo.get(t),r=n.backend,i=this.readSync(t),a=r.refCount(t);r.disposeData(t,!0),n.backend=e,e.move(t,i,n.shape,n.dtype,a),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let n=null;if(t==null){if(typeof e!=`function`)throw Error(`Please provide a function to tidy()`);t=e}else{if(typeof e!=`string`&&!(e instanceof String))throw Error(`When calling with two arguments, the first argument to tidy() must be a string`);if(typeof t!=`function`)throw Error(`When calling with two arguments, the 2nd argument to tidy() must be a function`);n=e}let r;return this.scopedRun(()=>this.startScope(n),()=>this.endScope(r),()=>(r=t(),r instanceof Promise&&console.error(`Cannot return a Promise inside of tidy.`),r))}scopedRun(e,t,n){e();try{let e=n();return t(),e}catch(e){throw t(),e}}nextTensorId(){return e.nextTensorId++}nextVariableId(){return e.nextVariableId++}clone(e){let t=R.runKernel(Qt,{x:e}),n={x:e};return this.addTapeNode(this.state.activeScope.name,n,[t],e=>({x:()=>{let t={x:e};return R.runKernel(dt,t,{dtype:`float32`})}}),[],{}),t}runKernel(e,t,n){if(this.backendName??this.backend,qr(e,this.backendName)==null)throw Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:n})}shouldCheckForMemLeaks(){return this.ENV.getBool(`IS_TEST`)}checkKernelForMemLeak(e,t,n){let r=this.backend.numDataIds(),i=0;n.forEach(e=>{i+=e.dtype===`complex64`?3:1});let a=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],o=r-t-i-a;if(o>0)throw Error(`Backend '${this.backendName}' has an internal memory leak (${o} data ids) after running '${e}'`)}runKernelFunc(e){let t,n=[],r=this.isTapeOn(),i=this.state.numBytes,a=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let o;this.backendName??this.backend;let s,c=Oa(e)?e.kernelName:this.state.activeScope==null?``:this.state.activeScope.name;if(Oa(e)){let{kernelName:t,inputs:i,attrs:a}=e;this.backendName??this.backend;let c=qr(t,this.backendName);E(c!=null,()=>`Cannot find registered kernel '${t}' for backend '${this.backendName}'`),o=()=>{let e=this.backend.numDataIds();s=c.kernelFunc({inputs:i,attrs:a,backend:this.backend});let o=Array.isArray(s)?s:[s];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(t,e,o);let l=o.map(e=>e.rank==null?this.makeTensorFromTensorInfo(e):e);if(r){let e=this.getTensorsForGradient(t,i,l);n=this.saveTensorsForBackwardMode(e)}return l}}else{let{forwardFunc:t}=e,i=e=>{r&&(n=e.map(e=>this.keep(this.clone(e))))};o=()=>{let e=this.backend.numDataIds();s=this.tidy(()=>t(this.backend,i));let n=Array.isArray(s)?s:[s];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(c,e,n),n}}let{inputs:l,attrs:u}=e,d=Oa(e)?null:e.backwardsFunc,f;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool(`DEBUG`)&&!this.state.profiling?t=o():(f=this.profiler.profileKernel(c,l,()=>o()),this.ENV.getBool(`DEBUG`)&&this.profiler.logKernelProfile(f),t=f.outputs)}),r&&this.addTapeNode(c,l,t,d,n,u),this.state.profiling&&this.state.activeProfile.kernels.push({name:c,bytesAdded:this.state.numBytes-i,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-a,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(l).map(e=>l[e]==null?null:l[e].shape),outputShapes:t.map(e=>e.shape),kernelTimeMs:f.timeMs,extraInfo:f.extraInfo}),Array.isArray(s)?t:t[0]}saveTensorsForBackwardMode(e){return e.map(e=>this.keep(this.clone(e)))}getTensorsForGradient(e,t,n){let r=Jr(e);if(r!=null){let e=r.inputsToSave||[],i=r.outputsToSave||[],a;r.saveAllInputs?(E(Array.isArray(t),()=>`saveAllInputs is true, expected inputs to be an array.`),a=Object.keys(t).map(e=>t[e])):a=e.map(e=>t[e]);let o=n.filter((e,t)=>i[t]);return a.concat(o)}return[]}makeTensor(e,t,n,r){if(e==null)throw Error(`Values passed to engine.makeTensor() are null`);n||=`float32`,r||=this.backend;let i=e;n===`string`&&ge(e[0])&&(i=e.map(e=>Ni(e)));let a=r.write(i,t,n),o=new oa(t,n,a,this.nextTensorId());if(this.trackTensor(o,r),n===`string`){let e=this.state.tensorInfo.get(a),t=he(i);this.state.numBytes+=t-e.bytes,e.bytes=t}return o}makeTensorFromDataId(e,t,n,r){n||=`float32`;let i={dataId:e,shape:t,dtype:n};return this.makeTensorFromTensorInfo(i,r)}makeTensorFromTensorInfo(e,t){let{dataId:n,shape:r,dtype:i}=e,a=new oa(r,i,n,this.nextTensorId());return this.trackTensor(a,t),a}makeVariable(e,t=!0,n,r){n||=this.nextVariableId().toString(),r!=null&&r!==e.dtype&&(e=e.cast(r));let i=new sa(e,t,n,this.nextTensorId());if(this.state.registeredVariables[i.name]!=null)throw Error(`Variable with name ${i.name} was already registered`);return this.state.registeredVariables[i.name]=i,this.incRef(i,this.backend),i}trackTensor(e,t){this.state.numTensors++,e.dtype===`string`&&this.state.numStringTensors++;let n=0;e.dtype!==`complex64`&&e.dtype!==`string`&&(n=e.size*me(e.dtype)),this.state.numBytes+=n,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:n})),e instanceof sa||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;let t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,e.dtype===`string`&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),e.dtype!==`complex64`&&e.dtype!==`string`){let t=e.size*me(e.dtype);this.state.numBytes-=t}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(let e in this.state.registeredVariables){let t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),this.state.registeredVariables[e.name]!=null&&delete this.state.registeredVariables[e.name]}memory(){let e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,e.reasons??=[],e.reasons.push(`Memory usage by string tensors is approximate (2 bytes per character)`)),e}async profile(e){this.state.profiling=!0;let t=this.state.numBytes,n=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(e=>e.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-n;for(let e of this.state.activeProfile.kernels)e.kernelTimeMs=await e.kernelTimeMs,e.extraInfo=await e.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(e,t,n,r,i,a){let o={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:n,saved:i},s=Jr(e);s!=null&&(r=s.gradFunc),r!=null&&(o.gradient=e=>(e=e.map((e,t)=>{if(e==null){let e=n[t],r=Ee(e.size,e.dtype);return this.makeTensor(r,e.shape,e.dtype)}return e}),r(e.length>1?e:e[0],i,a))),this.state.activeTape.push(o)}keep(e){return e.kept=!0,e}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){let t={track:[],name:`unnamed scope`,id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){let t=wa(e),n=new Set(t.map(e=>e.id));for(let e=0;e<this.state.activeScope.track.length;e++){let t=this.state.activeScope.track[e];!t.kept&&!n.has(t.id)&&t.dispose()}let r=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(e=>{!e.kept&&e.scopeId===r.id&&this.track(e)})}gradients(e,t,n,r=!1){if(E(t.length>0,()=>`gradients() received an empty list of xs.`),n!=null&&n.dtype!==`float32`)throw Error(`dy must have 'float32' dtype, but has '${n.dtype}'`);let i=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy(`forward`,e));E(i instanceof oa,()=>`The result y returned by f() must be a tensor.`);let a=Vi(this.state.activeTape,t,i);if(!r&&a.length===0&&t.length>0)throw Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.`);return this.tidy(`backward`,()=>{let e={};e[i.id]=n??ka(i.shape),Hi(e,a,e=>this.tidy(e),ja);let r=t.map(t=>e[t.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(e=>{for(let t of e.saved)t.dispose()}),this.state.activeTape=null),{value:i,grads:r}})}customGrad(e){return E(be(e),()=>`The f passed in customGrad(f) must be a function.`),(...t)=>{E(t.every(e=>e instanceof oa),()=>`The args passed in customGrad(f)(x1, x2,...) must all be tensors`);let n,r={};return t.forEach((e,t)=>{r[t]=e}),this.runKernelFunc({forwardFunc:(r,i)=>(n=e(...t,i),E(n.value instanceof oa,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),E(be(n.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),n.value),backwardsFunc:(e,r)=>{let i=n.gradFunc(e,r),a=Array.isArray(i)?i:[i];E(a.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),E(a.every(e=>e instanceof oa),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let o={};return a.forEach((e,t)=>{o[t]=()=>e}),o},inputs:r})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}readToGPU(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)}async time(e){let t=ji(),n=await this.backend.time(e);return n.wallMs=ji()-t,n}track(e){return this.state.activeScope!=null&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Ma;for(let e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}},Na.nextTensorId=0,Na.nextVariableId=0,R=Aa()})),Pa=c({isBrowser:()=>Ra,isMobile:()=>La,mockIsMobile:()=>Ia});function Fa(){return typeof navigator<`u`&&navigator!=null}function Ia(e){za=e}function La(e){if(za!==void 0)return za;if(e||Fa()){if(e||=navigator,e.product===`ReactNative`)return!0;let t=e.userAgent||e.vendor||(typeof window<`u`?window.opera:``);if(!t){let t=e;return t.userAgentData&&t.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1}function Ra(){return typeof window<`u`&&window.document!=null||typeof WorkerGlobalScope<`u`}var za,Ba=o((()=>{})),Va,Ha=o((()=>{z(),Ba(),Be(),Va=P(),Va.registerFlag(`DEBUG`,()=>!1,e=>{e&&console.warn(`Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.`)}),Va.registerFlag(`IS_BROWSER`,()=>Ra()),Va.registerFlag(`IS_NODE`,()=>typeof process<`u`&&process.versions!==void 0&&process.versions.node!==void 0),Va.registerFlag(`IS_CHROME`,()=>typeof navigator<`u`&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),Va.registerFlag(`IS_SAFARI`,()=>typeof navigator<`u`&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),Va.registerFlag(`PROD`,()=>!1),Va.registerFlag(`TENSORLIKE_CHECK_SHAPE_CONSISTENCY`,()=>Va.getBool(`DEBUG`)),Va.registerFlag(`DEPRECATION_WARNINGS_ENABLED`,()=>!0),Va.registerFlag(`IS_TEST`,()=>!1),Va.registerFlag(`CHECK_COMPUTATION_FOR_ERRORS`,()=>Va.getBool(`DEBUG`)),Va.registerFlag(`WRAP_TO_IMAGEBITMAP`,()=>!1),Va.registerFlag(`CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU`,()=>!1),Va.registerFlag(`USE_SETTIMEOUTCUSTOM`,()=>!1)}));function Ua(e,t){let n=e;if(Fi(e))return t===`string`?[]:[e.length];if(da(e)){let t=e.channels||`RGBA`;return[e.height,e.width*t.length]}if(fa(e))return[e.buffer.size/(t==null?4:me(t))];if(!Array.isArray(e))return[];let r=[];for(;Array.isArray(n)||Fi(n)&&t!==`string`;)r.push(n.length),n=n[0];return Array.isArray(e)&&P().getBool(`TENSORLIKE_CHECK_SHAPE_CONSISTENCY`)&&Wa(e,r,[]),r}function Wa(e,t,n){if(n||=[],!Array.isArray(e)&&!Fi(e)){E(t.length===0,()=>`Element arr[${n.join(`][`)}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}E(t.length>0,()=>`Element arr[${n.join(`][`)}] should be a primitive, but is an array of ${e.length} elements`),E(e.length===t[0],()=>`Element arr[${n.join(`][`)}] should have ${t[0]} elements, but has ${e.length} elements`);let r=t.slice(1);for(let t=0;t<e.length;++t)Wa(e[t],r,n.concat(t))}function Ga(e,t,n,r){if(e!==`string_or_numeric`){if(e==null)throw Error(`Expected dtype cannot be null.`);if(e!==`numeric`&&e!==t||e===`numeric`&&t===`string`)throw Error(`Argument '${n}' passed to '${r}' must be ${e} tensor, but got ${t} tensor`)}}function B(e,t,n,r=`numeric`){if(e instanceof na())return Ga(r,e.dtype,t,n),e;let i=ye(e);if(i!==`string`&&[`bool`,`int32`,`float32`].indexOf(r)>=0&&(i=r),Ga(r,i,t,n),e==null||!Fi(e)&&!Array.isArray(e)&&typeof e!=`number`&&typeof e!=`boolean`&&typeof e!=`string`){let r=e==null?`null`:e.constructor.name;throw Error(`Argument '${t}' passed to '${n}' must be a Tensor or TensorLike, but got '${r}'`)}let a=Ua(e,i);!Fi(e)&&!Array.isArray(e)&&(e=[e]);let o=i===`string`?Ii(e,[],!0):Ai(e,i);return R.makeTensor(o,a,i)}function Ka(e,t,n,r=`numeric`){if(!Array.isArray(e))throw Error(`Argument ${t} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((e,i)=>B(e,`${t}[${i}]`,n,r))}var V=o((()=>{z(),Be(),ca(),ya(),L(),Me()}));function H(e){let t=Object.keys(e);if(t.length!==1)throw Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let n=t[0],r=e[n];n.endsWith(`_`)&&(n=n.substring(0,n.length-1)),n+=qa;let i=(...e)=>{R.startScope(n);try{let t=r(...e);return je(t)&&console.error(`Cannot return a Promise inside of tidy.`),R.endScope(t),t}catch(e){throw R.endScope(null),e}};return Object.defineProperty(i,"name",{value:n,configurable:!0}),i}var qa,U=o((()=>{z(),L(),qa=`__op`}));function Ja(e,t){let n=B(e,`real`,`complex`),r=B(t,`imag`,`complex`);D(n.shape,r.shape,`real and imag shapes, ${n.shape} and ${r.shape}, must match in call to tf.complex().`);let i={real:n,imag:r};return R.runKernel(mt,i)}var Ya,Xa=o((()=>{z(),I(),V(),L(),U(),Ya=H({complex_:Ja})}));function Za(e,t,n,r){if(r==null)r=ye(e);else if(r===`complex64`)throw Error(`Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).`);if(fa(e)||da(e)){if(r!==`float32`&&r!==`int32`)throw Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${r}.`);return R.backend.createTensorFromGPUData(e,t||n,r)}if(!Fi(e)&&!Array.isArray(e)&&typeof e!=`number`&&typeof e!=`boolean`&&typeof e!=`string`)throw Error(`values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray`);if(t!=null){Oe(t);let e=k(t),r=k(n);E(e===r,()=>`Based on the provided shape, [${t}], the tensor should have ${e} values but has ${r}`);for(let e=0;e<n.length;++e){let r=n[e],i=e!==n.length-1||r!==k(t.slice(e));E(n[e]===t[e]||!i,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${t}). `)}}return!Fi(e)&&!Array.isArray(e)&&(e=[e]),t||=n,e=r===`string`?Ii(e,[],!0):Ai(e,r),R.makeTensor(e,t,r)}var Qa=o((()=>{z(),ya(),L()}));function $a(e,t,n){return Za(e,t,Ua(e,n),n)}var eo=o((()=>{V(),Qa()})),to,no=o((()=>{to={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8}}));function ro(e,t){let n=0,r=e.length;for(;n<=r;){let i=Math.floor((r-n)/2)+n,a=t(e[i]);if(a===0)return i;a<0?r=i:n=i+1}return-1}var io,ao=o((()=>{L(),io=class e{static join(t){return new e(t).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,e==null||(e instanceof Array||(e=[e]),e=e.map(e=>Fi(e)?e.buffer:e),e.length===0))return;this.bufferUniformSize=e[0].byteLength;let t=0;for(let n=0;n<e.length;n++){let r=e[n];n!==e.length-1&&r.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);let i=t+r.byteLength;this.shards.push({buffer:r,start:t,end:i}),t=i}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,t=this.byteLength){if(this.shards.length===0||(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),t=Math.min(this.byteLength,t),t<=e))return new ArrayBuffer(0);let n=this.findShardForByte(e);if(n===-1)throw Error(`Could not find start shard for byte ${e}`);let r=t-e,i=new ArrayBuffer(r),a=new Uint8Array(i),o=0;for(let r=n;r<this.shards.length;r++){let n=this.shards[r],i=e+o-n.start,s=o,c=Math.min(t,n.end)-n.start,l=new Uint8Array(n.buffer,i,c-i);if(a.set(l,s),o+=l.length,t<n.end)break}return i}findShardForByte(e){if(this.shards.length===0||e<0||e>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function t(t){return e<t.start?-1:+(e>=t.end)}if(t(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;let n=ro(this.shards,t);return n===-1?-1:(this.previousShardIndex=n,this.previousShardIndex)}}}));function oo(){P().set(`PROD`,!0)}function so(){P().set(`DEBUG`,!0)}function co(){P().set(`DEPRECATION_WARNINGS_ENABLED`,!1),console.warn(`TensorFlow.js deprecation warnings have been disabled.`)}function lo(e){P().getBool(`DEPRECATION_WARNINGS_ENABLED`)&&console.warn(e+` You can disable deprecation warnings with tf.disableDeprecationWarnings().`)}function uo(){R.disposeVariables()}function fo(){return R}function po(){return R.memory()}function mo(e){return R.profile(e)}function ho(e,t){return R.tidy(e,t)}function go(e){wa(e).forEach(e=>e.dispose())}function _o(e){return R.keep(e)}function vo(e){return R.time(e)}function yo(e){return R.setBackend(e)}function bo(){return R.ready()}function xo(){return R.backendName}function So(e){R.removeBackend(e)}function Co(e){return R.findBackend(e)}function wo(e){return R.findBackendFactory(e)}function To(e,t,n=1){return R.registerBackend(e,t,n)}function Eo(){return R.backend}function Do(e,t){P().setPlatform(e,t)}var Oo=o((()=>{z(),Be(),ca(),Da()}));async function ko(e,t){let n=[],r=[],i=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);for(let a=0;a<i.length;++a){let o=i[a],s=Array.isArray(e)?e[a].tensor:e[o];if(s.dtype!==`float32`&&s.dtype!==`int32`&&s.dtype!==`bool`&&s.dtype!==`string`&&s.dtype!==`complex64`)throw Error(`Unsupported dtype in weight '${o}': ${s.dtype}`);let c={name:o,shape:s.shape,dtype:s.dtype};if(s.dtype===`string`){let e=new Promise(async e=>{let t=await s.bytes(),n=t.reduce((e,t)=>e+t.length,0)+Zo*t.length,r=new Uint8Array(n),i=0;for(let e=0;e<t.length;e++){let n=t[e],a=new Uint8Array(new Uint32Array([n.length]).buffer);r.set(a,i),i+=Zo,r.set(n,i),i+=n.length}e(r)});r.push(e)}else r.push(s.data());t!=null&&(c.group=t),n.push(c)}return{data:Io(await Promise.all(r)),specs:n}}function Ao(e,t){let n=new io(e),r={},i=0;for(let e of t){let t=jo(e,(e,t)=>n.slice(i+e,i+t));r[e.name]=No(e,n.slice(i,i+t)),i+=t}return r}function jo(e,t){let n=k(e.shape),r;if(`quantization`in e){let t=e.quantization;r=to[t.dtype]}else if(e.dtype===`string`){let e=0;for(let r=0;r<n;r++)e+=Zo+new Uint32Array(t(e,e+Zo))[0];return e}else r=to[e.dtype];return n*r}async function Mo(e,t){let n=k(e.shape),r;if(`quantization`in e){let t=e.quantization;r=to[t.dtype]}else if(e.dtype===`string`){let e=0;for(let r=0;r<n;r++)e+=Zo+new Uint32Array(await t(e,e+Zo))[0];return e}else r=to[e.dtype];return n*r}function No(e,t){let n=e.name,r=e.dtype,i=e.shape,a=k(i),o,s=0;if(`quantization`in e){let i=e.quantization;if(i.dtype===`uint8`||i.dtype===`uint16`){if(!(`min`in i&&`scale`in i))throw Error(`Weight ${e.name} with quantization ${i.dtype} doesn't have corresponding metadata min and scale.`)}else if(i.dtype===`float16`){if(r!==`float32`)throw Error(`Weight ${e.name} is quantized with ${i.dtype} which only supports weights of type float32 not ${r}.`)}else throw Error(`Weight ${e.name} has unknown quantization dtype ${i.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);let c=to[i.dtype],l=i.dtype===`uint8`?new Uint8Array(t):new Uint16Array(t);if(r===`float32`){if(i.dtype===`uint8`||i.dtype===`uint16`){o=new Float32Array(l.length);for(let e=0;e<l.length;e++){let t=l[e];o[e]=t*i.scale+i.min}}else if(i.dtype===`float16`)o=Xo()(l);else throw Error(`Unsupported quantization type ${i.dtype} for weight type float32.`)}else if(r===`int32`){if(i.dtype!==`uint8`&&i.dtype!==`uint16`)throw Error(`Unsupported quantization type ${i.dtype} for weight type int32.`);o=new Int32Array(l.length);for(let e=0;e<l.length;e++){let t=l[e];o[e]=Math.round(t*i.scale+i.min)}}else throw Error(`Unsupported dtype in weight '${n}': ${r}`);s+=a*c}else if(r===`string`){let n=k(e.shape);o=[];for(let e=0;e<n;e++){let e=new Uint32Array(t.slice(s,s+Zo))[0];s+=Zo;let n=new Uint8Array(t.slice(s,s+e));o.push(n),s+=e}}else{let e=to[r];if(r===`float32`)o=new Float32Array(t);else if(r===`int32`)o=new Int32Array(t);else if(r===`bool`)o=new Uint8Array(t);else if(r===`complex64`){o=new Float32Array(t);let e=new Float32Array(o.length/2),n=new Float32Array(o.length/2);for(let t=0;t<e.length;t++)e[t]=o[t*2],n[t]=o[t*2+1];let r=$a(e,i,`float32`),a=$a(n,i,`float32`),s=Ya(r,a);return r.dispose(),a.dispose(),s}else throw Error(`Unsupported dtype in weight '${n}': ${r}`);s+=a*e}return $a(o,i,r)}async function Po(e,t,n){let r=new Uint8Array(t);for(;r.byteLength<n;){let{done:t,value:i}=await e.read();if(t&&i==null){let e=n-r.byteLength;throw Error(`Reader is done but ${e} bytes are still expected`)}let a=new Uint8Array(r.length+i.byteLength);a.set(r,0),a.set(new Uint8Array(i),r.length),r=a}return r.buffer}async function Fo(e,t){let n={},r=e.getReader(),i=new ArrayBuffer(0);for(let e of t){let t=await Mo(e,async(e,t)=>(i=await Po(r,i,t),i.slice(e,t)));i=await Po(r,i,t);let a=i.slice(0,t);i=i.slice(t);let o=No(e,a);if(n[e.name]=o,xo()===`webgpu`){let e=Eo();`uploadToGPU`in e&&k(o.shape)>=P().get(`WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD`)&&e.uploadToGPU(o.dataId)}}return n}function Io(e){if(e===null)throw Error(`Invalid input value: ${JSON.stringify(e)}`);let t=0,n=[];e.forEach(e=>{if(t+=e.byteLength,n.push(e.byteLength===e.buffer.byteLength?e:new e.constructor(e)),!(e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array))throw Error(`Unsupported TypedArray subtype: ${e.constructor.name}`)});let r=new Uint8Array(t),i=0;return n.forEach(e=>{r.set(new Uint8Array(e.buffer),i),i+=e.byteLength}),r.buffer}function Lo(e){return Qo?Buffer.byteLength(e,`utf8`):new Blob([e]).size}function Ro(e){if(Qo)return Buffer.from(e).toString(`base64`);let t=new Uint8Array(e),n=``;for(let e=0,r=t.length;e<r;e++)n+=String.fromCharCode(t[e]);return btoa(n)}function zo(e){if(Qo){let t=Buffer.from(e,`base64`);return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;++e)n.set([t.charCodeAt(e)],e);return n.buffer}function Bo(e){return io.join(e)}function Vo(e){for(e=e.trim();e.endsWith(`/`);)e=e.slice(0,e.length-1);let t=e.split(`/`);return t[t.length-1]}function Ho(e,t){let n={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return e.signature!=null&&(n.signature=e.signature),e.userDefinedMetadata!=null&&(n.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(n.modelInitializer=e.modelInitializer),e.initializerSignature!=null&&(n.initializerSignature=e.initializerSignature),e.trainingConfig!=null&&(n.trainingConfig=e.trainingConfig),n}function Uo(e,t,n){let r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(e.trainingConfig!=null&&(r.trainingConfig=e.trainingConfig),e.weightsManifest!=null){if(!t)throw Error(`modelJSON has weightsManifest but weightSpecs is null`);if(!n)throw Error(`modelJSON has weightsManifest but weightData is null`);r.weightSpecs=t,r.weightData=n}return e.signature!=null&&(r.signature=e.signature),e.userDefinedMetadata!=null&&(r.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(r.modelInitializer=e.modelInitializer),e.initializerSignature!=null&&(r.initializerSignature=e.initializerSignature),r}async function Wo(e,t){let n,r;return e.weightsManifest!=null&&([n,r]=await t(e.weightsManifest)),Uo(e,n,r)}function Go(e){if(e.modelTopology instanceof ArrayBuffer)throw Error(`Expected JSON model topology, received ArrayBuffer.`);return{dateSaved:new Date,modelTopologyType:`JSON`,modelTopologyBytes:e.modelTopology==null?0:Lo(JSON.stringify(e.modelTopology)),weightSpecsBytes:e.weightSpecs==null?0:Lo(JSON.stringify(e.weightSpecs)),weightDataBytes:e.weightData==null?0:new io(e.weightData).byteLength}}function Ko(e){let t=[];for(let n of e)t.push(...n.weights);return t}function qo(){let e=e=>{let t=e<<13,n=0;for(;!(t&8388608);)n-=8388608,t<<=1;return t&=-8388609,n+=947912704,t|n},t=new Uint32Array(2048);t[0]=0;for(let n=1;n<1024;n++)t[n]=e(n);for(let e=1024;e<2048;e++)t[e]=939524096+(e-1024<<13);return t}function Jo(){let e=new Uint32Array(64);e[0]=0,e[31]=1199570944,e[32]=2147483648,e[63]=3347054592;for(let t=1;t<31;t++)e[t]=t<<23;for(let t=33;t<63;t++)e[t]=2147483648+(t-32<<23);return e}function Yo(){let e=new Uint32Array(64);for(let t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}function Xo(){let e=qo(),t=Jo(),n=Yo();return r=>{let i=new ArrayBuffer(4*r.length),a=new Uint32Array(i);for(let i=0;i<r.length;i++){let o=r[i],s=e[n[o>>10]+(o&1023)]+t[o>>10];a[i]=s}return new Float32Array(i)}}var Zo,Qo,$o=o((()=>{Xa(),eo(),L(),no(),ao(),Oo(),Be(),Zo=4,Qo=typeof Buffer<`u`&&(typeof Blob>`u`||typeof atob>`u`||typeof btoa>`u`)})),es,ts,ns,rs,is,as=o((()=>{es=class e{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return e.instance??=new e,e.instance}static registerSaveRouter(t){e.getInstance().saveRouters.push(t)}static registerLoadRouter(t){e.getInstance().loadRouters.push(t)}static getSaveHandlers(t){return e.getHandlers(t,`save`)}static getLoadHandlers(t,n){return e.getHandlers(t,`load`,n)}static getHandlers(t,n,r){let i=[];return(n===`load`?e.getInstance().loadRouters:e.getInstance().saveRouters).forEach(e=>{let n=e(t,r);n!==null&&i.push(n)}),i}},ts=e=>es.registerSaveRouter(e),ns=e=>es.registerLoadRouter(e),rs=e=>es.getSaveHandlers(e),is=(e,t)=>es.getLoadHandlers(e,t)}));function os(){if(!P().getBool(`IS_BROWSER`))throw Error(`Failed to obtain IndexedDB factory because the current environmentis not a web browser.`);let e=typeof window>`u`?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(t==null)throw Error(`The current browser does not appear to support IndexedDB.`);return t}function ss(e){let t=e.result;t.createObjectStore(fs,{keyPath:`modelPath`}),t.createObjectStore(ps,{keyPath:`modelPath`})}function cs(e){return new ms(e)}function ls(e){return e.startsWith(ms.URL_SCHEME)?e.slice(ms.URL_SCHEME.length):e}var us,ds,fs,ps,ms,hs,gs,_s=o((()=>{Ha(),Be(),$o(),as(),ao(),us=`tensorflowjs`,ds=1,fs=`models_store`,ps=`model_info_store`,ms=class{constructor(e){if(this.indexedDB=os(),e==null||!e)throw Error(`For IndexedDB, modelPath must not be null, undefined or empty.`);this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error(`BrowserLocalStorage.save() does not support saving model topology in binary formats yet.`);return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,t){return new Promise((e,n)=>{let r=this.indexedDB.open(us,ds);r.onupgradeneeded=()=>ss(r),r.onsuccess=()=>{let i=r.result;if(t==null){let t=i.transaction(fs,`readonly`),r=t.objectStore(fs).get(this.modelPath);r.onsuccess=()=>{if(r.result==null)return i.close(),n(Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));e(r.result.modelArtifacts)},r.onerror=e=>(i.close(),n(r.error)),t.oncomplete=()=>i.close()}else{t.weightData=io.join(t.weightData);let r=Go(t),a=i.transaction(ps,`readwrite`),o=a.objectStore(ps),s;try{s=o.put({modelPath:this.modelPath,modelArtifactsInfo:r})}catch(e){return n(e)}let c;s.onsuccess=()=>{c=i.transaction(fs,`readwrite`);let s=c.objectStore(fs),l;try{l=s.put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:r})}catch(e){return n(e)}l.onsuccess=()=>e({modelArtifactsInfo:r}),l.onerror=e=>{o=a.objectStore(ps);let t=o.delete(this.modelPath);t.onsuccess=()=>(i.close(),n(l.error)),t.onerror=e=>(i.close(),n(l.error))}},s.onerror=e=>(i.close(),n(s.error)),a.oncomplete=()=>{c==null?i.close():c.oncomplete=()=>i.close()}}},r.onerror=e=>n(r.error)})}},ms.URL_SCHEME=`indexeddb://`,hs=e=>P().getBool(`IS_BROWSER`)&&!Array.isArray(e)&&e.startsWith(ms.URL_SCHEME)?cs(e.slice(ms.URL_SCHEME.length)):null,es.registerSaveRouter(hs),es.registerLoadRouter(hs),gs=class{constructor(){this.indexedDB=os()}async listModels(){return new Promise((e,t)=>{let n=this.indexedDB.open(us,ds);n.onupgradeneeded=()=>ss(n),n.onsuccess=()=>{let r=n.result,i=r.transaction(ps,`readonly`),a=i.objectStore(ps).getAll();a.onsuccess=()=>{let t={};for(let e of a.result)t[e.modelPath]=e.modelArtifactsInfo;e(t)},a.onerror=e=>(r.close(),t(a.error)),i.oncomplete=()=>r.close()},n.onerror=e=>t(n.error)})}async removeModel(e){return e=ls(e),new Promise((t,n)=>{let r=this.indexedDB.open(us,ds);r.onupgradeneeded=()=>ss(r),r.onsuccess=()=>{let i=r.result,a=i.transaction(ps,`readwrite`),o=a.objectStore(ps),s=o.get(e),c;s.onsuccess=()=>{if(s.result==null)return i.close(),n(Error(`Cannot find model with path '${e}' in IndexedDB.`));{let r=o.delete(e),a=()=>{c=i.transaction(fs,`readwrite`);let r=c.objectStore(fs).delete(e);r.onsuccess=()=>t(s.result.modelArtifactsInfo),r.onerror=e=>n(s.error)};r.onsuccess=a,r.onerror=e=>(a(),i.close(),n(s.error))}},s.onerror=e=>(i.close(),n(s.error)),a.oncomplete=()=>{c==null?i.close():c.oncomplete=()=>i.close()}},r.onerror=e=>n(r.error)})}}}));function vs(e){return{info:[ws,e,Ts].join(Cs),topology:[ws,e,Es].join(Cs),weightSpecs:[ws,e,Ds].join(Cs),weightData:[ws,e,Os].join(Cs),modelMetadata:[ws,e,ks].join(Cs)}}function ys(e){for(let t of Object.values(e))window.localStorage.removeItem(t)}function bs(e){let t=e.split(Cs);if(t.length<3)throw Error(`Invalid key format: ${e}`);return t.slice(1,t.length-1).join(Cs)}function xs(e){return e.startsWith(As.URL_SCHEME)?e.slice(As.URL_SCHEME.length):e}function Ss(e){return new As(e)}var Cs,ws,Ts,Es,Ds,Os,ks,As,js,Ms,Ns=o((()=>{Ha(),Be(),L(),$o(),ao(),as(),Cs=`/`,ws=`tensorflowjs_models`,Ts=`info`,Es=`model_topology`,Ds=`weight_specs`,Os=`weight_data`,ks=`model_metadata`,As=class{constructor(e){if(!P().getBool(`IS_BROWSER`)||typeof window>`u`||window.localStorage===void 0)throw Error(`The current environment does not support local storage.`);if(this.LS=window.localStorage,e==null||!e)throw Error(`For local storage, modelPath must not be null, undefined or empty.`);this.modelPath=e,this.keys=vs(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error(`BrowserLocalStorage.save() does not support saving model topology in binary formats yet.`);{let t=JSON.stringify(e.modelTopology),n=JSON.stringify(e.weightSpecs),r=Go(e),i=io.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(r)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,n),this.LS.setItem(this.keys.weightData,Ro(i));let a={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:e.signature==null?void 0:e.signature,userDefinedMetadata:e.userDefinedMetadata==null?void 0:e.userDefinedMetadata,modelInitializer:e.modelInitializer==null?void 0:e.modelInitializer,initializerSignature:e.initializerSignature==null?void 0:e.initializerSignature,trainingConfig:e.trainingConfig==null?void 0:e.trainingConfig};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(a)),{modelArtifactsInfo:r}}catch{throw ys(this.keys),Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${r.modelTopologyBytes}, weightSpecsBytes=${r.weightSpecsBytes}, weightDataBytes=${r.weightDataBytes}.`)}}}async load(){let e=JSON.parse(this.LS.getItem(this.keys.info));if(e==null)throw Error(`In local storage, there is no model with name '${this.modelPath}'`);if(e.modelTopologyType!==`JSON`)throw Error(`BrowserLocalStorage does not support loading non-JSON model topology yet.`);let t={},n=JSON.parse(this.LS.getItem(this.keys.topology));if(n==null)throw Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=n;let r=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(r==null)throw Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=r;let i=this.LS.getItem(this.keys.modelMetadata);if(i!=null){let e=JSON.parse(i);t.format=e.format,t.generatedBy=e.generatedBy,t.convertedBy=e.convertedBy,e.signature!=null&&(t.signature=e.signature),e.userDefinedMetadata!=null&&(t.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(t.modelInitializer=e.modelInitializer),e.initializerSignature!=null&&(t.initializerSignature=e.initializerSignature),e.trainingConfig!=null&&(t.trainingConfig=e.trainingConfig)}let a=this.LS.getItem(this.keys.weightData);if(a==null)throw Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=zo(a),t}},As.URL_SCHEME=`localstorage://`,js=e=>P().getBool(`IS_BROWSER`)&&!Array.isArray(e)&&e.startsWith(As.URL_SCHEME)?Ss(e.slice(As.URL_SCHEME.length)):null,es.registerSaveRouter(js),es.registerLoadRouter(js),Ms=class{constructor(){E(P().getBool(`IS_BROWSER`),()=>`Current environment is not a web browser`),E(typeof window>`u`||window.localStorage!==void 0,()=>`Current browser does not appear to support localStorage`),this.LS=window.localStorage}async listModels(){let e={};for(let t=0;t<this.LS.length;++t){let n=this.LS.key(t);if(n.startsWith(`tensorflowjs_models/`)&&n.endsWith(`/info`)){let t=bs(n);e[t]=JSON.parse(this.LS.getItem(n))}}return e}async removeModel(e){e=xs(e);let t=vs(e);if(this.LS.getItem(t.info)==null)throw Error(`Cannot find model at path '${e}'`);let n=JSON.parse(this.LS.getItem(t.info));return ys(t),n}}}));function Ps(e){if(e.indexOf(Bs)===-1)throw Error(`The url string provided does not contain a scheme. Supported schemes are: ${Vs.getSchemes().join(`,`)}`);return{scheme:e.split(Bs)[0],path:e.split(Bs)[1]}}async function Fs(e,t,n=!1){E(e!==t,()=>`Old path and new path are the same: '${e}'`);let r=es.getLoadHandlers(e);E(r.length>0,()=>`Copying failed because no load handler is found for source URL ${e}.`),E(r.length<2,()=>`Copying failed because more than one (${r.length}) load handlers for source URL ${e}.`);let i=r[0],a=es.getSaveHandlers(t);E(a.length>0,()=>`Copying failed because no save handler is found for destination URL ${t}.`),E(a.length<2,()=>`Copying failed because more than one (${r.length}) save handlers for destination URL ${t}.`);let o=a[0],s=Ps(e).scheme,c=Ps(e).path,l=s===Ps(e).scheme,u=await i.load();n&&l&&await Vs.getManager(s).removeModel(c);let d=await o.save(u);return n&&!l&&await Vs.getManager(s).removeModel(c),d.modelArtifactsInfo}async function Is(){let e=Vs.getSchemes(),t={};for(let n of e){let e=await Vs.getManager(n).listModels();for(let r in e){let i=n+Bs+r;t[i]=e[r]}}return t}async function Ls(e){let t=Ps(e);return Vs.getManager(t.scheme).removeModel(t.path)}async function Rs(e,t){return Fs(e,t,!1)}async function zs(e,t){return Fs(e,t,!0)}var Bs,Vs,Hs=o((()=>{L(),as(),Bs=`://`,Vs=class e{constructor(){this.managers={}}static getInstance(){return e.instance??=new e,e.instance}static registerManager(t,n){E(t!=null,()=>`scheme must not be undefined or null.`),t.endsWith(Bs)&&(t=t.slice(0,t.indexOf(Bs))),E(t.length>0,()=>`scheme must not be an empty string.`);let r=e.getInstance();E(r.managers[t]==null,()=>`A model store manager is already registered for scheme '${t}'.`),r.managers[t]=n}static getManager(t){let n=e.getInstance().managers[t];if(n==null)throw Error(`Cannot find model manager for scheme '${t}'`);return n}static getSchemes(){return Object.keys(e.getInstance().managers)}}})),Us,Ws=o((()=>{if(Ha(),Be(),_s(),Ns(),Hs(),oi(),Us=class{constructor(){this.messageName=`setTimeoutCustom`,this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if(t!==`utf-8`&&t!==`utf8`)throw Error(`Browser's encoder only supports utf-8, but got ${t}`);return this.textEncoder??=new TextEncoder,this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}setTimeoutCustom(e,t){if(typeof window>`u`||!P().getBool(`USE_SETTIMEOUTCUSTOM`)){setTimeout(e,t);return}this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},`*`)},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener(`message`,e=>{if(e.source===window&&e.data.name===this.messageName){e.stopPropagation();let t=this.functionRefs[e.data.index];t(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(e){return ai(e)}},P().get(`IS_BROWSER`)){P().setPlatform(`browser`,new Us);try{Vs.registerManager(As.URL_SCHEME,new Ms)}catch{}try{Vs.registerManager(ms.URL_SCHEME,new gs)}catch{}}})),Gs=s(((e,t)=>{t.exports={}})),Ks,qs,Js,Ys=o((()=>{Be(),Ks={importFetch:()=>Gs()},Js=class{constructor(){this.util=Gs(),this.textEncoder=new this.util.TextEncoder}fetch(e,t){return P().global.fetch==null?(qs??=Ks.importFetch(),qs(e,t)):P().global.fetch(e,t)}now(){let e=process.hrtime();return e[0]*1e3+e[1]/1e6}encode(e,t){if(t!==`utf-8`&&t!==`utf8`)throw Error(`Node built-in encoder only supports utf-8, but got ${t}`);return this.textEncoder.encode(e)}decode(e,t){return e.length===0?``:new this.util.TextDecoder(t).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}},P().get(`IS_NODE`)&&!P().get(`IS_BROWSER`)&&P().setPlatform(`node`,new Js)}));function Xs(e,t=`float32`,n){return t||=`float32`,Oe(e),new ra(e,t,n)}var Zs=o((()=>{ca(),L()}));function Qs(e,t){let n=B(e,`x`,`cast`);if(!fe(t))throw Error(`Failed to cast to unknown dtype ${t}`);if(t===`string`&&n.dtype!==`string`||t!==`string`&&n.dtype===`string`)throw Error(`Only strings can be casted to strings`);let r={x:n},i={dtype:t};return R.runKernel(dt,r,i)}var $s,ec=o((()=>{z(),I(),V(),L(),U(),$s=H({cast_:Qs})}));function tc(e){let t={x:B(e,`x`,`clone`,`string_or_numeric`)};return R.runKernel(Qt,t)}var nc,rc=o((()=>{z(),I(),V(),U(),nc=H({clone_:tc})}));function ic(e,t=!1){console.log(e.toString(t))}var ac=o((()=>{})),oc=o((()=>{z(),Ha(),Ws(),Ys(),Zs(),ec(),rc(),ac(),ca(),Aa(),ta({buffer:Xs,cast:$s,clone:nc,print:ic})}));function sc(e,t){let n=B(e,`a`,`add`),r=B(t,`b`,`add`);[n,r]=xa(n,r);let i={a:n,b:r};return R.runKernel(`Add`,i)}var W,cc=o((()=>{z(),I(),Da(),V(),U(),W=H({add_:sc})}));function lc(e,t){let n=B(e,`a`,`floorDiv`),r=B(t,`b`,`floorDiv`);[n,r]=xa(n,r);let i={a:n,b:r};return R.runKernel(Kt,i)}var uc,dc=o((()=>{z(),I(),Da(),V(),U(),uc=H({floorDiv_:lc})}));function fc(e,t){let n=B(e,`a`,`div`),r=B(t,`b`,`div`);if([n,r]=xa(n,r),n.dtype===`int32`&&r.dtype===`int32`)return uc(n,r);let i={a:n,b:r};return R.runKernel(Lt,i,{})}var pc,mc=o((()=>{z(),I(),Da(),V(),dc(),U(),pc=H({div_:fc})}));function hc(e,t){let n=B(e,`a`,`mul`),r=B(t,`b`,`mul`);[n,r]=xa(n,r);let i={a:n,b:r};return R.runKernel(On,i)}var G,gc=o((()=>{z(),I(),Da(),V(),U(),G=H({mul_:hc})}));function _c(e){let t=B(e,`x`,`abs`);if(t.dtype===`complex64`){let e={x:t};return R.runKernel(ht,e)}{let e={x:t};return R.runKernel(`Abs`,e)}}var vc,yc=o((()=>{z(),I(),V(),U(),vc=H({abs_:_c})}));function bc(e){let t={x:B(e,`x`,`acos`)};return R.runKernel(Ke,t)}var xc,Sc=o((()=>{z(),I(),V(),U(),xc=H({acos_:bc})}));function Cc(e){let t={x:B(e,`x`,`acosh`)};return R.runKernel(qe,t)}var wc,Tc=o((()=>{z(),I(),V(),U(),wc=H({acosh_:Cc})}));function Ec(e){E(Array.isArray(e),()=>`The argument passed to tf.addN() must be a list of tensors`),E(e.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${e.length}`);let t=e.map((e,t)=>B(e,`tensors${t}`,`addN`)),n=t[0];t.forEach(e=>{if(e.dtype!==n.dtype)throw Error(`All tensors passed to tf.addN() must have the same dtype`)}),t.forEach(e=>{if(!A(e.shape,n.shape))throw Error(`All tensors passed to tf.addN() must have the same shape`)});let r=t;return R.runKernel(Je,r)}var Dc,Oc=o((()=>{z(),I(),V(),L(),U(),Dc=H({addN_:Ec})}));function kc(e,t=null,n=!1){let r={x:B(e,`x`,`all`,`bool`)},i={axis:t,keepDims:n};return R.runKernel(`All`,r,i)}var Ac,jc=o((()=>{z(),I(),V(),U(),Ac=H({all_:kc})}));function Mc(e,t=null,n=!1){let r={x:B(e,`x`,`any`,`bool`)},i={axis:t,keepDims:n};return R.runKernel(`Any`,r,i)}var Nc,Pc=o((()=>{z(),I(),V(),U(),Nc=H({any_:Mc})}));function Fc(e,t=0){let n={x:B(e,`x`,`argMax`)},r={axis:t};return R.runKernel(Ye,n,r)}var Ic,Lc=o((()=>{z(),I(),V(),U(),Ic=H({argMax_:Fc})}));function Rc(e,t=0){let n={x:B(e,`x`,`argMin`)},r={axis:t};return R.runKernel(F,n,r)}var zc,Bc=o((()=>{z(),I(),V(),U(),zc=H({argMin_:Rc})}));function Vc(e){let t={x:B(e,`x`,`asin`)};return R.runKernel(Xe,t)}var Hc,Uc=o((()=>{z(),I(),V(),U(),Hc=H({asin_:Vc})}));function Wc(e){let t={x:B(e,`x`,`asinh`)};return R.runKernel(Ze,t)}var Gc,Kc=o((()=>{z(),I(),V(),U(),Gc=H({asinh_:Wc})}));function qc(e){let t={x:B(e,`x`,`atan`)};return R.runKernel(Qe,t)}var Jc,Yc=o((()=>{z(),I(),V(),U(),Jc=H({atan_:qc})}));function Xc(e,t){let n=B(e,`a`,`atan2`),r=B(t,`b`,`atan2`);[n,r]=xa(n,r);let i={a:n,b:r};return R.runKernel(et,i)}var Zc,Qc=o((()=>{z(),I(),Da(),V(),U(),Zc=H({atan2_:Xc})}));function $c(e){let t={x:B(e,`x`,`atanh`)};return R.runKernel($e,t)}var el,tl=o((()=>{z(),I(),V(),U(),el=H({atanh_:$c})}));function nl(e,t,n,r,i=`NHWC`,a){let o=e[3];return al(e,[...t,o],n,a,r,null,null,yl(i))}function rl(e,t,n,r,i,a,o=`channelsLast`){let[s,c]=ul(t),l;if(o===`channelsLast`)l=[s,c,e[3],e[3]];else if(o===`channelsFirst`)l=[s,c,e[1],e[1]];else throw Error(`Unknown dataFormat ${o}`);return al(e,l,n,r,i,a,!1,o)}function il(e,t,n,r,i,a,o=`NDHWC`){let[s,c,l]=dl(t),u,d;if(o===`NDHWC`)d=`channelsLast`,u=[s,c,l,e[4],e[4]];else if(o===`NCDHW`)d=`channelsFirst`,u=[s,c,l,e[1],e[1]];else throw Error(`Unknown dataFormat ${o}`);return ol(e,u,n,r,i,!1,d,a)}function al(e,t,n,r,i,a,o=!1,s=`channelsLast`){let[c,l,u,d]=[-1,-1,-1,-1];if(s===`channelsLast`)[c,l,u,d]=e;else if(s===`channelsFirst`)[c,d,l,u]=e;else throw Error(`Unknown dataFormat ${s}`);let[f,p,,m]=t,[h,g]=ul(n),[_,v]=ul(r),y=fl(f,_),b=fl(p,v),{padInfo:x,outHeight:S,outWidth:C}=pl(i,l,u,h,g,y,b,a,s),w=o?m*d:m,T;return s===`channelsFirst`?T=[c,w,S,C]:s===`channelsLast`&&(T=[c,S,C,w]),{batchSize:c,dataFormat:s,inHeight:l,inWidth:u,inChannels:d,outHeight:S,outWidth:C,outChannels:w,padInfo:x,strideHeight:h,strideWidth:g,filterHeight:f,filterWidth:p,effectiveFilterHeight:y,effectiveFilterWidth:b,dilationHeight:_,dilationWidth:v,inShape:e,outShape:T,filterShape:t}}function ol(e,t,n,r,i,a=!1,o=`channelsLast`,s){let[c,l,u,d,f]=[-1,-1,-1,-1,-1];if(o===`channelsLast`)[c,l,u,d,f]=e;else if(o===`channelsFirst`)[c,f,l,u,d]=e;else throw Error(`Unknown dataFormat ${o}`);let[p,m,h,,g]=t,[_,v,y]=dl(n),[b,x,S]=dl(r),C=fl(p,b),w=fl(m,x),T=fl(h,S),{padInfo:E,outDepth:D,outHeight:O,outWidth:k}=ml(i,l,u,d,_,v,y,C,w,T,s),ee=a?g*f:g,te;return o===`channelsFirst`?te=[c,ee,D,O,k]:o===`channelsLast`&&(te=[c,D,O,k,ee]),{batchSize:c,dataFormat:o,inDepth:l,inHeight:u,inWidth:d,inChannels:f,outDepth:D,outHeight:O,outWidth:k,outChannels:ee,padInfo:E,strideDepth:_,strideHeight:v,strideWidth:y,filterDepth:p,filterHeight:m,filterWidth:h,effectiveFilterDepth:C,effectiveFilterHeight:w,effectiveFilterWidth:T,dilationDepth:b,dilationHeight:x,dilationWidth:S,inShape:e,outShape:te,filterShape:t}}function sl(e,t,n,r,i){r??=ll(e,t,n);let a=e[0],o=e[1];return[hl((a-t+2*r)/n+1,i),hl((o-t+2*r)/n+1,i)]}function cl(e,t,n,r,i,a){i??=ll(e,t[0],r[0]);let o=[0,0,0,n];for(let n=0;n<3;n++)e[n]+2*i>=t[n]&&(o[n]=hl((e[n]-t[n]+2*i)/r[n]+1,a));return o}function ll(e,t,n,r=1){let i=fl(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)}function ul(e){return typeof e==`number`?[e,e,e]:e.length===2?[e[0],e[1],1]:e}function dl(e){return typeof e==`number`?[e,e,e]:e}function fl(e,t){return t<=1?e:e+(e-1)*(t-1)}function pl(e,t,n,r,i,a,o,s,c){let l,u,d;if(typeof e==`number`){l={top:e,bottom:e,left:e,right:e,type:e===0?`VALID`:`NUMBER`};let i=sl([t,n],a,r,e,s);u=i[0],d=i[1]}else if(e===`same`){u=Math.ceil(t/r),d=Math.ceil(n/i);let e=Math.max(0,(u-1)*r+a-t),s=Math.max(0,(d-1)*i+o-n),c=Math.floor(e/2),f=e-c,p=Math.floor(s/2);l={top:c,bottom:f,left:p,right:s-p,type:`SAME`}}else if(e===`valid`)l={top:0,bottom:0,left:0,right:0,type:`VALID`},u=Math.ceil((t-a+1)/r),d=Math.ceil((n-o+1)/i);else if(typeof e==`object`){let f=c===`channelsLast`?e[1][0]:e[2][0],p=c===`channelsLast`?e[1][1]:e[2][1],m=c===`channelsLast`?e[2][0]:e[3][0],h=c===`channelsLast`?e[2][1]:e[3][1];l={top:f,bottom:p,left:m,right:h,type:f===0&&p===0&&m===0&&h===0?`VALID`:`EXPLICIT`},u=hl((t-a+f+p)/r+1,s),d=hl((n-o+m+h)/i+1,s)}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:l,outHeight:u,outWidth:d}}function ml(e,t,n,r,i,a,o,s,c,l,u){let d,f,p,m;if(e===`valid`&&(e=0),typeof e==`number`){d={top:e,bottom:e,left:e,right:e,front:e,back:e,type:e===0?`VALID`:`NUMBER`};let h=cl([t,n,r,1],[s,c,l],1,[i,a,o],e,u);f=h[0],p=h[1],m=h[2]}else if(e===`same`){f=Math.ceil(t/i),p=Math.ceil(n/a),m=Math.ceil(r/o);let e=(f-1)*i+s-t,u=(p-1)*a+c-n,h=(m-1)*o+l-r,g=Math.floor(e/2),_=e-g,v=Math.floor(u/2),y=u-v,b=Math.floor(h/2);d={top:v,bottom:y,left:b,right:h-b,front:g,back:_,type:`SAME`}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:f,outHeight:p,outWidth:m}}function hl(e,t){if(!t)return Math.trunc(e);switch(t){case`round`:return Math.round(e);case`ceil`:return Math.ceil(e);case`floor`:return Math.floor(e);default:throw Error(`Unknown roundingMode ${t}`)}}function gl(e){let[t,n,r]=ul(e);return t===1&&n===1&&r===1}function _l(e,t){return gl(e)||gl(t)}function vl(e){return ul(e).every(e=>e>0)}function yl(e){if(e===`NHWC`)return`channelsLast`;if(e===`NCHW`)return`channelsFirst`;throw Error(`Unknown dataFormat ${e}`)}function bl(e,t,n){if(n!=null){if(typeof t==`string`)throw Error(`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);if(typeof t==`number`)E(ne(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);else if(typeof t==`object`)t.forEach(t=>{t.forEach(t=>{E(ne(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`)})});else throw Error(`Error in ${e}: Unknown padding parameter: ${t}`)}}var xl=o((()=>{L()}));function Sl(e,t){let n={x:B(e,`x`,`reshape`,`string_or_numeric`)},r={shape:t};return R.runKernel(qn,n,r)}var K,q=o((()=>{z(),I(),V(),U(),K=H({reshape_:Sl})}));function Cl(e,t,n,r,i){let a=B(e,`x`,`avgPool`,`float32`);E(_l(n,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${n} and dilations '1'`);let o=a,s=!1;a.rank===3&&(s=!0,o=K(a,[1,a.shape[0],a.shape[1],a.shape[2]])),E(o.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${o.rank}.`),bl(`avgPool`,r,i);let c={x:o},l={filterSize:t,strides:n,pad:r,dimRoundingMode:i},u=R.runKernel(tt,c,l);return u=$s(u,a.dtype),s?K(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var wl,Tl=o((()=>{z(),I(),V(),L(),ec(),xl(),U(),q(),wl=H({avgPool_:Cl})}));function El(e,t,n,r,i,a=`NDHWC`){let o=B(e,`x`,`avgPool3d`,`float32`),s=o,c=!1;o.rank===4&&(c=!0,s=K(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),E(s.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${s.rank}.`),E(a===`NDHWC`,()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),E(typeof n==`number`&&n>0||Array.isArray(n)&&n[0]>0&&n[1]>0&&n[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${n}'`),bl(`avgPool3d`,r,i);let l={x:s},u={filterSize:t,strides:n,pad:r,dimRoundingMode:i,dataFormat:a},d=R.runKernel(rt,l,u);return d=$s(d,s.dtype),c?K(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}var Dl,Ol=o((()=>{z(),I(),V(),L(),ec(),xl(),U(),q(),Dl=H({avgPool3d_:El})}));function kl(e,t=0){E(e.length>=1,()=>`Pass at least one tensor to concat`);let n=Ka(e,`tensors`,`concat`,`string_or_numeric`);if(n[0].dtype===`complex64`&&n.forEach(e=>{if(e.dtype!==`complex64`)throw Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${e.dtype}. `)}),n.length===1)return nc(n[0]);let r=n,i={axis:t};return R.runKernel(gt,r,i)}var Al,jl=o((()=>{z(),I(),V(),L(),rc(),U(),Al=H({concat_:kl})}));function Ml(e,t,n=!1,r=!1){let i=B(e,`a`,`matMul`),a=B(t,`b`,`matMul`);[i,a]=xa(i,a);let o={a:i,b:a},s={transposeA:n,transposeB:r};return R.runKernel(at,o,s)}var Nl,Pl=o((()=>{z(),I(),Da(),V(),U(),Nl=H({matMul_:Ml})}));function Fl(e){let t={x:B(e,`x`,`sigmoid`,`float32`)};return R.runKernel(ur,t)}var Il,Ll=o((()=>{z(),I(),V(),U(),Il=H({sigmoid_:Fl})}));function Rl(e,t,n){let r=B(e,`x`,`slice`,`string_or_numeric`);if(r.rank===0)throw Error(`Slicing scalar is not possible`);let i={x:r},a={begin:t,size:n};return R.runKernel(sr,i,a)}var zl,Bl=o((()=>{z(),I(),V(),U(),zl=H({slice_:Rl})}));function Vl(e){let t={x:B(e,`x`,`tanh`,`float32`)};return R.runKernel(Or,t)}var Hl,Ul=o((()=>{z(),I(),V(),U(),Hl=H({tanh_:Vl})}));function Wl(e,t,n,r,i,a){let o=B(e,`forgetBias`,`basicLSTMCell`),s=B(t,`lstmKernel`,`basicLSTMCell`),c=B(n,`lstmBias`,`basicLSTMCell`),l=B(r,`data`,`basicLSTMCell`),u=B(i,`c`,`basicLSTMCell`),d=B(a,`h`,`basicLSTMCell`),f=Al([l,d],1),p=Nl(f,s),m=W(p,c),h=m.shape[0],g=m.shape[1]/4,_=[h,g],v=zl(m,[0,0],_),y=zl(m,[0,g],_),b=zl(m,[0,g*2],_),x=zl(m,[0,g*3],_),S=W(G(Il(v),Hl(y)),G(u,Il(W(o,b))));return[S,G(Hl(S),Il(x))]}var Gl,Kl=o((()=>{V(),cc(),jl(),Pl(),gc(),U(),Ll(),Bl(),Ul(),Gl=H({basicLSTMCell_:Wl})}));function ql(e,t,n){let r=B(e,`x`,`batchToSpaceND`),i=t.reduce((e,t)=>e*t);E(r.rank>=1+t.length,()=>`input rank is ${r.rank} but should be > than blockShape.length ${t.length}`),E(n.length===t.length,()=>`crops.length is ${n.length} but should be equal to blockShape.length  ${t.length}`),E(r.shape[0]%i===0,()=>`input tensor batch is ${r.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(` * `)} === ${i}`);let a={x:r},o={blockShape:t,crops:n};return R.runKernel(ot,a,o)}var Jl,Yl=o((()=>{z(),I(),V(),L(),U(),Jl=H({batchToSpaceND_:ql})}));function Xl(e){let t;return t=e.rank===0||e.rank===1?K(e,[1,1,1,e.size]):e.rank===2?K(e,[1,1,e.shape[0],e.shape[1]]):e.rank===3?K(e,[1,e.shape[0],e.shape[1],e.shape[2]]):e,t}var Zl=o((()=>{q()}));function Ql(e,t,n,r,i,a){a??=.001;let o=B(e,`x`,`batchNorm`),s=B(t,`mean`,`batchNorm`),c=B(n,`variance`,`batchNorm`),l;i!=null&&(l=B(i,`scale`,`batchNorm`));let u;r!=null&&(u=B(r,`offset`,`batchNorm`)),E(s.rank===c.rank,()=>`Batch normalization gradient requires mean and variance to have equal ranks.`),E(u==null||s.rank===u.rank,()=>`Batch normalization gradient requires mean and offset to have equal ranks.`),E(l==null||s.rank===l.rank,()=>`Batch normalization gradient requires mean and scale to have equal ranks.`);let d={x:Xl(o),scale:l,offset:u,mean:s,variance:c},f={varianceEpsilon:a},p=R.runKernel(qt,d,f);return K(p,o.shape)}var $l,eu=o((()=>{z(),I(),V(),L(),Zl(),U(),q(),$l=H({batchNorm_:Ql})}));function tu(e,t,n,r,i,a){let o=B(e,`x`,`batchNorm`),s=B(t,`mean`,`batchNorm`),c=B(n,`variance`,`batchNorm`),l;i!=null&&(l=B(i,`scale`,`batchNorm`));let u;return r!=null&&(u=B(r,`offset`,`batchNorm`)),E(o.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${o.rank}.`),E(s.rank===2||s.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${s.rank}.`),E(c.rank===2||c.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${c.rank}.`),l!=null&&E(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${l.rank}.`),u!=null&&E(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${u.rank}.`),$l(o,s,c,u,l,a)}var nu,ru=o((()=>{V(),L(),eu(),U(),nu=H({batchNorm2d_:tu})}));function iu(e,t,n,r,i,a){let o=B(e,`x`,`batchNorm`),s=B(t,`mean`,`batchNorm`),c=B(n,`variance`,`batchNorm`),l;i!=null&&(l=B(i,`scale`,`batchNorm`));let u;return r!=null&&(u=B(r,`offset`,`batchNorm`)),E(o.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${o.rank}.`),E(s.rank===3||s.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${s.rank}.`),E(c.rank===3||c.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${c.rank}.`),l!=null&&E(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${l.rank}.`),u!=null&&E(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${u.rank}.`),$l(o,s,c,u,l,a)}var au,ou=o((()=>{V(),L(),eu(),U(),au=H({batchNorm3d_:iu})}));function su(e,t,n,r,i,a){let o=B(e,`x`,`batchNorm`),s=B(t,`mean`,`batchNorm`),c=B(n,`variance`,`batchNorm`),l;i!=null&&(l=B(i,`scale`,`batchNorm`));let u;return r!=null&&(u=B(r,`offset`,`batchNorm`)),E(o.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${o.rank}.`),E(s.rank===4||s.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${s.rank}.`),E(c.rank===4||c.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${c.rank}.`),l!=null&&E(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${l.rank}.`),u!=null&&E(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${u.rank}.`),$l(o,s,c,u,l,a)}var cu,lu=o((()=>{V(),L(),eu(),U(),cu=H({batchNorm4d_:su})}));function uu(e,t,n){let r=B(e,`x`,`bincount`),i=B(t,`weights`,`bincount`);E(r.dtype===`int32`,()=>`Error in bincount: input dtype must be int32, but got ${r.dtype}`),E(n>=0,()=>`size must be non-negative, but got ${n}.`),E(i.size===r.size||i.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${r.shape}, weights shape: ${i.shape}.`);let a={x:r,weights:i},o={size:n};return R.runKernel(st,a,o)}var du,fu=o((()=>{z(),I(),V(),L(),U(),du=H({bincount_:uu})}));function pu(e,t){let n=B(e,`x`,`bitwiseAnd`),r=B(t,`y`,`bitwiseAnd`);if(!A(n.shape,r.shape))throw Error(`BitwiseAnd: Tensors must have the same shape. x: ${n.shape}, y: ${r.shape}`);if(n.dtype!==`int32`||r.dtype!==`int32`)throw Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${n.dtype} and type of y: ${r.dtype}`);let i={a:n,b:r};return R.runKernel(ct,i)}var mu,hu=o((()=>{z(),I(),V(),Me(),U(),mu=H({bitwiseAnd_:pu})}));function gu(e,t){let n=B(e,`s0`,`broadcastArgs`,`int32`),r=B(t,`s1`,`broadcastArgs`,`int32`);if(n.rank!==1)throw Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${n.rank}`);if(r.rank!==1)throw Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${r.rank}`);let i={s0:n,s1:r};return R.runKernel(ut,i)}var _u,vu=o((()=>{z(),I(),V(),U(),_u=H({broadcastArgs_:gu})}));function yu(e,t){let n=B(e,`broadcastTo`,`x`),r=n.shape;if(Oe(t),t.length<n.rank)throw Error(`broadcastTo(): shape.length=${t.length} < input.rank=${n.rank}.`);if(t.length>n.rank){let e=n.shape.slice();for(;e.length<t.length;)e.unshift(1);n=K(n,e)}let i=n.shape,a=Array.from(t);for(let e=t.length-1;e>=0;e--)if(i[e]===t[e])a[e]=1;else if(n.shape[e]!==1)throw Error(`broadcastTo(): [${r}] cannot be broadcast to [${t}].`);if(a.map((e,t)=>e>1?t:-1).filter(e=>e>=0).length===0)return nc(n);let o={x:n},s={reps:a};return R.runKernel(kr,o,s)}var bu,xu=o((()=>{z(),I(),V(),Me(),rc(),U(),q(),bu=H({broadcastTo_:yu})}));function Su(e){let t={x:B(e,`x`,`ceil`,`float32`)};return R.runKernel(ft,t)}var Cu,wu=o((()=>{z(),I(),V(),U(),Cu=H({ceil_:Su})}));function Tu(e,t,n){Oe(e),n||=ye(t);let r={shape:e,value:t,dtype:n};return R.runKernel(Ut,{},r)}var Eu=o((()=>{z(),I(),L(),Me()}));function Du(e,t,n){let r=B(e,`x`,`clipByValue`);if(E(t<=n,()=>`Error in clip: min (${t}) must be less than or equal to max (${n}).`),t===n)return Tu(r.shape,t,r.dtype);let i={x:r},a={clipValueMin:t,clipValueMax:n};return R.runKernel(pt,i,a)}var Ou,ku=o((()=>{z(),I(),V(),L(),Eu(),U(),Ou=H({clipByValue_:Du})}));function Au(e){return Al(e,0)}var ju,Mu=o((()=>{jl(),U(),ju=H({concat1d_:Au})}));function Nu(e,t){return Al(e,t)}var Pu,Fu=o((()=>{jl(),U(),Pu=H({concat2d_:Nu})}));function Iu(e,t){return Al(e,t)}var Lu,Ru=o((()=>{jl(),U(),Lu=H({concat3d_:Iu})}));function zu(e,t){return Al(e,t)}var Bu,Vu=o((()=>{jl(),U(),Bu=H({concat4d_:zu})}));function Hu(e,t,n,r,i=`NHWC`,a=[1,1],o){let s=B(e,`x`,`conv2d`,`float32`),c=B(t,`filter`,`conv2d`,`float32`),l=s,u=!1;s.rank===3&&(u=!0,l=K(s,[1,s.shape[0],s.shape[1],s.shape[2]])),E(l.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${l.rank}.`),E(c.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${c.rank}.`),bl(`conv2d`,r,o);let d=i===`NHWC`?l.shape[3]:l.shape[1];E(d===c.shape[2],()=>`Error in conv2d: depth of input (${d}) must match input depth for filter ${c.shape[2]}.`),E(_l(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),E(vl(a),()=>`Error in conv2D: Dilated rates should be larger than 0.`),E(vl(n),()=>`Error in conv2D: Strides should be larger than 0.`);let f={x:l,filter:c},p={strides:n,pad:r,dataFormat:i,dilations:a,dimRoundingMode:o},m=R.runKernel(_t,f,p);return u?K(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var Uu,Wu=o((()=>{z(),I(),V(),L(),xl(),U(),q(),Uu=H({conv2d_:Hu})}));function Gu(e,t,n,r,i=`NWC`,a=1,o){let s=B(e,`x`,`conv1d`),c=B(t,`filter`,`conv1d`),l=s,u=!1;s.rank===2&&(u=!0,l=K(s,[1,s.shape[0],s.shape[1]])),E(l.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${l.rank}.`),E(c.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${c.rank}.`),bl(`conv1d`,r,o),E(l.shape[2]===c.shape[1],()=>`Error in conv1d: depth of input (${l.shape[2]}) must match input depth for filter ${c.shape[1]}.`),E(_l(n,a),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${n} and dilation '${a}'`),E(vl(a),()=>`Error in conv1D: Dilated rates should be larger than 0.`),E(vl(n),()=>`Error in conv1D: Stride should be larger than 0.`),E(i===`NWC`,()=>`Error in conv1d: got dataFormat of ${i} but only NWC is currently supported.`);let d=K(c,[1,c.shape[0],c.shape[1],c.shape[2]]),f=K(l,[l.shape[0],1,l.shape[1],l.shape[2]]),p=Uu(f,d,[1,n],r,`NHWC`,[1,a],o);return u?K(p,[p.shape[2],p.shape[3]]):K(p,[p.shape[0],p.shape[2],p.shape[3]])}var Ku,qu=o((()=>{V(),L(),Wu(),xl(),U(),q(),Ku=H({conv1d_:Gu})}));function Ju(e,t,n,r,i,a=`NHWC`,o){E(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let s=e,c=t,l=!1;t.rank===3&&(l=!0,c=K(t,[1,t.shape[0],t.shape[1],t.shape[2]]),s=[1,e[0],e[1],e[2]]),E(s.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${s.length}.`),E(c.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${c.rank}`),E(n.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${n.rank}`);let u=a===`NHWC`?s[3]:s[1],d=a===`NHWC`?c.shape[3]:c.shape[1];E(u===n.shape[2],()=>`Error in conv2dDerInput: depth of input (${u}) must match input depth for filter ${n.shape[2]}.`),E(d===n.shape[3],()=>`Error in conv2dDerInput: depth of output (${d}) must match output depth for filter ${n.shape[3]}.`),bl(`conv2dDerInput`,i,o);let f={dy:c,filter:n},p={strides:r,pad:i,dataFormat:a,dimRoundingMode:o,inputShape:s},m=R.runKernel(yt,f,p);return l?K(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var Yu,Xu=o((()=>{z(),I(),L(),xl(),U(),q(),Yu=H({conv2DBackpropInput_:Ju})}));function Zu(e,t,n,r,i,a){let o=B(e,`x`,`conv2dTranspose`),s=B(t,`filter`,`conv2dTranspose`);return Yu(n,o,s,r,i,`NHWC`,a)}var Qu,$u=o((()=>{V(),Xu(),U(),Qu=H({conv2dTranspose_:Zu})}));function ed(e,t,n,r,i=`NDHWC`,a=[1,1,1]){let o=B(e,`x`,`conv3d`),s=B(t,`filter`,`conv3d`),c=o,l=!1;o.rank===4&&(l=!0,c=K(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),E(c.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${c.rank}.`),E(s.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${s.rank}.`),E(c.shape[4]===s.shape[3],()=>`Error in conv3d: depth of input (${c.shape[4]}) must match input depth for filter ${s.shape[3]}.`),E(_l(n,a),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),E(i===`NDHWC`,()=>`Error in conv3d: got dataFormat of ${i} but only NDHWC is currently supported.`),E(vl(a),()=>`Error in conv3D: Dilated rates should be larger than 0.`),E(vl(n),()=>`Error in conv3D: Strides should be larger than 0.`);let u={x:c,filter:s},d={strides:n,pad:r,dataFormat:i,dilations:a},f=R.runKernel(bt,u,d);return l?K(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}var td,nd=o((()=>{z(),I(),V(),L(),xl(),U(),q(),td=H({conv3d_:ed})}));function rd(e,t,n,r,i){E(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let a=e,o=t,s=!1;t.rank===4&&(s=!0,o=K(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),a=[1,e[0],e[1],e[2],e[3]]);let c=a[4],l=o.shape[4];E(a.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${a.length}.`),E(o.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${o.rank}`),E(n.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${n.rank}`),E(c===n.shape[3],()=>`Error in conv3dDerInput: depth of input (${c}) must match input depth for filter ${n.shape[3]}.`),E(l===n.shape[4],()=>`Error in conv3dDerInput: depth of output (${l}) must match output depth for filter ${n.shape[4]}.`);let u={dy:o,filter:n},d={pad:i,strides:r,inputShape:a},f=R.runKernel(St,u,d);return s?K(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}var id,ad=o((()=>{z(),I(),L(),U(),q(),id=H({conv3DBackpropInput_:rd})}));function od(e,t,n,r,i){let a=B(e,`x`,`conv3dTranspose`),o=B(t,`filter`,`conv3dTranspose`);return id(n,a,o,r,i)}var sd,cd=o((()=>{V(),ad(),U(),sd=H({conv3dTranspose_:od})}));function ld(e){let t={x:B(e,`x`,`cos`,`float32`)};return R.runKernel(`Cos`,t)}var ud,dd=o((()=>{z(),I(),V(),U(),ud=H({cos_:ld})}));function fd(e){let t={x:B(e,`x`,`cosh`,`float32`)};return R.runKernel(Ct,t)}var pd,md=o((()=>{z(),I(),V(),U(),pd=H({cosh_:fd})}));function hd(e,t=0,n=!1,r=!1){let i={x:B(e,`x`,`cumprod`)},a={axis:t,exclusive:n,reverse:r};return R.runKernel(wt,i,a)}var gd,_d=o((()=>{z(),I(),V(),U(),gd=H({cumprod_:hd})}));function vd(e,t=0,n=!1,r=!1){let i={x:B(e,`x`,`cumsum`)},a={axis:t,exclusive:n,reverse:r};return R.runKernel(Tt,i,a)}var yd,bd=o((()=>{z(),I(),V(),U(),yd=H({cumsum_:vd})}));function xd(e,t,n,r=!1){let i=B(e,`x`,`denseBincount`),a=B(t,`weights`,`denseBincount`);E(i.dtype===`int32`,()=>`Error in denseBincount: input dtype must be int32, but got ${i.dtype}`),E(i.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${i.rank}.`),E(n>=0,()=>`size must be non-negative, but got ${n}.`),E(a.size===i.size||a.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${i.shape}, weights shape: ${a.shape}.`);let o={x:i,weights:a},s={size:n,binaryOutput:r};return R.runKernel(Dt,o,s)}var Sd,Cd=o((()=>{z(),I(),V(),L(),U(),Sd=H({denseBincount_:xd})}));function wd(e,t,n=`NHWC`){let r=B(e,`x`,`depthToSpace`,`float32`),i=n===`NHWC`?r.shape[1]:r.shape[2],a=n===`NHWC`?r.shape[2]:r.shape[3],o=n===`NHWC`?r.shape[3]:r.shape[1];E(t>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${t}`),E(i*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${i} and ${t}  for depthToSpace with input shape
    ${r.shape}`),E(a*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${a} and ${t} for depthToSpace with input shape
        ${r.shape}`),E(o%(t*t)===0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${o} for depthToSpace with input shape ${r.shape}`);let s={x:r},c={blockSize:t,dataFormat:n};return R.runKernel(Ot,s,c)}var Td,Ed=o((()=>{z(),I(),V(),L(),U(),Td=H({depthToSpace_:wd})}));function Dd(e,t,n,r,i=`NHWC`,a=[1,1],o){let s=B(e,`x`,`depthwiseConv2d`,`float32`),c=B(t,`filter`,`depthwiseConv2d`,`float32`),l=s,u=!1;s.rank===3&&(u=!0,l=K(s,[1,s.shape[0],s.shape[1],s.shape[2]])),E(l.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${l.rank}.`),E(c.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${c.rank}.`);let d=i===`NHWC`?l.shape[3]:l.shape[1];E(d===c.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${d}) must match the inChannels dimension in filter ${c.shape[2]}.`),bl(`depthwiseConv2d`,r,o);let f={x:l,filter:c},p={strides:n,pad:r,dataFormat:i,dilations:a,dimRoundingMode:o},m=R.runKernel(kt,f,p);return u?K(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var Od,kd=o((()=>{z(),I(),V(),L(),xl(),U(),q(),Od=H({depthwiseConv2d_:Dd})}));function Ad(e){let t={x:B(e,`x`,`diag`)};return R.runKernel(Mt,t)}var jd,Md=o((()=>{z(),I(),V(),U(),jd=H({diag_:Ad})}));function Nd(e,t,n,r,i=[1,1],a=`NHWC`){let o=B(e,`x`,`dilation2d`),s=B(t,`filter`,`dilation2d`);E(o.rank===3||o.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${o.rank}.`),E(s.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${s.rank}.`),E(a===`NHWC`,()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${a}`);let c=o,l=!1;o.rank===3&&(c=K(o,[1,o.shape[0],o.shape[1],o.shape[2]]),l=!0),E(c.shape[3]===s.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${c.shape[3]} vs ${s.shape[2]}`);let u={x:c,filter:s},d={strides:n,pad:r,dilations:i},f=R.runKernel(Nt,u,d);return l?K(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var Pd,Fd=o((()=>{z(),I(),V(),L(),U(),q(),Pd=H({dilation2d_:Nd})})),Id=c({assertAndGetBroadcastShape:()=>zd,getBroadcastDims:()=>Ld,getReductionAxes:()=>Rd});function Ld(e,t){let n=e.length,r=[];for(let i=0;i<n;i++){let a=n-1-i,o=e[a]||1;(t[t.length-1-i]||1)>1&&o===1&&r.unshift(a)}return r}function Rd(e,t){let n=[];for(let r=0;r<t.length;r++){let i=e[e.length-r-1],a=t.length-r-1,o=t[a];(i==null||i===1&&o>1)&&n.unshift(a)}return n}function zd(e,t){let n=Math.max(e.length,t.length),r=Array(n);for(let i=0;i<n;i++){let a=e[e.length-i-1];a??=1;let o=t[t.length-i-1];if(o??=1,a===1)r[n-i-1]=o;else if(o===1)r[n-i-1]=a;else if(a!==o){let n=`Operands could not be broadcast together with shapes ${e} and ${t}.`;throw Error(n)}else r[n-i-1]=a}return r}var Bd=o((()=>{}));function Vd(e,t){let n=B(e,`a`,`equal`,`string_or_numeric`),r=B(t,`b`,`equal`,`string_or_numeric`);[n,r]=xa(n,r),zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(Bt,i)}var Hd,Ud=o((()=>{z(),I(),Da(),V(),Bd(),U(),Hd=H({equal_:Vd})}));function Wd(e,t,n){let r=B(t,`a`,`where`),i=B(n,`b`,`where`),a=B(e,`condition`,`where`,`bool`),o=zd(zd(a.shape,r.shape),i.shape),s={condition:bu(a,o),t:bu(r,o),e:bu(i,o)};return R.runKernel(ar,s)}var Gd,Kd=o((()=>{z(),I(),V(),xu(),Bd(),U(),Gd=H({where_:Wd})}));function qd(e){let t={x:B(e,`x`,`zerosLike`)};return R.runKernel(Lr,t)}var Jd,Yd=o((()=>{z(),I(),V(),U(),Jd=H({zerosLike_:qd})}));function Xd(e,t){let n=B(e,`a`,`div`),r=B(t,`b`,`div`);[n,r]=xa(n,r);let i=pc(n,r),a=Jd(i),o=Hd(r,a);return Gd(o,a,i)}var Zd,Qd=o((()=>{Da(),V(),mc(),Ud(),U(),Kd(),Yd(),Zd=H({divNoNan_:Xd})}));function $d(e,t){let n=B(e,`t1`,`dot`),r=B(t,`t2`,`dot`);E((n.rank===1||n.rank===2)&&(r.rank===1||r.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${n.rank} and ${r.rank}.`);let i=n.rank===1?n.size:n.shape[1],a=r.rank===1?r.size:r.shape[0];if(E(i===a,()=>`Error in dot: inner dimensions of inputs must match, but got ${i} and ${a}.`),n.rank===1&&r.rank===1){let e=K(n,[1,-1]),t=K(r,[-1,1]),i=Nl(e,t);return K(i,[])}if(n.rank===1&&r.rank===2){let e=K(n,[1,-1]),t=K(r,[r.shape[0],r.shape[1]]),i=Nl(e,t);return K(i,[i.size])}if(n.rank===2&&r.rank===1){let e=K(r,[-1,1]),t=Nl(n,e);return K(t,[t.size])}{let e=K(r,[r.shape[0],r.shape[1]]);return Nl(n,e)}}var ef,tf=o((()=>{V(),L(),Pl(),U(),q(),ef=H({dot_:$d})}));function nf(e,...t){let n=t.map((e,t)=>B(e,`tensors${t}`,`einsum`)),r={equation:e};return R.runKernel(Rt,n,r)}var rf,af=o((()=>{z(),I(),V(),U(),rf=H({einsum_:nf})}));function of(e){let t={x:B(e,`x`,`elu`,`float32`)};return R.runKernel(`Elu`,t)}var sf,cf=o((()=>{z(),I(),V(),U(),sf=H({elu_:of})}));function lf(e,t){let n=B(e,`x`,`ensureShape`,`string_or_numeric`);if(!te(n.shape,t))throw Error(`EnsureShape: Shape of tensor ${n.shape} is not compatible with expected shape ${t}`);return e}var uf,df=o((()=>{V(),Me(),U(),uf=H({ensureShape_:lf})}));function ff(e){let t=B(e,`x`,`erf`);E(t.dtype===`int32`||t.dtype===`float32`,()=>"Input dtype must be `int32` or `float32`."),t.dtype===`int32`&&(t=$s(t,`float32`));let n={x:t};return R.runKernel(`Erf`,n)}var pf,mf=o((()=>{z(),I(),V(),L(),ec(),U(),pf=H({erf_:ff})}));function hf(e,t){for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0}function gf(e,t,n){let r=e.length+t.length,i=[],a=0,o=0;for(let s=0;s<r;s++)n.indexOf(s)===-1?i.push(e[a++]):i.push(t[o++]);return i}function _f(e,t){let n=[],r=e.length;for(let i=0;i<r;i++)t.indexOf(i)===-1&&n.push(e[i]);return[n,t.map(t=>e[t])]}function vf(e,t){return gf(e,t.map(e=>1),t)}function yf(e,t,n){E(hf(t,n),()=>`${e} supports only inner-most axes for now. Got axes ${t} and rank-${n} input.`)}function bf(e,t){if(hf(e,t))return null;let n=[];for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);return e.forEach(e=>n.push(e)),n}function xf(e){return e.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function Sf(e,t){let n=[];for(let r=t-e;r<t;++r)n.push(r);return n}var Cf=o((()=>{L()}));function wf(e,t=null,n=!1){let r={x:B(e,`x`,`max`)},i={reductionIndices:t,keepDims:n};return R.runKernel(`Max`,r,i)}var Tf,Ef=o((()=>{z(),I(),V(),U(),Tf=H({max_:wf})}));function Df(e,t=null,n=!1){let r={x:B(e,`x`,`min`)},i={axis:t,keepDims:n};return R.runKernel(`Min`,r,i)}var Of,kf=o((()=>{z(),I(),V(),U(),Of=H({min_:Df})}));function Af(e,t){let n=B(e,`base`,`pow`),r=B(t,`exp`,`pow`);[n,r]=xa(n,r);let i={a:n,b:r};return R.runKernel(`Pow`,i)}var jf,Mf=o((()=>{z(),I(),Da(),V(),U(),jf=H({pow_:Af})}));function Nf(e,t){if((Fi(e)&&t!==`string`||Array.isArray(e))&&t!==`complex64`)throw Error(`Error creating a new Scalar: value must be a primitive (number|boolean|string)`);if(t===`string`&&Fi(e)&&!(e instanceof Uint8Array))throw Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Za(e,[],[],t)}var Pf=o((()=>{L(),Qa()}));function Ff(e){let t={x:B(e,`x`,`sqrt`,`float32`)};return R.runKernel(fr,t)}var If,Lf=o((()=>{z(),I(),V(),U(),If=H({sqrt_:Ff})}));function Rf(e){let t=B(e,`x`,`square`);return R.runKernel(`Square`,{x:t},{})}var zf,Bf=o((()=>{z(),V(),U(),zf=H({square_:Rf})}));function Vf(e,t=null,n=!1){let r=B(e,`x`,`sum`);r.dtype===`bool`&&(r=$s(r,`int32`));let i={x:r},a={axis:t,keepDims:n};return R.runKernel(`Sum`,i,a)}var Hf,Uf=o((()=>{z(),I(),V(),ec(),U(),Hf=H({sum_:Vf})}));function Wf(e,t=`euclidean`,n=null,r=!1){e=B(e,`x`,`norm`);let i=Gf(e,t,n),a=i.shape;if(r){let t=j(n,e.shape);a=vf(i.shape,t)}return K(i,a)}function Gf(e,t,n=null){if(e.rank===0)return vc(e);if(e.rank!==1&&n===null)return Gf(K(e,[-1]),t,n);if(e.rank===1||typeof n==`number`||Array.isArray(n)&&n.length===1){if(t===1)return Hf(vc(e),n);if(t===1/0)return Tf(vc(e),n);if(t===-1/0)return Of(vc(e),n);if(t===`euclidean`||t===2)return If(Hf(jf(vc(e),Nf(2,`int32`)),n));throw Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(n)&&n.length===2){if(t===1)return Tf(Hf(vc(e),n[0]),n[1]-1);if(t===1/0)return Tf(Hf(vc(e),n[1]),n[0]);if(t===-1/0)return Of(Hf(vc(e),n[1]),n[0]);if(t===`fro`||t===`euclidean`)return If(Hf(zf(e),n));throw Error(`Error in norm: invalid ord value: ${t}`)}throw Error(`Error in norm: invalid axis: ${n}`)}var Kf,qf=o((()=>{V(),L(),yc(),Cf(),Ef(),kf(),U(),Mf(),q(),Pf(),Lf(),Bf(),Uf(),Kf=H({norm_:Wf})}));function Jf(e,t=null,n=!1){return Kf(e,`euclidean`,t,n)}var Yf,Xf=o((()=>{qf(),U(),Yf=H({euclideanNorm_:Jf})}));function Zf(e){let t={x:B(e,`x`,`exp`)};return R.runKernel(`Exp`,t)}var Qf,$f=o((()=>{z(),I(),V(),U(),Qf=H({exp_:Zf})}));function ep(e,t=0){let n=B(e,`x`,`expandDims`,`string_or_numeric`);E(t<=n.rank,()=>`Axis must be <= rank of the tensor`);let r={input:n},i={dim:t};return R.runKernel(Vt,r,i)}var tp,np=o((()=>{z(),I(),V(),L(),U(),tp=H({expandDims_:ep})}));function rp(e){let t={x:B(e,`x`,`expm1`)};return R.runKernel(Ht,t)}var ip,ap=o((()=>{z(),I(),V(),U(),ip=H({expm1_:rp})}));function op(e,t){let n=B(e,`x`,`tile`,`string_or_numeric`);E(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${t}.`);let r={x:n},i={reps:t};return R.runKernel(kr,r,i)}var sp,cp=o((()=>{z(),I(),V(),L(),U(),sp=H({tile_:op})}));function lp(e,t,n,r=`float32`){t??=e;let i=Xs([e,t],r),a=e<=t?e:t;for(let e=0;e<a;++e)i.set(1,e,e);let o=K(i.toTensor(),[e,t]);if(n==null)return o;if(n.length===1)return sp(tp(o,0),[n[0],1,1]);if(n.length===2)return sp(tp(tp(o,0),0),[n[0],n[1],1,1]);if(n.length===3)return sp(tp(tp(tp(o,0),0),0),[n[0],n[1],n[2],1,1]);throw Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}var up,dp=o((()=>{Zs(),np(),U(),q(),cp(),up=H({eye_:lp})}));function fp(e){let t={x:B(e,`x`,`floor`,`float32`)};return R.runKernel(Gt,t)}var pp,mp=o((()=>{z(),I(),V(),U(),pp=H({floor_:fp})}));function hp(e,t,n=0,r=0){let i={x:B(e,`x`,`gather`),indices:B(t,`indices`,`gather`,`int32`)},a={axis:n,batchDims:r};return R.runKernel(Jt,i,a)}var gp,_p=o((()=>{z(),I(),V(),U(),gp=H({gather_:hp})}));function vp(e,t){let n=B(e,`a`,`greater`,`string_or_numeric`),r=B(t,`b`,`greater`,`string_or_numeric`);[n,r]=xa(n,r),zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(Xt,i)}var yp,bp=o((()=>{z(),I(),Da(),V(),Bd(),U(),yp=H({greater_:vp})}));function xp(e,t){let n=B(e,`a`,`greaterEqual`,`string_or_numeric`),r=B(t,`b`,`greaterEqual`,`string_or_numeric`);[n,r]=xa(n,r),zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(Zt,i)}var Sp,Cp=o((()=>{z(),I(),Da(),V(),Bd(),U(),Sp=H({greaterEqual_:xp})}));function wp(e){let t={input:B(e,`input`,`imag`)};return R.runKernel(en,t)}var Tp,Ep=o((()=>{z(),I(),V(),U(),Tp=H({imag_:wp})}));function Dp(e){let t={x:B(e,`x`,`isFinite`)};return R.runKernel(tn,t)}var Op,kp=o((()=>{z(),I(),V(),U(),Op=H({isFinite_:Dp})}));function Ap(e){let t={x:B(e,`x`,`isInf`)};return R.runKernel(nn,t)}var jp,Mp=o((()=>{z(),I(),V(),U(),jp=H({isInf_:Ap})}));function Np(e){let t={x:B(e,`x`,`isNaN`)};return R.runKernel(rn,t)}var Pp,Fp=o((()=>{z(),I(),V(),U(),Pp=H({isNaN_:Np})}));function Ip(e,t=.2){let n={x:B(e,`x`,`leakyRelu`)},r={alpha:t};return R.runKernel(an,n,r)}var Lp,Rp=o((()=>{z(),I(),V(),U(),Lp=H({leakyRelu_:Ip})}));function zp(e,t){let n=B(e,`a`,`less`,`string_or_numeric`),r=B(t,`b`,`less`,`string_or_numeric`);[n,r]=xa(n,r),zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(on,i)}var Bp,Vp=o((()=>{z(),I(),Da(),V(),Bd(),U(),Bp=H({less_:zp})}));function Hp(e,t){let n=B(e,`a`,`lessEqual`,`string_or_numeric`),r=B(t,`b`,`lessEqual`,`string_or_numeric`);[n,r]=xa(n,r),zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(sn,i)}var Up,Wp=o((()=>{z(),I(),Da(),V(),Bd(),U(),Up=H({lessEqual_:Hp})}));function Gp(e,t,n){if(n<=0)throw Error(`The number of values should be positive.`);let r={start:e,stop:t,num:n};return R.runKernel(cn,{},r)}var Kp=o((()=>{z(),I()}));function qp(e,t=5,n=1,r=1,i=.5){let a=B(e,`x`,`localResponseNormalization`);E(a.rank===4||a.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${a.rank}.`),E(ne(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let o=a,s=!1;a.rank===3&&(s=!0,o=K(a,[1,a.shape[0],a.shape[1],a.shape[2]]));let c={x:o},l={depthRadius:t,bias:n,alpha:r,beta:i},u=R.runKernel(`LRN`,c,l);return s?K(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var Jp,Yp=o((()=>{z(),I(),V(),L(),U(),q(),Jp=H({localResponseNormalization_:qp})}));function Xp(e){let t={x:B(e,`x`,`log`,`float32`)};return R.runKernel(`Log`,t)}var Zp,Qp=o((()=>{z(),I(),V(),U(),Zp=H({log_:Xp})}));function $p(e){let t={x:B(e,`x`,`log1p`)};return R.runKernel(ln,t)}var em,tm=o((()=>{z(),I(),V(),U(),em=H({log1p_:$p})}));function nm(e){return E(be(e),()=>`The f passed in grad(f) must be a function`),(t,n)=>{let r=B(t,`x`,`tf.grad`,`string_or_numeric`),i=n==null?null:B(n,`dy`,`tf.grad`);return R.tidy(()=>{let{value:t,grads:n}=R.gradients(()=>e(r),[r],i);return i!=null&&D(t.shape,i.shape,`The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)`),cm(n),n[0]})}}function rm(e){return E(be(e),()=>`The f passed in grads(f) must be a function`),(t,n)=>{E(Array.isArray(t),()=>"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s");let r=Ka(t,`args`,`tf.grads`,`string_or_numeric`),i=n==null?null:B(n,`dy`,`tf.grads`);return R.tidy(()=>{let{value:t,grads:n}=R.gradients(()=>e(...r),r,i);return i!=null&&D(t.shape,i.shape,`The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])`),cm(n),n})}}function im(e){return E(be(e),()=>`The f passed in valueAndGrad(f) must be a function`),(t,n)=>{E(t instanceof oa,()=>`The x passed in valueAndGrad(f)(x) must be a tensor`),E(n==null||n instanceof oa,()=>`The dy passed in valueAndGrad(f)(x, dy) must be a tensor`);let{grads:r,value:i}=R.gradients(()=>e(t),[t],n);return cm(r),{grad:r[0],value:i}}}function am(e){return E(be(e),()=>`The f passed in valueAndGrads(f) must be a function`),(t,n)=>{E(Array.isArray(t)&&t.every(e=>e instanceof oa),()=>`The args passed in valueAndGrads(f)(args) must be array of tensors`),E(n==null||n instanceof oa,()=>`The dy passed in valueAndGrads(f)(args, dy) must be a tensor`);let r=R.gradients(()=>e(...t),t,n);return n!=null&&D(r.value.shape,n.shape,`The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])`),cm(r.grads),r}}function om(e,t){E(be(e),()=>`The f passed in variableGrads(f) must be a function`),E(t==null||Array.isArray(t)&&t.every(e=>e instanceof sa),()=>`The varList passed in variableGrads(f, varList) must be an array of variables`);let n=t!=null;if(!n){t=[];for(let e in R.registeredVariables)t.push(R.registeredVariables[e])}let r=n?t.filter(e=>!e.trainable):null,i=t.length;t=t.filter(e=>e.trainable),E(t.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${i} variables is trainable.`);let{value:a,grads:o}=R.gradients(e,t,null,!0);E(o.some(e=>e!=null),()=>`Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize().`),E(a.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${a.rank} tensor`);let s={};return t.forEach((e,t)=>{o[t]!=null&&(s[e.name]=o[t])}),r?.forEach(e=>s[e.name]=null),{value:a,grads:s}}function sm(e){return R.customGrad(e)}function cm(e){if(e.filter(e=>e==null).length>0)throw Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that
    the f you passed encloses all operations that lead from x to y.`)}var lm=o((()=>{z(),ca(),V(),L()}));function um(e){let t={x:B(e,`x`,`neg`)};return R.runKernel(`Neg`,t)}var dm,fm=o((()=>{z(),I(),V(),U(),dm=H({neg_:um})}));function pm(e){let t={x:B(e,`x`,`softplus`)};return R.runKernel(dr,t)}var mm,hm=o((()=>{z(),I(),V(),U(),mm=H({softplus_:pm})}));function gm(e){let t=B(e,`x`,`logSigmoid`);return sm(e=>({value:dm(mm(dm(e))),gradFunc:t=>G(t,Il(dm(e)))}))(t)}var _m,vm=o((()=>{lm(),V(),gc(),fm(),U(),Ll(),hm(),_m=H({logSigmoid_:gm})}));function ym(e,t){let n=B(e,`a`,`sub`),r=B(t,`b`,`sub`);[n,r]=xa(n,r);let i={a:n,b:r};return R.runKernel(`Sub`,i)}var bm,xm=o((()=>{z(),I(),Da(),V(),U(),bm=H({sub_:ym})}));function Sm(e,t=-1){let n=B(e,`logits`,`logSoftmax`);if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and axis was ${t}`);return sm((e,n)=>{let r=Tf(e,t,!0),i=bm(e,r),a=bm($s(i,`float32`),Zp(Hf(Qf(i),t,!0)));return n([a]),{value:a,gradFunc:(e,n)=>{let[r]=n,i=Qf(r);return bm(e,G(Hf(e,t,!0),i))}}})(n)}var Cm,wm=o((()=>{lm(),V(),ec(),$f(),Qp(),Ef(),gc(),U(),xm(),Uf(),Cm=H({logSoftmax_:Sm})}));function Tm(e,t=null,n=!1){let r=B(e,`x`,`logSumExp`),i=j(t,r.shape),a=Tf(r,i,!0),o=bm(r,a),s=Qf(o),c=Hf(s,i),l=Zp(c),u=W(K(a,l.shape),l);if(n){let e=vf(u.shape,i);return K(u,e)}return u}var Em,Dm=o((()=>{V(),L(),cc(),Cf(),$f(),Qp(),Ef(),U(),q(),xm(),Uf(),Em=H({logSumExp_:Tm})}));function Om(e,t){let n=B(e,`a`,`logicalAnd`,`bool`),r=B(t,`b`,`logicalAnd`,`bool`);zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(un,i)}var km,Am=o((()=>{z(),I(),V(),Bd(),U(),km=H({logicalAnd_:Om})}));function jm(e){let t={x:B(e,`x`,`logicalNot`,`bool`)};return R.runKernel(dn,t)}var Mm,Nm=o((()=>{z(),I(),V(),U(),Mm=H({logicalNot_:jm})}));function Pm(e,t){let n=B(e,`a`,`logicalOr`,`bool`),r=B(t,`b`,`logicalOr`,`bool`);zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(fn,i)}var Fm,Im=o((()=>{z(),I(),V(),Bd(),U(),Fm=H({logicalOr_:Pm})}));function Lm(e,t){let n=B(e,`a`,`logicalXor`,`bool`),r=B(t,`b`,`logicalXor`,`bool`);return zd(n.shape,r.shape),km(Fm(e,t),Mm(km(e,t)))}var Rm,zm=o((()=>{V(),Bd(),Am(),Nm(),Im(),U(),Rm=H({logicalXor_:Lm})}));function Bm(e,t,n=`left`){let r=B(e,`sortedSequence`,`searchSorted`),i=B(t,`values`,`searchSorted`),a=r.shape[r.shape.length-1],o=i.shape[i.shape.length-1],s=K(r,[-1,a]),c=K(i,[-1,o]);if(s.rank<2)throw Error(`Sorted input argument must be at least 2-dimensional`);if(s.shape[0]!==c.shape[0])throw Error(`Leading dimension of 'sortedSequence' and 'values' must match.`);if(k(c.shape)>=Vm)throw Error(`values tensor size must less than ${Vm}`);if(s.shape[1]>=Vm)throw Error(`trailing dim_size must less than ${Vm} for int32 output type, was ${s.shape[1]}`);let l={sortedSequence:s,values:c},u={side:n};return R.runKernel(ir,l,u)}var Vm,Hm,Um=o((()=>{z(),I(),V(),Me(),U(),q(),Vm=2147483648,Hm=H({searchSorted_:Bm})}));function Wm(e,t){return Hm(e,t,`left`)}var Gm=o((()=>{Um()}));function Km(e,t,n,r,i){let a=B(e,`x`,`maxPool`),o=a,s=!1;a.rank===3&&(s=!0,o=K(a,[1,a.shape[0],a.shape[1],a.shape[2]])),E(o.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${o.rank}.`),E(_l(n,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${n} and dilations '1'`),bl(`maxPool`,r,i);let c={x:o},l={filterSize:t,strides:n,pad:r,dimRoundingMode:i},u=R.runKernel(yn,c,l);return s?K(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var qm,Jm=o((()=>{z(),I(),V(),L(),xl(),U(),q(),qm=H({maxPool_:Km})}));function Ym(e,t=[1,1,1],n,r,i,a=`NDHWC`){let o=B(e,`x`,`maxPool3d`),s=o,c=!1;o.rank===4&&(c=!0,s=K(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),E(s.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${s.rank}.`),E(a===`NDHWC`,()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),bl(`maxPool3d`,r,i);let l={x:s},u={filterSize:t,strides:n,pad:r,dimRoundingMode:i,dataFormat:a},d=R.runKernel(xn,l,u);return c?K(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}var Xm,Zm=o((()=>{z(),I(),V(),L(),xl(),U(),q(),Xm=H({maxPool3d_:Ym})}));function Qm(e,t,n,r,i=!1){let a={x:B(e,`x`,`maxPoolWithArgmax`)},o={filterSize:t,strides:n,pad:r,includeBatchInIndex:i},s=R.runKernel(Cn,a,o);return{result:s[0],indexes:s[1]}}var $m,eh=o((()=>{z(),I(),V(),U(),$m=H({maxPoolWithArgmax_:Qm})}));function th(e,t){let n=B(e,`a`,`maximum`),r=B(t,`b`,`maximum`);[n,r]=xa(n,r),n.dtype===`bool`&&(n=$s(n,`int32`),r=$s(r,`int32`)),zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(vn,i)}var nh,rh=o((()=>{z(),I(),Da(),V(),Bd(),ec(),U(),nh=H({maximum_:th})}));function ih(e,t=null,n=!1){let r={x:B(e,`x`,`mean`)},i={axis:t,keepDims:n};return R.runKernel(wn,r,i)}var ah,oh=o((()=>{z(),I(),V(),U(),ah=H({mean_:ih})}));function sh(e,t=`float32`){if(Oe(e),t===`complex64`){let t=sh(e,`float32`),n=sh(e,`float32`);return Ya(t,n)}let n=Ee(k(e),t);return R.makeTensor(n,e,t)}var ch=o((()=>{z(),L(),Xa()}));function lh(e,t=`float32`){if(Oe(e),t===`complex64`){let t=lh(e,`float32`),n=sh(e,`float32`);return Ya(t,n)}let n=Te(k(e),t);return R.makeTensor(n,e,t)}var uh=o((()=>{z(),L(),Me(),Xa(),ch()}));function dh(e,t,{indexing:n=`xy`}={}){if(n!==`xy`&&n!==`ij`)throw TypeError(`${n} is not a valid third argument to meshgrid`);if(e===void 0)return[];let r=B(e,`x`,`meshgrid`,e instanceof oa?e.dtype:`float32`);if(t===void 0)return[r];let i=B(t,`y`,`meshgrid`,t instanceof oa?t.dtype:`float32`),a=k(r.shape),o=k(i.shape);return n===`xy`?(r=K(r,[1,-1]),i=K(i,[-1,1]),[Nl(lh([o,1],r.dtype),r),Nl(i,lh([1,a],i.dtype))]):(r=K(r,[-1,1]),i=K(i,[1,-1]),[Nl(r,lh([1,o],r.dtype)),Nl(lh([a,1],i.dtype),i)])}var fh=o((()=>{Pl(),uh(),q(),ca(),V(),Me()}));function ph(e,t){let n=B(e,`a`,`minimum`),r=B(t,`b`,`minimum`);[n,r]=xa(n,r),n.dtype===`bool`&&(n=$s(n,`int32`),r=$s(r,`int32`)),zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(Tn,i)}var mh,hh=o((()=>{z(),I(),Da(),V(),Bd(),ec(),U(),mh=H({minimum_:ph})}));function gh(e,t,n){E(n===`reflect`||n===`symmetric`,()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${n}.`);let r=B(e,`x`,`mirrorPad`);if(r.rank===0)throw Error(`mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad`);E(t.length===r.rank,()=>`Padding doesn't match input. Must be ${r.rank}. Got ${t.length}.`);let i=+(n===`reflect`);for(let e=0;e<r.rank;e++)E(t[e].length===2,()=>`Invalid number of paddings. Must be length of 2 each.`),E(t[e][0]>=0&&t[e][0]<=r.shape[e]-i&&t[e][1]>=0&&t[e][1]<=r.shape[e]-i,()=>`Padding in dimension ${e} cannot be greater than or equal to ${r.shape[e]-i} or less than 0 for input of shape ${r.shape}`);let a={paddings:t,mode:n},o={x:r};return R.runKernel(En,o,a)}var _h,vh=o((()=>{z(),I(),V(),L(),U(),_h=H({mirrorPad_:gh})}));function yh(e,t){let n=B(e,`a`,`mod`),r=B(t,`b`,`mod`);[n,r]=xa(n,r);let i={a:n,b:r};return R.runKernel(`Mod`,i)}var bh,xh=o((()=>{z(),I(),Da(),V(),U(),bh=H({mod_:yh})}));function Sh(e,t=null,n=!1){e=B(e,`x`,`moments`);let r=j(t,e.shape),i=ah(e,r,n),a=i.shape;n||(a=vf(i.shape,r));let o=zf(bm($s(e,`float32`),K(i,a)));return{mean:i,variance:ah(o,r,n)}}var Ch,wh=o((()=>{V(),L(),Cf(),ec(),oh(),U(),q(),Bf(),xm(),Ch=H({moments_:Sh})}));function Th(e,t,n,r){let i=B(t,`data`,`multiRNNCell`),a=Ka(n,`c`,`multiRNNCell`),o=Ka(r,`h`,`multiRNNCell`),s=i,c=[];for(let t=0;t<e.length;t++){let n=e[t](s,a[t],o[t]);c.push(n[0]),c.push(n[1]),s=n[1]}let l=[],u=[];for(let e=0;e<c.length;e+=2)l.push(c[e]),u.push(c[e+1]);return[l,u]}var Eh,Dh=o((()=>{V(),U(),Eh=H({multiRNNCell_:Th})}));function Oh(e,t,n,r=!1){let i=B(e,`logits`,`multinomial`),a=i.size,o=i.rank;if(a<2)throw Error(`Error in multinomial: you need at least 2 outcomes, but got ${a}.`);if(o>2)throw Error(`Rank of probabilities must be 1 or 2, but is ${o}`);n||=Math.random();let s={logits:o===1?K(i,[1,-1]):i},c={numSamples:t,seed:n,normalized:r},l=R.runKernel(Dn,s,c);return o===1?K(l,[l.size]):l}var kh,Ah=o((()=>{z(),I(),V(),U(),q(),kh=H({multinomial_:Oh})}));function jh(e,t){let n=B(e,`a`,`notEqual`,`string_or_numeric`),r=B(t,`b`,`notEqual`,`string_or_numeric`);[n,r]=xa(n,r),zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(kn,i)}var Mh,Nh=o((()=>{z(),I(),Da(),V(),Bd(),U(),Mh=H({notEqual_:jh})}));function Ph(e,t,n=1,r=0,i=`int32`){if(t<2)throw Error(`Error in oneHot: depth must be >=2, but it is ${t}`);let a={indices:B(e,`indices`,`oneHot`,`int32`)},o={dtype:i,depth:t,onValue:n,offValue:r};return R.runKernel(Pn,a,o)}var Fh,Ih=o((()=>{z(),I(),V(),U(),Fh=H({oneHot_:Ph})}));function Lh(e){let t={x:B(e,`x`,`onesLike`)};return R.runKernel(Nn,t)}var Rh,zh=o((()=>{z(),I(),V(),U(),Rh=H({onesLike_:Lh})}));function Bh(e,t){let n=B(e,`v1`,`outerProduct`),r=B(t,`v2`,`outerProduct`);E(n.rank===1&&r.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${n.rank} and ${r.rank}.`);let i=K(n,[-1,1]),a=K(r,[1,-1]);return Nl(i,a)}var Vh,Hh=o((()=>{V(),L(),Pl(),U(),q(),Vh=H({outerProduct_:Bh})}));function Uh(e,t,n=0){let r=B(e,`x`,`pad`);if(r.rank===0)throw Error(`pad(scalar) is not defined. Pass non-scalar to pad`);let i={paddings:t,constantValue:n},a={x:r};return R.runKernel(In,a,i)}var Wh,Gh=o((()=>{z(),I(),V(),U(),Wh=H({pad_:Uh})}));function Kh(e,t,n=0){return E(t.length===2,()=>`Invalid number of paddings. Must be length of 2.`),Wh(e,[t],n)}var qh,Jh=o((()=>{L(),U(),Gh(),qh=H({pad1d_:Kh})}));function Yh(e,t,n=0){return E(t.length===2&&t[0].length===2&&t[1].length===2,()=>`Invalid number of paddings. Must be length of 2 each.`),Wh(e,t,n)}var Xh,Zh=o((()=>{L(),U(),Gh(),Xh=H({pad2d_:Yh})}));function Qh(e,t,n=0){return E(t.length===3&&t[0].length===2&&t[1].length===2&&t[2].length===2,()=>`Invalid number of paddings. Must be length of 2 each.`),Wh(e,t,n)}var $h,eg=o((()=>{L(),U(),Gh(),$h=H({pad3d_:Qh})}));function tg(e,t,n=0){return E(t.length===4&&t[0].length===2&&t[1].length===2&&t[2].length===2&&t[3].length===2,()=>`Invalid number of paddings. Must be length of 2 each.`),Wh(e,t,n)}var ng,rg=o((()=>{L(),U(),Gh(),ng=H({pad4d_:tg})}));function ig(e,t,n){let r=B(e,`x`,`spaceToBatchND`);E(r.rank>=1+t.length,()=>`input rank ${r.rank} should be > than [blockShape] ${t.length}`),E(n.length===t.length,()=>`paddings.shape[0] ${n.length} must be equal to [blockShape] ${t.length}`),E(r.shape.reduce((e,r,i)=>i>0&&i<=t.length?e&&(r+n[i-1][0]+n[i-1][1])%t[i-1]===0:e,!0),()=>`input spatial dimensions ${r.shape.slice(1)} with paddings ${n.toString()} must be divisible by blockShapes ${t.toString()}`);let i={x:r},a={blockShape:t,paddings:n};return R.runKernel(pr,i,a)}var ag,og=o((()=>{z(),I(),V(),L(),U(),ag=H({spaceToBatchND_:ig})}));function sg(e,t,n,r,i,a,o){i??=[1,1],a??=1,r===0&&(r=`valid`);let s=B(e,`x`,`maxPool`),c=s,l=!1;s.rank===3&&(l=!0,c=K(s,[1,s.shape[0],s.shape[1],s.shape[2]])),E(_l(a,i),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${a} and dilations '${i}'`);let u=rl(c.shape,t,a,i,r),d=[u.dilationHeight,u.dilationWidth],f;f=r===`same`?lg([u.filterHeight,u.filterWidth],d):[[0,0],[0,0]];let p=d[0]===1&&d[1]===1,[m,h]=cg([u.inHeight,u.inWidth],d,f),g=p?r:`valid`,_=p?c:ag(c,d,m),v=(n===`avg`?()=>wl(_,t,a,g,o):()=>qm(_,t,a,g,o))(),y=p?v:Jl(v,d,h);return l?K(y,[y.shape[1],y.shape[2],y.shape[3]]):y}function cg(e,t,n){let r=n.map(e=>e[0]),i=n.map(e=>e[1]),a=e.concat(r,i),o=t.map((e,t)=>(e-a[t]%e)%e),s=i.map((e,t)=>e+o[t]);return[t.map((e,t)=>[r[t],s[t]]),t.map((e,t)=>[0,o[t]])]}function lg(e,t){let n=e.map((e,n)=>e+(e-1)*(t[n]-1)).map(e=>e-1),r=n.map(e=>Math.floor(e/2)),i=n.map((e,t)=>e-r[t]);return n.map((e,t)=>[r[t],i[t]])}var ug,dg=o((()=>{V(),L(),Tl(),Yl(),xl(),Jm(),U(),q(),og(),ug=H({pool_:sg})}));function fg(e,t){let n={x:B(e,`x`,`prelu`),alpha:B(t,`alpha`,`prelu`)};return R.runKernel(Rn,n)}var pg,mg=o((()=>{z(),I(),V(),U(),pg=H({prelu_:fg})}));function hg(e,t=null,n=!1){let r=B(e,`x`,`prod`);r.dtype===`bool`&&(r=$s(r,`int32`));let i={x:r},a={axis:t,keepDims:n};return R.runKernel(zn,i,a)}var gg,_g=o((()=>{z(),I(),V(),ec(),U(),gg=H({prod_:hg})}));function vg(e,t,n,r){let i={paramsNestedSplits:e.map((e,t)=>B(e,`tensors${t}`,`raggedGather`,`int32`)),paramsDenseValues:B(t,`paramsDenseValues`,`raggedGather`),indices:B(n,`indices`,`raggedGather`,`int32`)},a={outputRaggedRank:r},o=R.runKernel(Bn,i,a);return{outputNestedSplits:o.slice(0,o.length-1),outputDenseValues:o[o.length-1]}}var yg,bg=o((()=>{z(),I(),V(),U(),yg=H({raggedGather_:vg})}));function xg(e,t,n){let r=B(e,`starts`,`raggedRange`),i={starts:r,limits:B(t,`limits`,`raggedRange`,r.dtype),deltas:B(n,`deltas`,`raggedRange`,r.dtype)},a=R.runKernel(Vn,i);return{rtNestedSplits:a[0],rtDenseValues:a[1]}}var Sg,Cg=o((()=>{z(),I(),V(),U(),Sg=H({raggedRange_:xg})}));function wg(e,t,n,r,i){let a=B(e,`shape`,`raggedTensorToTensor`,`int32`),o=B(t,`values`,`raggedTensorToTensor`),s={shape:a,values:o,defaultValue:B(n,`defaultValue`,`raggedTensorToTensor`,o.dtype),rowPartitionTensors:r.map((e,t)=>B(e,`tensors${t}`,`raggedTensorToTensor`,`int32`))},c={rowPartitionTypes:i};return R.runKernel(Hn,s,c)}var Tg,Eg=o((()=>{z(),I(),V(),U(),Tg=H({raggedTensorToTensor_:wg})}));function Dg(e,t,n){Oe(e);let r=k(e),i=null;if(n==null||n===`float32`)i=new Float32Array(r);else if(n===`int32`)i=new Int32Array(r);else if(n===`bool`)i=new Uint8Array(r);else throw Error(`Unknown data type ${n}`);for(let e=0;e<r;e++)i[e]=t();return R.makeTensor(i,e,n)}var Og,kg=o((()=>{z(),L(),Me(),U(),Og=H({rand_:Dg})})),Ag=s(((e,t)=>{(function(e,t,n){function r(e){var t=this,n=o();t.next=function(){var e=2091639*t.s0+t.c*23283064365386963e-26;return t.s0=t.s1,t.s1=t.s2,t.s2=e-(t.c=e|0)},t.c=1,t.s0=n(` `),t.s1=n(` `),t.s2=n(` `),t.s0-=n(e),t.s0<0&&(t.s0+=1),t.s1-=n(e),t.s1<0&&(t.s1+=1),t.s2-=n(e),t.s2<0&&(t.s2+=1),n=null}function i(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function a(e,t){var n=new r(e),a=t&&t.state,o=n.next;return o.int32=function(){return n.next()*4294967296|0},o.double=function(){return o()+(o()*2097152|0)*11102230246251565e-32},o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}function o(){var e=4022871197;return function(t){t=String(t);for(var n=0;n<t.length;n++){e+=t.charCodeAt(n);var r=.02519603282416938*e;e=r>>>0,r-=e,r*=e,e=r>>>0,r-=e,e+=r*4294967296}return(e>>>0)*23283064365386963e-26}}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.alea=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),jg=s(((e,t)=>{(function(e,t,n){function r(e){var t=this,n=``;t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(e|0)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=n.charCodeAt(r)|0,t.next()}function i(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function a(e,t){var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xor128=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),Mg=s(((e,t)=>{(function(e,t,n){function r(e){var t=this,n=``;t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^(e^e<<1))|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(e|0)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=n.charCodeAt(r)|0,r==n.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function i(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function a(e,t){var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xorwow=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),Ng=s(((e,t)=>{(function(e,t,n){function r(e){var t=this;t.next=function(){var e=t.x,n=t.i,r=e[n],i;return r^=r>>>7,i=r^r<<24,r=e[n+1&7],i^=r^r>>>10,r=e[n+3&7],i^=r^r>>>3,r=e[n+4&7],i^=r^r<<7,r=e[n+7&7],r^=r<<13,i^=r^r<<9,e[n]=i,t.i=n+1&7,i};function n(e,t){var n,r=[];if(t===(t|0))r[0]=t;else for(t=``+t,n=0;n<t.length;++n)r[n&7]=r[n&7]<<15^t.charCodeAt(n)+r[n+1&7]<<13;for(;r.length<8;)r.push(0);for(n=0;n<8&&r[n]===0;++n);for(n==8?r[7]=-1:r[n],e.x=r,e.i=0,n=256;n>0;--n)e.next()}n(t,e)}function i(e,t){return t.x=e.x.slice(),t.i=e.i,t}function a(e,t){e??=+new Date;var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(a.x&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xorshift7=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),Pg=s(((e,t)=>{(function(e,t,n){function r(e){var t=this;t.next=function(){var e=t.w,n=t.X,r=t.i,i,a;return t.w=e=e+1640531527|0,a=n[r+34&127],i=n[r=r+1&127],a^=a<<13,i^=i<<17,a^=a>>>15,i^=i>>>12,a=n[r]=a^i,t.i=r,a+(e^e>>>16)|0};function n(e,t){var n,r,i,a,o,s=[],c=128;for(t===(t|0)?(r=t,t=null):(t+=`\0`,r=0,c=Math.max(c,t.length)),i=0,a=-32;a<c;++a)t&&(r^=t.charCodeAt((a+32)%t.length)),a===0&&(o=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,a>=0&&(o=o+1640531527|0,n=s[a&127]^=r+o,i=n==0?i+1:0);for(i>=128&&(s[(t&&t.length||0)&127]=-1),i=127,a=512;a>0;--a)r=s[i+34&127],n=s[i=i+1&127],r^=r<<13,n^=n<<17,r^=r>>>15,n^=n>>>12,s[i]=r^n;e.w=o,e.X=s,e.i=i}n(t,e)}function i(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function a(e,t){e??=+new Date;var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(a.X&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xor4096=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),Fg=s(((e,t)=>{(function(e,t,n){function r(e){var t=this,n=``;t.next=function(){var e=t.b,n=t.c,r=t.d,i=t.a;return e=e<<25^e>>>7^n,n=n-r|0,r=r<<24^r>>>8^i,i=i-e|0,t.b=e=e<<20^e>>>12^n,t.c=n=n-r|0,t.d=r<<16^n>>>16^i,t.a=i-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=e|0):n+=e;for(var r=0;r<n.length+20;r++)t.b^=n.charCodeAt(r)|0,t.next()}function i(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function a(e,t){var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.tychei=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)})),Ig=s(((e,t)=>{(function(e,n,r){var i=256,a=6,o=52,s=`random`,c=r.pow(i,a),l=r.pow(2,o),u=l*2,d=i-1,f;function p(e,t,o){var d=[];t=t==1?{entropy:!0}:t||{};var f=_(g(t.entropy?[e,y(n)]:e??v(),3),d),p=new m(d),b=function(){for(var e=p.g(a),t=c,n=0;e<l;)e=(e+n)*i,t*=i,n=p.g(1);for(;e>=u;)e/=2,t/=2,n>>>=1;return(e+n)/t};return b.int32=function(){return p.g(4)|0},b.quick=function(){return p.g(4)/4294967296},b.double=b,_(y(p.S),n),(t.pass||o||function(e,t,n,i){return i&&(i.S&&h(i,p),e.state=function(){return h(p,{})}),n?(r[s]=e,t):e})(b,f,`global`in t?t.global:this==r,t.state)}function m(e){var t,n=e.length,r=this,a=0,o=r.i=r.j=0,s=r.S=[];for(n||(e=[n++]);a<i;)s[a]=a++;for(a=0;a<i;a++)s[a]=s[o=d&o+e[a%n]+(t=s[a])],s[o]=t;(r.g=function(e){for(var t,n=0,a=r.i,o=r.j,s=r.S;e--;)t=s[a=d&a+1],n=n*i+s[d&(s[a]=s[o=d&o+t])+(s[o]=t)];return r.i=a,r.j=o,n})(i)}function h(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function g(e,t){var n=[],r=typeof e,i;if(t&&r==`object`)for(i in e)try{n.push(g(e[i],t-1))}catch{}return n.length?n:r==`string`?e:e+`\0`}function _(e,t){for(var n=e+``,r,i=0;i<n.length;)t[d&i]=d&(r^=t[d&i]*19)+n.charCodeAt(i++);return y(t)}function v(){try{var t;return f&&(t=f.randomBytes)?t=t(i):(t=new Uint8Array(i),(e.crypto||e.msCrypto).getRandomValues(t)),y(t)}catch{var r=e.navigator,a=r&&r.plugins;return[+new Date,e,a,e.screen,y(n)]}}function y(e){return String.fromCharCode.apply(0,e)}if(_(r.random(),n),typeof t==`object`&&t.exports){t.exports=p;try{f=Gs()}catch{}}else typeof define==`function`&&define.amd?define(function(){return p}):r[`seed`+s]=p})(typeof self<`u`?self:e,[],Math)})),Lg=s(((e,t)=>{var n=Ag(),r=jg(),i=Mg(),a=Ng(),o=Pg(),s=Fg(),c=Ig();c.alea=n,c.xor128=r,c.xorwow=i,c.xorshift7=a,c.xor4096=o,c.tychei=s,t.exports=c})),Rg=c({TEST_EPSILON_FLOAT16:()=>Qg,createVideoElement:()=>Yg,encodeStrings:()=>Jg,expectArrayBuffersEqual:()=>qg,expectArraysClose:()=>zg,expectArraysEqual:()=>Ug,expectNumbersClose:()=>Wg,expectPromiseToFail:()=>Hg,expectValuesInRange:()=>Kg,play:()=>Xg,testEpsilon:()=>Bg});function zg(e,t,n){return n??=Bg(),Vg(e,t,(e,t)=>Gg(e,t,n))}function Bg(){return R.backend.floatPrecision()===32?Zg:Qg}function Vg(e,t,n){let r=!0;if((Fi(e)||Fi(t))&&(r=!1),Fi(e)&&Fi(t)&&(r=!0),r){let n=e.constructor.name,r=t.constructor.name;if(n!==r)throw Error(`Arrays are of different type. Actual: ${n}. Expected: ${r}`)}if(Array.isArray(e)&&Array.isArray(t)){let n=Ua(e),r=Ua(t);if(!A(n,r))throw Error(`Arrays have different shapes. Actual: [${n}]. Expected: [${r}]`)}let i=Fi(e)?e:Ii(e),a=Fi(t)?t:Ii(t);if(i.length!==a.length)throw Error(`Arrays have different lengths actual: ${i.length} vs expected: ${a.length}.\nActual:   ${i}.\nExpected: ${a}.`);for(let e=0;e<a.length;++e){let t=i[e],r=a[e];if(!n(t,r))throw Error(`Arrays differ: actual[${e}] = ${t}, expected[${e}] = ${r}.\nActual:   ${i}.\nExpected: ${a}.`)}typeof expect<`u`&&expect().nothing()}function Hg(e,t){e().then(()=>t.fail(),()=>t()),typeof expect<`u`&&expect().nothing()}function Ug(e,t){let n=typeof t==`string`||typeof t==`number`||typeof t==`boolean`?[t]:t;return ge(e)||ge(e[0])||ge(t)||ge(t[0])?Vg(e,n,(e,t)=>e==t):Vg(e,t,(e,t)=>Gg(e,t,0))}function Wg(e,t,n){if(n??=Bg(),!Gg(e,t,n))throw Error(`Numbers differ: actual === ${e}, expected === ${t}`);typeof expect<`u`&&expect().nothing()}function Gg(e,t,n){return!isFinite(e)&&!isFinite(t)||!(isNaN(e)||isNaN(t)||Math.abs(e-t)>n)}function Kg(e,t,n){for(let r=0;r<e.length;r++)if(e[r]<t||e[r]>n)throw Error(`Value out of range:${e[r]} low: ${t}, high: ${n}`)}function qg(e,t){let n=new Float32Array(e),r=new Float32Array(t);if(n.length!==r.length)throw Error(`Expected ArrayBuffer to be of length ${r.length}, but it was ${n.length}`);for(let e=0;e<r.length;e++)if(n[e]!==r[e])throw Error(`Expected ArrayBuffer value at ${e} to be ${r[e]} but got ${n[e]} instead`)}function Jg(e){for(let t=0;t<e.length;t++){let n=e[t];Array.isArray(n)?Jg(n):e[t]=Ni(n)}return e}function Yg(e){let t=document.createElement(`video`);return`playsInline`in t&&(t.playsInline=!0),t.muted=!0,t.loop=!0,t.style.position=`fixed`,t.style.left=`0px`,t.style.top=`0px`,t.preload=`auto`,t.appendChild(e),new Promise(e=>{t.addEventListener(`loadeddata`,n=>e(t)),t.load()})}async function Xg(e){await e.play(),`requestVideoFrameCallback`in e&&await new Promise(t=>{e.requestVideoFrameCallback(t)})}var Zg,Qg,$g=o((()=>{z(),V(),L(),Zg=.001,Qg=.1})),e_,t_,n_,r_,i_=o((()=>{e_=u(Lg()),t_=class{constructor(e,t,n,r,i){this.mean=e,this.stdDev=t,this.dtype=n,this.nextVal=NaN,this.truncated=r,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);let a=i||Math.random();this.random=e_.alea(a.toString())}nextValue(){if(!isNaN(this.nextVal)){let e=this.nextVal;return this.nextVal=NaN,e}let e,t,n=!1;for(;!n;){let r,i,a;do r=2*this.random()-1,i=2*this.random()-1,a=r*r+i*i;while(a>=1||a===0);let o=Math.sqrt(-2*Math.log(a)/a);e=this.mean+this.stdDev*r*o,t=this.mean+this.stdDev*i*o,(!this.truncated||this.isValidTruncated(e))&&(n=!0)}return(!this.truncated||this.isValidTruncated(t))&&(this.nextVal=this.convertValue(t)),this.convertValue(e)}convertValue(e){return this.dtype==null||this.dtype===`float32`?e:Math.round(e)}isValidTruncated(e){return e<=this.upper&&e>=this.lower}},n_=class{constructor(e,t,n,r){this.alpha=e,this.beta=1/t,this.dtype=n;let i=r||Math.random();this.randu=e_.alea(i.toString()),this.randn=new t_(0,1,n,!1,this.randu()),this.d=e<1?e+2/3:e-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let e,t,n,r,i,a;for(;;){do r=this.randn.nextValue(),a=1+this.c*r;while(a<=0);if(a*=a*a,e=r*r,t=1-.331*e*e,n=.5*e+this.d*(1-a+Math.log(a)),i=this.randu(),i<t||Math.log(i)<n)break}return a=1/this.beta*this.d*a,this.alpha<1&&(a*=this.randu()**(1/this.alpha)),this.convertValue(a)}convertValue(e){return this.dtype===`float32`?e:Math.round(e)}},r_=class{constructor(e=0,t=1,n,r){if(this.canReturnFloat=()=>this.dtype==null||this.dtype===`float32`,this.min=e,this.range=t-e,this.dtype=n,r??=Math.random(),typeof r==`number`&&(r=r.toString()),!this.canReturnFloat()&&this.range<=1)throw Error(`The difference between ${e} - ${t} <= 1 and dtype is not float`);this.random=e_.alea(r)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}}}));function a_(e,t,n=1,r=`float32`,i){if(Oe(e),n??=1,r??=`float32`,r!==`float32`&&r!==`int32`)throw Error(`Unsupported data type ${r}`);let a=new n_(t,n,r,i),o=Xs(e,r);for(let e=0;e<o.values.length;e++)o.values[e]=a.nextValue();return o.toTensor()}var o_,s_=o((()=>{Me(),Zs(),U(),i_(),o_=H({randomGamma_:a_})}));function c_(e,t=0,n=1,r,i){if(Oe(e),r!=null&&r===`bool`)throw Error(`Unsupported data type ${r}`);let a=new t_(t,n,r,!1,i),o=Xs(e,r);for(let e=0;e<o.values.length;e++)o.values[e]=a.nextValue();return o.toTensor()}var l_,u_=o((()=>{Me(),Zs(),U(),i_(),l_=H({randomNormal_:c_})}));function d_(e,t,n){if(t!=null&&t===`bool`)throw Error(`Unsupported data type ${t}`);return l_(e,0,1,t,n)}var f_,p_=o((()=>{U(),u_(),f_=H({randomStandardNormal_:d_})}));function m_(e,t=0,n=1,r=`float32`,i){Oe(e);let a=Xs(e,r),o=new r_(t,n,null,i);for(let e=0;e<a.values.length;e++)a.values[e]=o.nextValue();return a.toTensor()}var h_,g_=o((()=>{Me(),Zs(),U(),i_(),h_=H({randomUniform_:m_})}));function __(e,t,n,r){return h_(e,t,n,`int32`,r)}var v_,y_=o((()=>{U(),g_(),v_=H({randomUniformInt_:__})}));function b_(e,t,n=1,r=`float32`){if(n===0)throw Error(`Cannot have a step of zero`);let i={start:e,stop:t,step:n,dtype:r};return R.runKernel(Un,{},i)}var x_=o((()=>{z(),I()}));function S_(e){let t={input:B(e,`input`,`real`)};return R.runKernel(Wn,t)}var C_,w_=o((()=>{z(),I(),V(),U(),C_=H({real_:S_})}));function T_(e){let t={x:B(e,`x`,`reciprocal`)};return R.runKernel(Gn,t)}var E_,D_=o((()=>{z(),I(),V(),U(),E_=H({reciprocal_:T_})}));function O_(e){let t={x:B(e,`x`,`relu`)};return R.runKernel(Kn,t)}var k_,A_=o((()=>{z(),I(),V(),U(),k_=H({relu_:O_})}));function j_(e){let t={x:B(e,`x`,`relu6`)};return R.runKernel(Qn,t)}var M_,N_=o((()=>{z(),I(),V(),U(),M_=H({relu6_:j_})}));function P_(e,t){let n={x:B(e,`x`,`reverse`)},r={dims:t};return R.runKernel($n,n,r)}var F_,I_=o((()=>{z(),I(),V(),U(),F_=H({reverse_:P_})}));function L_(e){let t=B(e,`x`,`reverse`);return E(t.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${t.rank}.`),F_(t,0)}var R_,z_=o((()=>{V(),L(),U(),I_(),R_=H({reverse1d_:L_})}));function B_(e,t){let n=B(e,`x`,`reverse`);return E(n.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${n.rank}.`),F_(n,t)}var V_,H_=o((()=>{V(),L(),U(),I_(),V_=H({reverse2d_:B_})}));function U_(e,t){let n=B(e,`x`,`reverse`);return E(n.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${n.rank}.`),F_(n,t)}var W_,G_=o((()=>{V(),L(),U(),I_(),W_=H({reverse3d_:U_})}));function K_(e,t){let n=B(e,`x`,`reverse`);return E(n.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${n.rank}.`),F_(n,t)}var q_,J_=o((()=>{V(),L(),U(),I_(),q_=H({reverse4d_:K_})}));function Y_(e){let t={x:B(e,`x`,`round`)};return R.runKernel(er,t)}var X_,Z_=o((()=>{z(),I(),V(),U(),X_=H({round_:Y_})}));function Q_(e){let t={x:B(e,`x`,`rsqrt`,`float32`)};return R.runKernel(tr,t)}var $_,ev=o((()=>{z(),I(),V(),U(),$_=H({rsqrt_:Q_})}));function tv(e){let t={x:B(e,`x`,`selu`)};return R.runKernel(or,t)}var nv,rv=o((()=>{z(),I(),V(),U(),nv=H({selu_:tv})}));function iv(e,t,n,r,i,a=[1,1],o=`NHWC`){let s=B(e,`x`,`separableConv2d`),c=B(t,`depthwiseFilter`,`separableConv2d`),l=B(n,`pointwiseFilter`,`separableConv2d`),u=s,d=!1;if(s.rank===3&&(d=!0,u=K(s,[1,s.shape[0],s.shape[1],s.shape[2]])),o===`NCHW`)throw Error(`separableConv2d currently does not support dataFormat NCHW; only NHWC is supported`);E(u.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${u.rank}.`),E(c.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${c.rank}.`),E(l.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${c.rank}.`),E(l.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${l.shape[0]}.`),E(l.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${l.shape[1]}.`);let f=c.shape[2],p=c.shape[3];E(l.shape[2]===f*p,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${f*p}, but got ${l.shape[2]}.`);let m=Od(u,c,r,i,o,a),h=Uu(m,l,1,`valid`,o);return d?K(h,[h.shape[1],h.shape[2],h.shape[3]]):h}var av,ov=o((()=>{V(),L(),Wu(),kd(),U(),q(),av=H({separableConv2d_:iv})}));async function sv(e,t){let n=B(e,`x`,`setdiff1d`),r=B(t,`y`,`setdiff1d`);E(n.dtype===r.dtype,()=>`x and y should have the same dtype, but got x (${n.dtype}) and y (${r.dtype}).`),E(n.rank===1,()=>`x should be 1D tensor, but got x (${n.shape}).`),E(r.rank===1,()=>`y should be 1D tensor, but got y (${r.shape}).`);let i=await n.data(),a=await r.data(),o=new Set(a),s=0;for(let e=0;e<i.length;e++)o.has(i[e])||s++;let c=new ra([s],n.dtype),l=new ra([s],`int32`);for(let e=0,t=0;e<i.length;e++)o.has(i[e])||(c.values[t]=i[e],l.values[t]=e,t++);return[c.toTensor(),l.toTensor()]}var cv,lv=o((()=>{ca(),V(),L(),cv=sv}));function uv(e){let t={x:B(e,`x`,`sign`)};return R.runKernel(lr,t)}var dv,fv=o((()=>{z(),I(),V(),U(),dv=H({sign_:uv})}));function pv(e){let t={x:B(e,`x`,`sin`,`float32`)};return R.runKernel(`Sin`,t)}var mv,hv=o((()=>{z(),I(),V(),U(),mv=H({sin_:pv})}));function gv(e){let t={x:B(e,`x`,`sinh`)};return R.runKernel(cr,t)}var _v,vv=o((()=>{z(),I(),V(),U(),_v=H({sinh_:gv})}));function yv(e,t,n){let r=B(e,`x`,`slice1d`);return E(r.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${r.rank} tensor`),zl(r,[t],[n])}var bv,xv=o((()=>{V(),L(),U(),Bl(),bv=H({slice1d_:yv})}));function Sv(e,t,n){let r=B(e,`x`,`slice2d`);return E(r.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${r.rank} tensor`),zl(r,t,n)}var Cv,wv=o((()=>{V(),L(),U(),Bl(),Cv=H({slice2d_:Sv})}));function Tv(e,t,n){let r=B(e,`x`,`slice3d`);return E(r.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${r.rank} tensor`),zl(r,t,n)}var Ev,Dv=o((()=>{V(),L(),U(),Bl(),Ev=H({slice3d_:Tv})}));function Ov(e,t,n){let r=B(e,`x`,`slice4d`);return E(r.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${r.rank} tensor`),zl(r,t,n)}var kv,Av=o((()=>{V(),L(),U(),Bl(),kv=H({slice4d_:Ov})}));function jv(e,t=-1){let n=B(e,`logits`,`softmax`,`float32`);if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and dim was ${t}`);let r={logits:n},i={dim:t};return R.runKernel(hr,r,i)}var Mv,Nv=o((()=>{z(),I(),V(),U(),Mv=H({softmax_:jv})}));function Pv(e){E(e.dtype===`complex64`,()=>`The dtype for tf.spectral.fft() must be complex64 but got ${e.dtype}.`);let t={input:e};return R.runKernel(`FFT`,t)}var Fv,Iv=o((()=>{z(),I(),L(),U(),Fv=H({fft_:Pv})}));function Lv(e){E(e.dtype===`complex64`,()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${e.dtype}.`);let t={input:e};return R.runKernel($t,t)}var Rv,zv=o((()=>{z(),I(),L(),U(),Rv=H({ifft_:Lv})}));function Bv(e){let t=e.shape[e.shape.length-1],n=e.size/t,r;if(t<=2){let i=K(e,[n,t]);r=Rv(i)}else{let i=[n,2*(t-1)],a=K(C_(e),[n,t]),o=K(Tp(e),[n,t]),s=F_(zl(a,[0,1],[n,t-2]),1),c=G(F_(zl(o,[0,1],[n,t-2]),1),Nf(-1)),l=Al([a,s],1),u=Al([o,c],1),d=K(Ya(l,u),[i[0],i[1]]);r=Rv(d)}if(r=C_(r),e.rank===3&&e.shape[0]!==0){let t=r,n=e.shape[0];r=K(r,[n,r.shape[0]/n,r.shape[1]]),t.dispose()}return r}var Vv,Hv=o((()=>{Xa(),jl(),Ep(),gc(),U(),w_(),q(),I_(),Pf(),Bl(),zv(),Vv=H({irfft_:Bv})}));function Uv(e,t,n=0){let r={x:B(e,`x`,`split`)},i={numOrSizeSplits:t,axis:n};return R.runKernel(mr,r,i)}var Wv,Gv=o((()=>{z(),I(),V(),U(),Wv=H({split_:Uv})}));function Kv(e,t){E(e.dtype===`float32`,()=>`The dtype for rfft() must be real value but got ${e.dtype}`);let n=e.shape[e.shape.length-1],r=e.size/n,i;if(t!=null&&t<n){let r=e.shape.map(e=>0),a=e.shape.map(e=>e);a[e.shape.length-1]=t,i=zl(e,r,a),n=t}else if(t!=null&&t>n){let r=e.shape.map(e=>e);r[e.shape.length-1]=t-n,i=Al([e,sh(r)],e.shape.length-1),n=t}else i=e;let a=Jd(i),o=K(Ya(i,a),[r,n]),s=Fv(o),c=Math.floor(n/2)+1,l=C_(s),u=Tp(s),d=Wv(l,[c,n-c],l.shape.length-1),f=Wv(u,[c,n-c],u.shape.length-1),p=i.shape.slice();return p[i.shape.length-1]=c,K(Ya(d[0],f[0]),p)}var qv,Jv=o((()=>{L(),Xa(),jl(),Ep(),U(),w_(),q(),Bl(),Gv(),ch(),Yd(),Iv(),qv=H({rfft_:Kv})}));function Yv(e,t){let n=B(e,`a`,`squaredDifference`),r=B(t,`b`,`squaredDifference`);[n,r]=xa(n,r),zd(n.shape,r.shape);let i={a:n,b:r};return R.runKernel(xr,i,{})}var Xv,Zv=o((()=>{z(),I(),Da(),V(),Bd(),U(),Xv=H({squaredDifference_:Yv})}));function Qv(e,t){let n=B(e,`x`,`squeeze`,`string_or_numeric`);return K(n,le(n.shape,t).newShape)}var $v,ey=o((()=>{V(),L(),U(),q(),$v=H({squeeze_:Qv})}));function ty(e,t=0){let n=Ka(e,`tensors`,`stack`,`string_or_numeric`);E(n.length>=1,()=>`Pass at least one tensor to tf.stack`),n.length>0&&E(t<=n[0].rank,()=>`Axis must be <= rank of the tensor`);let r=n,i={axis:t};return R.runKernel(Fn,r,i)}var ny,ry=o((()=>{z(),I(),V(),L(),U(),ny=H({stack_:ty})}));function iy(e,t=0){let n={x:B(e,`x`,`step`)},r={alpha:t};return R.runKernel(Rr,n,r)}var ay,oy=o((()=>{z(),I(),V(),U(),ay=H({step_:iy})}));function sy(e,t,n,r,i=0,a=0,o=0,s=0,c=0){let l={x:B(e,`x`,`stridedSlice`,`string_or_numeric`)},u={begin:t,end:n,strides:r,beginMask:i,endMask:a,ellipsisMask:o,newAxisMask:s,shrinkAxisMask:c};return R.runKernel(wr,l,u)}var cy,ly=o((()=>{z(),I(),V(),U(),cy=H({stridedSlice_:sy})}));function uy(e){let t={x:B(e,`x`,`tan`,`float32`)};return R.runKernel(`Tan`,t)}var dy,fy=o((()=>{z(),I(),V(),U(),dy=H({tan_:uy})}));function py(e,t){O(e);let n=Ua(e,t);if(n.length!==1)throw Error(`tensor1d() requires values to be a flat/TypedArray`);return Za(e,null,n,t)}var my=o((()=>{V(),L(),Qa()}));function hy(e,t,n){if(O(e),t!=null&&t.length!==2)throw Error(`tensor2d() requires shape to have two numbers`);let r=Ua(e,n);if(r.length!==2&&r.length!==1)throw Error(`tensor2d() requires values to be number[][] or flat/TypedArray`);if(r.length===1&&t==null)throw Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Za(e,t,r,n)}var gy=o((()=>{V(),L(),Qa()}));function _y(e,t,n){if(O(e),t!=null&&t.length!==3)throw Error(`tensor3d() requires shape to have three numbers`);let r=Ua(e,n);if(r.length!==3&&r.length!==1)throw Error(`tensor3d() requires values to be number[][][] or flat/TypedArray`);if(r.length===1&&t==null)throw Error("tensor3d() requires shape to be provided when `values` are a flat array");return Za(e,t,r,n)}var vy=o((()=>{V(),L(),Qa()}));function yy(e,t,n){if(O(e),t!=null&&t.length!==4)throw Error(`tensor4d() requires shape to have four numbers`);let r=Ua(e,n);if(r.length!==4&&r.length!==1)throw Error(`tensor4d() requires values to be number[][][][] or flat/TypedArray`);if(r.length===1&&t==null)throw Error("tensor4d() requires shape to be provided when `values` are a flat array");return Za(e,t,r,n)}var by=o((()=>{V(),L(),Qa()}));function xy(e,t,n){if(O(e),t!=null&&t.length!==5)throw Error(`tensor5d() requires shape to have five numbers`);let r=Ua(e,n);if(r.length!==5&&r.length!==1)throw Error(`tensor5d() requires values to be number[][][][][] or flat/TypedArray`);if(r.length===1&&t==null)throw Error("tensor5d() requires shape to be provided when `values` are a flat array");return Za(e,t,r,n)}var Sy=o((()=>{V(),L(),Qa()}));function Cy(e,t,n){if(O(e),t!=null&&t.length!==6)throw Error(`tensor6d() requires shape to have six numbers`);let r=Ua(e,n);if(r.length!==6&&r.length!==1)throw Error(`tensor6d() requires values to be number[][][][][][] or flat/TypedArray`);if(r.length===1&&t==null)throw Error("tensor6d() requires shape to be provided when `values` are a flat array");return t||=r,Za(e,t,r,n)}var wy=o((()=>{V(),L(),Qa()})),Ty=c({calculateShapes:()=>Oy,validateInput:()=>Dy,validateUpdateShape:()=>Ey});function Ey(e,t,n){let r=t.rank>1?t.shape[t.rank-1]:1,i=t.rank>1?t.rank-1:1,a=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${n.shape}, indices.shape: ${t.shape}, shape: ${e}, sliceDim: ${r}, and batchDim: ${i}.`;if(n.rank<i)throw Error(a+` update.rank < ${i}. `);if(e.length<r+(n.rank-i))throw Error(a+` Output shape length < ${r+(n.rank-i)}`);if(n.rank!==i+e.length-r)throw Error(a+` update.rank != ${i+e.length-r}`);for(let e=0;e<i;++e)if(n.shape[e]!==t.shape[e])throw Error(a+` updates.shape[${e}] (${n.shape[e]}) != indices.shape[${e}] (${t.shape[e]}).`);for(let t=0;t<n.rank-i;++t)if(n.shape[t+i]!==e[t+r])throw Error(a+` updates.shape[${t+i}] (${n.shape[t+i]}) != shape[${t+i}] (${e[t+i]})`)}function Dy(e,t,n){if(t.rank<1)throw Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.rank<1)throw Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${e.rank}.`);if(t.dtype!==`int32`)throw Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(n.length<1)throw Error(`Output rank must be greater or equal to 1, but got shape: ${n}`);if(n.length===0){if(t.size===0)throw Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(e.size===0)throw Error(`Updates specified for empty output. updates shape: ${e.shape}`)}Ey(n,t,e)}function Oy(e,t,n){let r=t.shape.length,i=r>1?t.shape[r-1]:1,a=n.length,o=1;for(let e=i;e<a;++e)o*=n[e];let s=i<1?1:i,c=k(t.shape)/s,l=[...N(n.slice(0,i)),1],u=k(n);return{sliceRank:i,numUpdates:c,sliceSize:o,strides:l,outputSize:u}}var ky=o((()=>{L()}));function Ay(e,t,n){let r=B(e,`tensor`,`tensorScatterupdate`),i=B(t,`indices`,`tensorScatterupdate`,`int32`),a=B(n,`updates`,`tensorScatterupdate`);if(Dy(a,i,r.shape),r.dtype!==a.dtype)throw Error(`tensor and updates must have the same dtype, instead they are ${r.dtype} and ${a.dtype}.`);let o={tensor:r,indices:i,updates:a};return R.runKernel(rr,o,{})}var jy,My=o((()=>{z(),I(),V(),U(),ky(),jy=H({tensorScatterUpdate_:Ay})}));function Ny(e,t=1,n=!0){let r=B(e,`x`,`topk`);if(r.rank===0)throw Error(`topk() expects the input to be of rank 1 or higher`);let i=r.shape[r.shape.length-1];if(t<0)throw Error(`'k' passed to topk() must be >= 0 but got ${t}`);if(t>i)throw Error(`'k' passed to topk() must be <= the last dimension (${i}) but got ${t}`);let a={x:r},o={k:t,sorted:n},[s,c]=R.runKernel(Ar,a,o);return{values:s,indices:c}}var Py,Fy=o((()=>{z(),I(),V(),U(),Py=H({topk_:Ny})}));function Iy(e,t=0,n=1,r,i){if(Oe(e),r!=null&&r===`bool`)throw Error(`Unsupported data type $ { dtype }`);let a=new t_(t,n,r,!0,i),o=Xs(e,r);for(let e=0;e<o.values.length;e++)o.values[e]=a.nextValue();return o.toTensor()}var Ly,Ry=o((()=>{Me(),Zs(),U(),i_(),Ly=H({truncatedNormal_:Iy})}));function zy(e,t=0){let n=B(e,`x`,`unique`,`string_or_numeric`);E(n.rank>0,()=>`The input tensor must be at least 1D`);let r={x:n},i={axis:t},[a,o]=R.runKernel(Nr,r,i);return{values:a,indices:o}}var By,Vy=o((()=>{z(),I(),V(),L(),U(),By=H({unique_:zy})}));function Hy(e,t,n){let r=B(e,`x`,`unsortedSegmentSum`),i=B(t,`segmentIds`,`unsortedSegmentSum`,`int32`);E(ne(n),()=>`numSegments must be of dtype int`);let a={x:r,segmentIds:i},o={numSegments:n};return R.runKernel(Fr,a,o)}var Uy,Wy=o((()=>{z(),I(),V(),L(),U(),Uy=H({unsortedSegmentSum_:Hy})}));function Gy(e,t=0){let n=B(e,`x`,`unstack`,`string_or_numeric`);E(t>=-n.shape.length&&t<n.shape.length,()=>`Axis = ${t} is not in [-${n.shape.length}, ${n.shape.length})`);let r={value:n},i={axis:t};return R.runKernel(Pr,r,i)}var Ky,qy=o((()=>{z(),I(),V(),L(),U(),Ky=H({unstack_:Gy})}));function Jy(e,t){return Hm(e,t,`right`)}var Yy=o((()=>{Um()}));function Xy(e,t=!0,n,r){return R.makeVariable(e,t,n,r)}var Zy=o((()=>{z()}));function Qy(e,t){let n=[];for(let e=0;e<t.length;e++)t[e]&&n.push(e);let r=Xs(e,`int32`),i=Xs([n.length,e.length],`int32`);for(let t=0;t<n.length;t++){let a=r.indexToLoc(n[t]),o=t*e.length;i.values.set(a,o)}return i.toTensor()}var $y=o((()=>{Zs()}));async function eb(e){let t=B(e,`condition`,`whereAsync`,`bool`),n=await t.data(),r=Qy(t.shape,n);return e!==t&&t.dispose(),r}var tb,nb=o((()=>{$y(),V(),tb=eb}));async function rb(e,t,n){let r=B(e,`tensor`,`boolMask`),i=B(t,`mask`,`boolMask`,`bool`),a=n??0,o=i.rank,s=r.shape;E(o>0,()=>`mask cannot be scalar`),D(s.slice(a,a+o),i.shape,`mask's shape must match the first K dimensions of tensor's shape,`);let c=1;for(let e=a;e<a+o;e++)c*=s[e];let l=s.slice(0,a).concat([c],s.slice(a+o)),u=K(r,l),d=K(i,[-1]),f=await tb(d),p=$v(f,[1]),m=gp(u,p,a);return e!==r&&r.dispose(),t!==i&&i.dispose(),p.dispose(),u.dispose(),d.dispose(),f.dispose(),m}var ib,ab=o((()=>{V(),L(),_p(),q(),ey(),nb(),ib=rb}));function ob(e,t,n){let r=B(e,`x`,`transpose`);if(t??=r.shape.map((e,t)=>t).reverse(),E(r.rank===t.length,()=>`Error in transpose: rank of input ${r.rank} must match length of perm ${t}.`),t.forEach(e=>{E(e>=0&&e<r.rank,()=>`All entries in 'perm' must be between 0 and ${r.rank-1} but got ${t}`)}),r.rank<=1)return r.clone();let i={x:r},a={perm:t};return r.dtype===`complex64`?ho(()=>{let e=C_(r),t=Tp(r);return e=R.runKernel(Mr,{x:e},a),t=R.runKernel(Mr,{x:t},a),n&&(t=dm(t)),Ya(e,t)}):R.runKernel(Mr,i,a)}var sb,cb=o((()=>{z(),Oo(),I(),V(),L(),Xa(),Ep(),fm(),U(),w_(),sb=H({transpose_:ob})}));function lb(e,t,n,r,i=!0){let a=B(e,`v`,`movingAverage`),o=B(t,`x`,`movingAverage`),s=B(n,`decay`,`movingAverage`);Sa(a,o),E(A(a.shape,o.shape),()=>`Shape mismatch in v and x`);let c=Nf(1),l=bm(c,s),u=G(bm(o,a),l);if(i){E(r!=null,()=>`When using zeroDebias: true, step is required.`);let e=B(r,`step`,`movingAverage`);u=pc(u,bm(c,jf(s,e)))}return W(a,u)}var ub,db=o((()=>{Da(),V(),L(),cc(),mc(),gc(),U(),Mf(),Pf(),xm(),ub=H({movingAverage_:lb})}));function fb(e,t,n){Oe(n);let r=B(e,`indices`,`scatterND`,`int32`),i=B(t,`updates`,`scatterND`);Dy(i,r,n);let a={indices:r,updates:i},o={shape:n};return R.runKernel(nr,a,o)}var pb,mb=o((()=>{z(),I(),V(),Me(),U(),ky(),pb=H({scatterND_:fb})}));function hb(e,t,n,r){if(e.dtype!==`int32`)throw Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.rank>2)throw Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${e.shape}.`);let i=e.rank>0?e.shape[0]:1,a=e.rank>1?e.shape[1]:1;if(n.length!==a)throw Error(`outputShape has incorrect number of elements:, ${n.length}, should be: ${a}.`);let o=t.size;if(!(t.rank===0||t.rank===1&&o===i))throw Error(`sparseValues has incorrect shape ${t.shape}, should be [] or [${i}]`);if(t.dtype!==r.dtype)throw Error(`sparseValues.dtype must match defaultValues.dtype`)}var gb=o((()=>{}));function _b(e,t,n,r=0){Oe(n);let i=B(e,`sparseIndices`,`sparseToDense`,`int32`),a=B(t,`sparseValues`,`sparseToDense`,`string_or_numeric`),o=B(r,`defaultValue`,`sparseToDense`,a.dtype);hb(i,a,n,o);let s={sparseIndices:i,sparseValues:a,defaultValue:o},c={outputShape:n};return R.runKernel(br,s,c)}var vb,yb=o((()=>{z(),I(),gb(),V(),Me(),U(),vb=H({sparseToDense_:_b})}));function bb(e,t){let n=B(t,`indices`,`gatherND`,`int32`),r={params:B(e,`x`,`gatherND`,`string_or_numeric`),indices:n};return R.runKernel(Yt,r)}var xb,Sb=o((()=>{z(),I(),V(),U(),xb=H({gatherND_:bb})}));function Cb(e,t){if(t==null)return e.shape.slice();if(A(e.shape,t))return t;if(e.shape.length===t.length){let n=[];for(let r=0;r<e.shape.length;r++)t[r]==null&&e.shape[r]!=null?n.push(e.shape[r]):n.push(t[r]);return n}return t}var wb=o((()=>{L()}));function Tb(e,t,n,r){let i=B(e,`x`,`dropout`);if(E(i.dtype===`float32`,()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${i.dtype} tensor instead.`),E(t>=0&&t<1,()=>`rate must be a float in the range [0, 1), but got ${t}.`),t===0)return e instanceof oa?i.clone():i;let a=Cb(i,n),o=1-t,s=pc(pp(W(h_(a,0,1,`float32`,r),o)),o);return G(i,s)}var Eb,Db=o((()=>{ca(),V(),L(),cc(),mc(),wb(),mp(),gc(),U(),g_(),Eb=H({dropout_:Tb})}));function Ob(e){return Math.floor(2**Math.ceil(Math.log(e)/Math.log(2)))}function kb(e,t,n){let r=1-e%2,i=new Float32Array(e);for(let a=0;a<e;++a){let o=2*Math.PI*a/(e+r-1);i[a]=t-n*Math.cos(o)}return py(i,`float32`)}var Ab=o((()=>{my()}));async function jb(e,t,n=1){let r=B(e,`predictions`,`inTopK`),i=B(t,`targets`,`inTopK`);E(r.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${r.rank}`),E(r.rank-1===i.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${r.rank} and targets rank ${i.rank}`),D(r.shape.slice(0,r.shape.length-1),i.shape,`predictions's shape should be align with the targets' shape, except the last dimension.`);let a=r.shape[r.shape.length-1];E(n>0&&n<=a,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${a}), but got ${n}`);let o=await r.data(),s=await i.data(),[c,l]=[o.length/a,a],u=M(`bool`,c);for(let e=0;e<c;e++){let t=e*l,r=o.subarray(t,t+l),i=[];for(let e=0;e<r.length;e++)i.push({value:r[e],index:e});i.sort((e,t)=>t.value-e.value),u[e]=0;for(let t=0;t<n;t++)if(i[t].index===s[e]){u[e]=1;break}}return e!==r&&r.dispose(),t!==i&&i.dispose(),$a(u,i.shape,`bool`)}var Mb,Nb=o((()=>{V(),L(),eo(),Mb=jb}));function Pb(e,t,n,r,i,a=`NHWC`,o){let s=e;e.rank===3&&(s=K(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let c=t;c.rank===3&&(c=K(t,[1,t.shape[0],t.shape[1],t.shape[2]])),E(s.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${s.shape}.`),E(c.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${c.shape}.`),E(n.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${n}.`);let l=a===`NHWC`?s.shape[3]:s.shape[1],u=a===`NHWC`?c.shape[3]:c.shape[1];E(l===n[2],()=>`Error in conv2dDerFilter: depth of input ${l}) must match input depth in filter (${n[2]}.`),E(u===n[3],()=>`Error in conv2dDerFilter: depth of dy (${u}) must match output depth for filter (${n[3]}).`),bl(`conv2dDerFilter`,i,o);let d={x:s,dy:c},f={strides:r,pad:i,dataFormat:a,dimRoundingMode:o,filterShape:n};return R.runKernel(vt,d,f)}var Fb,Ib=o((()=>{z(),I(),L(),xl(),U(),q(),Fb=H({conv2DBackpropFilter_:Pb})}));function Lb(e,t,n){if(n==null||n===`linear`)return e;if(n===`relu`)return G(e,ay(t));throw Error(`Cannot compute gradient for fused activation ${n}.`)}function Rb(e,t){let n=t,r=Rd(e.shape,t.shape);return r.length>0&&(n=Hf(n,r)),K(n,e.shape)}function zb(e,t,n,r){if(t===`linear`)return e;if(t===`relu`)return k_(e);if(t===`elu`)return sf(e);if(t===`relu6`)return M_(e);if(t===`prelu`)return pg(e,n);if(t===`leakyrelu`)return Lp(e,r);if(t===`sigmoid`)return Il(e);throw Error(`Unknown fused activation ${t}.`)}var Bb,Vb=o((()=>{Bd(),cf(),Rp(),gc(),mg(),A_(),N_(),q(),Ll(),oy(),Uf(),Bb=(e,t)=>!(e>0)||t===`linear`}));function Hb({x:e,filter:t,strides:n,pad:r,dataFormat:i=`NHWC`,dilations:a=[1,1],dimRoundingMode:o,bias:s,activation:c=`linear`,preluActivationWeights:l,leakyreluAlpha:u}){if(c||=`linear`,Bb(R.state.gradientDepth,c)===!1){E(i===`NHWC`,()=>`Error in fused conv2d: got dataFormat of ${i} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let d=Uu(e,t,n,r,i,a,o);return s!=null&&(d=W(d,s)),zb(d,c,l,u)}let d=B(e,`x`,`conv2d`,`float32`),f=B(t,`filter`,`conv2d`,`float32`),p=d,m=!1;d.rank===3&&(m=!0,p=K(d,[1,d.shape[0],d.shape[1],d.shape[2]])),E(p.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${p.rank}.`),E(f.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${f.rank}.`),bl(`fused conv2d`,r,o);let h=i===`NHWC`?p.shape[3]:p.shape[1];E(f.shape[2]===h,()=>`Error in conv2d: depth of input (${h}) must match input depth for filter ${f.shape[2]}.`),E(_l(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`);let g=al(p.shape,f.shape,n,a,r,o),_;s!=null&&(_=B(s,`bias`,`fused conv2d`),[_]=xa(_,d),i===`NHWC`?zd(g.outShape,_.shape):(E(_.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${_.shape.length}.`),E(_.shape.length===0||_.shape[0]===g.outChannels||_.shape[0]===1,()=>`Error in fused conv2d: bias shape (${_.shape}) is not compatible with the number of output channels (${g.outChannels})`)));let v;if(l!=null){let e=l.shape;if(E(e.length<=1||e.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${e.length}.`),e.length===1)E(e[0]===1||e[0]===g.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${e}) is not compatible with the number of output channels (${g.outChannels}).`);else if(e.length===3)try{zd(e,g.outShape)}catch{let t=`Error in fused conv2d: PReLU activation weights (${e}) is not compatible with the output shape of the conv2d (${g.outShape}).`;throw Error(t)}v=B(l,`prelu weights`,`fused conv2d`)}let y=(e,t)=>{E(i===`NHWC`,()=>`Error in gradient of fused conv2D: got dataFormat of ${i} but only NHWC is currently supported.`);let[o,s,l,u]=t,d=Lb(e,l,c);E(gl(a),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${a}'`);let f=[Yu(s.shape,d,o,n,r),Fb(s,d,o.shape,n,r)];if(u!=null){let e=Rb(u,d);f.push(e)}return f},b={x:p,filter:f,bias:_,preluActivationWeights:v},x={strides:n,pad:r,dataFormat:i,dilations:a,dimRoundingMode:o,activation:c,leakyreluAlpha:u};return s==null?sm((e,t,n)=>{let r=R.runKernel(Hr,b,x);return n([t,e,r]),m&&(r=K(r,[r.shape[1],r.shape[2],r.shape[3]])),{value:r,gradFunc:y}})(p,f):sm((e,t,n,r)=>{let i=R.runKernel(Hr,b,x);return r([t,e,i,n]),m&&(i=K(i,[i.shape[1],i.shape[2],i.shape[3]])),{value:i,gradFunc:y}})(p,f,_)}var Ub,Wb=o((()=>{z(),lm(),I(),Da(),V(),L(),cc(),Bd(),Wu(),Ib(),Xu(),xl(),Vb(),U(),q(),Ub=H({fusedConv2d_:Hb})}));function Gb(e,t,n,r,i,a=[1,1],o){let s=e;e.rank===3&&(s=K(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let c=t;c.rank===3&&(c=K(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let l={x:s,dy:c},u={strides:r,pad:i,dimRoundingMode:o,dilations:a,filterShape:n};return R.runKernel(At,l,u)}var Kb,qb=o((()=>{z(),I(),U(),q(),Kb=H({depthwiseConv2dNativeBackpropFilter_:Gb})}));function Jb(e,t,n,r,i,a=[1,1],o){let s=t,c=!1;t.rank===3&&(c=!0,s=K(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let l={dy:s,filter:n},u={strides:r,pad:i,dimRoundingMode:o,dilations:a,inputShape:e},d=R.runKernel(jt,l,u);return c?K(d,[d.shape[1],d.shape[2],d.shape[3]]):d}var Yb,Xb=o((()=>{z(),I(),U(),q(),Yb=H({depthwiseConv2dNativeBackpropInput_:Jb})}));function Zb({x:e,filter:t,strides:n,pad:r,dataFormat:i=`NHWC`,dilations:a=[1,1],dimRoundingMode:o,bias:s,activation:c=`linear`,preluActivationWeights:l,leakyreluAlpha:u}){if(Bb(R.state.gradientDepth,c)===!1){let d=Od(e,t,n,r,i,a,o);return s!=null&&(d=W(d,s)),zb(d,c,l,u)}let d=B(e,`x`,`depthwiseConv2d`,`float32`),f=B(t,`filter`,`depthwiseConv2d`,`float32`),p=d,m=!1;d.rank===3&&(m=!0,p=K(d,[1,d.shape[0],d.shape[1],d.shape[2]])),E(p.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${p.rank}.`),E(f.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${f.rank}.`),E(p.shape[3]===f.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${p.shape[3]}) must match the inChannels dimension in filter ${f.shape[2]}.`),a??=[1,1],E(_l(n,a),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),bl(`fused depthwiseConv2d`,r,o);let h=al(p.shape,f.shape,n,a,r,o,!0),g;s!=null&&(g=B(s,`bias`,`fused conv2d`),[g]=xa(g,d),zd(h.outShape,g.shape));let _;l!=null&&(_=B(l,`prelu weights`,`fused depthwiseConv2d`));let v=(e,t)=>{E(gl(a),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${a}'`);let[i,s,l,u]=t,d=Lb(e,l,c),f=Yb(s.shape,d,i,n,r,a,o),p=Kb(s,d,i.shape,n,r,a,o);return u==null?[f,p]:[f,p,Rb(g,d)]},y={x:p,filter:f,bias:g,preluActivationWeights:_},b={strides:n,pad:r,dataFormat:i,dilations:a,dimRoundingMode:o,activation:c,leakyreluAlpha:u};return s==null?sm((e,t,n)=>{let r=R.runKernel(Ur,y,b);return n([t,e,r]),m&&(r=K(r,[r.shape[1],r.shape[2],r.shape[3]])),{value:r,gradFunc:v}})(p,f):sm((e,t,n,r)=>{let i=R.runKernel(Ur,y,b);return r([t,e,i,n]),m&&(i=K(i,[i.shape[1],i.shape[2],i.shape[3]])),{value:i,gradFunc:v}})(p,f,g)}var Qb,$b=o((()=>{z(),lm(),I(),Da(),V(),L(),cc(),Bd(),xl(),kd(),qb(),Xb(),Vb(),U(),q(),Qb=H({fusedDepthwiseConv2d_:Zb})}));function ex({a:e,b:t,transposeA:n=!1,transposeB:r=!1,bias:i,activation:a=`linear`,preluActivationWeights:o,leakyreluAlpha:s=.2}){if(Bb(R.state.gradientDepth,a)===!1){let c=Nl(e,t,n,r);return i!=null&&(c=W(c,i)),zb(c,a,o,s)}let c=B(e,`a`,`fused matMul`),l=B(t,`b`,`fused matMul`);[c,l]=xa(c,l);let u=n?c.shape[c.rank-2]:c.shape[c.rank-1],d=r?l.shape[l.rank-1]:l.shape[l.rank-2],f=n?c.shape[c.rank-1]:c.shape[c.rank-2],p=r?l.shape[l.rank-2]:l.shape[l.rank-1],m=c.shape.slice(0,-2),h=l.shape.slice(0,-2),g=k(m),_=k(h);E(u===d,()=>`Error in fused matMul: inner shapes (${u}) and (${d}) of Tensors with shapes ${c.shape} and ${l.shape} and transposeA=${n} and transposeB=${r} must match.`);let v=zd(c.shape.slice(0,-2),l.shape.slice(0,-2)).concat([f,p]),y=n?K(c,[g,u,f]):K(c,[g,f,u]),b=r?K(l,[_,p,d]):K(l,[_,d,p]),x;i!=null&&(x=B(i,`bias`,`fused matMul`),[x]=xa(x,c),zd(v,x.shape));let S;o!=null&&(S=B(o,`prelu weights`,`fused matMul`));let C=(e,t)=>{let[o,s,c,l]=t,u=Lb(K(e,c.shape),c,a),d,f;if(!n&&!r?(d=Nl(u,s,!1,!0),f=Nl(o,u,!0,!1)):!n&&r?(d=Nl(u,s,!1,!1),f=Nl(u,o,!0,!1)):n&&!r?(d=Nl(s,u,!1,!0),f=Nl(o,u,!1,!1)):(d=Nl(s,u,!0,!0),f=Nl(u,o,!0,!0)),i!=null){let e=Rb(l,u);return[d,f,e]}return[d,f]},w={a:y,b,bias:x,preluActivationWeights:S},T={transposeA:n,transposeB:r,activation:a,leakyreluAlpha:s};return i==null?sm((e,t,n)=>{let r=R.runKernel(Vr,w,T);return n([e,t,r]),{value:K(r,v),gradFunc:C}})(y,b):sm((e,t,n,r)=>{let i=R.runKernel(Vr,w,T);return r([e,t,i,n]),{value:K(i,v),gradFunc:C}})(y,b,x)}var tx,nx=o((()=>{z(),lm(),I(),Da(),V(),L(),cc(),Bd(),Vb(),Pl(),U(),q(),tx=H({fusedMatMul_:ex})})),rx=c({conv2d:()=>Ub,depthwiseConv2d:()=>Qb,matMul:()=>tx}),ix=o((()=>{Wb(),$b(),nx()}));function ax(e){return kb(e,.54,.46)}var ox,sx=o((()=>{U(),Ab(),ox=H({hammingWindow_:ax})}));function cx(e){return kb(e,.5,.5)}var lx,ux=o((()=>{U(),Ab(),lx=H({hannWindow_:cx})}));function dx(e,t,n,r=!1,i=0){let a=0,o=[];for(;a+t<=e.size;)o.push(zl(e,a,t)),a+=n;if(r)for(;a<e.size;){let r=a+t-e.size,s=Al([zl(e,a,t-r),Tu([r],i)]);o.push(s),a+=n}return o.length===0?hy([],[0,t]):K(Al(o),[o.length,t])}var fx,px=o((()=>{jl(),Eu(),U(),q(),Bl(),gy(),fx=H({frame_:dx})}));function mx(e,t,n,r,i=lx){r??=Ob(t);let a=fx(e,t,n),o=G(a,i(t));return qv(o,r)}var hx,gx=o((()=>{gc(),U(),Ab(),Jv(),px(),ux(),hx=H({stft_:mx})}));function _x(e,t,n,r,i=`bilinear`,a=0){let o=B(e,`image`,`cropAndResize`),s=B(t,`boxes`,`cropAndResize`,`float32`),c=B(n,`boxInd`,`cropAndResize`,`int32`),l=s.shape[0];E(o.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${o.rank}.`),E(s.rank===2&&s.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${l},4] but had shape ${s.shape}.`),E(c.rank===1&&c.shape[0]===l,()=>`Error in cropAndResize: boxInd must be have size [${l}] but had shape ${s.shape}.`),E(r.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${r.length}.`),E(r[0]>=1&&r[1]>=1,()=>`cropSize must be atleast [1,1], but was ${r}`),E(i===`bilinear`||i===`nearest`,()=>`method must be bilinear or nearest, but was ${i}`);let u={image:o,boxes:s,boxInd:c},d={method:i,extrapolationValue:a,cropSize:r};return R.runKernel(Et,u,d)}var vx,yx=o((()=>{z(),I(),V(),L(),U(),vx=H({cropAndResize_:_x})}));function bx(e){let t=B(e,`image`,`flipLeftRight`,`float32`);E(t.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);let n={image:t};return R.runKernel(Wt,n,{})}var xx,Sx=o((()=>{z(),I(),V(),L(),U(),xx=H({flipLeftRight_:bx})}));function Cx(e){let t=B(e,`image`,`grayscaleToRGB`),n=t.rank-1,r=t.shape[n];E(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),E(r===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${r}.`);let i=Array(t.rank);return i.fill(1,0,n),i[n]=3,sp(t,i)}var wx,Tx=o((()=>{V(),L(),U(),cp(),wx=H({grayscaleToRGB_:Cx})}));function Ex(e){let t=B(e,`image`,`RGBToGrayscale`),n=t.rank-1,r=t.shape[n];E(t.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${t.rank}.`),E(r===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${r}.`);let i=t.dtype,a=$s(t,`float32`),o=py([.2989,.587,.114]),s;switch(t.rank){case 2:s=rf(`ij,j->i`,a,o);break;case 3:s=rf(`ijk,k->ij`,a,o);break;case 4:s=rf(`ijkl,l->ijk`,a,o);break;case 5:s=rf(`ijklm,m->ijkl`,a,o);break;case 6:s=rf(`ijklmn,n->ijklm`,a,o);break;default:throw Error(`Not a valid tensor rank.`)}return s=tp(s,-1),$s(s,i)}var Dx,Ox=o((()=>{V(),L(),ec(),af(),np(),U(),my(),Dx=H({rgbToGrayscale_:Ex})}));function kx(e,t,n=0,r=.5){let i=B(e,`image`,`rotateWithOffset`,`float32`);E(i.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${i.rank}.`);let a={image:i},o={radians:t,fillValue:n,center:r};return R.runKernel(Br,a,o)}var Ax,jx=o((()=>{z(),I(),V(),L(),U(),Ax=H({rotateWithOffset_:kx})}));function Mx(e,t,n,r,i,a){r??=.5,i??=-1/0,a??=0;let o=e.shape[0];return n=Math.min(n,o),E(0<=r&&r<=1,()=>`iouThreshold must be in [0, 1], but was '${r}'`),E(e.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${e.rank}'`),E(e.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${e.shape[1]}`),E(t.rank===1,()=>`scores must be a 1D tensor`),E(t.shape[0]===o,()=>`scores has incompatible shape with boxes. Expected ${o}, but was ${t.shape[0]}`),E(0<=a&&a<=1,()=>`softNmsSigma must be in [0, 1], but was '${a}'`),{maxOutputSize:n,iouThreshold:r,scoreThreshold:i,softNmsSigma:a}}var Nx=o((()=>{L()}));function Px(e,t,n,r=.5,i=-1/0){let a=B(e,`boxes`,`nonMaxSuppression`,`float32`),o=B(t,`scores`,`nonMaxSuppression`,`float32`),s=Mx(a,o,n,r,i);n=s.maxOutputSize,r=s.iouThreshold,i=s.scoreThreshold;let c={maxOutputSize:n,iouThreshold:r,scoreThreshold:i};return R.runKernel(An,{boxes:a,scores:o},c)}var Fx,Ix=o((()=>{z(),I(),V(),Nx(),U(),Fx=H({nonMaxSuppression_:Px})}));function Lx(e,t,n){let r=Rx(e,t,n),i=r<0?-(r+1):r;e.splice(i,0,t)}function Rx(e,t,n){return Bx(e,t,n||zx)}function zx(e,t){return e>t?1:e<t?-1:0}function Bx(e,t,n){let r=0,i=e.length,a=0,o=!1;for(;r<i;){a=r+(i-r>>>1);let s=n(t,e[a]);s>0?r=a+1:(i=a,o=!s)}return o?r:-r-1}var Vx=o((()=>{}));function Hx(e,t,n,r,i){return Gx(e,t,n,r,i,0)}function Ux(e,t,n,r,i,a){return Gx(e,t,n,r,i,0,!1,a,!0)}function Wx(e,t,n,r,i,a){return Gx(e,t,n,r,i,a,!0)}function Gx(e,t,n,r,i,a,o=!1,s=!1,c=!1){let l=[];for(let e=0;e<t.length;e++)t[e]>i&&l.push({score:t[e],boxIndex:e,suppressBeginIndex:0});l.sort(Jx);let u=a>0?-.5/a:0,d=[],f=[];for(;d.length<n&&l.length>0;){let t=l.pop(),{score:n,boxIndex:a,suppressBeginIndex:o}=t;if(n<i)break;let s=!1;for(let n=d.length-1;n>=o;--n){let o=Kx(e,a,d[n]);if(o>=r){s=!0;break}if(t.score*=qx(r,u,o),t.score<=i)break}t.suppressBeginIndex=d.length,s||(t.score===n?(d.push(a),f.push(t.score)):t.score>i&&Lx(l,t,Jx))}let p=d.length,m=n-p;s&&m>0&&(d.push(...Array(m).fill(0)),f.push(...Array(m).fill(0)));let h={selectedIndices:d};return o&&(h.selectedScores=f),c&&(h.validOutputs=p),h}function Kx(e,t,n){let r=e.subarray(t*4,t*4+4),i=e.subarray(n*4,n*4+4),a=Math.min(r[0],r[2]),o=Math.min(r[1],r[3]),s=Math.max(r[0],r[2]),c=Math.max(r[1],r[3]),l=Math.min(i[0],i[2]),u=Math.min(i[1],i[3]),d=Math.max(i[0],i[2]),f=Math.max(i[1],i[3]),p=(s-a)*(c-o),m=(d-l)*(f-u);if(p<=0||m<=0)return 0;let h=Math.max(a,l),g=Math.max(o,u),_=Math.min(s,d),v=Math.min(c,f),y=Math.max(_-h,0)*Math.max(v-g,0);return y/(p+m-y)}function qx(e,t,n){let r=Math.exp(t*n*n);return n<=e?r:0}function Jx(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}var Yx=o((()=>{Vx()}));async function Xx(e,t,n,r=.5,i=-1/0){let a=B(e,`boxes`,`nonMaxSuppressionAsync`),o=B(t,`scores`,`nonMaxSuppressionAsync`),s=Mx(a,o,n,r,i);n=s.maxOutputSize,r=s.iouThreshold,i=s.scoreThreshold;let c=await Promise.all([a.data(),o.data()]),l=c[0],u=c[1],{selectedIndices:d}=Hx(l,u,n,r,i);return a!==e&&a.dispose(),o!==t&&o.dispose(),py(d,`int32`)}var Zx,Qx=o((()=>{Yx(),V(),Nx(),my(),Zx=Xx}));function $x(e,t,n,r=.5,i=-1/0,a=0){let o=B(e,`boxes`,`nonMaxSuppression`),s=B(t,`scores`,`nonMaxSuppression`),c=Mx(o,s,n,r,i,a);n=c.maxOutputSize,r=c.iouThreshold,i=c.scoreThreshold,a=c.softNmsSigma;let l={boxes:o,scores:s},u={maxOutputSize:n,iouThreshold:r,scoreThreshold:i,softNmsSigma:a},d=R.runKernel(Mn,l,u);return{selectedIndices:d[0],selectedScores:d[1]}}var eS,tS=o((()=>{z(),I(),V(),Nx(),U(),eS=H({nonMaxSuppressionWithScore_:$x})}));async function nS(e,t,n,r=.5,i=-1/0,a=0){let o=B(e,`boxes`,`nonMaxSuppressionAsync`),s=B(t,`scores`,`nonMaxSuppressionAsync`),c=Mx(o,s,n,r,i,a);n=c.maxOutputSize,r=c.iouThreshold,i=c.scoreThreshold,a=c.softNmsSigma;let l=await Promise.all([o.data(),s.data()]),u=l[0],d=l[1],{selectedIndices:f,selectedScores:p}=Wx(u,d,n,r,i,a);return o!==e&&o.dispose(),s!==t&&s.dispose(),{selectedIndices:py(f,`int32`),selectedScores:py(p)}}var rS,iS=o((()=>{Yx(),V(),Nx(),my(),rS=nS}));function aS(e,t,n,r=.5,i=-1/0,a=!1){let o=B(e,`boxes`,`nonMaxSuppression`),s=B(t,`scores`,`nonMaxSuppression`),c=Mx(o,s,n,r,i,null),l=c.maxOutputSize,u=c.iouThreshold,d=c.scoreThreshold,f={boxes:o,scores:s},p={maxOutputSize:l,iouThreshold:u,scoreThreshold:d,padToMaxOutputSize:a},m=R.runKernel(jn,f,p);return{selectedIndices:m[0],validOutputs:m[1]}}var oS,sS=o((()=>{z(),I(),V(),Nx(),U(),oS=H({nonMaxSuppressionPadded_:aS})}));async function cS(e,t,n,r=.5,i=-1/0,a=!1){let o=B(e,`boxes`,`nonMaxSuppressionAsync`),s=B(t,`scores`,`nonMaxSuppressionAsync`),c=Mx(o,s,n,r,i,null),l=c.maxOutputSize,u=c.iouThreshold,d=c.scoreThreshold,[f,p]=await Promise.all([o.data(),s.data()]),{selectedIndices:m,validOutputs:h}=Ux(f,p,l,u,d,a);return o!==e&&o.dispose(),s!==t&&s.dispose(),{selectedIndices:py(m,`int32`),validOutputs:Nf(h,`int32`)}}var lS,uS=o((()=>{Yx(),V(),Nx(),Pf(),my(),lS=cS}));function dS(e,t,n=!1,r=!1){let i=B(e,`images`,`resizeBilinear`);E(i.rank===3||i.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${i.rank}.`),E(t.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),E(r===!1||n===!1,()=>`Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.`);let a=i,o=!1;i.rank===3&&(o=!0,a=K(i,[1,i.shape[0],i.shape[1],i.shape[2]]));let[]=t,s={images:a},c={alignCorners:n,halfPixelCenters:r,size:t},l=R.runKernel(Xn,s,c);return o?K(l,[l.shape[1],l.shape[2],l.shape[3]]):l}var fS,pS=o((()=>{z(),I(),V(),L(),U(),q(),fS=H({resizeBilinear_:dS})}));function mS(e,t,n=!1,r=!1){let i=B(e,`images`,`resizeNearestNeighbor`);E(i.rank===3||i.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${i.rank}.`),E(t.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),E(i.dtype===`float32`||i.dtype===`int32`,()=>"`images` must have `int32` or `float32` as dtype"),E(r===!1||n===!1,()=>`Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.`);let a=i,o=!1;i.rank===3&&(o=!0,a=K(i,[1,i.shape[0],i.shape[1],i.shape[2]]));let[]=t,s={images:a},c={alignCorners:n,halfPixelCenters:r,size:t},l=R.runKernel(Jn,s,c);return o?K(l,[l.shape[1],l.shape[2],l.shape[3]]):l}var hS,gS=o((()=>{z(),I(),V(),L(),U(),q(),hS=H({resizeNearestNeighbor_:mS})}));function _S(e,t=`binary`,n=!1,r=.5){let i=B(e,`image`,`threshold`),a=i.shape[0]*i.shape[1],o=G(py([r]),255),s,c,l,u;if(E(i.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${i.rank}.`),E(i.shape[2]===3||i.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${i.shape[2]}.`),E(i.dtype===`int32`||i.dtype===`float32`,()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${i.dtype}.`),E(t===`otsu`||t===`binary`,()=>`Method must be binary or otsu, but was ${t}`),i.shape[2]===3){[s,c,l]=Wv(i,[1,1,1],-1);let e=G(s,.2989),t=G(c,.587),n=G(l,.114);u=W(W(e,t),n)}else u=e;t===`otsu`&&(o=vS(du($s(X_(u),`int32`),$a([]),256),a));let d=n?Up(u,o):yp(u,o);return $s(G(d,255),`int32`)}function vS(e,t){let n=py([-1]),r=py([0]),i=py([0]),a,o,s,c,l,u;for(let d=0;d<e.size-1;d++){a=zl(e,0,d+1),o=zl(e,d+1),l=pc(Hf(a),t),u=pc(Hf(o),t);let f=Hf(G(a,b_(0,a.size)));s=pc(f,Hf(a));let p=Tu(o.shape,a.size),m=W(b_(0,o.size),p),h=G(o,m);c=pc(Hf(h),Hf(o));let g=bm(s,c),_=bm(s,c),v=G(l,u);i=G(G(v,g),_);let y=yp(i,r);r=Gd(y,i,r),n=Gd(y,py([d]),n)}return n}var yS,bS=o((()=>{my(),U(),ec(),Gv(),fu(),Wp(),bp(),Uf(),cc(),gc(),mc(),xm(),Z_(),Kd(),Eu(),Bl(),x_(),eo(),L(),V(),yS=H({threshold_:_S})}));function xS(e,t,n=`nearest`,r=`constant`,i=0,a){let o=B(e,`image`,`transform`,`float32`),s=B(t,`transforms`,`transform`,`float32`);E(o.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${o.rank}.`),E(s.rank===2&&(s.shape[0]===o.shape[0]||s.shape[0]===1)&&s.shape[1]===8,()=>`Error in transform: Input transform should be batch x 8 or 1 x 8`),E(a==null||a.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${a}.`);let c={image:o,transforms:s},l={interpolation:n,fillMode:r,fillValue:i,outputShape:a};return R.runKernel(jr,c,l)}var SS,CS=o((()=>{z(),I(),V(),L(),U(),SS=H({transform_:xS})}));function wS(e,t,n){let r=B(e,`a`,`bandPart`);E(r.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${r.rank}.`);let i=r.shape,[a,o]=r.shape.slice(-2),s,c;typeof t==`number`?(E(t%1==0,()=>`bandPart(): numLower must be an integer, got ${t}.`),E(t<=a,()=>`bandPart(): numLower (${t}) must not be greater than the number of rows (${a}).`),s=B(t<0?a:t,`numLower`,`bandPart`)):(E(t.dtype===`int32`,()=>`bandPart(): numLower's dtype must be an int32.`),s=Gd(Bp(t,0),a,mh(t,a))),typeof n==`number`?(E(n%1==0,()=>`bandPart(): numUpper must be an integer, got ${n}.`),E(n<=o,()=>`bandPart(): numUpper (${n}) must not be greater than the number of columns (${o}).`),c=B(n<0?o:n,`numUpper`,`bandPart`)):(E(n.dtype===`int32`,()=>`bandPart(): numUpper's dtype must be an int32.`),c=Gd(Bp(n,0),o,mh(n,o)));let l=K(b_(0,a,1,`int32`),[-1,1]),u=b_(0,o,1,`int32`),d=bm(l,u),f=km(Up(d,s),Sp(d,dm(c))),p=sh([a,o],r.dtype);return K(ny(Ky(K(r,[-1,a,o])).map(e=>Gd(f,e,p))),i)}var TS,ES=o((()=>{V(),L(),Cp(),Vp(),Wp(),Am(),hh(),fm(),U(),x_(),q(),ry(),xm(),qy(),Kd(),ch(),TS=H({bandPart_:wS})}));function DS(e){let t;if(Array.isArray(e)){t=!1,E(e!=null&&e.length>0,()=>`Gram-Schmidt process: input must not be null, undefined, or empty`);let n=e[0].shape[0];for(let t=1;t<e.length;++t)E(e[t].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${e[t].shape[0]} vs. ${n})`)}else t=!0,e=Wv(e,e.shape[0],0).map(e=>$v(e,[0]));E(e.length<=e[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${e.length}) exceeds number of dimensions (${e[0].shape[0]}).`);let n=[],r=e;for(let t=0;t<e.length;++t)n.push(R.tidy(()=>{let e=r[t];if(t>0)for(let r=0;r<t;++r){let t=G(Hf(G(n[r],e)),n[r]);e=bm(e,t)}return pc(e,Kf(e,`euclidean`))}));return t?ny(n,0):n}var OS,kS=o((()=>{z(),L(),mc(),gc(),qf(),U(),Gv(),ey(),ry(),xm(),Uf(),OS=H({gramSchmidt_:DS})}));function AS(e,t=!1){if(E(e.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${e.rank}`),e.rank===2)return jS(e,t);{let n=e.shape.slice(0,e.shape.length-2).reduce((e,t)=>e*t),r=Ky(K(e,[n,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),i=[],a=[];return r.forEach(e=>{let[n,r]=jS(e,t);i.push(n),a.push(r)}),[K(ny(i,0),e.shape),K(ny(a,0),e.shape)]}}function jS(e,t=!1){return R.tidy(()=>{E(e.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${e.shape.length}D Tensor.`);let n=e.shape[0],r=e.shape[1],i=up(n),a=nc(e),o=hy([[1]],[1,1]),s=nc(o),c=n>=r?r:n;for(let e=0;e<c;++e){let t=a,c=s,l=i;[s,a,i]=R.tidy(()=>{let t=zl(a,[e,e],[n-e,1]),c=Kf(t),l=zl(a,[e,e],[1,1]),u=Gd(yp(l,0),hy([[-1]]),hy([[1]])),d=bm(l,G(u,c)),f=pc(t,d);s=f.shape[0]===1?nc(o):Al([o,zl(f,[1,0],[f.shape[0]-1,f.shape[1]])],0);let p=dm(pc(Nl(u,d),c)),m=zl(a,[e,0],[n-e,r]),h=G(p,s),g=sb(s);if(e===0)a=bm(m,Nl(h,Nl(g,m)));else{let t=bm(m,Nl(h,Nl(g,m)));a=Al([zl(a,[0,0],[e,r]),t],0)}let _=sb(h),v=zl(i,[0,e],[n,i.shape[1]-e]);if(e===0)i=bm(v,Nl(Nl(v,s),_));else{let t=bm(v,Nl(Nl(v,s),_));i=Al([zl(i,[0,0],[n,e]),t],1)}return[s,a,i]}),go([t,c,l])}return!t&&n>r&&(i=zl(i,[0,0],[n,r]),a=zl(a,[0,0],[r,r])),[i,a]})}var MS,NS=o((()=>{z(),Oo(),L(),rc(),jl(),mc(),dp(),bp(),Pl(),gc(),fm(),qf(),U(),q(),Bl(),ry(),xm(),gy(),cb(),qy(),Kd(),MS=H({qr_:AS})})),PS,FS=o((()=>{(function(e){e[e.NONE=0]=`NONE`,e[e.MEAN=1]=`MEAN`,e[e.SUM=2]=`SUM`,e[e.SUM_BY_NONZERO_WEIGHTS=3]=`SUM_BY_NONZERO_WEIGHTS`})(PS||={})}));function IS(e,t,n=PS.SUM_BY_NONZERO_WEIGHTS){let r=B(e,`losses`,`computeWeightedLoss`),i=null;t!=null&&(i=B(t,`weights`,`computeWeightedLoss`));let a=i==null?r:G(r,i);if(n===PS.NONE)return a;if(n===PS.SUM)return Hf(a);if(n===PS.MEAN){if(i==null)return ah(a);{let e=r.size/i.size,t=pc(Hf(a),Hf(i));return e>1?pc(t,Nf(e)):t}}if(n===PS.SUM_BY_NONZERO_WEIGHTS){if(i==null)return pc(Hf(a),Nf(r.size));{let e=G(i,lh(r.shape)),t=$s(Hf(Mh(e,Nf(0))),`float32`);return pc(Hf(a),t)}}throw Error(`Unknown reduction: ${n}`)}var LS,RS=o((()=>{V(),ec(),mc(),FS(),oh(),gc(),Nh(),uh(),U(),Pf(),Uf(),LS=H({computeWeightedLoss_:IS})}));function zS(e,t,n,r=PS.SUM_BY_NONZERO_WEIGHTS){let i=B(e,`labels`,`absoluteDifference`),a=B(t,`predictions`,`absoluteDifference`),o=null;n!=null&&(o=B(n,`weights`,`absoluteDifference`)),D(i.shape,a.shape,`Error in absoluteDifference: `);let s=vc(bm(i,a));return LS(s,o,r)}var BS,VS=o((()=>{V(),L(),yc(),FS(),U(),xm(),RS(),BS=H({absoluteDifference_:zS})}));function HS(e,t,n,r,i=PS.SUM_BY_NONZERO_WEIGHTS){let a=B(e,`labels`,`cosineDistance`),o=B(t,`predictions`,`cosineDistance`),s=null;r!=null&&(s=B(r,`weights`,`cosineDistance`)),D(a.shape,o.shape,`Error in cosineDistance: `);let c=Nf(1),l=bm(c,Hf(G(a,o),n,!0));return LS(l,s,i)}var US,WS=o((()=>{V(),L(),FS(),gc(),U(),Pf(),xm(),Uf(),RS(),US=H({cosineDistance_:HS})}));function GS(e,t,n,r=PS.SUM_BY_NONZERO_WEIGHTS){let i=B(e,`labels`,`hingeLoss`),a=B(t,`predictions`,`hingeLoss`),o=null;n!=null&&(o=B(n,`weights`,`hingeLoss`)),D(i.shape,a.shape,`Error in hingeLoss: `);let s=Nf(1);i=bm(G(Nf(2),i),s);let c=k_(bm(s,G(i,a)));return LS(c,o,r)}var KS,qS=o((()=>{V(),L(),FS(),gc(),U(),A_(),Pf(),xm(),RS(),KS=H({hingeLoss_:GS})}));function JS(e,t,n,r=1,i=PS.SUM_BY_NONZERO_WEIGHTS){let a=B(e,`labels`,`huberLoss`),o=B(t,`predictions`,`huberLoss`),s=null;n!=null&&(s=B(n,`weights`,`huberLoss`)),D(a.shape,o.shape,`Error in huberLoss: `);let c=Nf(r),l=vc(bm(o,a)),u=mh(l,c),d=bm(l,u),f=W(G(Nf(.5),zf(u)),G(c,d));return LS(f,s,i)}var YS,XS=o((()=>{V(),L(),yc(),cc(),FS(),hh(),gc(),U(),Pf(),Bf(),xm(),RS(),YS=H({huberLoss_:JS})}));function ZS(e,t,n,r=1e-7,i=PS.SUM_BY_NONZERO_WEIGHTS){let a=B(e,`labels`,`logLoss`),o=B(t,`predictions`,`logLoss`),s=null;n!=null&&(s=B(n,`weights`,`logLoss`)),D(a.shape,o.shape,`Error in logLoss: `);let c=Nf(1),l=Nf(r),u=dm(G(a,Zp(W(o,l)))),d=G(bm(c,a),Zp(W(bm(c,o),l))),f=bm(u,d);return LS(f,s,i)}var QS,$S=o((()=>{V(),L(),cc(),Qp(),FS(),gc(),fm(),U(),Pf(),xm(),RS(),QS=H({logLoss_:ZS})}));function eC(e,t,n,r=PS.SUM_BY_NONZERO_WEIGHTS){let i=B(e,`labels`,`meanSquaredError`),a=B(t,`predictions`,`meanSquaredError`),o=null;n!=null&&(o=B(n,`weights`,`meanSquaredError`)),D(i.shape,a.shape,`Error in meanSquaredError: `);let s=Xv(i,a);return LS(s,o,r)}var tC,nC=o((()=>{V(),L(),FS(),U(),Zv(),RS(),tC=H({meanSquaredError_:eC})}));function rC(e,t){let n=B(e,`labels`,`sigmoidCrossEntropyWithLogits`),r=B(t,`logits`,`sigmoidCrossEntropyWithLogits`);D(n.shape,r.shape,`Error in sigmoidCrossEntropyWithLogits: `);let i=k_(r),a=G(r,n),o=em(Qf(dm(vc(r))));return W(bm(i,a),o)}function iC(e,t,n,r=0,i=PS.SUM_BY_NONZERO_WEIGHTS){let a=B(e,`multiClassLabels`,`sigmoidCrossEntropy`),o=B(t,`logits`,`sigmoidCrossEntropy`),s=null;if(n!=null&&(s=B(n,`weights`,`sigmoidCrossEntropy`)),D(a.shape,o.shape,`Error in sigmoidCrossEntropy: `),r>0){let e=Nf(r),t=Nf(1),n=Nf(.5);a=W(G(a,bm(t,e)),G(n,e))}let c=rC(a,o);return LS(c,s,i)}var aC,oC=o((()=>{V(),L(),yc(),cc(),$f(),tm(),FS(),gc(),fm(),U(),A_(),Pf(),xm(),RS(),aC=H({sigmoidCrossEntropy_:iC})}));function sC(e,t,n=-1){if(n===-1&&(n=t.rank-1),n!==t.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${t.rank} and dim was ${n}`);return sm((e,t,r)=>{let i=Em(t,[n],!0),a=bm($s(t,`float32`),i);r([e,a]);let o=dm(G(a,e));return{value:Hf(o,[n]),gradFunc:(e,t)=>{let[r,i]=t,a=vf(e.shape,[n]);return[G(K(e,a),bm($s(r,`float32`),Qf(i))),G(K(e,a),bm(Qf(i),$s(r,`float32`)))]}}})(e,t)}function cC(e,t,n,r=0,i=PS.SUM_BY_NONZERO_WEIGHTS){let a=B(e,`onehotLabels`,`softmaxCrossEntropy`),o=B(t,`logits`,`softmaxCrossEntropy`),s=null;if(n!=null&&(s=B(n,`weights`,`softmaxCrossEntropy`)),D(a.shape,o.shape,`Error in softmaxCrossEntropy: `),r>0){let e=Nf(r),t=Nf(1),n=Nf(a.shape[1]);a=W(G(a,bm(t,e)),pc(e,n))}let c=sC(a,o);return LS(c,s,i)}var lC,uC=o((()=>{lm(),V(),L(),cc(),Cf(),ec(),mc(),$f(),Dm(),FS(),gc(),fm(),U(),q(),Pf(),xm(),Uf(),RS(),lC=H({softmaxCrossEntropy_:cC})}));function dC(e,t,n,r){let i=B(e,`indices`,`sparseFillEmptyRows`,`int32`),a=B(t,`values`,`sparseFillEmptyRows`),o=B(n,`denseShape`,`sparseFillEmptyRows`,`int32`),s=B(r,`defaultValue`,`sparseFillEmptyRows`,a.dtype);if(i.rank!==2)throw Error(`Indices should be Tensor2D but received shape
        ${i.shape}`);if(a.rank!==1)throw Error(`Values should be Tensor1D but received shape ${a.shape}`);if(o.rank!==1)throw Error(`Dense shape should be Tensor1D but received shape ${o.shape}`);if(s.rank!==0)throw Error(`Default value should be a scalar but received shape ${s.shape}`);let c={indices:i,values:a,denseShape:o,defaultValue:s},l=R.runKernel(gr,c);return{outputIndices:l[0],outputValues:l[1],emptyRowIndicator:l[2],reverseIndexMap:l[3]}}var fC,pC=o((()=>{z(),I(),V(),U(),fC=H({sparseFillEmptyRows_:dC})}));function mC(e,t,n){let r=B(e,`inputIndices`,`sparseReshape`,`int32`),i=B(t,`inputShape`,`sparseReshape`,`int32`),a=B(n,`newShape`,`sparseReshape`,`int32`);if(r.rank!==2)throw Error(`Input indices should be Tensor2D but received shape
        ${r.shape}`);if(i.rank!==1)throw Error(`Input shape should be Tensor1D but received shape ${i.shape}`);if(a.rank!==1)throw Error(`New shape should be Tensor1D but received shape ${a.shape}`);let o={inputIndices:r,inputShape:i,newShape:a},s=R.runKernel(_r,o);return{outputIndices:s[0],outputShape:s[1]}}var hC,gC=o((()=>{z(),I(),V(),U(),hC=H({sparseReshape_:mC})}));function _C(e,t,n){let r=B(e,`data`,`sparseSegmentMean`),i=B(t,`indices`,`sparseSegmentMean`,`int32`),a=B(n,`segmentIds`,`sparseSegmentMean`,`int32`);if(r.rank<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.rank!==1)throw Error(`Indices should be Tensor1D but received shape
          ${i.shape}`);if(a.rank!==1)throw Error(`Segment ids should be Tensor1D but received shape
          ${a.shape}`);let o={data:r,indices:i,segmentIds:a};return R.runKernel(vr,o)}var vC,yC=o((()=>{z(),I(),V(),U(),vC=H({sparseSegmentMean_:_C})}));function bC(e,t,n){let r=B(e,`data`,`sparseSegmentSum`),i=B(t,`indices`,`sparseSegmentSum`,`int32`),a=B(n,`segmentIds`,`sparseSegmentSum`,`int32`);if(r.rank<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.rank!==1)throw Error(`Indices should be Tensor1D but received shape
         ${i.shape}`);if(a.rank!==1)throw Error(`Segment ids should be Tensor1D but received shape
         ${a.shape}`);let o={data:r,indices:i,segmentIds:a};return R.runKernel(yr,o)}var xC,SC=o((()=>{z(),I(),V(),U(),xC=H({sparseSegmentSum_:bC})}));function CC(e,t,n,r,i,a,o,s){let c=B(e,`data`,`stringNGrams`,`string`);if(c.dtype!==`string`)throw Error(`Data must be of datatype string`);if(c.shape.length!==1)throw Error(`Data must be a vector, saw: ${c.shape}`);let l=B(t,`dataSplits`,`stringNGrams`);if(l.dtype!==`int32`)throw Error(`Data splits must be of datatype int32`);let u={separator:n,nGramWidths:r,leftPad:i,rightPad:a,padWidth:o,preserveShortSequences:s},d={data:c,dataSplits:l},f=R.runKernel(Tr,d,u);return{nGrams:f[0],nGramsSplits:f[1]}}var wC,TC=o((()=>{z(),I(),V(),U(),wC=H({stringNGrams_:CC})}));function EC(e,t,n=!0){let r=B(e,`input`,`stringSplit`,`string`),i=B(t,`delimiter`,`stringSplit`,`string`);if(r.rank!==1)throw Error(`Input should be Tensor1D but received shape ${r.shape}`);if(i.rank!==0)throw Error(`Delimiter should be a scalar but received shape ${i.shape}`);let a={skipEmpty:n},o={input:r,delimiter:i},s=R.runKernel(Er,o,a);return{indices:s[0],values:s[1],shape:s[2]}}var DC,OC=o((()=>{z(),I(),V(),U(),DC=H({stringSplit_:EC})}));function kC(e,t){let n=B(e,`input`,`stringToHashBucketFast`,`string`),r={numBuckets:t};if(t<=0)throw Error(`Number of buckets must be at least 1`);let i={input:n};return R.runKernel(Dr,i,r)}var AC,jC=o((()=>{z(),I(),V(),U(),AC=H({stringToHashBucketFast_:kC})}));function MC(e,t,n,r=!0){let i=B(e,`input`,`staticRegexReplace`,`string`),a={pattern:t,rewrite:n,replaceGlobal:r};return R.runKernel(Cr,{x:i},a)}var NC,PC=o((()=>{z(),I(),V(),U(),NC=H({staticRegexReplace_:MC})})),FC,IC,LC,RC,zC,BC,VC,HC=o((()=>{yc(),Sc(),Tc(),cc(),Oc(),jc(),Pc(),Lc(),Bc(),Uc(),Kc(),Yc(),Qc(),tl(),Tl(),Ol(),Kl(),Yl(),eu(),ru(),ou(),lu(),fu(),hu(),vu(),xu(),Zs(),ec(),wu(),ku(),rc(),Xa(),jl(),Mu(),Fu(),Ru(),Vu(),qu(),Wu(),$u(),nd(),cd(),dd(),md(),_d(),bd(),Cd(),Ed(),kd(),Md(),Fd(),mc(),Qd(),tf(),af(),cf(),df(),Ud(),mf(),Xf(),$f(),np(),ap(),dp(),Eu(),mp(),dc(),_p(),bp(),Cp(),Ep(),kp(),Mp(),Fp(),Rp(),Vp(),Wp(),Kp(),Yp(),Qp(),tm(),vm(),wm(),Dm(),Am(),Nm(),Im(),zm(),Gm(),Pl(),Ef(),Jm(),Zm(),eh(),rh(),oh(),fh(),kf(),hh(),vh(),xh(),wh(),gc(),Dh(),Ah(),fm(),Nh(),Ih(),uh(),zh(),Hh(),Gh(),Jh(),Zh(),eg(),rg(),dg(),Mf(),mg(),ac(),_g(),bg(),Cg(),Eg(),kg(),s_(),u_(),p_(),g_(),y_(),x_(),w_(),D_(),A_(),N_(),q(),I_(),z_(),H_(),G_(),J_(),Z_(),ev(),Pf(),rv(),ov(),lv(),Ll(),fv(),hv(),vv(),Bl(),xv(),wv(),Dv(),Av(),Nv(),hm(),og(),Iv(),zv(),Hv(),Jv(),Gv(),Lf(),Bf(),Zv(),ey(),ry(),oy(),ly(),xm(),Uf(),fy(),Ul(),eo(),my(),gy(),vy(),by(),Sy(),wy(),My(),cp(),Fy(),Ry(),Vy(),Wy(),qy(),Yy(),Zy(),Kd(),nb(),ch(),Yd(),ab(),cb(),qf(),db(),mb(),Um(),yb(),Sb(),Db(),Ab(),Nb(),U(),ix(),sx(),ux(),px(),gx(),yx(),Sx(),Tx(),Ox(),jx(),Ix(),Qx(),tS(),iS(),sS(),uS(),pS(),gS(),bS(),CS(),ES(),kS(),NS(),VS(),RS(),WS(),qS(),XS(),$S(),nC(),oC(),uC(),pC(),gC(),yC(),SC(),TC(),OC(),jC(),PC(),FC={fft:Fv,ifft:Rv,rfft:qv,irfft:Vv},IC={hammingWindow:ox,hannWindow:lx,frame:fx,stft:hx},LC={flipLeftRight:xx,grayscaleToRGB:wx,resizeNearestNeighbor:hS,resizeBilinear:fS,rgbToGrayscale:Dx,rotateWithOffset:Ax,cropAndResize:vx,nonMaxSuppression:Fx,nonMaxSuppressionAsync:Zx,nonMaxSuppressionWithScore:eS,nonMaxSuppressionWithScoreAsync:rS,nonMaxSuppressionPadded:oS,nonMaxSuppressionPaddedAsync:lS,threshold:yS,transform:SS},RC={bandPart:TS,gramSchmidt:OS,qr:MS},zC={absoluteDifference:BS,computeWeightedLoss:LS,cosineDistance:US,hingeLoss:KS,huberLoss:YS,logLoss:QS,meanSquaredError:tC,sigmoidCrossEntropy:aC,softmaxCrossEntropy:lC},BC={sparseFillEmptyRows:fC,sparseReshape:hC,sparseSegmentMean:vC,sparseSegmentSum:xC},VC={stringNGrams:wC,stringSplit:DC,stringToHashBucketFast:AC,staticRegexReplace:NC}})),UC=c({Serializable:()=>JC,SerializationMap:()=>YC,getRegisteredName:()=>GC,registerClass:()=>WC});function WC(e,t,n){E(e.className!=null,()=>`Class being registered does not have the static className property defined.`),E(typeof e.className==`string`,()=>`className is required to be a string, but got type `+typeof e.className),E(e.className.length>0,()=>`Class being registered has an empty-string as its className, which is disallowed.`),t===void 0&&(t=`Custom`),n===void 0&&(n=e.className);let r=n,i=t+`>`+r;return YC.register(e),KC.set(i,e),qC.set(e,i),e}function GC(e){return qC.has(e)?qC.get(e):e.className}var KC,qC,JC,YC,XC=o((()=>{L(),KC=new Map,qC=new Map,JC=class{getClassName(){return this.constructor.className}static fromConfig(e,t){return new e(t)}},YC=class e{constructor(){this.classNameMap={}}static getMap(){return e.instance??=new e,e.instance}static register(t){e.getMap().classNameMap[t.className]=[t,t.fromConfig]}}})),ZC,QC=o((()=>{Oo(),lm(),HC(),XC(),ZC=class extends JC{minimize(e,t=!1,n){let{value:r,grads:i}=this.computeGradients(e,n);if(n!=null){let e=n.map(e=>({name:e.name,tensor:i[e.name]}));this.applyGradients(e)}else this.applyGradients(i);return go(i),t?r:(r.dispose(),null)}get iterations(){return this.iterations_??=0,this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,t){return om(e,t)}dispose(){this.iterations_!=null&&go(this.iterations_)}async saveIterations(){return this.iterations_??=0,{name:`iter`,tensor:Nf(this.iterations_,`int32`)}}async getWeights(){throw Error(`getWeights() is not implemented for this optimizer yet.`)}async setWeights(e){throw Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(e){return this.iterations_=(await e[0].tensor.data())[0],e.slice(1)}},Object.defineProperty(ZC,Symbol.hasInstance,{value:e=>e.minimize!=null&&e.computeGradients!=null&&e.applyGradients!=null})})),$C,ew=o((()=>{z(),Oo(),cc(),mc(),gc(),HC(),Bf(),Yd(),QC(),$C=class extends ZC{static get className(){return`Adadelta`}constructor(e,t,n=null){super(),this.learningRate=e,this.rho=t,this.epsilon=n,this.accumulatedGrads=[],this.accumulatedUpdates=[],n??(this.epsilon=R.backend.epsilon())}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=R.registeredVariables[t];this.accumulatedGrads[n]??(this.accumulatedGrads[n]={originalName:`${t}/accum_grad`,variable:ho(()=>Jd(r).variable(!1))}),this.accumulatedUpdates[n]??(this.accumulatedUpdates[n]={originalName:`${t}/accum_var`,variable:ho(()=>Jd(r).variable(!1))});let i=Array.isArray(e)?e[n].tensor:e[t];if(i==null)return;let a=this.accumulatedGrads[n].variable,o=this.accumulatedUpdates[n].variable;ho(()=>{let e=W(G(a,this.rho),G(zf(i),1-this.rho)),t=G(pc(If(W(o,this.epsilon)),If(W(a,this.epsilon))),i),n=W(G(o,this.rho),G(zf(t),1-this.rho));a.assign(e),o.assign(n);let s=W(G(t,-this.learningRate),r);r.assign(s)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(go(this.accumulatedGrads.map(e=>e.variable)),go(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){let e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=e.length/2;this.accumulatedGrads=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedUpdates=e.slice(t,t*2).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.rho,t.epsilon)}}})),tw,nw=o((()=>{z(),Oo(),cc(),mc(),Eu(),gc(),Lf(),Bf(),QC(),tw=class extends ZC{static get className(){return`Adagrad`}constructor(e,t=.1){super(),this.learningRate=e,this.initialAccumulatorValue=t,this.accumulatedGrads=[]}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=R.registeredVariables[t];this.accumulatedGrads[n]??(this.accumulatedGrads[n]={originalName:`${t}/accumulator`,variable:ho(()=>Tu(r.shape,this.initialAccumulatorValue).variable(!1))});let i=Array.isArray(e)?e[n].tensor:e[t];if(i==null)return;let a=this.accumulatedGrads[n].variable;ho(()=>{let e=W(a,zf(i));a.assign(e);let t=W(G(pc(i,If(W(e,R.backend.epsilon()))),-this.learningRate),r);r.assign(t)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&go(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),this.accumulatedGrads=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,t){return new e(t.learningRate,t.initialAccumulatorValue)}}})),rw,iw=o((()=>{z(),Oo(),cc(),mc(),gc(),Mf(),Pf(),Lf(),Bf(),xm(),Yd(),QC(),rw=class extends ZC{static get className(){return`Adam`}constructor(e,t,n,r=null){super(),this.learningRate=e,this.beta1=t,this.beta2=n,this.epsilon=r,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],ho(()=>{this.accBeta1=Nf(t).variable(),this.accBeta2=Nf(n).variable()}),r??(this.epsilon=R.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);ho(()=>{let n=bm(1,this.accBeta1),r=bm(1,this.accBeta2);t.forEach((t,i)=>{let a=R.registeredVariables[t];this.accumulatedFirstMoment[i]??(this.accumulatedFirstMoment[i]={originalName:`${t}/m`,variable:ho(()=>Jd(a).variable(!1))}),this.accumulatedSecondMoment[i]??(this.accumulatedSecondMoment[i]={originalName:`${t}/v`,variable:ho(()=>Jd(a).variable(!1))});let o=Array.isArray(e)?e[i].tensor:e[t];if(o==null)return;let s=this.accumulatedFirstMoment[i].variable,c=this.accumulatedSecondMoment[i].variable,l=W(G(s,this.beta1),G(o,1-this.beta1)),u=W(G(c,this.beta2),G(zf(o),1-this.beta2)),d=pc(l,n),f=pc(u,r);s.assign(l),c.assign(u);let p=W(G(pc(d,W(If(f),this.epsilon)),-this.learningRate),a);a.assign(p)}),this.accBeta1.assign(G(this.accBeta1,this.beta1)),this.accBeta2.assign(G(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&go(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedSecondMoment!=null&&go(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),ho(()=>{this.accBeta1.assign(jf(this.beta1,this.iterations_+1)),this.accBeta2.assign(jf(this.beta2,this.iterations_+1))});let t=e.length/2;this.accumulatedFirstMoment=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedSecondMoment=e.slice(t,t*2).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)}}})),aw,ow=o((()=>{z(),Oo(),yc(),cc(),mc(),rh(),gc(),Pf(),xm(),Yd(),QC(),aw=class extends ZC{static get className(){return`Adamax`}constructor(e,t,n,r=null,i=0){super(),this.learningRate=e,this.beta1=t,this.beta2=n,this.epsilon=r,this.decay=i,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],ho(()=>{this.iteration=Nf(0).variable(),this.accBeta1=Nf(t).variable()}),r??(this.epsilon=R.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);ho(()=>{let n=bm(1,this.accBeta1),r=pc(-this.learningRate,W(G(this.iteration,this.decay),1));t.forEach((t,i)=>{let a=R.registeredVariables[t];this.accumulatedFirstMoment[i]??(this.accumulatedFirstMoment[i]={originalName:`${t}/m`,variable:Jd(a).variable(!1)}),this.accumulatedWeightedInfNorm[i]??(this.accumulatedWeightedInfNorm[i]={originalName:`${t}/v`,variable:Jd(a).variable(!1)});let o=Array.isArray(e)?e[i].tensor:e[t];if(o==null)return;let s=this.accumulatedFirstMoment[i].variable,c=this.accumulatedWeightedInfNorm[i].variable,l=W(G(s,this.beta1),G(o,1-this.beta1)),u=G(c,this.beta2),d=vc(o),f=nh(u,d);s.assign(l),c.assign(f);let p=W(G(pc(r,n),pc(l,W(f,this.epsilon))),a);a.assign(p)}),this.iteration.assign(W(this.iteration,1)),this.accBeta1.assign(G(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&go(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedWeightedInfNorm!=null&&go(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw Error(`getWeights() is not implemented for Adamax yet.`)}async setWeights(e){throw Error(`setWeights() is not implemented for Adamax yet.`)}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)}}})),sw,cw=o((()=>{z(),Oo(),cc(),gc(),Pf(),QC(),sw=class extends ZC{static get className(){return`SGD`}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=Array.isArray(e)?e[n].tensor:e[t];if(r==null)return;let i=R.registeredVariables[t];ho(()=>{let e=W(G(this.c,r),i);i.assign(e)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=_o(Nf(-e))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(e=await this.extractIterations(e),e.length!==0)throw Error(`SGD optimizer does not have settable weights.`)}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,t){return new e(t.learningRate)}}})),lw,uw=o((()=>{z(),Oo(),cc(),gc(),Pf(),Yd(),cw(),lw=class extends sw{static get className(){return`Momentum`}constructor(e,t,n=!1){super(e),this.learningRate=e,this.momentum=t,this.useNesterov=n,this.accumulations=[],this.m=Nf(this.momentum)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=R.registeredVariables[t];this.accumulations[n]??(this.accumulations[n]={originalName:`${t}/momentum`,variable:ho(()=>Jd(r).variable(!1))});let i=this.accumulations[n].variable,a=Array.isArray(e)?e[n].tensor:e[t];a!=null&&ho(()=>{let e,t=W(G(this.m,i),a);e=this.useNesterov?W(G(this.c,W(a,G(t,this.m))),r):W(G(this.c,t),r),i.assign(t),r.assign(e)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&go(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),this.accumulations=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)}}})),dw,fw=o((()=>{z(),Oo(),cc(),mc(),gc(),Lf(),Bf(),xm(),Yd(),QC(),dw=class extends ZC{static get className(){return`RMSProp`}constructor(e,t=.9,n=0,r=null,i=!1){if(super(),this.learningRate=e,this.decay=t,this.momentum=n,this.epsilon=r,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=i,r??(this.epsilon=R.backend.epsilon()),e==null)throw Error(`learningRate for RMSPropOptimizer must be defined.`)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=R.registeredVariables[t];this.accumulatedMeanSquares[n]??(this.accumulatedMeanSquares[n]={originalName:`${t}/rms`,variable:ho(()=>Jd(r).variable(!1))}),this.accumulatedMoments[n]??(this.accumulatedMoments[n]={originalName:`${t}/momentum`,variable:ho(()=>Jd(r).variable(!1))}),this.accumulatedMeanGrads[n]==null&&this.centered&&(this.accumulatedMeanGrads[n]={originalName:`${t}/mg`,variable:ho(()=>Jd(r).variable(!1))});let i=Array.isArray(e)?e[n].tensor:e[t];if(i==null)return;let a=this.accumulatedMeanSquares[n].variable,o=this.accumulatedMoments[n].variable;ho(()=>{let e=W(G(a,this.decay),G(zf(i),1-this.decay));if(this.centered){let t=this.accumulatedMeanGrads[n].variable,s=W(G(t,this.decay),G(i,1-this.decay)),c=pc(G(i,this.learningRate),If(bm(e,W(zf(s),this.epsilon)))),l=W(G(o,this.momentum),c);a.assign(e),t.assign(s),o.assign(l);let u=bm(r,l);r.assign(u)}else{let e=W(G(a,this.decay),G(zf(i),1-this.decay)),t=W(G(o,this.momentum),pc(G(i,this.learningRate),If(W(e,this.epsilon))));a.assign(e),o.assign(t);let n=bm(r,t);r.assign(n)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&go(this.accumulatedMeanSquares.map(e=>e.variable)),this.accumulatedMeanGrads!=null&&this.centered&&go(this.accumulatedMeanGrads.map(e=>e.variable)),this.accumulatedMoments!=null&&go(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=this.centered?e.length/3:e.length/2;this.accumulatedMeanSquares=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedMoments=e.slice(t,t*2).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.centered&&(this.accumulatedMeanGrads=e.slice(t*2,t*3).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)}}}));function pw(){for(let e of mw)WC(e)}var mw,hw=o((()=>{ew(),nw(),iw(),ow(),uw(),fw(),cw(),XC(),mw=[$C,tw,rw,aw,lw,dw,sw]}));function gw(e){return new Promise(e=>setTimeout(e)).then(e)}function _w(e=`model`){return new Sw(e)}function vw(e){return new Cw(e)}var yw,bw,xw,Sw,Cw,ww,Tw=o((()=>{Ha(),Be(),$o(),as(),ao(),yw=`model`,bw=`.json`,xw=`.weights.bin`,Sw=class e{constructor(t){if(!P().getBool(`IS_BROWSER`))throw Error(`browserDownloads() cannot proceed because the current environment is not a browser.`);t.startsWith(e.URL_SCHEME)&&(t=t.slice(e.URL_SCHEME.length)),(t==null||t.length===0)&&(t=yw),this.modelJsonFileName=t+bw,this.weightDataFileName=t+xw}async save(e){if(typeof document>`u`)throw Error("Browser downloads are not supported in this environment since `document` is not present");let t=io.join(e.weightData),n=window.URL.createObjectURL(new Blob([t],{type:`application/octet-stream`}));if(e.modelTopology instanceof ArrayBuffer)throw Error(`BrowserDownloads.save() does not support saving model topology in binary formats yet.`);{let t=Ho(e,[{paths:[`./`+this.weightDataFileName],weights:e.weightSpecs}]),r=window.URL.createObjectURL(new Blob([JSON.stringify(t)],{type:`application/json`})),i=this.modelJsonAnchor==null?document.createElement(`a`):this.modelJsonAnchor;if(i.download=this.modelJsonFileName,i.href=r,await gw(()=>i.dispatchEvent(new MouseEvent(`click`))),e.weightData!=null){let e=this.weightDataAnchor==null?document.createElement(`a`):this.weightDataAnchor;e.download=this.weightDataFileName,e.href=n,await gw(()=>e.dispatchEvent(new MouseEvent(`click`)))}return{modelArtifactsInfo:Go(e)}}}},Sw.URL_SCHEME=`downloads://`,Cw=class{constructor(e){if(e==null||e.length<1)throw Error(`When calling browserFiles, at least 1 file is required, but received ${e}`);this.jsonFile=e[0],this.weightsFiles=e.slice(1)}async load(){return new Promise((e,t)=>{let n=new FileReader;n.onload=n=>{let r=JSON.parse(n.target.result),i=r.modelTopology;if(i==null){t(Error(`modelTopology field is missing from file ${this.jsonFile.name}`));return}if(r.weightsManifest==null){t(Error(`weightManifest field is missing from file ${this.jsonFile.name}`));return}if(this.weightsFiles.length===0){e({modelTopology:i});return}e(Wo(r,e=>this.loadWeights(e)))},n.onerror=e=>t(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),n.readAsText(this.jsonFile)})}loadWeights(e){let t=[],n=[];for(let r of e)t.push(...r.weights),n.push(...r.paths);let r=this.checkManifestAndWeightFiles(e),i=n.map(e=>this.loadWeightsFile(e,r[e]));return Promise.all(i).then(e=>[t,e])}loadWeightsFile(e,t){return new Promise((n,r)=>{let i=new FileReader;i.onload=e=>{let t=e.target.result;n(t)},i.onerror=t=>r(`Failed to weights data from file of path '${e}'.`),i.readAsArrayBuffer(t)})}checkManifestAndWeightFiles(e){let t=[],n=this.weightsFiles.map(e=>Vo(e.name)),r={};for(let i of e)i.paths.forEach(e=>{let i=Vo(e);if(t.indexOf(i)!==-1)throw Error(`Duplicate file basename found in weights manifest: '${i}'`);if(t.push(i),n.indexOf(i)===-1)throw Error(`Weight file with basename '${i}' is not provided.`);r[e]=this.weightsFiles[n.indexOf(i)]});if(t.length!==this.weightsFiles.length)throw Error(`Mismatch in the number of files in weights manifest (${t.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return r}},ww=e=>P().getBool(`IS_BROWSER`)&&!Array.isArray(e)&&e.startsWith(Sw.URL_SCHEME)?_w(e.slice(Sw.URL_SCHEME.length)):null,es.registerSaveRouter(ww)}));function Ew(e,t,n,r){o(e),n??=0,r??=1,s(n,r);let i=0,a=a=>(a.then(a=>(t(n+ ++i/e.length*(r-n)),a)),a);function o(e){E(e!=null&&Array.isArray(e)&&e.length>0,()=>`promises must be a none empty array`)}function s(e,t){E(e>=0&&e<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${e}`),E(t>=0&&t<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${t}`),E(t>=e,()=>`startFraction must be no more than endFraction, but got startFraction ${e} and endFraction ${t}`)}return Promise.all(e.map(a))}var Dw=o((()=>{L()}));async function Ow(e,t){t??={};let n=t.fetchFunc==null?P().platform.fetch:t.fetchFunc,r=e.map(e=>n(e,t.requestInit,{isBinary:!0})),i=(t.onProgress==null?await Promise.all(r):await Ew(r,t.onProgress,0,.5)).map(e=>e.arrayBuffer());return t.onProgress==null?await Promise.all(i):await Ew(i,t.onProgress,.5,1)}function kw(e,t){var n;let r=t.fetchFunc==null?P().platform.fetch:t.fetchFunc,i=0,a;return(n=t.onProgress)==null||n.call(t,0),new ReadableStream({pull:async n=>{for(var o;i<e.length;){a||=(await r(e[i],t.requestInit,{isBinary:!0})).body.getReader();let{done:s,value:c}=await a.read();if(s){i++,a=void 0,(o=t.onProgress)==null||o.call(t,i/e.length);continue}n.enqueue(c);return}n.close()}})}async function Aw(e,t=``,n,r){return jw(e=>Ow(e,{requestInit:r}))(e,t,n)}function jw(e){return async(t,n=``,r)=>{let i=t.map(()=>!1),a={},o=r==null?[]:r.map(()=>!1),s=[];if(t.forEach((e,t)=>{let n=0;e.weights.forEach(e=>{let c=`quantization`in e?e.quantization.dtype:e.dtype,l=to[c]*k(e.shape),u=()=>{i[t]=!0,a[t]??(a[t]=[]),a[t].push({manifestEntry:e,groupOffset:n,sizeBytes:l})};r==null?u():r.forEach((t,n)=>{t===e.name&&(u(),o[n]=!0)}),s.push(e.name),n+=l})}),!o.every(e=>e)){let e=r.filter((e,t)=>!o[t]);throw Error(`Could not find weights in manifest with names: ${e.join(`, `)}. \nManifest JSON has weights with names: ${s.join(`, `)}.`)}let c=i.reduce((e,t,n)=>(t&&e.push(n),e),[]),l=[];c.forEach(e=>{t[e].paths.forEach(e=>{let t=n+(n.endsWith(`/`)?``:`/`)+e;l.push(t)})});let u=await e(l),d={},f=0;return c.forEach(e=>{let n=t[e].paths.length,r=new io(u.slice(f,f+n));a[e].forEach(e=>{let t=Ao(r.slice(e.groupOffset,e.groupOffset+e.sizeBytes),[e.manifestEntry]);for(let e in t)d[e]=t[e]}),f+=n}),d}}var Mw=o((()=>{Be(),L(),ao(),$o(),Dw(),no()}));function Nw(e){let t=e.lastIndexOf(`/`),n=e.lastIndexOf(`?`),r=e.substring(0,t),i=n>t?e.substring(n):``;return[r+`/`,i]}function Pw(e){return e.match(zw.URL_SCHEME_REGEX)!=null}function Fw(e,t){return new zw(e,t)}function Iw(e,t){return Fw(e,t)}var Lw,Rw,zw,Bw,Vw=o((()=>{Be(),L(),$o(),ao(),as(),Mw(),Lw=`application/octet-stream`,Rw=`application/json`,zw=class{constructor(e,t){if(this.DEFAULT_METHOD=`POST`,t??={},this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,t.fetchFunc==null?this.fetch=P().platform.fetch:(E(typeof t.fetchFunc==`function`,()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc),E(e!=null&&e.length>0,()=>`URL path for http must not be null, undefined or empty.`),Array.isArray(e)&&E(e.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,t.requestInit!=null&&t.requestInit.body!=null)throw Error(`requestInit is expected to have no pre-existing body, but has one.`);this.requestInit=t.requestInit||{},this.loadOptions=t}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error(`BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.`);let t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;let n=Ho(e,[{paths:[`./model.weights.bin`],weights:e.weightSpecs}]);if(t.body.append(`model.json`,new Blob([JSON.stringify(n)],{type:Rw}),`model.json`),e.weightData!=null){let n=io.join(e.weightData);t.body.append(`model.weights.bin`,new Blob([n],{type:Lw}),`model.weights.bin`)}let r=await this.fetch(this.path,t);if(r.ok)return{modelArtifactsInfo:Go(e),responses:[r]};throw Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${r.status}.`)}async loadModelJSON(){let e=await this.fetch(this.path,this.requestInit);if(!e.ok)throw Error(`Request to ${this.path} failed with status code ${e.status}. Please verify this URL points to the model JSON of the model to load.`);let t;try{t=await e.json()}catch{let e=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(`.pb`)?e+=` Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.`:e+=` Please make sure the server is serving valid JSON for this request.`,Error(e)}let n=t.modelTopology,r=t.weightsManifest;if(n==null&&r==null)throw Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return t}async load(){return this.loadOptions.streamWeights?this.loadStream():Wo(await this.loadModelJSON(),e=>this.loadWeights(e))}async loadStream(){let e=await this.loadModelJSON(),t=await this.getWeightUrls(e.weightsManifest),n=Ko(e.weightsManifest);return Object.assign(Object.assign({},e),{weightSpecs:n,getWeightStream:()=>kw(t,this.loadOptions)})}async getWeightUrls(e){let[t,n]=Nw(Array.isArray(this.path)?this.path[1]:this.path),r=this.weightPathPrefix||t,i=[],a=[];for(let t of e)for(let e of t.paths)this.weightUrlConverter==null?i.push(r+e+n):a.push(this.weightUrlConverter(e));return this.weightUrlConverter&&i.push(...await Promise.all(a)),i}async loadWeights(e){let t=await this.getWeightUrls(e);return[Ko(e),await Ow(t,this.loadOptions)]}},zw.URL_SCHEME_REGEX=/^https?:\/\//,Bw=(e,t)=>{if(typeof fetch>`u`&&(t==null||t.fetchFunc==null))return null;{let n=!0;if(n=Array.isArray(e)?e.every(e=>Pw(e)):Pw(e),n)return Fw(e,t)}return null},es.registerSaveRouter(Bw),es.registerLoadRouter(Bw)}));function Hw(e,t,n,r){let i=arguments;return new Jw(Uw(...i))}function Uw(e,t,n,r){return arguments.length===1?e.modelTopology!=null||e.weightSpecs!=null?new Kw(e):(console.warn(`Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release.`),new Kw({modelTopology:e})):(console.warn(`Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release.`),new Kw({modelTopology:e,weightSpecs:t,weightData:n,trainingConfig:r}))}function Ww(e){return new qw(e)}function Gw(e){return new qw(e)}var Kw,qw,Jw,Yw=o((()=>{Kw=class{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}},qw=class{constructor(e){this.saveHandler=e}save(e){return this.saveHandler(e)}},Jw=class{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=t=>Promise.resolve(e.save(t)))}}})),Xw=c({CompositeArrayBuffer:()=>io,browserFiles:()=>vw,browserHTTPRequest:()=>Iw,concatenateArrayBuffers:()=>Bo,copyModel:()=>Rs,decodeWeights:()=>Ao,decodeWeightsStream:()=>Fo,encodeWeights:()=>ko,fromMemory:()=>Hw,fromMemorySync:()=>Uw,getLoadHandlers:()=>is,getModelArtifactsForJSON:()=>Wo,getModelArtifactsForJSONSync:()=>Uo,getModelArtifactsInfoForJSON:()=>Go,getSaveHandlers:()=>rs,getWeightSpecs:()=>Ko,http:()=>Fw,isHTTPScheme:()=>Pw,listModels:()=>Is,loadWeights:()=>Aw,moveModel:()=>zs,registerLoadRouter:()=>ns,registerSaveRouter:()=>ts,removeModel:()=>Ls,weightsLoaderFactory:()=>jw,withSaveHandler:()=>Ww,withSaveHandlerSync:()=>Gw}),Zw=o((()=>{_s(),Ns(),Tw(),Vw(),$o(),Yw(),as(),Mw(),ao(),Hs()}));function Qw(e,t,n){let r=B(e,`labels`,`confusionMatrix`),i=B(t,`predictions`,`confusionMatrix`);E(n==null||n>0&&Number.isInteger(n),()=>`If provided, numClasses must be a positive integer, but got ${n}`),E(r.rank===1,()=>`Expected the rank of labels to be 1, but got ${r.rank}`),E(i.rank===1,()=>`Expected the rank of predictions to be 1, but got ${i.rank}`),E(r.shape[0]===i.shape[0],()=>`Mismatch in the number of examples: ${r.shape[0]} vs. ${i.shape[0]}. Labels and predictions should have the same number of elements.`),E(n>0&&Number.isInteger(n),()=>`numClasses is required to be a positive integer, but got ${n}`);let a=Fh($s(r,`int32`),n),o=Fh($s(i,`int32`),n),s=sb(a),c=Nl(s,o);return $s(c,`int32`)}var $w,eT=o((()=>{V(),L(),ec(),Pl(),Ih(),U(),cb(),$w=H({confusionMatrix_:Qw})})),tT=c({confusionMatrix:()=>$w}),nT=o((()=>{eT()})),rT=c({draw:()=>pT,fromPixels:()=>gT,fromPixelsAsync:()=>lT,toPixels:()=>fT});function iT(e,t=3){if(t>4)throw Error(`Cannot construct Tensor with more than 4 channels from pixels.`);if(e==null)throw Error(`pixels passed to tf.browser.fromPixels() can not be null`);let n=!1,r=!1,i=!1,a=!1,o=!1,s=!1;if(e.data instanceof Uint8Array)n=!0;else if(typeof ImageData<`u`&&e instanceof ImageData)r=!0;else if(typeof HTMLVideoElement<`u`&&e instanceof HTMLVideoElement)i=!0;else if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement)a=!0;else if(e.getContext!=null)o=!0;else if(typeof ImageBitmap<`u`&&e instanceof ImageBitmap)s=!0;else throw Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${e.constructor.name}`);if(qr(`FromPixels`,R.backendName)!=null){let n={pixels:e},r={numChannels:t};return R.runKernel(zr,n,r)}let[c,l]=i?[e.videoWidth,e.videoHeight]:[e.width,e.height],u;if(o)u=e.getContext(`2d`).getImageData(0,0,c,l).data;else if(r||n)u=e.data;else if(a||i||s){if(mT==null){if(typeof document>`u`){if(typeof OffscreenCanvas<`u`&&typeof OffscreenCanvasRenderingContext2D<`u`)mT=new OffscreenCanvas(1,1).getContext(`2d`);else throw Error(`Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.`)}else mT=document.createElement(`canvas`).getContext(`2d`,{willReadFrequently:!0})}mT.canvas.width=c,mT.canvas.height=l,mT.drawImage(e,0,0,c,l),u=mT.getImageData(0,0,c,l).data}let d;if(t===4)d=new Int32Array(u);else{let e=c*l;d=new Int32Array(e*t);for(let n=0;n<e;n++)for(let e=0;e<t;++e)d[n*t+e]=u[n*4+e]}return _y(d,[l,c,t],`int32`)}function aT(e){return e!=null&&e.data instanceof Uint8Array}function oT(){return typeof window<`u`&&typeof ImageBitmap<`u`&&window.hasOwnProperty(`createImageBitmap`)}function sT(e){return e!=null&&e.width!==0&&e.height!==0}function cT(e){return oT()&&!(e instanceof ImageBitmap)&&sT(e)&&!aT(e)}async function lT(e,t=3){let n=null;if(P().getBool(`WRAP_TO_IMAGEBITMAP`)&&cT(e)){let t;try{t=await createImageBitmap(e,{premultiplyAlpha:`none`})}catch{t=null}n=t!=null&&t.width===e.width&&t.height===e.height?t:e}else n=e;return iT(n,t)}function uT(e){if(e.rank!==2&&e.rank!==3)throw Error(`toPixels only supports rank 2 or 3 tensors, got rank ${e.rank}.`);let t=e.rank===2?1:e.shape[2];if(t>4||t===2)throw Error(`toPixels only supports depth of size 1, 3 or 4 but got ${t}`);if(e.dtype!==`float32`&&e.dtype!==`int32`)throw Error(`Unsupported type for toPixels: ${e.dtype}. Please use float32 or int32 tensors.`)}function dT(e){let t=e?.alpha||1;if(t>1||t<0)throw Error(`Alpha value ${t} is suppoed to be in range [0 - 1].`)}async function fT(e,t){let n=B(e,`img`,`toPixels`);if(!(e instanceof oa)){let e=n;n=$s(e,`int32`),e.dispose()}uT(n);let[r,i]=n.shape.slice(0,2),a=n.rank===2?1:n.shape[2],o=await n.data(),s=n.dtype===`float32`?255:1,c=new Uint8ClampedArray(i*r*4);for(let e=0;e<r*i;++e){let t=[0,0,0,255];for(let r=0;r<a;r++){let i=o[e*a+r];if(n.dtype===`float32`){if(i<0||i>1)throw Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${i}.`)}else if(n.dtype===`int32`&&(i<0||i>255))throw Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${i}.`);a===1?(t[0]=i*s,t[1]=i*s,t[2]=i*s):t[r]=i*s}let r=e*4;c[r+0]=Math.round(t[0]),c[r+1]=Math.round(t[1]),c[r+2]=Math.round(t[2]),c[r+3]=Math.round(t[3])}if(t!=null){hT||qr(`Draw`,R.backendName)!=null&&(console.warn(`tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead.`),hT=!0),t.width=i,t.height=r;let e=t.getContext(`2d`),n=new ImageData(c,i,r);e.putImageData(n,0,0)}return n!==e&&n.dispose(),c}function pT(e,t,n){let r=B(e,`img`,`draw`);if(!(e instanceof oa)){let e=r;r=$s(e,`int32`),e.dispose()}uT(r),dT(n?.imageOptions);let i={image:r},a={canvas:t,options:n};R.runKernel(It,i,a)}var mT,hT,gT,_T=o((()=>{z(),Be(),I(),ii(),ca(),V(),ec(),U(),vy(),hT=!1,gT=H({fromPixels_:iT})})),vT=c({prepareAndValidate:()=>yT});function yT(e,t){let n=e.shape.length,r=t.shape.length;if(n<1)throw Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${n}.`);if(r<1)throw Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${r}.`);if(t.dtype!==`int32`)throw Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[r-1]>n)throw Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[r-1]} vs. ${n}`);if(k(e.shape)===0)throw Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);let i=t.shape,a=i[i.length-1],o=1;for(let e=0;e<i.length-1;++e)o*=i[e];let s=e.shape,c=i.slice();c.pop();let l=1;for(let e=a;e<n;++e)l*=s[e],c.push(s[e]);let u=[...N(e.shape).map(e=>e/l),1].slice(0,a);return[c,o,l,u]}var bT=o((()=>{L()})),xT=c({assertParamsValid:()=>ST,computeFlatOffset:()=>FT,computeOutShape:()=>wT,getNormalizedAxes:()=>OT,isSliceContinous:()=>PT,maskToAxes:()=>CT,parseSliceParams:()=>IT,sliceInfo:()=>LT,startForAxis:()=>MT,startIndicesWithElidedDims:()=>kT,stopForAxis:()=>NT,stopIndicesWithElidedDims:()=>AT,stridesForAxis:()=>jT,stridesWithElidedDims:()=>TT});function ST(e,t,n){let r=e.shape.length;E(r===t.length,()=>`Error in slice${r}D: Length of begin ${t} must match the rank of the array (${r}).`),E(r===n.length,()=>`Error in slice${r}D: Length of size ${n} must match the rank of the array (${r}).`);for(let i=0;i<r;++i)E(t[i]+n[i]<=e.shape[i],()=>`Error in slice${r}D: begin[${i}] + size[${i}] (${t[i]+n[i]}) would overflow input.shape[${i}] (${e.shape[i]})`)}function CT(e){let t=[],n=0;for(;e>0;)e&1&&t.push(n),e/=2,n++;return t}function wT(e,t,n){let r=[];for(let i=0;i<e.length;i++)r[i]=Math.ceil((t[i]-e[i])/n[i]);return r}function TT(e,t,n,r){let i=[...e];for(let e=i.length;e<r.length;e++)i.push(1);for(let e=0;e<n;e++)e===0?i[t]=1:(i.splice(t,0,1),i.pop());return i}function ET(e,t,n){return n<=e?n:n-(t-1)}function DT(e,t){let n=[];for(let r=0;r<e;r++)n.push(t+r);return n}function OT(e,t,n,r,i,a,o,s,c){let l=e.length,u=Array(l),d=Array(l),f=Array(l);if(t.length&&n>0){let c=t[0],l=n+1;u=kT(o,c,l,r,e),d=AT(s,c,l,i,e),f=TT(a,c,l,e)}else for(let t=0;t<l;t++)u[t]=MT(o,r,a,e,t,c),d[t]=NT(s,i,a,e,t,c),f[t]=jT(a,t,c);return{begin:u,end:d,strides:f}}function kT(e,t,n,r,i){let a=[...i],o=DT(n,t);for(let i=0;i<a.length;i++)if(o.indexOf(i)>-1)a[i]=0;else{let o=ET(t,n,i),s=r[o];e&1<<o&&(s=0),a[i]=s}return a}function AT(e,t,n,r,i){let a=[...i],o=DT(n,t);for(let i=0;i<a.length;i++)if(o.indexOf(i)>-1)a[i]=2**53-1;else{let o=ET(t,n,i),s=r[o];e&1<<o&&(s=2**53-1),a[i]=s}for(let e=0;e<a.length;e++){let t=i[e];a[e]<0&&(a[e]+=t),a[e]=b(0,a[e],i[e])}return a}function jT(e,t,n){let r=e[t];return(n&1<<t||r==null)&&(r=1),r}function MT(e,t,n,r,i,a){let o=t[i],s=n[i]||1;(e&1<<i||a&1<<i||o==null)&&(o=s>0?-(2**53-1):2**53-1);let c=r[i];return o<0&&(o+=c),o=b(0,o,c-1),o}function NT(e,t,n,r,i,a){let o=t[i],s=n[i]||1;(e&1<<i||a&1<<i||o==null)&&(o=s>0?2**53-1:-(2**53-1));let c=r[i];return o<0&&(o+=c),o=s>0?b(0,o,c):b(-1,o,c-1),o}function PT(e,t,n){let r=n.length;for(let e=0;e<n.length;e++)if(n[e]>1){r=e;break}for(let i=r+1;i<n.length;i++)if(t[i]>0||n[i]!==e[i])return!1;return!0}function FT(e,t){let n=e.length>0?e[e.length-1]:1;for(let r=0;r<e.length-1;r++)n+=e[r]*t[r];return n}function IT(e,t,n){let r,i=e.shape.length;r=typeof t==`number`?[t,...Array(i-1).fill(0)]:t.length<i?t.concat(Array(i-t.length).fill(0)):t.slice(),r.forEach(e=>{E(e!==-1,()=>`slice() does not support negative begin indexing.`)});let a;return a=n==null?Array(i).fill(-1):typeof n==`number`?[n,...Array(i-1).fill(-1)]:n.length<i?n.concat(Array(i-n.length).fill(-1)):n,a=a.map((t,n)=>t>=0?t:(E(t===-1,()=>`Negative size values should be exactly -1 but got ${t} for the slice() size at index ${n}.`),e.shape[n]-r[n])),[r,a]}function LT(e,t,n,r,i,a,o,s,c){let l;if(r==null?(l=Array(t.length),l.fill(1)):l=r,o!=null&&o&o-1)throw Error(`Multiple ellipses in slice is not allowed.`);let u=!1,d={dims:l.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:n.slice(),strides:l.slice(),beginMask:i,endMask:a,ellipsisMask:o,newAxisMask:s,shrinkAxisMask:c};for(let e=0;e<d.dims;e++)u&&1<<e&s&&d.numAddAxisAfterEllipsis++,1<<e&o&&(u=!0);u||(d.ellipsisMask|=1<<d.dims,d.dims++);let f={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};RT(d,f);let p=!0,m=!0,h=!0,g=[],_=[];for(let t=0;t<e.length;++t){if(f.strides[t]===0)throw Error(`strides[${t}] must be non-zero`);let n=!!(f.shrinkAxisMask&1<<t),r=e[t];if(r===-1){g.push(n?1:-1);continue}let i=[f.beginMask&1<<t,f.endMask&1<<t],a=[f.strides[t]>0?0:-1,f.strides[t]>0?r:r-1];if(n&&f.strides[t]<=0)throw Error(`only stride 1 allowed on non-range indexing.`);h&&=f.strides[t]===1;let o=!!(f.beginMask&1<<t&&f.endMask&1<<t);if(f.beginValid&&f.endValid){if(n){let e=f.begin[t]<0?r+f.begin[t]:f.begin[t];if(f.begin[t]=e,f.end[t]=f.begin[t]+1,e<0||e>=r)throw Error(`slice index ${f.begin[t]} of dimension ${t} out of bounds.`)}else f.begin[t]=zT(f.begin[t],0,f.strides[t],r,i,a),f.end[t]=zT(f.end[t],1,f.strides[t],r,i,a);let e=f.strides[t]===1&&f.begin[t]===0&&f.end[t]===r;p&&=e,m&&=t===0&&f.strides[t]===1||e}else p=p&&f.strides[t]===1&&o,m&&=t===0&&f.strides[t]===1||o;let s,c=!1;if(f.beginValid&&f.endValid?(s=f.end[t]-f.begin[t],c=!0):n?(s=1,c=!0):o&&r>=0&&(s=f.strides[t]<0?-r:r,c=!0),c){let e;e=s===0||s<0!=f.strides[t]<0?0:Math.trunc(s/f.strides[t])+(s%f.strides[t]===0?0:1),g.push(e)}else g.push(-1)}for(let e=0;e<f.finalShapeGatherIndices.length;++e){let t=f.finalShapeGatherIndices[e];t>=0?_.push(g[t]):t===BT&&_.push(1)}return{finalShapeSparse:_.filter((e,t)=>f.finalShapeGatherIndices[t]!==BT),finalShape:_,isIdentity:p,sliceDim0:m,isSimpleSlice:h,begin:f.begin,end:f.end,strides:f.strides}}function RT(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let n=0;t.beginValid=e.begin!=null,t.endValid=e.end!=null,t.begin=Array(t.dims),t.end=Array(t.dims),t.strides=Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=Array(t.dims);for(let r=0;r<e.dims;r++)if(1<<r&e.ellipsisMask){let i=Math.min(t.dims-(e.dims-r)+1+e.numAddAxisAfterEllipsis,t.dims);for(;n<i;n++)t.begin[n]=0,t.end[n]=0,t.strides[n]=1,t.beginMask|=1<<n,t.endMask|=1<<n,t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[n]=r}else if(1<<r&e.newAxisMask)t.finalShapeGatherIndices.push(BT),t.finalShapeGatherIndicesSparse.push(-1);else{if(n===t.begin.length)throw Error(`Index out of range using input dim ${n}; input has only ${t.dims} dims, ${t.begin.length}.`);e.begin!=null&&(t.begin[n]=e.begin[r]),e.end!=null&&(t.end[n]=e.end[r]),t.strides[n]=e.strides[r],e.beginMask&1<<r&&(t.beginMask|=1<<n),e.endMask&1<<r&&(t.endMask|=1<<n),e.shrinkAxisMask&1<<r?(t.finalShapeGatherIndices.push(VT),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<n):(t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(r)),t.inputShapeGatherIndicesSparse[n]=r,n++}}function zT(e,t,n,r,i,a){if(i[t])return n>0?a[t]:a[t+1&1];{let t=e<0?r+e:e;return t<a[0]?a[0]:t>a[1]?a[1]:t}}var BT,VT,HT=o((()=>{L(),BT=-2,VT=-1})),UT,WT=o((()=>{UT=`4.22.0`})),GT,KT=o((()=>{ew(),nw(),iw(),ow(),uw(),fw(),cw(),GT=class{static sgd(e){return new sw(e)}static momentum(e,t,n=!1){return new lw(e,t,n)}static rmsprop(e,t=.9,n=0,r=null,i=!1){return new dw(e,t,n,r,i)}static adam(e=.001,t=.9,n=.999,r=null){return new rw(e,t,n,r)}static adadelta(e=.001,t=.95,n=null){return new $C(e,t,n)}static adamax(e=.002,t=.9,n=.999,r=null,i=0){return new aw(e,t,n,r,i)}static adagrad(e,t=.1){return new tw(e,t)}}})),qT,JT=o((()=>{KT(),qT=GT}));function YT(){return new Promise(e=>XT(()=>e()))}var XT,ZT=o((()=>{XT=typeof requestAnimationFrame<`u`?requestAnimationFrame:typeof setImmediate<`u`?setImmediate:e=>e()}));function QT(e,t){let n=e[0].length;e.forEach((e,t)=>{E(e.length===n,()=>`Error in concat${n}D: rank of tensors[${t}] must be the same as the rank of the rest (${n})`)}),E(t>=0&&t<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);let r=e[0];e.forEach((e,i)=>{for(let a=0;a<n;a++)E(a===t||e[a]===r[a],()=>`Error in concat${n}D: Shape of tensors[${i}] (${e}) does not match the shape of the rest (${r}) along the non-concatenated axis ${i}.`)})}function $T(e,t){let n=e[0].slice();for(let r=1;r<e.length;r++)n[t]+=e[r][t];return n}var eE=o((()=>{L()})),tE=o((()=>{}));function nE(e,t,n){let r=[];if(n==null&&t==null)return r;if(t==null)for(;r.length<e+n.length;)r.push(-1);else r=t.slice();if(n==null)return r;if(e+n.length!==r.length)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${e+n.length}, but shape.rank = ${r.length}`);for(let i=1;i<n.length;++i){let a=n[i],o=r[r.length-n.length+i],s=r[o];if(a>=0){if(s>=0){if(s!==a)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${i+e}] = ${a} but shape[${i+e}] = ${s}`)}else r[o]=a}}return r}function rE(e){let t={FIRST_DIM_SIZE:oE.FIRST_DIM_SIZE,VALUE_ROWIDS:oE.VALUE_ROWIDS,ROW_LENGTHS:oE.ROW_LENGTHS,ROW_SPLITS:oE.ROW_SPLITS,ROW_LIMITS:oE.ROW_LIMITS,ROW_STARTS:oE.ROW_STARTS},n=[];for(let r of e)if(r in t)n.push(t[r]);else break;return n}function iE(e){return e.length===0?0:e[0]===oE.FIRST_DIM_SIZE?e.length-1:e.length}function aE(e,t){if(e==null||t==null)return;let n=e.length,r=t.length;if(n>=r)throw Error(`defaultValue.shape=${e} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${n} must be less than ragged tensor input flatValues.rank = ${r})`);for(let i=0;i<Math.min(n,r-1);++i){let n=e[i],r=t[i+1];if(n>=0&&r>=0&&n!==1&&n!==r)throw Error(`defaultValue.shape=${e}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${i-e.length}] = ${n} but ragged tensor input.flatValues.shape[${i-e.length}] = ${r}`)}}var oE,sE=o((()=>{(function(e){e[e.FIRST_DIM_SIZE=0]=`FIRST_DIM_SIZE`,e[e.VALUE_ROWIDS=1]=`VALUE_ROWIDS`,e[e.ROW_LENGTHS=2]=`ROW_LENGTHS`,e[e.ROW_SPLITS=3]=`ROW_SPLITS`,e[e.ROW_LIMITS=4]=`ROW_LIMITS`,e[e.ROW_STARTS=5]=`ROW_STARTS`})(oE||={})}));function cE(e){return e<=30?e:xe(e,Math.floor(Math.sqrt(e)))}var lE=o((()=>{L()}));function uE(e,t,n){return[n*(typeof e==`number`?e:e[0]),t*(typeof e==`number`?e:e[1])]}var dE=o((()=>{}));function fE(e,t,n,r=!0){let i=[];if(r)i=i.concat(t.slice(0)),i.push(e[0]/n),i=i.concat(e.slice(1));else{i=i.concat(e[0]);let n=t.length;for(let r=0;r<n;++r)i=i.concat([e[r+1]/t[r],t[r]]);i=i.concat(e.slice(n+1))}return i}function pE(e,t,n=!0){let r=[];if(n){r.push(t);for(let n=t+1;n<e;++n)n<=2*t?(r.push(n),r.push(n-(t+1))):r.push(n)}else{let n=[],i=[];for(let r=1;r<e;++r)r>=t*2+1||r%2==1?i.push(r):n.push(r);r.push(...n),r.push(0),r.push(...i)}return r}function mE(e,t,n,r=!0){let i=[];r?i.push(e[0]/n):i.push(e[0]*n);for(let n=1;n<e.length;++n)n<=t.length?r?i.push(t[n-1]*e[n]):i.push(e[n]/t[n-1]):i.push(e[n]);return i}function hE(e,t){let n=[0];for(let r=0;r<t;++r)n.push(e[r][0]);return n}function gE(e,t,n){let r=e.slice(0,1);for(let i=0;i<n;++i)r.push(e[i+1]-t[i][0]-t[i][1]);return r}var _E=o((()=>{})),vE,yE,bE=o((()=>{vE=1.7580993408473768,yE=1.0507009873554805})),xE,SE,CE,wE,TE,EE,DE=o((()=>{xE=.3275911,SE=.254829592,CE=-.284496736,wE=1.421413741,TE=-1.453152027,EE=1.061405429}));function OE(e,t){if(e.length!==t.length)throw Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);let n=new Float32Array(e.length*2);for(let r=0;r<n.length;r+=2)n[r]=e[r/2],n[r+1]=t[r/2];return n}function kE(e){let t=new Float32Array(e.length/2),n=new Float32Array(e.length/2);for(let r=0;r<e.length;r+=2)t[r/2]=e[r],n[r/2]=e[r+1];return{real:t,imag:n}}function AE(e){let t=Math.ceil(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=0;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function jE(e){let t=Math.floor(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=2;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function ME(e,t){return{real:e[t*2],imag:e[t*2+1]}}function NE(e,t,n,r){e[r*2]=t,e[r*2+1]=n}function PE(e,t){let n=new Float32Array(e/2),r=new Float32Array(e/2);for(let i=0;i<Math.ceil(e/2);i++){let a=(t?2:-2)*Math.PI*(i/e);n[i]=Math.cos(a),r[i]=Math.sin(a)}return{real:n,imag:r}}function FE(e,t,n){let r=(n?2:-2)*Math.PI*(e/t);return{real:Math.cos(r),imag:Math.sin(r)}}var IE=o((()=>{}));function LE(e,t){e=e.replace(/\s/g,``);let n=(e.length-e.replace(WE,``).length)/2;if(n<1)throw Error(`Equations without an arrow are not supported.`);if(n>1)throw Error(`Equation must contain exactly one arrow ("${UE}").`);let[r,i]=e.split(UE);E(r.indexOf(KE)===-1,()=>`The ellipsis notation ("${KE}") is not supported yet.`);let a=r.split(GE),o=a.length;if(t!==o)throw Error(`Expected ${o} input tensors, received ${t}`);if(o>2)throw Error(`Support for more than 2 input tensors is not implemented yet.`);let s=[];for(let e=0;e<i.length;++e){let t=i[e];if(!a.some(e=>e.indexOf(t)!==-1))throw Error(`Output subscripts contain the label ${t} not present in the input subscripts.`);s.indexOf(t)===-1&&s.push(t)}for(let e=0;e<r.length;++e){let t=r[e];s.indexOf(t)===-1&&t!==GE&&s.push(t)}let c=Array(a.length);for(let e=0;e<o;++e){if(new Set(a[e].split(``)).size!==a[e].length)throw Error(`Found duplicate axes in input component ${a[e]}. Support for duplicate axes in input is not implemented yet.`);c[e]=[];for(let t=0;t<a[e].length;++t)c[e].push(s.indexOf(a[e][t]))}let l=s.length,u=i.length,d=[];for(let e=u;e<l;++e)d.push(e);return{allDims:s,summedDims:d,idDims:c}}function RE(e,t){let n=Array(e);n.fill(-1);for(let e=0;e<t.length;++e)n[t[e]]=e;let r=[];for(let t=0;t<e;++t)n[t]===-1&&r.push(t);return n=n.filter(e=>e!==-1),{permutationIndices:n,expandDims:r}}function zE(e,t,n){let r=Array(e);for(let e=0;e<n.length;++e){let i=n[e].shape;for(let n=0;n<t[e].length;++n)r[t[e][n]]===void 0?r[t[e][n]]=i[n]:E(r[t[e][n]]===i[n],()=>`Expected dimension ${r[t[e][n]]} at axis ${n} of input shaped ${JSON.stringify(i)}, but got dimension ${i[n]}`)}}function BE(e,t){let n=e,r=[],i=0;e.length===0&&n.push(-1),i=e.length+1;for(let e=0;e<i;++e)r.push([]);let a=[];for(let e=0;e<n.length;++e){let i=n[e],o=HE(t,i);for(let t of o)a.indexOf(t)===-1&&(r[e].push(t),a.push(t))}return{path:n,steps:r}}function VE(e){return e.every((e,t)=>e===t)}function HE(e,t){let n=[];for(let r=0;r<e.length;++r)(e[r].length===0||e[r].indexOf(t)!==-1||t===-1)&&n.push(r);return n}var UE,WE,GE,KE,qE=o((()=>{Me(),UE=`->`,WE=/->/g,GE=`,`,KE=`...`}));function JE(e,t,n=0){let r=[];if(typeof t==`number`)E(e.shape[n]%t===0,()=>`Number of splits must evenly divide the axis.`),r=Array(t).fill(e.shape[n]/t);else{E(t.reduce((e,t)=>(t===-1&&(e+=1),e),0)<=1,()=>`There should be only one negative value in split array.`);let i=t.indexOf(-1);if(i!==-1){let r=t.reduce((e,t)=>t>0?e+t:e);t[i]=e.shape[n]-r}E(e.shape[n]===t.reduce((e,t)=>e+t),()=>`The sum of sizes must match the size of the axis dimension.`),r=t}return r}var YE=o((()=>{L()}));function XE(e){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${e}`}function ZE(e,t){return`indices(${e}, 0) is invalid: ${t} < 0`}function QE(e,t,n){return`indices(${e}, 0) is invalid: ${t} >= ${n}`}var $E=o((()=>{}));function eD(e,t){return`only one output dimension may be -1, not both ${e} and ${t}`}function tD(e,t){return`size ${e} must be non-negative, not ${t}`}function nD(){return`reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero`}function rD(e,t){return`Input to reshape is a SparseTensor with ${k(e)}
  dense values, but the requested shape requires a multiple of ${k(t)}. inputShape=${e} outputShape= ${t}`}function iD(e,t){return`Input to reshape is a tensor with ${k(e)} dense values, but the requested shape has ${k(t)}. inputShape=${e} outputShape=${t}`}var aD=o((()=>{L()}));function oD(){return`segment ids must be >= 0`}function sD(){return`segment ids are not increasing`}function cD(e,t){return`Segment id ${e} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function lD(e,t,n){return`Bad: indices[${e}] == ${t} out of range [0, ${n})`}var uD=o((()=>{})),dD=c({collectGatherOpShapeInfo:()=>mD,computeOutShape:()=>pD,segOpComputeOptimalWindowSize:()=>fD});function fD(e,t){let n=!1,r;for(e<=30?(r=e,n=!0):r=xe(e,Math.floor(Math.sqrt(e)));!n;)r>t||r===e?n=!0:r=xe(e,r+1);return r}function pD(e,t,n){let r=[],i=e.length;for(let a=0;a<i;a++)a===t?r.push(n):r.push(e[a]);return r}function mD(e,t,n,r){let i=t.shape.length,a=e.shape.length;if(r!==0&&(r<-i||r>i))throw Error(`Expect batchDims in the range of [-${i}, ${i}], but got ${r}`);if(r<0&&(r+=i),r>a)throw Error(`batchDims (${r}) must be less than rank(x) (
    ${a}).`);if(n<r)throw Error(`batchDims (${r}) must be less than or equal to axis (${n}).`);for(let n=0;n<r;++n)if(e.shape[n]!==t.shape[n])throw Error(`x.shape[${n}]: ${e.shape[n]} should be equal to indices.shape[${n}]: ${t.shape[n]}.`);let o=e.shape[n],s=[],c=1,l=1,u=1;for(let t=0;t<r;++t)s.push(e.shape[t]),c*=e.shape[t];for(let t=r;t<n;t++)s.push(e.shape[t]),l*=e.shape[t];for(let e=r;e<i;e++)s.push(t.shape[e]);for(let t=n+1;t<a;t++)s.push(e.shape[t]),u*=e.shape[t];return{batchSize:c,sliceSize:u,outerSize:l,dimSize:o,outputShape:s}}var hD=o((()=>{L(),lE()})),gD=c({ERF_A1:()=>SE,ERF_A2:()=>CE,ERF_A3:()=>wE,ERF_A4:()=>TE,ERF_A5:()=>EE,ERF_P:()=>xE,PARALLELIZE_THRESHOLD:()=>30,RowPartitionType:()=>oE,SELU_SCALE:()=>yE,SELU_SCALEALPHA:()=>vE,applyActivation:()=>zb,assertAndGetBroadcastShape:()=>zd,assertAxesAreInnerMostDims:()=>yf,assertParamsConsistent:()=>QT,assignToTypedArray:()=>NE,axesAreInnerMostDims:()=>hf,calculateShapes:()=>Oy,checkEinsumDimSizes:()=>zE,checkPadOnDimRoundingMode:()=>bl,combineLocations:()=>gf,combineRaggedTensorToTensorShapes:()=>nE,complexWithEvenIndex:()=>AE,complexWithOddIndex:()=>jE,computeConv2DInfo:()=>al,computeConv3DInfo:()=>ol,computeDefaultPad:()=>ll,computeDilation2DInfo:()=>nl,computeOptimalWindowSize:()=>cE,computeOutAndReduceShapes:()=>_f,computeOutShape:()=>$T,computePool2DInfo:()=>rl,computePool3DInfo:()=>il,convertConv2DDataFormat:()=>yl,decodeEinsumEquation:()=>LE,eitherStridesOrDilationsAreOne:()=>_l,expandShapeToKeepDim:()=>vf,exponent:()=>FE,exponents:()=>PE,fromStringArrayToUint8:()=>vD,fromUint8ToStringArray:()=>_D,getAxesPermutation:()=>bf,getBroadcastDims:()=>Ld,getComplexWithIndex:()=>ME,getEinsumComputePath:()=>BE,getEinsumPermutation:()=>RE,getFusedBiasGradient:()=>Rb,getFusedDyActivation:()=>Lb,getImageCenter:()=>uE,getInnerMostAxes:()=>Sf,getPermuted:()=>pE,getRaggedRank:()=>iE,getReductionAxes:()=>Rd,getReshaped:()=>fE,getReshapedPermuted:()=>mE,getRowPartitionTypesHelper:()=>rE,getSliceBeginCoords:()=>hE,getSliceSize:()=>gE,getSparseFillEmptyRowsIndicesDenseShapeMismatch:()=>XE,getSparseFillEmptyRowsNegativeIndexErrorMessage:()=>ZE,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:()=>QE,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:()=>nD,getSparseReshapeInputOutputMismatchErrorMessage:()=>iD,getSparseReshapeInputOutputMultipleErrorMessage:()=>rD,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:()=>eD,getSparseReshapeNegativeOutputDimErrorMessage:()=>tD,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:()=>lD,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:()=>oD,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:()=>sD,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:()=>cD,getUndoAxesPermutation:()=>xf,isIdentityPermutation:()=>VE,log:()=>Gr,mergeRealAndImagArrays:()=>OE,prepareAndValidate:()=>yT,prepareSplitSize:()=>JE,segment_util:()=>dD,shouldFuse:()=>Bb,slice_util:()=>xT,splitRealAndImagArrays:()=>kE,stridesOrDilationsArePositive:()=>vl,tupleValuesAreOne:()=>gl,upcastType:()=>la,validateDefaultValueShape:()=>aE,validateInput:()=>Dy,validateUpdateShape:()=>Ey,warn:()=>Wr});function _D(e){try{return e.map(e=>Pi(e))}catch(e){throw Error(`Failed to decode encoded string bytes into utf-8, error: ${e}`)}}function vD(e){return e.map(e=>Ni(e))}var yD=o((()=>{L(),Cf(),Bd(),eE(),xl(),Vb(),tE(),sE(),lE(),HT(),ya(),dE(),_E(),bT(),ky(),bE(),Vb(),DE(),Kr(),IE(),qE(),YE(),$E(),aD(),uD(),hD()})),bD=c({nonMaxSuppressionV3Impl:()=>Hx,nonMaxSuppressionV4Impl:()=>Ux,nonMaxSuppressionV5Impl:()=>Wx,whereImpl:()=>Qy}),xD=o((()=>{Yx(),$y()})),SD=o((()=>{Zw(),nT(),Bd(),_T(),bT(),ky(),HT(),XC(),Da(),$g(),L(),WT(),ew(),nw(),iw(),ow(),uw(),QC(),KT(),fw(),cw(),ca(),ya(),HC(),FS(),JT(),Oo(),ii(),lm(),Be(),ZT(),yD(),Ba(),xD(),_(),I()})),CD=c({Abs:()=>`Abs`,Acos:()=>Ke,Acosh:()=>qe,AdadeltaOptimizer:()=>$C,AdagradOptimizer:()=>tw,AdamOptimizer:()=>rw,AdamaxOptimizer:()=>aw,Add:()=>`Add`,AddN:()=>Je,All:()=>`All`,Any:()=>`Any`,ArgMax:()=>Ye,ArgMin:()=>F,Asin:()=>Xe,Asinh:()=>Ze,Atan:()=>Qe,Atan2:()=>et,Atanh:()=>$e,AvgPool:()=>tt,AvgPool3D:()=>rt,AvgPool3DGrad:()=>it,AvgPoolGrad:()=>nt,BatchMatMul:()=>at,BatchToSpaceND:()=>ot,Bincount:()=>st,BitwiseAnd:()=>ct,BroadcastArgs:()=>ut,BroadcastTo:()=>lt,Cast:()=>dt,Ceil:()=>ft,ClipByValue:()=>pt,Complex:()=>mt,ComplexAbs:()=>ht,Concat:()=>gt,Conv2D:()=>_t,Conv2DBackpropFilter:()=>vt,Conv2DBackpropInput:()=>yt,Conv3D:()=>bt,Conv3DBackpropFilterV2:()=>xt,Conv3DBackpropInputV2:()=>St,Cos:()=>`Cos`,Cosh:()=>Ct,CropAndResize:()=>Et,Cumprod:()=>wt,Cumsum:()=>Tt,DataStorage:()=>h,DenseBincount:()=>Dt,DepthToSpace:()=>Ot,DepthwiseConv2dNative:()=>kt,DepthwiseConv2dNativeBackpropFilter:()=>At,DepthwiseConv2dNativeBackpropInput:()=>jt,Diag:()=>Mt,Dilation2D:()=>Nt,Dilation2DBackpropFilter:()=>Ft,Dilation2DBackpropInput:()=>Pt,Draw:()=>It,ENV:()=>ze,Einsum:()=>Rt,Elu:()=>`Elu`,EluGrad:()=>zt,Environment:()=>Re,Equal:()=>Bt,Erf:()=>`Erf`,Exp:()=>`Exp`,ExpandDims:()=>Vt,Expm1:()=>Ht,FFT:()=>`FFT`,Fill:()=>Ut,FlipLeftRight:()=>Wt,Floor:()=>Gt,FloorDiv:()=>Kt,FromPixels:()=>zr,FusedBatchNorm:()=>qt,FusedConv2D:()=>Hr,FusedDepthwiseConv2D:()=>Ur,GatherNd:()=>Yt,GatherV2:()=>Jt,Greater:()=>Xt,GreaterEqual:()=>Zt,IFFT:()=>$t,Identity:()=>Qt,Imag:()=>en,IsFinite:()=>tn,IsInf:()=>nn,IsNan:()=>rn,KernelBackend:()=>g,LRN:()=>`LRN`,LRNGrad:()=>gn,LeakyRelu:()=>an,Less:()=>on,LessEqual:()=>sn,LinSpace:()=>cn,Log:()=>`Log`,Log1p:()=>ln,LogSoftmax:()=>mn,LogicalAnd:()=>un,LogicalNot:()=>dn,LogicalOr:()=>fn,LogicalXor:()=>pn,LowerBound:()=>hn,MatrixBandPart:()=>_n,Max:()=>`Max`,MaxPool:()=>yn,MaxPool3D:()=>xn,MaxPool3DGrad:()=>Sn,MaxPoolGrad:()=>bn,MaxPoolWithArgmax:()=>Cn,Maximum:()=>vn,Mean:()=>wn,Min:()=>`Min`,Minimum:()=>Tn,MirrorPad:()=>En,Mod:()=>`Mod`,MomentumOptimizer:()=>lw,Multinomial:()=>Dn,Multiply:()=>On,Neg:()=>`Neg`,NonMaxSuppressionV3:()=>An,NonMaxSuppressionV4:()=>jn,NonMaxSuppressionV5:()=>Mn,NotEqual:()=>kn,OP_SCOPE_SUFFIX:()=>qa,OneHot:()=>Pn,OnesLike:()=>Nn,Optimizer:()=>ZC,OptimizerConstructors:()=>GT,Pack:()=>Fn,PadV2:()=>In,Pool:()=>Ln,Pow:()=>`Pow`,Prelu:()=>Rn,Prod:()=>zn,RMSPropOptimizer:()=>dw,RaggedGather:()=>Bn,RaggedRange:()=>Vn,RaggedTensorToTensor:()=>Hn,Range:()=>Un,Rank:()=>pa,Real:()=>Wn,RealDiv:()=>Lt,Reciprocal:()=>Gn,Reduction:()=>PS,Relu:()=>Kn,Relu6:()=>Qn,Reshape:()=>qn,ResizeBilinear:()=>Xn,ResizeBilinearGrad:()=>Zn,ResizeNearestNeighbor:()=>Jn,ResizeNearestNeighborGrad:()=>Yn,Reverse:()=>$n,RotateWithOffset:()=>Br,Round:()=>er,Rsqrt:()=>tr,SGDOptimizer:()=>sw,ScatterNd:()=>nr,SearchSorted:()=>ir,Select:()=>ar,Selu:()=>or,Sigmoid:()=>ur,Sign:()=>lr,Sin:()=>`Sin`,Sinh:()=>cr,Slice:()=>sr,Softmax:()=>hr,Softplus:()=>dr,SpaceToBatchND:()=>pr,SparseFillEmptyRows:()=>gr,SparseReshape:()=>_r,SparseSegmentMean:()=>vr,SparseSegmentSum:()=>yr,SparseToDense:()=>br,SplitV:()=>mr,Sqrt:()=>fr,Square:()=>Sr,SquaredDifference:()=>xr,StaticRegexReplace:()=>Cr,Step:()=>Rr,StridedSlice:()=>wr,StringNGrams:()=>Tr,StringSplit:()=>Er,StringToHashBucketFast:()=>Dr,Sub:()=>`Sub`,Sum:()=>`Sum`,Tan:()=>`Tan`,Tanh:()=>Or,Tensor:()=>oa,TensorBuffer:()=>ra,TensorScatterUpdate:()=>rr,Tile:()=>kr,TopK:()=>Ar,Transform:()=>jr,Transpose:()=>Mr,Unique:()=>Nr,Unpack:()=>Pr,UnsortedSegmentSum:()=>Fr,UpperBound:()=>Ir,Variable:()=>sa,ZerosLike:()=>Lr,_FusedMatMul:()=>Vr,abs:()=>vc,acos:()=>xc,acosh:()=>wc,add:()=>W,addN:()=>Dc,all:()=>Ac,any:()=>Nc,argMax:()=>Ic,argMin:()=>zc,asin:()=>Hc,asinh:()=>Gc,atan:()=>Jc,atan2:()=>Zc,atanh:()=>el,avgPool:()=>wl,avgPool3d:()=>Dl,backend:()=>Eo,backend_util:()=>gD,basicLSTMCell:()=>Gl,batchNorm:()=>$l,batchNorm2d:()=>nu,batchNorm3d:()=>au,batchNorm4d:()=>cu,batchToSpaceND:()=>Jl,bincount:()=>du,bitwiseAnd:()=>mu,booleanMaskAsync:()=>ib,broadcastArgs:()=>_u,broadcastTo:()=>bu,broadcast_util:()=>Id,browser:()=>rT,buffer:()=>Xs,cast:()=>$s,ceil:()=>Cu,clipByValue:()=>Ou,clone:()=>nc,complex:()=>Ya,concat:()=>Al,concat1d:()=>ju,concat2d:()=>Pu,concat3d:()=>Lu,concat4d:()=>Bu,conv1d:()=>Ku,conv2d:()=>Uu,conv2dTranspose:()=>Qu,conv3d:()=>td,conv3dTranspose:()=>sd,copyRegisteredKernels:()=>ei,cos:()=>ud,cosh:()=>pd,cosineWindow:()=>kb,cumprod:()=>gd,cumsum:()=>yd,customGrad:()=>sm,denseBincount:()=>Sd,deprecationWarn:()=>lo,depthToSpace:()=>Td,depthwiseConv2d:()=>Od,device_util:()=>Pa,diag:()=>jd,dilation2d:()=>Pd,disableDeprecationWarnings:()=>co,dispose:()=>go,disposeVariables:()=>uo,div:()=>pc,divNoNan:()=>Zd,dot:()=>ef,dropout:()=>Eb,einsum:()=>rf,elu:()=>sf,enableDebugMode:()=>so,enableProdMode:()=>oo,enclosingPowerOfTwo:()=>Ob,engine:()=>fo,ensureShape:()=>uf,env:()=>P,equal:()=>Hd,erf:()=>pf,euclideanNorm:()=>Yf,exp:()=>Qf,expandDims:()=>tp,expm1:()=>ip,eye:()=>up,fft:()=>Fv,fill:()=>Tu,findBackend:()=>Co,findBackendFactory:()=>wo,floor:()=>pp,floorDiv:()=>uc,fused:()=>rx,gather:()=>gp,gatherND:()=>xb,gather_util:()=>vT,getBackend:()=>xo,getGradient:()=>Jr,getKernel:()=>qr,getKernelsForBackend:()=>Yr,grad:()=>nm,grads:()=>rm,greater:()=>yp,greaterEqual:()=>Sp,ifft:()=>Rv,imag:()=>Tp,image:()=>LC,inTopKAsync:()=>Mb,io:()=>Xw,irfft:()=>Vv,isFinite:()=>Op,isInf:()=>jp,isNaN:()=>Pp,keep:()=>_o,kernel_impls:()=>bD,leakyRelu:()=>Lp,less:()=>Bp,lessEqual:()=>Up,linalg:()=>RC,linspace:()=>Gp,localResponseNormalization:()=>Jp,log:()=>Zp,log1p:()=>em,logSigmoid:()=>_m,logSoftmax:()=>Cm,logSumExp:()=>Em,logicalAnd:()=>km,logicalNot:()=>Mm,logicalOr:()=>Fm,logicalXor:()=>Rm,losses:()=>zC,lowerBound:()=>Wm,matMul:()=>Nl,math:()=>tT,max:()=>Tf,maxPool:()=>qm,maxPool3d:()=>Xm,maxPoolWithArgmax:()=>$m,maximum:()=>nh,mean:()=>ah,memory:()=>po,meshgrid:()=>dh,min:()=>Of,minimum:()=>mh,mirrorPad:()=>_h,mod:()=>bh,moments:()=>Ch,movingAverage:()=>ub,mul:()=>G,multiRNNCell:()=>Eh,multinomial:()=>kh,neg:()=>dm,nextFrame:()=>YT,norm:()=>Kf,notEqual:()=>Mh,oneHot:()=>Fh,ones:()=>lh,onesLike:()=>Rh,op:()=>H,outerProduct:()=>Vh,pad:()=>Wh,pad1d:()=>qh,pad2d:()=>Xh,pad3d:()=>$h,pad4d:()=>ng,pool:()=>ug,pow:()=>jf,prelu:()=>pg,print:()=>ic,prod:()=>gg,profile:()=>mo,raggedGather:()=>yg,raggedRange:()=>Sg,raggedTensorToTensor:()=>Tg,rand:()=>Og,randomGamma:()=>o_,randomNormal:()=>l_,randomStandardNormal:()=>f_,randomUniform:()=>h_,randomUniformInt:()=>v_,range:()=>b_,ready:()=>bo,real:()=>C_,reciprocal:()=>E_,registerBackend:()=>To,registerGradient:()=>Zr,registerKernel:()=>Xr,relu:()=>k_,relu6:()=>M_,removeBackend:()=>So,reshape:()=>K,reverse:()=>F_,reverse1d:()=>R_,reverse2d:()=>V_,reverse3d:()=>W_,reverse4d:()=>q_,rfft:()=>qv,round:()=>X_,rsqrt:()=>$_,scalar:()=>Nf,scatterND:()=>pb,scatter_util:()=>Ty,searchSorted:()=>Hm,selu:()=>nv,separableConv2d:()=>av,serialization:()=>UC,setBackend:()=>yo,setPlatform:()=>Do,setdiff1dAsync:()=>cv,sigmoid:()=>Il,sign:()=>dv,signal:()=>IC,sin:()=>mv,sinh:()=>_v,slice:()=>zl,slice1d:()=>bv,slice2d:()=>Cv,slice3d:()=>Ev,slice4d:()=>kv,slice_util:()=>xT,softmax:()=>Mv,softplus:()=>mm,spaceToBatchND:()=>ag,sparse:()=>BC,sparseToDense:()=>vb,spectral:()=>FC,split:()=>Wv,sqrt:()=>If,square:()=>zf,squaredDifference:()=>Xv,squeeze:()=>$v,stack:()=>ny,step:()=>ay,stridedSlice:()=>cy,string:()=>VC,sub:()=>bm,sum:()=>Hf,sumOutType:()=>ua,tan:()=>dy,tanh:()=>Hl,tensor:()=>$a,tensor1d:()=>py,tensor2d:()=>hy,tensor3d:()=>_y,tensor4d:()=>yy,tensor5d:()=>xy,tensor6d:()=>Cy,tensorScatterUpdate:()=>jy,tensor_util:()=>ba,test_util:()=>Rg,tidy:()=>ho,tile:()=>sp,time:()=>vo,topk:()=>Py,train:()=>qT,transpose:()=>sb,truncatedNormal:()=>Ly,unique:()=>By,unregisterGradient:()=>$r,unregisterKernel:()=>Qr,unsortedSegmentSum:()=>Uy,unstack:()=>Ky,upcastType:()=>la,upperBound:()=>Jy,util:()=>Di,valueAndGrad:()=>im,valueAndGrads:()=>am,variable:()=>Xy,variableGrads:()=>om,version_core:()=>UT,where:()=>Gd,whereAsync:()=>tb,zeros:()=>sh,zerosLike:()=>Jd}),J=o((()=>{oc(),hw(),SD(),pw()}));J();function Y(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{e!=null&&E(e.dtype!==`complex64`,()=>`${t} does not support complex64 tensors in the CPU backend.`)})}J();var wD=Qy,TD=class e extends g{nextDataId(){return e.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new h(this,fo())}write(e,t,n){this.firstUse&&(this.firstUse=!1,P().get(`IS_NODE`)&&Wr(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));let r={id:this.nextDataId()};return this.data.set(r,{values:e,dtype:n,refCount:1}),r}makeTensorInfo(e,t,n){let r;if(t===`string`&&n!=null&&n.length>0&&ge(n[0])){let i=n.map(e=>Ni(e));r=this.write(i,e,t)}else r=this.write(n,e,t);return{dataId:r,shape:e,dtype:t}}refCount(e){return this.data.has(e)?this.data.get(e).refCount:0}incRef(e){let t=this.data.get(e);t.refCount++}decRef(e){if(this.data.has(e)){let t=this.data.get(e);t.refCount--}}move(e,t,n,r,i){this.data.set(e,{values:t,dtype:r,refCount:i})}numDataIds(){return this.data.numDataIds()}async read(e){return this.readSync(e)}readSync(e){let{dtype:t,complexTensorInfos:n}=this.data.get(e);return t===`complex64`?OE(this.readSync(n.real.dataId),this.readSync(n.imag.dataId)):we(this.data.get(e).values,t)}bufferSync(e){let t=this.readSync(e.dataId);if(e.dtype===`string`)try{let n=t.map(e=>Pi(e));return Xs(e.shape,e.dtype,n)}catch{throw Error(`Failed to decode encoded string bytes into utf-8`)}return Xs(e.shape,e.dtype,t)}makeOutput(e,t,n){return fo().makeTensorFromTensorInfo(this.makeTensorInfo(t,n,e),this)}disposeData(e,t=!1){if(this.data.has(e)){if(this.data.get(e).refCount--,!t&&this.data.get(e).refCount>0)return!1;let{complexTensorInfos:n}=this.data.get(e);n!=null&&(this.disposeData(n.real.dataId,!0),this.disposeData(n.imag.dataId,!0)),this.data.delete(e)}return!0}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}async time(e){let t=ji();return e(),{kernelMs:ji()-t}}memory(){return{unreliable:!0,reasons:[`The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less.`]}}where(e){Y([e],`where`);let t=this.readSync(e.dataId);return wD(e.shape,t)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}};TD.nextDataId=0,J();function ED(e){let t=new Float32Array(e.length);for(let n=0;n<e.length;++n)t[n]=Math.abs(e[n]);return t}var DD={kernelName:`Abs`,backendName:`cpu`,kernelFunc:e=>{let{x:t}=e.inputs,n=e.backend;Y(t,`abs`);let r=new Float32Array(k(t.shape)),i=n.data.get(t.dataId).values;return r=ED(i),n.makeOutput(r,t.shape,t.dtype)}};J();function OD(e){return(t,n,r,i,a)=>{let o=zd(t,n),s=o.length,c=N(o),l=M(a,k(o)),u=t.length,d=n.length,f=N(t),p=N(n),m=Ld(t,o),h=Ld(n,o);if(m.length+h.length===0)for(let t=0;t<l.length;++t)l[t]=e(r[t%r.length],i[t%i.length]);else for(let t=0;t<l.length;++t){let n=Ae(t,s,c),a=n.slice(-u);m.forEach(e=>a[e]=0);let o=ke(a,u,f),g=n.slice(-d);h.forEach(e=>g[e]=0);let _=ke(g,d,p);l[t]=e(r[o],i[_])}return[l,o]}}J();function kD(e){let{inputs:t,backend:n}=e,{real:r,imag:i}=t,a=n.data.get(r.dataId).values,o=n.data.get(i.dataId).values,s=n.makeTensorInfo(r.shape,`complex64`),c=n.data.get(s.dataId);return c.complexTensorInfos={real:n.makeTensorInfo(r.shape,`float32`,a),imag:n.makeTensorInfo(i.shape,`float32`,o)},s}var AD={kernelName:mt,backendName:`cpu`,kernelFunc:kD};J();function jD(e,t,n=`float32`){if(n===`complex64`)return kD({inputs:{real:jD(e,t,`float32`),imag:jD(e,t,`float32`)},backend:e});let r=Ee(k(t),n);return e.makeTensorInfo(t,n,r)}J();function MD(e){let{inputs:t,backend:n}=e,{x:r}=t;return n.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}var ND={kernelName:Qt,backendName:`cpu`,kernelFunc:MD};J();function PD(e){let{inputs:t,backend:n}=e,{input:r}=t,i=n.data.get(r.dataId).complexTensorInfos.real,a=n.data.get(i.dataId).values;return n.makeTensorInfo(i.shape,i.dtype,a)}var FD={kernelName:Wn,backendName:`cpu`,kernelFunc:PD};J();function ID(e,t,n,r){if(r===`int32`)return[t,`int32`,Int32Array.from(e)];if(r===`bool`){let r=Ai([0],n),[i,a]=OD((e,t)=>e===t?0:1)(t,[],e,r,`bool`);return[a,`bool`,i]}throw Error(`Error in Cast: failed to cast ${n} to ${r}`)}function LD(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dtype:a}=r;if(a===`complex64`){if(i.dtype===`complex64`)return MD({inputs:{x:i},backend:n});let e=jD(n,i.shape,i.dtype),t=LD({inputs:{x:i},backend:n,attrs:{dtype:`float32`}}),r=kD({inputs:{real:t,imag:e},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),r}if(i.dtype===`complex64`){let e=PD({inputs:{input:i},backend:n}),t=LD({inputs:{x:e},backend:n,attrs:{dtype:a}});return n.disposeIntermediateTensorInfo(e),t}if(!pe(i.dtype,a)){let e=MD({inputs:{x:i},backend:n});return{dataId:e.dataId,shape:e.shape,dtype:a}}let o=n.data.get(i.dataId).values,[s,c,l]=ID(o,i.shape,i.dtype,a);return n.makeTensorInfo(s,c,l)}var RD={kernelName:dt,backendName:`cpu`,kernelFunc:LD};J();function zD(e,t,n,r){return n==null?({inputs:n,backend:i})=>{let{a,b:o}=n,s=i;Y([a,o],e);let c=s.data.get(a.dataId).values,l=s.data.get(o.dataId).values,u=a.dtype===`string`?_D(c):c,d=a.dtype===`string`?_D(l):l,f=r||a.dtype,[p,m]=t(a.shape,o.shape,u,d,f);return s.makeTensorInfo(m,f,p)}:({inputs:e,backend:i})=>{let{a,b:o}=e,s=i;if(a.dtype===`complex64`||o.dtype===`complex64`){let e=LD({inputs:{x:a},backend:s,attrs:{dtype:`complex64`}}),t=s.data.get(e.dataId),r=t.complexTensorInfos.real,i=t.complexTensorInfos.imag,c=s.data.get(r.dataId).values,l=s.data.get(i.dataId).values,u=LD({inputs:{x:o},backend:s,attrs:{dtype:`complex64`}}),d=s.data.get(u.dataId),f=d.complexTensorInfos.real,p=d.complexTensorInfos.imag,m=s.data.get(f.dataId).values,h=s.data.get(p.dataId).values,[g,_,v]=n(a.shape,o.shape,c,l,m,h),y=s.makeTensorInfo(v,`float32`,g),b=s.makeTensorInfo(v,`float32`,_),x=kD({inputs:{real:y,imag:b},backend:s});return s.disposeIntermediateTensorInfo(e),s.disposeIntermediateTensorInfo(u),s.disposeIntermediateTensorInfo(y),s.disposeIntermediateTensorInfo(b),x}{let e=s.data.get(a.dataId).values,n=s.data.get(o.dataId).values,i=r||a.dtype,[c,l]=t(a.shape,o.shape,e,n,i);return s.makeTensorInfo(l,i,c)}}}function BD(e){return(t,n,r,i,a,o)=>{let s=zd(t,n),c=k(s),l=s.length,u=N(s),d=M(`float32`,c),f=M(`float32`,c),p=Ld(t,s),m=Ld(n,s),h=OE(r,i),g=OE(a,o),_=t.length,v=N(t),y=n.length,b=N(n);if(p.length+m.length===0)for(let t=0;t<d.length;t++){let n=t%h.length,r=t%g.length,i=e(h[n*2],h[n*2+1],g[r*2],g[r*2+1]);d[t]=i.real,f[t]=i.imag}else for(let t=0;t<d.length;t++){let n=Ae(t,l,u),r=n.slice(-_);p.forEach(e=>r[e]=0);let i=ke(r,_,v),a=n.slice(-y);m.forEach(e=>a[e]=0);let o=ke(a,y,b),s=e(h[i*2],h[i*2+1],g[o*2],g[o*2+1]);d[t]=s.real,f[t]=s.imag}return[d,f,s]}}J();var VD=OD(((e,t)=>e+t)),HD=zD(`Add`,VD,BD(((e,t,n,r)=>({real:e+n,imag:t+r})))),UD={kernelName:`Add`,backendName:`cpu`,kernelFunc:HD};J();function WD(e,t,n,r,i){let a=k(r),o=Ee(i,n);for(let n=0;n<e.length;n++){let r=e[n];if(r<0)throw Error(`Input x must be non-negative!`);r>=i||(a>0?o[r]+=t[n]:o[r]+=1)}return o}function GD(e,t,n,r=!1){let i=e.shape[0],a=e.shape[1],o=Xs([i,n],t.dtype);for(let s=0;s<i;s++)for(let i=0;i<a;i++){let a=e.get(s,i);if(a<0)throw Error(`Input x must be non-negative!`);a>=n||(r?o.set(1,s,a):t.size>0?o.set(o.get(s,a)+t.get(s,i),s,a):o.set(o.get(s,a)+1,s,a))}return o}J();var KD=OD(((e,t)=>e&t)),qD=zD(ct,KD),JD={kernelName:ct,backendName:`cpu`,kernelFunc:qD};J();function YD(e){return(t,n,r)=>{let i=ue(n,t.length);for(let n=0;n<t.length;++n)i[n]=e(t[n],r);return i}}J();function XD(e,t,n){return ZD(e,YD(t),n)}function ZD(e,t,n){return({inputs:r,attrs:i,backend:a})=>{let{x:o}=r;Y(o,e);let s=a,c=s.data.get(o.dataId).values,l;if(o.dtype===`string`){if(!Array.isArray(c))throw Error(`String tensor's value was not an instance of Array`);l=_D(c)}else l=c;let u=n||o.dtype,d=t(l,u,i);return s.makeTensorInfo(o.shape,u,d)}}J();var QD=YD(e=>Math.ceil(e)),$D=ZD(ft,QD),eO={kernelName:ft,backendName:`cpu`,kernelFunc:$D};J();function tO(e,t,n,r){let i=ue(n,k(t));if(r&&n!==`string`){let t=0;e.forEach(e=>{let n=k(e.shape);i.set(e.vals,t),t+=n})}else{let r=0;e.forEach(e=>{let a=n===`string`?_D(e.vals):e.vals,o=0;for(let n=0;n<e.shape[0];++n){let s=n*t[1]+r;for(let t=0;t<e.shape[1];++t)i[s+t]=a[o++]}r+=e.shape[1]})}return i}J();var nO=OD((e,t)=>+(e===t)),rO=zD(Bt,nO,null,`bool`),iO={kernelName:Bt,backendName:`cpu`,kernelFunc:rO};J();var aO=YD(e=>Math.exp(e)),oO=ZD(`Exp`,aO,`float32`),sO={kernelName:`Exp`,backendName:`cpu`,kernelFunc:oO};J();var cO=YD(e=>Math.expm1(e)),lO=ZD(Ht,cO),uO={kernelName:Ht,backendName:`cpu`,kernelFunc:lO};J();var dO=YD(e=>Math.floor(e)),fO=ZD(Gt,dO),pO={kernelName:Gt,backendName:`cpu`,kernelFunc:fO};J();var mO=OD((e,t)=>Math.floor(e/t)),hO=zD(Kt,mO,null,`int32`),gO={kernelName:Kt,backendName:`cpu`,kernelFunc:hO};J();function _O(e,t,n,r,i,a,o,s,c){let l=Xs([r,a],n);for(let n=0;n<r;n++){let r=[],u=0;for(let t=0;t<i;t++){let a=e[n*i+t];u+=a*o[t],r.push(a)}if(u<0||u>=c/a)throw Error(`Invalid indices: ${r} does not index into ${s}`);for(let e=0;e<a;e++)l.values[n*a+e]=t.get(...t.indexToLoc(u*a+e))}return l}J();function vO(e,t,n){let r=Xs(n,e.dtype);for(let n=0;n<r.size;++n){let i=r.indexToLoc(n).slice(),a=i[0],o=i[2],s=t.locToIndex([a,o]);i[2]=t.values[s];let c=e.locToIndex(i);0<=c&&c<e.values.length&&(r.values[n]=e.values[c])}return r}J();var yO=OD((e,t)=>+(e>t)),bO=zD(Xt,yO,null,`bool`),xO={kernelName:Xt,backendName:`cpu`,kernelFunc:bO};J();var SO=OD((e,t)=>+(e>=t)),CO=zD(Zt,SO,null,`bool`),wO={kernelName:Zt,backendName:`cpu`,kernelFunc:CO};J();var TO=OD((e,t)=>+(e<t)),EO=zD(on,TO,null,`bool`),DO={kernelName:on,backendName:`cpu`,kernelFunc:EO};J();var OO=OD((e,t)=>+(e<=t)),kO=zD(sn,OO,null,`bool`),AO={kernelName:sn,backendName:`cpu`,kernelFunc:kO};J();function jO(e,t,n){let r=(t-e)/(n-1),i=Ee(n,`float32`);i[0]=e;for(let e=1;e<i.length;e++)i[e]=i[e-1]+r;return i}J();var MO=YD(e=>Math.log(e)),NO={kernelName:`Log`,backendName:`cpu`,kernelFunc:ZD(`Log`,MO)};J();function PO(e,t,n,r){let i=M(r,k(n));for(let n=0;n<i.length;++n){let r=n*t,a=e[r];for(let n=0;n<t;++n){let t=e[r+n];(Number.isNaN(t)||t>a)&&(a=t)}i[n]=a}return i}J();var FO=OD(((e,t)=>Math.max(e,t))),IO=zD(vn,FO),LO={kernelName:vn,backendName:`cpu`,kernelFunc:IO};J();var RO=OD(((e,t)=>Math.min(e,t))),zO=zD(Tn,RO),BO={kernelName:Tn,backendName:`cpu`,kernelFunc:zO};J();var VO=OD(((e,t)=>e*t)),HO=BD(((e,t,n,r)=>({real:e*n-t*r,imag:e*r+t*n}))),UO=zD(On,VO,HO),WO={kernelName:On,backendName:`cpu`,kernelFunc:UO};J();function GO(e,t,n){return VO([],t,Oi(-1,n),e,n)}function KO(e){let{inputs:t,backend:n}=e,{x:r}=t;Y(r,`neg`);let i=n.data.get(r.dataId).values,[a,o]=GO(i,r.shape,r.dtype);return n.makeTensorInfo(o,r.dtype,a)}var qO={kernelName:`Neg`,backendName:`cpu`,kernelFunc:KO};J();var JO=OD(((e,t)=>e===t?0:1)),YO=zD(kn,JO,null,`bool`),XO={kernelName:kn,backendName:`cpu`,kernelFunc:YO};J();function ZO(e,t,n,r,i){let a=t.length,o=k(t),s=N(t),c=N(i),l=M(n,k(i));for(let t=0;t<o;++t){let n=Ae(t,a,s),i=Array(n.length);for(let e=0;e<i.length;e++)i[e]=n[r[e]];let o=ke(i,a,c);l[o]=e[t]}return l}J();function QO(e){let{inputs:t,attrs:n,backend:r}=e,{x:i}=t,{perm:a}=n;Y(i,`transpose`);let o=i.shape.length,s=Array(o);for(let e=0;e<s.length;e++)s[e]=i.shape[a[e]];let c=r.data.get(i.dataId).values,l=ZO(c,i.shape,i.dtype,a,s);return{dataId:r.write(l,s,i.dtype),shape:s,dtype:i.dtype}}var $O={kernelName:Mr,backendName:`cpu`,kernelFunc:QO};J();function ek(e,t,n,r){let[i,a]=_f(e,r),o=la(t,`int32`),s=Ee(k(i),o),c=k(a);for(let e=0;e<s.length;++e){let t=e*c,r=1;for(let e=0;e<c;++e)r*=n[t+e];s[e]=r}return{outVals:s,outShape:i,outDtype:o}}function tk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;Y(i,`prod`);let s=i.shape.length,c=j(a,i.shape),l=bf(c,s),u=c,d=i,f=[];l!=null&&(d=QO({inputs:{x:i},backend:n,attrs:{perm:l}}),f.push(d),u=Sf(u.length,s));let p=n.data.get(d.dataId).values,{outVals:m,outShape:h,outDtype:g}=ek(d.shape,d.dtype,p,u),_=h;return o&&(_=vf(h,c)),f.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(_,g,m)}var nk={kernelName:zn,backendName:`cpu`,kernelFunc:tk};J();function rk(e,t,n){e.forEach((e,r)=>{if(e<0||e>=n){let i=Ae(r,t.length,N(t)).join(`,`);throw Error(`indices[${i}] = ${e} is not in [0, ${n})`)}})}function ik(e,t){for(let n=0;n<e.length;++n){let r=e[n],i=n===e.length-1?t:e[n+1].length;if(r.length===0)throw Error(`Ragged splits may not be empty`);if(r[0]<0)throw Error(`Ragged splits must be non-negative`);if(r[r.length-1]>i)throw Error(`Ragged splits must not point past values`);for(let e=1;e<r.length;++e)if(r[e-1]>r[e])throw Error(`Ragged splits must be sorted in ascending order`)}}function ak(e,t,n,r){let i=[],a=0,o=t.length-1+n.length,s=Array(o).fill(null).map(()=>[0]);ik(n,r);let c=1;for(let e=0;e<t.length-1;++e){c*=t[e];let n=t[e+1];for(let t=1;t<c+1;++t)s[e].push(t*n)}for(let r=0;r<e.length;++r){let o=e[r],c=e[r]+1;for(let e=0;e<n.length;++e){let r=n[e],i=e+t.length-1;if(i>=0){let e=s[i],t=e[e.length-1]-r[o];for(let e=o;e<c;++e)s[i].push(r[e+1]+t)}o=r[o],c=r[c]}c!==o&&(i.push([o,c]),a+=c-o)}return{outSplits:s,valueSlices:i,numValues:a}}function ok(e){let t=[];for(let n=0;n<e.length;++n){let r=e[n].length,i=ue(`int32`,r);t.push(i),e[n].forEach((e,t)=>i[t]=e)}return t}function sk(e,t){let n=e.slice(0,t);for(;n.length<t;)n.push(1);for(let r=t;r<e.length;r++)n[t-1]*=e[r];return n}function ck(e,t,n,r,i,a){let o=sk(t,2)[1],s=sk(a,2)[1],c=0;for(let t of n)for(let n=t[0];n<t[1];++n){for(let t=0;t<r;++t)i[c*s+t]=e[n*o+t];++c}}function lk(e,t,n,r,i){let a=t.slice();a[0]=i;let o=ue(n,k(a)),s=e.length;return ck(e,t,r,s===0?0:s/t[0],o,a),[o,a]}function uk(e,t,n,r,i,a,o,s){if(e.length===0)throw Error(`paramsNestedSplits must be non empty`);if(t[0].length===0)throw Error(`Split tensors must not be scalars`);if(rk(a,o,t[0][0]-1),r.length===0)throw Error(`params.rank must be nonzero`);let c=r[0],{outSplits:l,valueSlices:u,numValues:d}=ak(a,o,e,c),f=ok(l),p=lk(n,r,i,u,d);return[f,p[0],p[1]]}J();var dk=2147483647;function fk(e,t,n,r,i,a,o){if(t.length>1)throw Error(`starts must be a scalar or vector`);if(i.length>1)throw Error(`limits must be a scalar or vector`);if(o.length>1)throw Error(`deltas must be a scalar or vector`);let s=t.length===0,c=i.length===0,l=o.length===0,u=[];s||u.push(t[0]),c||u.push(i[0]),l||u.push(o[0]);for(let e=1;e<u.length;++e)if(u[e]!==u[e-1])throw Error(`starts, limits, and deltas must have the same shape`);let d=u.length===0?1:u[0],f=ue(`int32`,d+1);f[0]=0;for(let t=0;t<d;++t){let n=s?e[0]:e[t],i=c?r[0]:r[t],o=l?a[0]:a[t];if(o===0)throw Error(`Requires delta != 0`);let u;if(o>0&&i<n||o<0&&i>n)u=0;else if(u=Math.ceil(Math.abs((i-n)/o)),u>dk)throw Error(`Requires ((limit - start) / delta) <= ${dk}`);f[t+1]=f[t]+u}let p=f[d],m=ue(n,p),h=0;for(let t=0;t<d;++t){let n=f[t+1]-f[t],r=s?e[0]:e[t],i=l?a[0]:a[t];for(let e=0;e<n;++e)m[h++]=r,r+=i}return[f,m]}J();var pk=oE,mk=class e{constructor(e,t,n,r,i,a,o,s,c,l){this.shape=e,this.shapeShape=t,this.values=n,this.valuesShape=r,this.valuesDType=i,this.defaultValue=a,this.defaultValueShape=o,this.rowPartitionValues=s,this.rowPartitionValuesShapes=c,this.rowPartitionTypes=rE(l),this.raggedRank=iE(this.rowPartitionTypes)}getRowPartitionTypeByDimension(e){return this.rowPartitionTypes[0]===pk.FIRST_DIM_SIZE?this.rowPartitionTypes[e+1]:this.rowPartitionTypes[e]}getRowPartitionTensor(e){return this.rowPartitionTypes[0]===pk.FIRST_DIM_SIZE?this.rowPartitionValues[e+1]:this.rowPartitionValues[e]}getMaxWidth(t){let n=this.getRowPartitionTensor(t-1);switch(this.getRowPartitionTypeByDimension(t-1)){case pk.VALUE_ROWIDS:return e.getMaxWidthValueRowID(n);case pk.ROW_SPLITS:return e.getMaxWidthRowSplit(n);default:throw Error(`Cannot handle partition type ${pk[this.getRowPartitionTypeByDimension(t-1)]}`)}}static getMaxWidthRowSplit(e){let t=e.length;if(t===0||t===1)return 0;let n=0;for(let r=0;r<t-1;++r){let t=e[r+1]-e[r];t>n&&(n=t)}return n}static getMaxWidthValueRowID(e){let t=e.length;if(t===0)return 0;let n=0,r=e[0],i=0;for(let a=1;a<t;++a){let t=e[a];t!==r&&(r=t,i=Math.max(a-n,i),n=a)}return Math.max(t-n,i)}tensorShapeFromTensor(e,t,n=!0){if(t.length===0){if(e[0]===-1)return[];throw Error(`The only valid scalar shape tensor is the fully unknown shape specified as -1.`)}return gk(e,n)}calculateOutputSize(e){let t=this.valuesShape,n=this.defaultValueShape;aE(n,t);let r=this.tensorShapeFromTensor(this.shape,this.shapeShape),i=nE(this.raggedRank,r,t);i[0]<0&&(i[0]=e);for(let e=1;e<=this.raggedRank;++e)i[e]<0&&(i[e]=this.getMaxWidth(e));return i}calculateFirstParentOutputIndex(e,t,n){let r=Math.min(e,n),i=[],a=0;for(let e=0;e<r;++e,a+=t)i.push(a);for(let t=r;t<e;++t)i.push(-1);return E(i.length===e,()=>`Final length of result must be equal to firstDimension.`),i}calculateOutputIndexRowSplit(e,t,n,r){let i=e.length,a=[];for(let o=0;o<i-1;++o){let i=e[o+1]-e[o],s=Math.min(r,i),c=t[o];c===-1&&(s=0);for(let e=0;e<s;++e)a.push(c),c+=n;for(let e=0;e<i-s;++e)a.push(-1)}if(i>0&&a.length!==e[i-1])throw Error(`Invalid row split size.`);return a}calculateOutputIndexValueRowID(e,t,n,r){let i=e.length,a=[];if(i===0)return[];let o=0,s=e[0];if(s>=t.length)throw Error(`Got currentValueRowId=${s}, which is not less than ${t.length}`);let c=t[s];a.push(c);for(let l=1;l<i;++l){let i=e[l];if(i===s)c>=0&&(++o,o<r?c+=n:c=-1);else{if(o=0,s=i,i>=t.length)throw Error(`Got nextValueRowId=${i} which is not less than ${t.length}`);c=t[i]}a.push(c)}if(a.length!==e.length)throw Error(`Invalid row ids.`);return a}calculateOutputIndex(e,t,n,r){let i=this.getRowPartitionTensor(e),a=this.getRowPartitionTypeByDimension(e);switch(a){case pk.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(i,t,n,r);case pk.ROW_SPLITS:if(i.length-1>t.length)throw Error(`Row partition size is greater than output size: ${i.length-1} > ${t.length}`);return this.calculateOutputIndexRowSplit(i,t,n,r);default:throw Error(`Unsupported partition type: ${pk[a]}`)}}getFirstDimensionSize(){let e=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw Error(`No row_partition_types given.`);let t=this.rowPartitionTypes[0];switch(t){case pk.FIRST_DIM_SIZE:return e[0];case pk.VALUE_ROWIDS:throw Error(`Cannot handle VALUE_ROWIDS in first dimension.`);case pk.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw Error(`Cannot handle type ${pk[t]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw Error(`Invalid first partition input. Tensor requires at least one element.`);let e=this.getFirstDimensionSize(),t=this.calculateOutputSize(e),n=Array(this.raggedRank+1);n[n.length-1]=1;for(let e=n.length-2;e>=0;--e)n[e]=n[e+1]*t[e+1];let r=gk(t,!1),i=ue(this.valuesDType,k(r));if(n[0]*t[0]>0){let a=this.calculateFirstParentOutputIndex(e,n[0],t[0]);for(let e=1;e<=this.raggedRank;++e)a=this.calculateOutputIndex(e-1,a,n[e],t[e]);this.setOutput(this.raggedRank,a,i,r)}return[r,i]}setOutput(e,t,n,r){if(n.length===0)return;let i=this.values,a=n,o=r.slice();o=o.slice(e+1);let s=k(o),c=t.length,l=this.defaultValue;if(l.length!==s&&l.length!==1){let e=this.defaultValueShape;ho(()=>{let t=K(l,e);l=bu(t,o).dataSync()})}let u=0,d=0,f=0;for(let e=0;e<=c;++e){let r=e<c?t[e]:-1;if(r===f){++f;continue}if(d<f){let e=i.subarray(u*s);hk(a.subarray(d*s),e,(f-d)*s)}if(e>=c){let e=n.length;r=Math.floor(e/s)}if(r>f){if(this.defaultValue.length===1)a.subarray(f*s,r*s).fill(this.defaultValue[0]),f=r;else for(;r>f;)hk(a.slice(f*s),l,s),++f}r<0?(u=e+1,d=f):(u=e,d=f,f=d+1)}}};function hk(e,t,n){for(let r=0;r<n;r++)e[r]=t[r]}function gk(e,t){let n=[];for(let r of e){if(r<0){if(!t)throw Error(`Dimension ${r} must be >= 0`);if(r<-1)throw Error(`Dimension ${r} must be >= -1`);r=-1}n.push(r)}return n}function _k(e,t,n,r,i,a,o,s,c,l){return new mk(e,t,n,r,i,a,o,s,c,l).compute()}J();function vk(e,t,n,r){if(e===t||e<t&&n<0||t<e&&n>1)return Ee(0,r);let i=Ee(Math.abs(Math.ceil((t-e)/n)),r);t<e&&n===1&&(n=-1),i[0]=e;for(let e=1;e<i.length;e++)i[e]=i[e-1]+n;return i}J();var yk=YD(e=>1/Math.sqrt(e)),bk=ZD(tr,yk),xk={kernelName:tr,backendName:`cpu`,kernelFunc:bk};J();function Sk(e,t,n,r,i,a,o,s,c,l){let u=[r/i,i],d=e.values,f=t.values;if(r===0)return Xs(n,t.dtype);let p=c instanceof ra?c:Xs(u,t.dtype);typeof c==`string`||typeof c==`number`?p.values.fill(c):typeof c==`boolean`&&p.values.fill(+c);for(let e=0;e<a;e++){let a=[],c=0;for(let t=0;t<o;t++){let n=d[e*o+t];a.push(n),c+=n*s[t]}if(c<0||c>=r/i)throw Error(`Invalid indices: ${a} does not index into ${n}`);for(let n=0;n<i;n++)l?p.values[c*i+n]+=f[e*i+n]:p.values[c*i+n]=t.rank===0?f[0]:f[e*i+n]}return p}J();var Ck=YD(e=>1/(1+Math.exp(-e))),wk=XD(ur,e=>1/(1+Math.exp(-e))),Tk={kernelName:ur,backendName:`cpu`,kernelFunc:wk};J();function Ek(e,t,n,r,i){let a=PT(r,t,n),o=k(n),s=N(r);if(a){let n=FT(t,s);return i===`string`?e.slice(n,n+o):e.subarray(n,n+o)}let c=Xs(r,i,i===`string`?_D(e):e),l=Xs(n,i);for(let e=0;e<l.size;++e){let n=l.indexToLoc(e),r=n.map((e,n)=>e+t[n]);l.set(c.get(...r),...n)}return i===`string`?vD(l.values):l.values}function Dk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{begin:a,size:o}=r;Y(i,`slice`);let[s,c]=IT(i,a,o);ST(i,s,c);let l=n.data.get(i.dataId).values,u=Ek(l,s,c,i.shape,i.dtype);return n.makeTensorInfo(c,i.dtype,u)}var Ok={kernelName:sr,backendName:`cpu`,kernelFunc:Dk};J();function kk(e,t,n,r,i,a,o){let s=t[0],c=a[0],l=Array(c),u=Array(s),d=t[1];if(c===0){if(s!==0)throw Error(XE(s));let e=ue(n,0),t=ue(i,0);return[e,[0,d],t,l,u]}let f=!0,p=0,m=Array(c).fill(0);for(let t=0;t<s;++t){let n=e[t*d];if(n<0)throw Error(ZE(t,n));if(n>=c)throw Error(QE(t,n,c));++m[n],f&&=n>=p,p=n}let h=!0;for(let e=0;e<c;++e){let t=m[e]===0;l[e]=t,h&&=!t,m[e]=Math.max(m[e],1),e>0&&(m[e]+=m[e-1])}if(h&&f){let t=e,n=r;for(let e=0;e<s;++e)u[e]=e;return[t,[s,d],n,l,u]}{let t=m[c-1],a=ue(n,t*d),f=ue(i,t),p=Array(c).fill(0);for(let t=0;t<s;++t){let n=e[t*d],i=p[n],o=(n===0?0:m[n-1])+i;p[n]++;for(let n=0;n<d;++n)a[o*d+n]=e[t*d+n];f[o]=r[t],u[t]=o}for(let e=0;e<c;++e)if(p[e]===0){let t=e===0?0:m[e-1];a[t*d+0]=e;for(let e=1;e<d;++e)a[t*d+e]=0;f[t]=o}return[a,[t,d],f,l,u]}}J();function Ak(e,t,n,r,i){let a=k(r),o=t[0],s=i.length,c=[],l=1,u=-1;for(let e=0;e<s;++e){let t=i[e];if(t===-1){if(u!==-1)throw Error(eD(u,e));u=e,c.push(1)}else{if(t<0)throw Error(tD(e,t));l*=t,c.push(t)}}if(u!==-1){if(l<=0)throw Error(nD());let e=Math.trunc(a/l);if(l*e!==a)throw Error(rD(r,c));c[u]=e}if(k(c)!==a)throw Error(iD(r,c));let d=r.length,f=[];if(d>0){f[d-1]=1;for(let e=d-2;e>=0;--e)f[e]=f[e+1]*r[e+1]}let p=[];if(s>0){p[s-1]=1;for(let e=s-2;e>=0;--e)p[e]=p[e+1]*c[e+1]}let m=ue(n,o*s);for(let t=0;t<o;++t){let n=0;for(let r=0;r<d;++r)n+=e[t*d+r]*f[r];for(let e=0;e<s;++e)m[t*s+e]=Math.trunc(n/p[e]),n%=p[e]}return[m,[o,s],c]}J();function jk(e,t,n,r,i,a=!1,o=0){let s=r.length,c=[t[0],e.length/t[0]],l=c[1],u=s>0?i[s-1]+1:0;if(u<0)throw Error(oD());let d=t.slice();d[0]=u;let f=ue(n,d.reduce((e,t)=>e*t,1));if(s===0)return u>0&&f.fill(o),[f,d];if(u<=0)throw Error(oD());let p=0,m=1,h=0,g=i[p];for(;;){let t=0;if(m<s){if(t=i[m],g===t){++m;continue}if(g>=t)throw Error(sD())}if(g<0||g>=u)throw Error(cD(g,u));g>h&&f.fill(o,h*l,g*l);for(let t=p;t<m;++t){let n=r[t];if(n<0||n>=c[0])throw Error(lD(t,r[t],c[0]));for(let t=0;t<l;t++)f[g*l+t]+=e[n*l+t]}if(a)for(let e=0;e<l;e++)f[g*l+e]/=m-p;if(p=m,++m,h=g+1,g=t,m>s)break}return h<u&&f.fill(o,h*l,u*l),[f,d]}J();var Mk=YD(e=>Math.sqrt(e)),Nk=XD(fr,e=>Math.sqrt(e)),Pk={kernelName:fr,backendName:`cpu`,kernelFunc:Nk};J();var Fk=OD(((e,t)=>{let n=e-t;return n*n})),Ik=zD(xr,Fk),Lk={kernelName:xr,backendName:`cpu`,kernelFunc:Ik};J();var Rk=YD((e,t)=>{let{pattern:n,replaceGlobal:r,rewrite:i}=t;return e.replace(new RegExp(n,r?`g`:``),i)}),zk=ZD(Cr,Rk),Bk={kernelName:Cr,backendName:`cpu`,kernelFunc:zk};J();function Vk(e,t,n,r){let i=Xs(e,t.dtype);for(let e=0;e<i.size;e++){let a=i.indexToLoc(e),o=Array(a.length);for(let e=0;e<o.length;e++)o[e]=a[e]*n[e]+r[e];i.set(t.get(...o),...a)}return i}J();var Hk=class{constructor(e,t,n,r,i,a){this.separator=Ni(e),this.nGramWidths=t,this.leftPad=Ni(n),this.rightPad=Ni(r),this.padWidth=i,this.preserveShort=a}getPadWidth(e){return Math.min(this.padWidth<0?e-1:this.padWidth,e-1)}getNumNGrams(e,t){let n=this.getPadWidth(t);return Math.max(0,e+2*n-t+1)}createNGrams(e,t,n,r,i,a){for(let o=0;o<i;++o){let s=this.getPadWidth(a),c=Math.max(0,s-o),l=Math.max(0,s-(i-(o+1))),u=a-(c+l),d=t+(c>0?0:o-s),f=0;f+=c*this.leftPad.length;for(let t=0;t<u;++t)f+=e[d+t].length;f+=l*this.rightPad.length;let p=c+l+u-1;f+=p*this.separator.length,n[r+o]=new Uint8Array(f);let m=n[r+o],h=0,g=e=>e.forEach(e=>m[h++]=e);for(let e=0;e<c;++e)g(this.leftPad),g(this.separator);for(let t=0;t<u-1;++t)g(e[d+t]),g(this.separator);if(u>0){g(e[d+u-1]);for(let e=0;e<l;++e)g(this.separator),g(this.rightPad)}else{for(let e=0;e<l-1;++e)g(this.rightPad),g(this.separator);g(this.rightPad)}}}compute(e,t){let n=e.length,r=t.length;if(r>0){let e=t[0];if(e!==0)throw Error(`First split value must be 0, got ${e}`);for(let i=1;i<r;++i){let r=t[i]>=e;if(r&&=t[i]<=n,!r)throw Error(`Invalid split value ${t[i]}, must be in [${e}, ${n}]`);e=t[i]}if(e!==n)throw Error(`Last split value must be data size. Expected ${n}, got ${e}`)}let i=r-1,a=ue(`int32`,r);if(n===0||r===0){let e=Array(n);for(let e=0;e<=i;++e)a[e]=0;return[e,a]}a[0]=0;for(let e=1;e<=i;++e){let n=t[e]-t[e-1],r=0;this.nGramWidths.forEach(e=>{r+=this.getNumNGrams(n,e)}),this.preserveShort&&n>0&&r===0&&(r=1),a[e]=a[e-1]+r}let o=Array(a[i]);for(let n=0;n<i;++n){let r=t[n],i=a[n];if(this.nGramWidths.forEach(a=>{let s=t[n+1]-t[n],c=this.getNumNGrams(s,a);this.createNGrams(e,r,o,i,c,a),i+=c}),this.preserveShort&&i===a[n]){let a=t[n+1]-t[n];if(a===0)continue;let s=a+2*this.padWidth;this.createNGrams(e,r,o,i,1,s)}}return[o,a]}};function Uk(e,t,n,r,i,a,o,s){return new Hk(n,r,i,a,o,s).compute(e,t)}J();function Wk(e,t,n,r){if(!e.length)return;if(t.length===0){for(let t=0;t<e.length;++t)r.push(e.subarray(t,t+1));return}if(t.length===1){let i=t[0],a=e.indexOf(i);for(;a!==-1;){let t=e.subarray(0,a);(!n||t.length!==0)&&r.push(t),e=e.subarray(a+1),a=e.indexOf(i)}(!n||e.length!==0)&&r.push(e);return}let i=0;for(let a=0;a<e.length+1;a++)if(a===e.length||t.indexOf(e[a])!==-1){let t=e.subarray(i,a);(!n||t.length!==0)&&r.push(t),i=a+1}}function Gk(e,t,n){let r=e.length,i=[],a=0,o=0,s=Array(r);for(let c=0;c<r;++c){let r=i.length;Wk(e[c],t,n,i);let l=i.length-r;s[c]=l,a+=l,o=Math.max(o,l)}let c=ue(`int32`,a*2),l=Array(a),u=[r,o],d=0;for(let e=0;e<r;++e)for(let t=0;t<s[e];++t)c[d*2]=e,c[d*2+1]=t,l[d]=i[d],++d;return[c,l,u]}J();function Kk(e,t){let n=ue(`int32`,e.length);for(let r=0;r<e.length;++r)n[r]=bi(e[r]).modulo(t).getLowBitsUnsigned();return n}J();var qk=OD(((e,t)=>e-t)),Jk=zD(`Sub`,qk,BD(((e,t,n,r)=>({real:e-n,imag:t-r})))),Yk={kernelName:`Sub`,backendName:`cpu`,kernelFunc:Jk};J();function Xk(e,t){let n=Array(e.rank);for(let r=0;r<n.length;r++)n[r]=e.shape[r]*t[r];let r=Xs(n,e.dtype);for(let t=0;t<r.values.length;++t){let n=r.indexToLoc(t),i=Array(e.rank);for(let t=0;t<i.length;t++)i[t]=n[t]%e.shape[t];let a=e.locToIndex(i);r.values[t]=e.values[a]}return r}J();var Zk=(e,t)=>{let n=t.value-e.value;return n===0?e.index-t.index:n};function Qk(e,t,n=0,r=e.length-1){for(;r>n;){if(r-n>600){let i=r-n+1,a=t-n+1,o=Math.log(i),s=.5*Math.exp(2*o/3),c=.5*Math.sqrt(o*s*(i-s)/i)*Math.sign(a-i/2);Qk(e,t,Math.max(n,Math.floor(t-a*s/i+c)),Math.min(r,Math.floor(t+(i-a)*s/i+c)))}let i=e[t],a=n,o=r;for(S(e,n,t),Zk(e[r],i)>0&&S(e,n,r);a<o;){for(S(e,a,o),a++,o--;Zk(e[a],i)<0;)a+=1;for(;Zk(e[o],i)>0;)--o}Zk(e[n],i)===0?S(e,n,o):(o+=1,S(e,o,r)),o<=t&&(n=o+1),t<=o&&(r=o-1)}}function $k(e,t,n,r,i){let a=t[t.length-1],[o,s]=[e.length/a,a],c=M(n,o*r),l=M(`int32`,o*r);for(let t=0;t<o;t++){let n=t*s,a=e.subarray(n,n+s),o=Array(a.length);a.forEach((e,t)=>o[t]={value:e,index:t}),r<o.length&&(Qk(o,r),o=o.slice(0,r)),i&&o.sort(Zk);let u=t*r,d=c.subarray(u,u+r),f=l.subarray(u,u+r);for(let e=0;e<r;e++)d[e]=o[e].value,f[e]=o[e].index}let u=t.slice();return u[u.length-1]=r,[Xs(u,n,c),Xs(u,`int32`,l)]}J();function eA(e,t,n,r){let i=j(t,n)[0],a=[1,n[0],1];for(let e=0;e<i;e++)a[0]*=n[e];a[1]=n[i];for(let e=i+1;e<n.length;e++)a[2]*=n[e];let o=new Map,s=new Int32Array(n[i]),c=new ra(a,r,e),l=[],u=a[0]===1&&a[2]===1;for(let t=0;t<n[i];t++){let n;if(u)n=e[t].toString();else{let e=[];for(let n=0;n<a[0];n++)for(let r=0;r<a[2];r++)e.push(c.get(n,t,r));n=e.join(`,`)}let r=o.get(n);if(r!=null)s[t]=r;else{let e=o.size;o.set(n,e),s[t]=e,l.push(t)}}let d=a.slice();d[1]=o.size;let f=new ra(d,r);l.forEach((e,t)=>{for(let n=0;n<a[0];n++)for(let r=0;r<a[2];r++)f.set(c.get(n,e,r),n,t,r)});let p=n.slice();return p[i]=d[1],{outputValues:f.values,outputShape:p,indices:s}}var tA=c({addImpl:()=>VD,bincountImpl:()=>WD,bincountReduceImpl:()=>GD,bitwiseAndImpl:()=>KD,castImpl:()=>ID,ceilImpl:()=>QD,concatImpl:()=>tO,equalImpl:()=>nO,expImpl:()=>aO,expm1Impl:()=>cO,floorDivImpl:()=>mO,floorImpl:()=>dO,gatherNdImpl:()=>_O,gatherV2Impl:()=>vO,greaterEqualImpl:()=>SO,greaterImpl:()=>yO,lessEqualImpl:()=>OO,lessImpl:()=>TO,linSpaceImpl:()=>jO,logImpl:()=>MO,maxImpl:()=>PO,maximumImpl:()=>FO,minimumImpl:()=>RO,multiplyImpl:()=>VO,negImpl:()=>GO,notEqualImpl:()=>JO,prodImpl:()=>ek,raggedGatherImpl:()=>uk,raggedRangeImpl:()=>fk,raggedTensorToTensorImpl:()=>_k,rangeImpl:()=>vk,rsqrtImpl:()=>yk,scatterImpl:()=>Sk,sigmoidImpl:()=>Ck,simpleAbsImpl:()=>ED,sliceImpl:()=>Ek,sparseFillEmptyRowsImpl:()=>kk,sparseReshapeImpl:()=>Ak,sparseSegmentReductionImpl:()=>jk,sqrtImpl:()=>Mk,squaredDifferenceImpl:()=>Fk,staticRegexReplaceImpl:()=>Rk,stridedSliceImpl:()=>Vk,stringNGramsImpl:()=>Uk,stringSplitImpl:()=>Gk,stringToHashBucketFastImpl:()=>Kk,subImpl:()=>qk,tileImpl:()=>Xk,topKImpl:()=>$k,transposeImpl:()=>ZO,uniqueImpl:()=>eA});J(),To(`cpu`,()=>new TD,1),J();var nA=XD(`Elu`,e=>e>=0?e:Math.exp(e)-1),rA={kernelName:`Elu`,backendName:`cpu`,kernelFunc:nA};J();function iA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{alpha:a}=r;Y([i],`leakyRelu`);let o=k(i.shape),s=n.data.get(i.dataId).values,c=M(`float32`,o);for(let e=0;e<s.length;e++)c[e]=s[e]<0?a*s[e]:s[e];return n.makeTensorInfo(i.shape,`float32`,c)}var aA={kernelName:an,backendName:`cpu`,kernelFunc:iA};J();var oA=OD((e,t)=>e<0?t*e:e);function sA(e){let{inputs:t,backend:n}=e,{x:r,alpha:i}=t;Y([r,i],`prelu`);let a=n.data.get(r.dataId).values,o=n.data.get(i.dataId).values,[s,c]=oA(r.shape,i.shape,a,o,`float32`);return n.makeTensorInfo(c,`float32`,s)}var cA={kernelName:Rn,backendName:`cpu`,kernelFunc:sA};J();var lA=XD(Kn,e=>Math.max(0,e)),uA={kernelName:Kn,backendName:`cpu`,kernelFunc:lA};J();var dA=XD(Qn,e=>Math.min(Math.max(0,e),6)),fA={kernelName:Qn,backendName:`cpu`,kernelFunc:dA};function pA(e,t,n,r,i){if(n===`linear`)return MD({inputs:{x:t},backend:e});if(n===`relu`)return lA({inputs:{x:t},backend:e});if(n===`elu`)return nA({inputs:{x:t},backend:e});if(n===`relu6`)return dA({inputs:{x:t},backend:e});if(n===`prelu`)return sA({inputs:{x:t,alpha:r},backend:e});if(n===`leakyrelu`)return iA({inputs:{x:t},backend:e,attrs:{alpha:i}});if(n===`sigmoid`)return wk({inputs:{x:t},backend:e});throw Error(`Activation ${n} has not been implemented for the CPU backend.`)}J();function mA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{shape:a}=r,o=k(i.shape),s=ce(a,o),c=k(s);E(o===c,()=>`The new shape (${s}) has ${c} elements and the old shape (${i.shape}) has ${o} elements. The new shape and old shape must have the same number of elements.`),n.incRef(i.dataId);let l=n.data.get(i.dataId);if(l.complexTensorInfos!=null){let e=l.complexTensorInfos.real,t=l.complexTensorInfos.imag;e.shape=s,t.shape=s}return{dataId:i.dataId,shape:s,dtype:i.dtype}}var hA={kernelName:qn,backendName:`cpu`,kernelFunc:mA};J();function gA(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a}=t,{transposeA:o,transposeB:s}=r;Y([i,a],`matMul`);let c=i.shape.length,l=a.shape.length,u=o?i.shape[c-2]:i.shape[c-1],d=s?a.shape[l-1]:a.shape[l-2],f=o?i.shape[c-1]:i.shape[c-2],p=s?a.shape[l-2]:a.shape[l-1],m=i.shape.slice(0,-2),h=a.shape.slice(0,-2),g=k(m),_=k(h),v=zd(i.shape.slice(0,-2),a.shape.slice(0,-2)).concat([f,p]);E(u===d,()=>`Error in matMul: inner shapes (${u}) and (${d}) of Tensors with shapes ${i.shape} and ${a.shape} and transposeA=${o} and transposeB=${s} must match.`);let y=o?[g,u,f]:[g,f,u],b=s?[_,p,d]:[_,d,p],x=mA({inputs:{x:i},backend:n,attrs:{shape:y}}),S=mA({inputs:{x:a},backend:n,attrs:{shape:b}}),C=o?x.shape[1]:x.shape[2],w=o?x.shape[2]:x.shape[1],T=s?S.shape[1]:S.shape[2],D=Math.max(g,_),O=n.data.get(x.dataId).values,ee=n.data.get(S.dataId).values,te=N(x.shape),A=N(S.shape),[ne,re,ie]=o?[te[0],1,te[1]]:[te[0],te[1],1],[ae,oe,se]=s?[1,A[1],A[0]]:[A[1],1,A[0]],ce=w*T,j=Xs([D,w,T],x.dtype),le=j.values,M=n.blockSize;for(let e=0;e<D;e++){let t=e%g,n=e%_;for(let r=0;r<w;r+=M){let i=Math.min(r+M,w);for(let a=0;a<T;a+=M){let o=Math.min(a+M,T);for(let s=0;s<C;s+=M){let c=Math.min(s+M,C);for(let l=r;l<i;l++)for(let r=a;r<o;r++){let i=0;for(let e=s;e<c;e++){let a=O[t*ne+l*re+e*ie],o=ee[e*ae+r*oe+n*se];i+=a*o}le[e*ce+(l*T+r)]+=i}}}}}return n.disposeIntermediateTensorInfo(x),n.disposeIntermediateTensorInfo(S),n.makeTensorInfo(v,j.dtype,j.values)}var _A={kernelName:at,backendName:`cpu`,kernelFunc:gA};J();function vA(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a,bias:o,preluActivationWeights:s}=t,{transposeA:c,transposeB:l,activation:u,leakyreluAlpha:d}=r,f,p,m,h=[];f=gA({inputs:{a:i,b:a},attrs:{transposeA:c,transposeB:l},backend:n}),o&&(p=HD({inputs:{a:f,b:o},backend:n}),h.push(f),f=p),u&&(m=pA(n,f,u,s,d),h.push(f),f=m);for(let e of h)n.disposeIntermediateTensorInfo(e);return f}var yA={kernelName:Vr,backendName:`cpu`,kernelFunc:vA};J();var bA=XD(Ke,e=>Math.acos(e)),xA={kernelName:Ke,backendName:`cpu`,kernelFunc:bA};J();var SA=XD(qe,e=>Math.acosh(e)),CA={kernelName:qe,backendName:`cpu`,kernelFunc:SA};J();function wA(e){let{inputs:t,backend:n}=e,r=t;Y(t,`addN`);let i=r.map(e=>n.data.get(e.dataId).values),a=Xs(r[0].shape,r[0].dtype),o=a.values;for(let e=0;e<r.length;e++){let t=i[e];for(let e=0;e<o.length;e++)o[e]+=t[e]}return n.makeTensorInfo(a.shape,a.dtype,a.values)}var TA={kernelName:Je,backendName:`cpu`,kernelFunc:wA};J();function EA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;Y(i,`all`);let s=j(a,i.shape),c=s,l=bf(c,i.shape.length),u=i;l!=null&&(u=QO({inputs:{x:i},backend:n,attrs:{perm:l}}),c=Sf(c.length,i.shape.length)),yf(`all`,c,u.shape.length);let[d,f]=_f(u.shape,c),p=k(f),m=Ee(k(d),u.dtype),h=n.data.get(u.dataId).values;for(let e=0;e<m.length;++e){let t=e*p,n=h[t];for(let e=0;e<p;++e){let r=h[t+e];n&&=r}m[e]=n}l!=null&&n.disposeIntermediateTensorInfo(u);let g=n.makeTensorInfo(d,u.dtype,m);if(o){let e=vf(d,s),t=mA({inputs:{x:g},backend:n,attrs:{shape:e}});return n.disposeIntermediateTensorInfo(g),t}return g}var DA={kernelName:`All`,backendName:`cpu`,kernelFunc:EA};J();function OA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;Y(i,`any`);let s=j(a,i.shape),c=s,l=bf(c,i.shape.length),u=i;l!=null&&(u=QO({inputs:{x:i},backend:n,attrs:{perm:l}}),c=Sf(c.length,i.shape.length)),yf(`any`,c,u.shape.length);let[d,f]=_f(u.shape,c),p=k(f),m=Ee(k(d),u.dtype),h=n.data.get(u.dataId).values;for(let e=0;e<m.length;++e){let t=e*p,n=h[t];for(let e=0;e<p;++e){let r=h[t+e];n||=r}m[e]=n}l!=null&&n.disposeIntermediateTensorInfo(u);let g=n.makeTensorInfo(d,u.dtype,m);if(o){let e=vf(d,s),t=mA({inputs:{x:g},backend:n,attrs:{shape:e}});return n.disposeIntermediateTensorInfo(g),t}return g}var kA={kernelName:`Any`,backendName:`cpu`,kernelFunc:OA};J();function AA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a}=r;Y(i,`argMax`);let o=j(a,i.shape),s=bf(o,i.shape.length),c=i,l=[];s!=null&&(c=QO({inputs:{x:i},backend:n,attrs:{perm:s}}),l.push(c),o=Sf(o.length,c.shape.length)),o=[o[0]],yf(`argMax`,o,c.shape.length);let[u,d]=_f(c.shape,o),f=Ee(k(u),`int32`),p=k(d),m=n.data.get(c.dataId).values;for(let e=0;e<f.length;++e){let t=e*p,n=m[t],r=0;for(let e=0;e<p;++e){let i=m[t+e];i>n&&(n=i,r=e)}f[e]=r}return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(u,`int32`,f)}var jA={kernelName:Ye,backendName:`cpu`,kernelFunc:AA};J();function MA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a}=r;Y(i,`argMin`);let o=j(a,i.shape),s=bf(o,i.shape.length),c=i,l=[];s!=null&&(c=QO({inputs:{x:i},backend:n,attrs:{perm:s}}),l.push(c),o=Sf(o.length,c.shape.length)),o=[o[0]],yf(`argMin`,o,c.shape.length);let[u,d]=_f(c.shape,o),f=Ee(k(u),`int32`),p=k(d),m=n.data.get(c.dataId).values;for(let e=0;e<f.length;++e){let t=e*p,n=m[t],r=0;for(let e=0;e<p;++e){let i=m[t+e];i<n&&(n=i,r=e)}f[e]=r}return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(u,`int32`,f)}var NA={kernelName:F,backendName:`cpu`,kernelFunc:MA};J();var PA=XD(Xe,e=>Math.asin(e)),FA={kernelName:Xe,backendName:`cpu`,kernelFunc:PA};J();var IA=XD(Ze,e=>Math.asinh(e)),LA={kernelName:Ze,backendName:`cpu`,kernelFunc:IA};J();var RA=XD(Qe,e=>Math.atan(e)),zA={kernelName:Qe,backendName:`cpu`,kernelFunc:RA};J();var BA=OD((e,t)=>Math.atan2(e,t)),VA=zD(et,BA),HA={kernelName:et,backendName:`cpu`,kernelFunc:VA};J();var UA=XD($e,e=>Math.atanh(e)),WA={kernelName:$e,backendName:`cpu`,kernelFunc:UA};J();function GA(e,t,n,r,i,a){let o=i.strideHeight,s=i.strideWidth,c=i.dilationHeight,l=i.dilationWidth,u=i.effectiveFilterHeight,d=i.effectiveFilterWidth,f=i.padInfo.top,p=i.padInfo.left,m=a===`max`?-1/0:1/0,h=Xs(i.outShape,n),g=h.values,_=i.outShape[1]*i.outShape[2]*i.outShape[3],v=i.outShape[2]*i.outShape[3],y=i.outShape[3];for(let t=0;t<i.batchSize;++t){let n=t*_,h=t*r[0];for(let t=0;t<i.inChannels;++t)for(let _=0;_<i.outHeight;++_){let b=_*o-f,x=Math.max(0,b),S=Math.min(i.inHeight,u+b),C=n+_*v;for(let n=0;n<i.outWidth;++n){let o=n*s-p,u=Math.max(0,o),f=Math.min(i.inWidth,d+o),_=m,v=0,b=0;for(let n=x;n<S;n+=c){let i=h+n*r[1];for(let n=u;n<f;n+=l){let o=e[i+n*r[2]+t];a===`max`&&o>_?_=o:a===`avg`&&(v+=o,b++)}if(isNaN(_))break}let w=C+n*y+t;g[w]=a===`avg`?v/b:_}}}return h}function KA(e,t,n,r,i=!1,a=!1){let o=Xs(r.outShape,`int32`),s=r.strideHeight,c=r.strideWidth,l=r.dilationHeight,u=r.dilationWidth,d=r.effectiveFilterHeight,f=r.effectiveFilterWidth,p=r.padInfo.top,m=r.padInfo.left,h=Xs(t,n,e);for(let e=0;e<r.batchSize;++e)for(let t=0;t<r.inChannels;++t)for(let n=0;n<r.outHeight;++n){let g=n*s-p,_=g;for(;_<0;)_+=l;let v=Math.min(r.inHeight,d+g);for(let s=0;s<r.outWidth;++s){let d=s*c-m,p=d;for(;p<0;)p+=u;let y=Math.min(r.inWidth,f+d),b=-1/0,x=-1;for(let n=_;n<v;n+=l){let o=n-g;for(let s=p;s<y;s+=u){let c=s-d,l=h.get(e,n,s,t);l>b&&(b=l,x=i?a?((e*r.inHeight+n)*r.inWidth+s)*r.inChannels+t:(n*r.inWidth+s)*r.inChannels+t:o*f+c)}}o.set(x,e,n,s,t)}}return o}function qA(e,t,n,r,i,a){let o=i.strideDepth,s=i.strideHeight,c=i.strideWidth,l=i.dilationDepth,u=i.dilationHeight,d=i.dilationWidth,f=i.effectiveFilterDepth,p=i.effectiveFilterHeight,m=i.effectiveFilterWidth,h=i.padInfo.front,g=i.padInfo.top,_=i.padInfo.left,v=a===`max`?-1/0:1/0,y=Xs(i.outShape,n),b=y.values,x=i.outShape[1]*i.outShape[2]*i.outShape[3]*i.outShape[4],S=i.outShape[2]*i.outShape[3]*i.outShape[4],C=i.outShape[3]*i.outShape[4],w=i.outShape[4];for(let t=0;t<i.batchSize;++t){let n=t*x,y=t*r[0];for(let t=0;t<i.inChannels;++t)for(let x=0;x<i.outDepth;++x){let T=x*o-h,E=T;for(;E<0;)E+=l;let D=Math.min(i.inDepth,f+T),O=n+x*S;for(let n=0;n<i.outHeight;++n){let o=n*s-g,f=o;for(;f<0;)f+=u;let h=Math.min(i.inHeight,p+o),x=O+n*C;for(let n=0;n<i.outWidth;++n){let o=n*c-_,s=o;for(;s<0;)s+=d;let p=Math.min(i.inWidth,m+o),g=x+n*w,S=v,C=0,T=0;for(let n=E;n<D;n+=l){let i=y+n*r[1];for(let n=f;n<h;n+=u){let o=i+n*r[2];for(let n=s;n<p;n+=d){let i=e[o+n*r[3]+t];if(a===`max`&&i>S?S=i:a===`avg`&&(C+=i,T++),isNaN(S))break}if(isNaN(S))break}if(isNaN(S))break}let O=g+t;b[O]=a===`avg`?C/Math.max(T,1):S}}}}return y}function JA(e,t){let n=Xs(t.outShape,`int32`),r=t.strideDepth,i=t.strideHeight,a=t.strideWidth,o=t.dilationDepth,s=t.dilationHeight,c=t.dilationWidth,l=t.effectiveFilterDepth,u=t.effectiveFilterHeight,d=t.effectiveFilterWidth,f=t.padInfo.front,p=t.padInfo.top,m=t.padInfo.left;for(let h=0;h<t.batchSize;++h)for(let g=0;g<t.inChannels;++g)for(let _=0;_<t.outDepth;++_){let v=_*r-f,y=v;for(;y<0;)y+=o;let b=Math.min(t.inDepth,l+v);for(let r=0;r<t.outHeight;++r){let l=r*i-p,f=l;for(;f<0;)f+=s;let x=Math.min(t.inHeight,u+l);for(let i=0;i<t.outWidth;++i){let p=i*a-m,S=p;for(;S<0;)S+=c;let C=Math.min(t.inWidth,d+p),w=-1/0,T=-1;for(let t=y;t<b;t+=o){let n=t-v;for(let r=f;r<x;r+=s){let i=r-l;for(let a=S;a<C;a+=c){let o=a-p,s=e.get(h,t,r,a,g);s>=w&&(w=s,T=n*u*d+i*u+o)}}}n.set(T,h,_,r,i,g)}}}return n}J();function YA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;Y(i,`avgPool`);let{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=r;E(_l(o,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let l=rl(i.shape,a,o,1,s,c),u;if(l.filterWidth===1&&l.filterHeight===1&&A(l.inShape,l.outShape))u=MD({inputs:{x:i},backend:n});else{let e=n.data.get(i.dataId).values,t=N(i.shape),r=GA(e,i.shape,i.dtype,t,l,`avg`);u=n.makeTensorInfo(l.outShape,i.dtype,r.values)}return u}var XA={kernelName:tt,backendName:`cpu`,kernelFunc:YA};J();function ZA(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c,dataFormat:l}=r;Y(i,`avgPool3d`);let u=il(i.shape,a,o,1,s,c,l),d=n.data.get(i.dataId).values,f=qA(d,i.shape,i.dtype,N(i.shape),u,`avg`);return n.makeTensorInfo(f.shape,`float32`,f.values)}var QA={kernelName:rt,backendName:`cpu`,kernelFunc:ZA};J();function $A(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=r;Y([i,a],`avgPool3DGrad`);let u=il(a.shape,o,s,1,c,l),d=u.strideDepth,f=u.strideHeight,p=u.strideWidth,m=u.filterDepth,h=u.filterHeight,g=u.filterWidth,_=u.dilationDepth,v=u.dilationHeight,y=u.dilationWidth,b=u.effectiveFilterDepth,x=u.effectiveFilterHeight,S=u.effectiveFilterWidth,C=b-1-u.padInfo.front,w=S-1-u.padInfo.left,T=x-1-u.padInfo.top,E=Xs(a.shape,`float32`),D=1/(m*h*g),O=n.bufferSync(i);for(let e=0;e<u.batchSize;++e)for(let t=0;t<u.inChannels;++t)for(let n=0;n<u.inDepth;++n)for(let r=0;r<u.inHeight;++r)for(let i=0;i<u.inWidth;++i){let a=n-C,o=r-T,s=i-w,c=0;for(let n=0;n<b;n+=_){let r=(a+n)/d;if(!(r<0||r>=u.outDepth||Math.floor(r)!==r))for(let n=0;n<x;n+=v){let i=(o+n)/f;if(!(i<0||i>=u.outHeight||Math.floor(i)!==i))for(let n=0;n<S;n+=y){let a=(s+n)/p;if(a<0||a>=u.outWidth||Math.floor(a)!==a)continue;let o=O.get(e,r,i,a,t);c+=o}}}E.set(c*D,e,n,r,i,t)}return n.makeTensorInfo(E.shape,E.dtype,E.values)}var ej={kernelName:it,backendName:`cpu`,kernelFunc:$A};J();function tj(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,o=a;Y([i,a],`avgPoolGrad`);let{filterSize:s,strides:c,pad:l}=r,u=rl(o.shape,s,c,1,l),d=u.strideHeight,f=u.strideWidth,p=u.filterHeight,m=u.filterWidth,h=u.dilationHeight,g=u.dilationWidth,_=u.effectiveFilterHeight,v=u.effectiveFilterWidth,y=v-1-u.padInfo.left,b=_-1-u.padInfo.top,x=Xs(o.shape,`float32`),S=1/(p*m),C=n.data.get(i.dataId).values,w=Xs(i.shape,`float32`,C);for(let e=0;e<u.batchSize;++e)for(let t=0;t<u.inChannels;++t)for(let n=0;n<u.inHeight;++n)for(let r=0;r<u.inWidth;++r){let i=n-b,a=r-y,o=0;for(let n=0;n<_;n+=h){let r=(i+n)/d;if(!(r<0||r>=u.outHeight||Math.floor(r)!==r))for(let n=0;n<v;n+=g){let i=(a+n)/f;if(i<0||i>=u.outWidth||Math.floor(i)!==i)continue;let s=w.get(e,r,i,t);o+=s}}x.set(o*S,e,n,r,t)}return n.makeTensorInfo(x.shape,x.dtype,x.values)}var nj={kernelName:nt,backendName:`cpu`,kernelFunc:tj};J();function rj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,scale:a,offset:o,mean:s,variance:c}=t;E(s.shape.length===c.shape.length,()=>`Batch normalization gradient requires mean and variance to have equal ranks.`),E(o==null||s.shape.length===o.shape.length,()=>`Batch normalization gradient requires mean and offset to have equal ranks.`),E(a==null||s.shape.length===a.shape.length,()=>`Batch normalization gradient requires mean and scale to have equal ranks.`),Y([i,s,c,a,o],`batchNorm`);let{varianceEpsilon:l}=r;l??=.001;let u=n.data.get(i.dataId).values,d=n.data.get(s.dataId).values,f=n.data.get(c.dataId).values,p=a?n.data.get(a.dataId).values:new Float32Array([1]),m=o?n.data.get(o.dataId).values:new Float32Array([0]),h=new Float32Array(u.length),g=m.length,_=p.length,v=f.length,y=d.length,b=0,x=0,S=0,C=0;for(let e=0;e<u.length;++e)h[e]=m[b++]+(u[e]-d[x++])*p[S++]/Math.sqrt(f[C++]+l),b>=g&&(b=0),x>=y&&(x=0),S>=_&&(S=0),C>=v&&(C=0);return n.makeTensorInfo(i.shape,i.dtype,h)}var ij={kernelName:qt,backendName:`cpu`,kernelFunc:rj};J();function aj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,crops:o}=r;Y([i],`batchToSpaceND`);let s=a.reduce((e,t)=>e*t),c=fE(i.shape,a,s),l=pE(c.length,a.length),u=mE(i.shape,a,s),d=hE(o,a.length),f=gE(u,o,a.length),p=mA({inputs:{x:i},backend:n,attrs:{shape:c}}),m=QO({inputs:{x:p},backend:n,attrs:{perm:l}}),h=mA({inputs:{x:m},backend:n,attrs:{shape:u}}),g=Dk({inputs:{x:h},backend:n,attrs:{begin:d,size:f}});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(h),g}var oj={kernelName:ot,backendName:`cpu`,kernelFunc:aj};J();function sj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,weights:a}=t,{size:o}=r,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,l=WD(s,c,a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,l)}var cj={kernelName:st,backendName:`cpu`,kernelFunc:sj};J();function lj(e){let{inputs:t,backend:n}=e,{s0:r,s1:i}=t,a=n.data.get(r.dataId).values,o=n.data.get(i.dataId).values,s=zd(Array.from(a),Array.from(o));return n.makeTensorInfo([s.length],`int32`,Int32Array.from(s))}var uj={kernelName:ut,backendName:`cpu`,kernelFunc:lj};J();var dj=XD(pt,(e,t)=>{let n=t;return e>n.clipValueMax?n.clipValueMax:e<n.clipValueMin?n.clipValueMin:e}),fj={kernelName:pt,backendName:`cpu`,kernelFunc:dj};J();var pj={kernelName:ht,backendName:`cpu`,kernelFunc:e=>{let{x:t}=e.inputs,n=e.backend,r=new Float32Array(k(t.shape)),i=n.data.get(t.dataId),a=i.complexTensorInfos.real,o=i.complexTensorInfos.imag,s=n.data.get(a.dataId).values,c=n.data.get(o.dataId).values;for(let e=0;e<s.length;e++){let t=s[e],n=c[e];r[e]=Math.hypot(t,n)}return n.makeOutput(r,t.shape,`float32`)}};J();function mj(e){let{inputs:t,backend:n}=e,{input:r}=t,i=n.data.get(r.dataId).complexTensorInfos.imag,a=n.data.get(i.dataId).values;return n.makeTensorInfo(i.shape,i.dtype,a)}var hj={kernelName:en,backendName:`cpu`,kernelFunc:mj};J();function gj(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r,a=j(i,t[0].shape)[0];QT(t.map(e=>e.shape),a);let o=$T(t.map(e=>e.shape),a);if(k(o)===0)return n.makeTensorInfo(o,t[0].dtype,[]);let s=t.filter(e=>k(e.shape)>0);if(s.length===1)return MD({inputs:{x:s[0]},backend:n});if(s[0].dtype===`complex64`){let e=s.map(e=>PD({inputs:{input:e},backend:n})),t=s.map(e=>mj({inputs:{input:e},backend:n})),r=gj({inputs:e,backend:n,attrs:{axis:a}}),i=gj({inputs:t,backend:n,attrs:{axis:a}}),o=kD({inputs:{real:r,imag:i},backend:n});return e.forEach(e=>n.disposeIntermediateTensorInfo(e)),t.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(i),o}let c=s.map(e=>{let t=[-1,k(e.shape.slice(a))];return mA({inputs:{x:e},backend:n,attrs:{shape:t}})}),l=c.map(e=>({vals:n.data.get(e.dataId).values,shape:e.shape}));o=$T(c.map(e=>e.shape),1);let u=c[0].shape[0]===1,d=tO(l,o,t[0].dtype,u),f=$T(s.map(e=>e.shape),a),p=n.makeTensorInfo(f,t[0].dtype,d);return c.forEach(e=>n.disposeIntermediateTensorInfo(e)),p}var _j={kernelName:gt,backendName:`cpu`,kernelFunc:gj};J();function vj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dataFormat:c,dilations:l,dimRoundingMode:u}=r;Y([i,a],`conv2d`);let d=yl(c),f=al(i.shape,a.shape,o,l,s,u,!1,d),p=f.filterHeight,m=f.filterWidth,h=f.dilationHeight,g=f.dilationWidth,_=f.padInfo.left,v=f.padInfo.top,y=f.dataFormat===`channelsLast`,b=new ra(f.outShape,i.dtype),x=N(i.shape),S=N(a.shape),C=x[0],w=y?x[1]:x[2],T=y?x[2]:1,E=y?1:x[1],D=b.strides[0],O=y?b.strides[1]:b.strides[2],k=y?b.strides[2]:1,ee=y?1:b.strides[1],te=n.data.get(i.dataId).values,A=n.data.get(a.dataId).values,ne=b.values;for(let e=0;e<f.batchSize;++e){let t=e*C,n=e*D;for(let e=0;e<f.outHeight;++e){let r=n+e*O,i=e*f.strideHeight-v;for(let e=0;e<p;++e){let n=i+e*h;if(n<0||n>=f.inHeight)continue;let a=e*S[0],o=t+n*w;for(let e=0;e<f.outWidth;++e){let t=r+e*k,n=e*f.strideWidth-_;for(let e=0;e<m;++e){let r=n+e*g;if(r<0||r>=f.inWidth)continue;let i=a+e*S[1],s=o+r*T,c=i;for(let e=0;e<f.inChannels;++e){let n=te[s+e*E];for(let e=0;e<f.outChannels;++e)ne[t+e*ee]+=n*A[c+e];c+=f.outChannels}}}}}}return n.makeTensorInfo(b.shape,b.dtype,ne)}var yj={kernelName:_t,backendName:`cpu`,kernelFunc:vj};J();function bj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,dataFormat:c,dimRoundingMode:l,filterShape:u}=r;Y([i,a],`conv2dBackpropFilter`);let d=yl(c),f=al(i.shape,u,o,1,s,l,!1,d),{strideHeight:p,strideWidth:m,filterHeight:h,filterWidth:g}=f,_=f.dataFormat===`channelsLast`,v=new ra(f.filterShape,`float32`),y=f.padInfo.left,b=f.padInfo.top,x=n.data.get(i.dataId).values,S=n.data.get(a.dataId).values,C=new ra(i.shape,i.dtype,x),w=new ra(a.shape,a.dtype,S);for(let e=0;e<h;++e){let t=Math.max(0,Math.ceil((b-e)/p)),n=Math.min(f.outHeight,(f.inHeight+b-e)/p);for(let r=0;r<g;++r){let i=Math.max(0,Math.ceil((y-r)/m)),a=Math.min(f.outWidth,(f.inWidth+y-r)/m);for(let o=0;o<f.inChannels;++o)for(let s=0;s<f.outChannels;++s){let c=0;for(let l=0;l<f.batchSize;++l)for(let u=t;u<n;++u){let t=e+u*p-b;for(let e=i;e<a;++e){let n=r+e*m-y;c+=_?C.get(l,t,n,o)*w.get(l,u,e,s):C.get(l,o,t,n)*w.get(l,s,u,e)}}v.set(c,e,r,o,s)}}}return n.makeTensorInfo(v.shape,v.dtype,v.values)}var xj={kernelName:vt,backendName:`cpu`,kernelFunc:bj};J();function Sj(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{inputShape:o,strides:s,pad:c,dataFormat:l,dimRoundingMode:u}=r;Y([i,a],`conv2dBackpropInput`);let d=N(a.shape),f=N(i.shape),p=yl(l),m=al(o,a.shape,s,1,c,u,!1,p),h=new ra(m.inShape,`float32`),g=h.values,_=n.data.get(i.dataId).values,v=n.data.get(a.dataId).values,[y,b,x]=d,{batchSize:S,filterHeight:C,filterWidth:w,inChannels:T,inHeight:E,inWidth:D,outChannels:O,outHeight:k,outWidth:ee,strideHeight:te,strideWidth:A}=m;p=m.dataFormat;let ne=C-1-m.padInfo.top,re=w-1-m.padInfo.left,ie=p===`channelsLast`,ae=h.strides[0],oe=ie?h.strides[1]:h.strides[2],se=ie?h.strides[2]:1,ce=ie?1:h.strides[1],j=f[0],le=ie?f[1]:f[2],M=ie?f[2]:1,ue=ie?1:f[1];for(let e=0;e<S;++e)for(let t=0;t<T;++t)for(let n=0;n<E;++n){let r=n-ne,i=Math.max(0,Math.ceil(r/te)),a=Math.min(k,(C+r)/te);for(let o=0;o<D;++o){let s=o-re,c=Math.max(0,Math.ceil(s/A)),l=Math.min(ee,(w+s)/A),u=0;for(let n=i;n<a;++n){let i=n*te-r;for(let r=c;r<l;++r){let a=r*A-s,o=j*e+le*n+M*r,c=y*(C-1-i)+b*(w-1-a)+x*t;for(let e=0;e<O;++e){let t=_[o+ue*e],n=v[c+e];u+=t*n}}}let d=ae*e+oe*n+se*o+ce*t;g[d]=u}}return n.makeTensorInfo(h.shape,h.dtype,h.values)}var Cj={kernelName:yt,backendName:`cpu`,kernelFunc:Sj};J();function wj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c}=r;Y([i,a],`conv3d`);let l=ol(i.shape,a.shape,o,c,s),{filterDepth:u,filterHeight:d,filterWidth:f,dilationDepth:p,dilationHeight:m,dilationWidth:h,padInfo:g}=l,_=g.front,v=g.left,y=g.top,b=new ra(l.outShape,i.dtype),x=n.data.get(i.dataId).values,S=n.data.get(a.dataId).values,C=b.values,w=N(i.shape),T=N(a.shape);for(let e=0;e<l.batchSize;++e){let t=e*w[0],n=e*b.strides[0];for(let e=0;e<l.outDepth;++e){let r=n+e*b.strides[1],i=e*l.strideDepth-_;for(let e=0;e<u;++e){let n=i+e*p;if(n<0||n>=l.inDepth)continue;let a=e*T[0],o=t+n*w[1];for(let e=0;e<l.outHeight;++e){let t=r+e*b.strides[2],n=e*l.strideHeight-y;for(let e=0;e<d;++e){let r=n+e*m;if(r<0||r>=l.inHeight)continue;let i=a+e*T[1],s=o+r*w[2];for(let e=0;e<l.outWidth;++e){let n=t+e*l.outChannels,r=e*l.strideWidth-v;for(let e=0;e<f;++e){let t=r+e*h;if(t<0||t>=l.inWidth)continue;let a=i+e*T[2],o=s+t*l.inChannels,c=a;for(let e=0;e<l.inChannels;++e){let t=x[o+e];for(let e=0;e<l.outChannels;++e)C[n+e]+=t*S[c+e];c+=l.outChannels}}}}}}}}return n.makeTensorInfo(b.shape,b.dtype,b.values)}var Tj={kernelName:bt,backendName:`cpu`,kernelFunc:wj};J();function Ej(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,filterShape:c}=r;Y([i,a],`conv3dBackpropFilterV2`);let l=N(i.shape),u=N(a.shape),d=ol(i.shape,c,o,1,s),f=d.strideDepth,p=d.strideHeight,m=d.strideWidth,h=d.filterDepth,g=d.filterHeight,_=d.filterWidth,v=new ra(d.filterShape,`float32`),y=v.values,[b,x,S,C]=v.strides,w=n.data.get(a.dataId).values,[T,E,D,O]=u,k=n.data.get(i.dataId).values,[ee,te,A,ne]=l,re=d.padInfo.front,ie=d.padInfo.left,ae=d.padInfo.top;for(let e=0;e<h;++e){let t=Math.max(0,Math.ceil((re-e)/f)),n=Math.min(d.outDepth,(d.inDepth+re-e)/f),r=e*b;for(let i=0;i<g;++i){let a=Math.max(0,Math.ceil((ae-i)/p)),o=Math.min(d.outHeight,(d.inHeight+ae-i)/p),s=i*x+r;for(let r=0;r<_;++r){let c=Math.max(0,Math.ceil((ie-r)/m)),l=Math.min(d.outWidth,(d.inWidth+ie-r)/m),u=r*S+s;for(let s=0;s<d.inChannels;++s){let h=s*C+u;for(let u=0;u<d.outChannels;++u){let g=0;for(let h=0;h<d.batchSize;++h){let d=h*ee,_=h*T;for(let h=t;h<n;++h){let t=(e+h*f-re)*te+d,n=h*E+_;for(let e=a;e<o;++e){let a=(i+e*p-ae)*A+t,o=e*D+n;for(let e=c;e<l;++e){let t=(r+e*m-ie)*ne+a,n=e*O+o;g+=k[t+s]*w[n+u]}}}}y[h+u]=g}}}}}return n.makeTensorInfo(v.shape,v.dtype,v.values)}var Dj={kernelName:xt,backendName:`cpu`,kernelFunc:Ej};J();function Oj(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{pad:o,strides:s,inputShape:c}=r;Y([i],`conv3dBackpropInputV2`);let l=N(i.shape),u=N(a.shape),d=ol(c,a.shape,s,1,o),f=new ra(d.inShape,`float32`),p=f.values,[m,h,g,_]=f.strides,v=n.data.get(i.dataId).values,[y,b,x,S]=l,C=n.data.get(a.dataId).values,[w,T,E,D]=u,{batchSize:O,filterDepth:k,filterHeight:ee,filterWidth:te,inChannels:A,inDepth:ne,inHeight:re,inWidth:ie,outChannels:ae,outDepth:oe,outHeight:se,outWidth:ce,strideDepth:j,strideHeight:le,strideWidth:M}=d,ue=k-1-d.padInfo.front,de=ee-1-d.padInfo.top,fe=te-1-d.padInfo.left;for(let e=0;e<O;++e)for(let t=0;t<A;++t)for(let n=0;n<ne;++n){let r=n-ue,i=Math.max(0,Math.ceil(r/j)),a=Math.min(oe,(k+r)/j);for(let o=0;o<re;++o){let s=o-de,c=Math.max(0,Math.ceil(s/le)),l=Math.min(se,(ee+s)/le);for(let u=0;u<ie;++u){let d=u-fe,f=Math.max(0,Math.ceil(d/M)),O=Math.min(ce,(te+d)/M),A=0;for(let n=i;n<a;++n){let i=n*j-r;for(let r=c;r<l;++r){let a=r*le-s;for(let o=f;o<O;++o){let s=o*M-d,c=y*e+b*n+x*r+S*o,l=w*(k-1-i)+T*(ee-1-a)+E*(te-1-s)+D*t;for(let e=0;e<ae;++e){let t=v[c+e],n=C[l+e];A+=t*n}}}}p[m*e+h*n+g*o+_*u+t]=A}}}return n.makeTensorInfo(f.shape,f.dtype,f.values)}var kj={kernelName:St,backendName:`cpu`,kernelFunc:Oj};J();var Aj={kernelName:`Cos`,backendName:`cpu`,kernelFunc:XD(`Cos`,e=>Math.cos(e))};J();var jj=XD(Ct,e=>Math.cosh(e)),Mj={kernelName:Ct,backendName:`cpu`,kernelFunc:jj};J();function Nj(e){let{inputs:t,backend:n,attrs:r}=e,{image:i,boxes:a,boxInd:o}=t,{cropSize:s,method:c,extrapolationValue:l}=r,[u,d,f,p]=i.shape,m=a.shape[0],[h,g]=s,_=Xs([m,h,g,p],`float32`),v=n.data.get(a.dataId).values,y=n.data.get(o.dataId).values,b=n.data.get(i.dataId).values,x=N(i.shape),S=N(_.shape);for(let e=0;e<m;e++){let t=e*4,n=v[t],r=v[t+1],i=v[t+2],a=v[t+3],o=y[e];if(o>=u)continue;let s=h>1?(i-n)*(d-1)/(h-1):0,m=g>1?(a-r)*(f-1)/(g-1):0;for(let t=0;t<h;t++){let u=h>1?n*(d-1)+t*s:.5*(n+i)*(d-1);if(u<0||u>d-1){for(let n=0;n<g;n++)for(let r=0;r<p;r++){let i=r+n*S[2]+t*S[1]+e*S[0];_.values[i]=l}continue}if(c===`bilinear`){let n=Math.floor(u),i=Math.ceil(u),s=u-n;for(let c=0;c<g;c++){let u=g>1?r*(f-1)+c*m:.5*(r+a)*(f-1);if(u<0||u>f-1){for(let n=0;n<p;n++){let r=n+c*S[2]+t*S[1]+e*S[0];_.values[r]=l}continue}let d=Math.floor(u),h=Math.ceil(u),v=u-d;for(let r=0;r<p;r++){let a=r+d*x[2]+n*x[1]+o*x[0],l=b[a];a=r+h*x[2]+n*x[1]+o*x[0];let u=b[a];a=r+d*x[2]+i*x[1]+o*x[0];let f=b[a];a=r+h*x[2]+i*x[1]+o*x[0];let p=b[a],m=l+(u-l)*v,g=f+(p-f)*v;a=r+c*S[2]+t*S[1]+e*S[0],_.values[a]=m+(g-m)*s}}}else for(let n=0;n<g;++n){let i=g>1?r*(f-1)+n*m:.5*(r+a)*(f-1);if(i<0||i>f-1){for(let r=0;r<p;r++){let i=r+n*S[2]+t*S[1]+e*S[0];_.values[i]=l}continue}let s=Math.round(i),c=Math.round(u);for(let r=0;r<p;r++){let i=r+s*x[2]+c*x[1]+o*x[0],a=r+n*S[2]+t*S[1]+e*S[0];_.values[a]=b[i]}}}}return n.makeTensorInfo(_.shape,_.dtype,_.values)}var Pj={kernelName:Et,backendName:`cpu`,kernelFunc:Nj};J();function Fj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r;Y(i,`cumprod`);let c=bf([a],i.shape.length),l=i;c!=null&&(l=QO({inputs:{x:i},backend:n,attrs:{perm:c}}));let u=Sf(1,i.shape.length)[0];if(u!==l.shape.length-1)throw Error(`backend.cumprod in CPU expects an inner-most axis=${l.shape.length-1} but got axis=${u}`);let d=la(l.dtype,`int32`),f=Te(k(l.shape),d),p=n.data.get(l.dataId).values,m=l.shape[l.shape.length-1],h=s?(e,t)=>e+m-t-1:(e,t)=>e+t;for(let e=0;e<p.length;e+=m)for(let t=0;t<m;t++){let n=h(e,t);if(t===0)f[n]=o?1:p[n];else{let r=h(e,t-1);f[n]=o?p[r]*f[r]:p[n]*f[r]}}let g=n.makeTensorInfo(l.shape,d,f);if(c!=null){let e=xf(c),t=QO({inputs:{x:g},backend:n,attrs:{perm:e}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(l),t}return g}var Ij={kernelName:wt,backendName:`cpu`,kernelFunc:Fj};J();function Lj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r;Y(i,`cumsum`);let c=bf([a],i.shape.length),l=i;c!=null&&(l=QO({inputs:{x:i},backend:n,attrs:{perm:c}}));let u=Sf(1,i.shape.length)[0];if(u!==l.shape.length-1)throw Error(`backend.cumsum in CPU expects an inner-most axis=${l.shape.length-1} but got axis=${u}`);let d=la(l.dtype,`int32`),f=Ee(k(l.shape),d),p=n.data.get(l.dataId).values,m=l.shape[l.shape.length-1],h=s?(e,t)=>e+m-t-1:(e,t)=>e+t;for(let e=0;e<p.length;e+=m)for(let t=0;t<m;t++){let n=h(e,t);if(t===0)f[n]=o?0:p[n];else{let r=h(e,t-1);f[n]=o?p[r]+f[r]:p[n]+f[r]}}let g=n.makeTensorInfo(l.shape,d,f);if(c!=null){let e=xf(c),t=QO({inputs:{x:g},backend:n,attrs:{perm:e}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(l),t}return g}var Rj={kernelName:Tt,backendName:`cpu`,kernelFunc:Lj};J();function zj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,weights:a}=t,{size:o,binaryOutput:s}=r;if(i.shape.length===1){let e=n.data.get(i.dataId).values,t=n.data.get(a.dataId).values,r=WD(e,t,a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,r)}if(i.shape.length===2){let e=GD(n.bufferSync(i),n.bufferSync(a),o,s);return n.makeTensorInfo(e.shape,a.dtype,e.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${i.shape.length}.`)}var Bj={kernelName:Dt,backendName:`cpu`,kernelFunc:zj};J();function Vj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockSize:a,dataFormat:o}=r;E(o===`NHWC`,()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${o}`);let s=i.shape[0],c=i.shape[1],l=i.shape[2],u=i.shape[3],d=c*a,f=l*a,p=u/(a*a),m=n.data.get(i.dataId).values,h=new Float32Array(s*d*f*p),g=0;for(let e=0;e<s;++e)for(let t=0;t<d;++t){let n=Math.floor(t/a),r=t%a;for(let t=0;t<f;++t){let i=Math.floor(t/a),o=t%a,s=(r*a+o)*p;for(let t=0;t<p;++t){let r=t+s+u*(i+l*(n+c*e));h[g++]=m[r]}}}return n.makeTensorInfo([s,d,f,p],i.dtype,h)}var Hj={kernelName:Ot,backendName:`cpu`,kernelFunc:Vj};J();function Uj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c,dimRoundingMode:l}=r;Y([i,a],`depthwiseConv2DNative`);let u=N(i.shape),d=N(a.shape),f=c;f??=[1,1],E(_l(o,f),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${o} and dilations '${f}'`);let p=al(i.shape,a.shape,o,f,s,l,!0),{filterHeight:m,filterWidth:h,dilationHeight:g,dilationWidth:_,padInfo:v}=p,y=v.left,b=v.top,x=p.outChannels/p.inChannels,S=new ra(p.outShape,i.dtype),C=n.data.get(i.dataId).values,w=n.data.get(a.dataId).values,T=S.values;for(let e=0;e<p.batchSize;++e){let t=e*u[0],n=e*S.strides[0];for(let e=0;e<p.outHeight;++e){let r=n+e*S.strides[1],i=e*p.strideHeight-b;for(let e=0;e<m;++e){let n=i+e*g;if(n<0||n>=p.inHeight)continue;let a=e*d[0],o=t+n*u[1];for(let e=0;e<p.outWidth;++e){let t=r+e*S.strides[2],n=e*p.strideWidth-y;for(let e=0;e<h;++e){let r=n+e*_;if(r<0||r>=p.inWidth)continue;let i=a+e*d[1],s=o+r*p.inChannels,c=t,l=i;for(let e=0;e<p.inChannels;++e){let t=C[s+e];for(let e=0;e<x;++e)T[c+e]+=t*w[l+e];c+=x,l+=x}}}}}}return n.makeTensorInfo(S.shape,S.dtype,S.values)}var Wj={kernelName:kt,backendName:`cpu`,kernelFunc:Uj};J();function Gj(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,dilations:s,pad:c,dimRoundingMode:l,filterShape:u}=r;Y([i,a],`depthwiseConv2dNativeBackpropFilter`);let d=al(i.shape,u,o,s,c,l,!0),{strideHeight:f,strideWidth:p,filterHeight:m,filterWidth:h}=d,g=new ra(d.filterShape,`float32`),_=d.padInfo.left,v=d.padInfo.top,y=d.outChannels/d.inChannels,b=n.data.get(i.dataId).values,x=new ra(i.shape,i.dtype,b),S=n.data.get(a.dataId).values,C=new ra(a.shape,a.dtype,S);for(let e=0;e<m;++e){let t=Math.max(0,Math.ceil((v-e)/f)),n=Math.min(d.outHeight,(d.inHeight+v-e)/f);for(let r=0;r<h;++r){let i=Math.max(0,Math.ceil((_-r)/p)),a=Math.min(d.outWidth,(d.inWidth+_-r)/p);for(let o=0;o<d.outChannels;++o){let s=Math.trunc(o/y),c=o%y,l=0;for(let c=0;c<d.batchSize;++c)for(let u=t;u<n;++u){let t=e+u*f-v;for(let e=i;e<a;++e){let n=r+e*p-_;l+=x.get(c,t,n,s)*C.get(c,u,e,o)}}g.set(l,e,r,s,c)}}}return n.makeTensorInfo(g.shape,g.dtype,g.values)}var Kj={kernelName:At,backendName:`cpu`,kernelFunc:Gj};J();function qj(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{strides:o,dilations:s,pad:c,dimRoundingMode:l,inputShape:u}=r;Y([i,a],`depthwiseConv2DNativeBackpropInput`);let d=N(i.shape),f=N(a.shape),p=al(u,a.shape,o,s,c,l,!0),m=new ra(p.inShape,`float32`),h=m.values,[g,_,v]=m.strides,y=n.data.get(i.dataId).values,[b,x,S]=d,C=n.data.get(a.dataId).values,[w,T,E]=f,{batchSize:D,filterHeight:O,filterWidth:k,inChannels:ee,inHeight:te,inWidth:A,outChannels:ne,outHeight:re,outWidth:ie,strideHeight:ae,strideWidth:oe}=p,se=O-1-p.padInfo.top,ce=k-1-p.padInfo.left,j=ne/ee;for(let e=0;e<D;++e)for(let t=0;t<ee;++t)for(let n=0;n<te;++n){let r=n-se,i=Math.max(0,Math.ceil(r/ae)),a=Math.min(re,(O+r)/ae);for(let o=0;o<A;++o){let s=o-ce,c=Math.max(0,Math.ceil(s/oe)),l=Math.min(ie,(k+s)/oe),u=0;for(let n=i;n<a;++n){let i=n*ae-r;for(let r=c;r<l;++r){let a=r*oe-s,o=b*e+x*n+S*r,c=w*(O-1-i)+T*(k-1-a)+E*t;for(let e=0;e<j;++e){let n=y[o+(t*j+e)],r=C[c+e];u+=n*r}}}h[g*e+_*n+v*o+t]=u}}return n.makeTensorInfo(m.shape,m.dtype,m.values)}var Jj={kernelName:jt,backendName:`cpu`,kernelFunc:qj};J();function Yj(e){let{inputs:t,backend:n}=e,{x:r}=t,i=k(r.shape),a=n.data.get(r.dataId).values,o=Xs([i,i],r.dtype),s=o.values;for(let e=0;e<a.length;e++)s[e*i+e]=a[e];let c=[...r.shape,...r.shape];return n.makeTensorInfo(c,o.dtype,o.values)}var Xj={kernelName:Mt,backendName:`cpu`,kernelFunc:Yj};J();var Zj={kernelName:Nt,backendName:`cpu`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r,filter:i}=e,{strides:a,pad:o,dilations:s}=n,c=t,l=c.data.get(r.dataId).values,u=r.shape.length,d=c.data.get(i.dataId).values,f=i.shape.length,{batchSize:p,inHeight:m,inWidth:h,inChannels:g,outHeight:_,outWidth:v,padInfo:y,strideHeight:b,strideWidth:x,filterHeight:S,filterWidth:C,dilationHeight:w,dilationWidth:T,outShape:E}=nl(r.shape,i.shape,a,o,`NHWC`,s),D=k(E),O=E.length,ee=ue(r.dtype,D);for(let e=0;e<p;++e)for(let t=0;t<_;++t){let n=t*b-y.top;for(let a=0;a<v;++a){let o=a*x-y.left;for(let s=0;s<g;++s){let c=-(2**53-1);for(let t=0;t<S;++t){let a=n+t*w;if(a>=0&&a<m)for(let n=0;n<C;++n){let p=o+n*T;if(p>=0&&p<h){let o=ke([e,a,p,s],u,N(r.shape)),m=ke([t,n,s],f,N(i.shape)),h=l[o]+d[m];h>c&&(c=h)}}}let p=ke([e,t,a,s],O,N(E));ee[p]=c}}}return{dataId:c.write(Ai(ee,r.dtype),E,r.dtype),shape:E,dtype:r.dtype}}};J();var Qj={kernelName:Ft,backendName:`cpu`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r,filter:i,dy:a}=e,{strides:o,pad:s,dilations:c}=n,l=t,u=Ce(r.shape,l.data.get(r.dataId).values),d=Ce(i.shape,l.data.get(i.dataId).values),{batchSize:f,inHeight:p,inWidth:m,inChannels:h,outHeight:g,outWidth:_,padInfo:v,strideHeight:y,strideWidth:b,filterHeight:x,filterWidth:S,dilationHeight:C,dilationWidth:w,outShape:T}=nl(r.shape,i.shape,o,s,`NHWC`,c);E(a.rank===T.length,()=>`Error in ${Ft}, dy must have the same rank as output ${T.length}, but got ${a.rank}`);let D=Ce(T,l.data.get(a.dataId).values),O=De(i.shape,i.dtype);for(let e=0;e<f;++e)for(let t=0;t<g;++t){let n=t*y-v.top;for(let r=0;r<_;++r){let i=r*b-v.left;for(let a=0;a<h;++a){let o=-(2**53-1),s=0,c=0;for(let t=0;t<x;++t){let r=n+t*C;if(r>=0&&r<p)for(let n=0;n<S;++n){let l=i+n*w;if(l>=0&&l<m){let i=u[e][r][l][a]+d[t][n][a];i>o&&(o=i,s=t,c=n)}}}O[s][c][a]+=D[e][t][r][a]}}}return{dataId:l.write(Ai(O,r.dtype),i.shape,i.dtype),shape:i.shape,dtype:i.dtype}}};J();var $j={kernelName:Pt,backendName:`cpu`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r,filter:i,dy:a}=e,{strides:o,pad:s,dilations:c}=n,l=t,u=Ce(r.shape,l.data.get(r.dataId).values),d=Ce(i.shape,l.data.get(i.dataId).values),{batchSize:f,inHeight:p,inWidth:m,inChannels:h,outHeight:g,outWidth:_,padInfo:v,strideHeight:y,strideWidth:b,filterHeight:x,filterWidth:S,dilationHeight:C,dilationWidth:w,outShape:T}=nl(r.shape,i.shape,o,s,`NHWC`,c);E(a.rank===T.length,()=>`Error in ${Pt}, dy must have the same rank as output ${T.length}, but got ${a.rank}`);let D=Ce(T,l.data.get(a.dataId).values),O=De(r.shape,r.dtype);for(let e=0;e<f;++e)for(let t=0;t<g;++t){let n=t*y-v.top;for(let r=0;r<_;++r){let i=r*b-v.left;for(let a=0;a<h;++a){let o=-(2**53-1),s=n<0?0:n,c=i<0?0:i;for(let t=0;t<x;++t){let r=n+t*C;if(r>=0&&r<p)for(let n=0;n<S;++n){let l=i+n*w;if(l>=0&&l<m){let i=u[e][r][l][a]+d[t][n][a];i>o&&(o=i,s=r,c=l)}}}O[e][s][c][a]+=D[e][t][r][a]}}}return{dataId:l.write(Ai(O,r.dtype),r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};J();function eM(e){let{inputs:t,backend:n,attrs:r}=e,{image:i}=t,{canvas:a,options:o}=r,{contextOptions:s,imageOptions:c}=o||{},l=c?.alpha||1,u=s?.contextType||`2d`;if(u!==`2d`)throw Error(`Context type ${s.contextType} is not supported by the CPU backend.`);let d=a.getContext(u,s?.contextAttributes||{});if(d==null)throw Error(`Could not get the context with ${u} type.`);let[f,p]=i.shape.slice(0,2),m=i.shape.length===2?1:i.shape[2],h=n.data.get(i.dataId).values,g=i.dtype===`float32`?255:1,_=new Uint8ClampedArray(p*f*4);for(let e=0;e<f*p;++e){let t=[0,0,0,255*l];for(let n=0;n<m;n++){let r=h[e*m+n];if(i.dtype===`float32`){if(r<0||r>1)throw Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${r}.`)}else if(i.dtype===`int32`&&(r<0||r>255))throw Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${r}.`);m===1?(t[0]=r*g,t[1]=r*g,t[2]=r*g):t[n]=r*g}let n=e*4;_[n+0]=Math.round(t[0]),_[n+1]=Math.round(t[1]),_[n+2]=Math.round(t[2]),_[n+3]=Math.round(t[3])}a.width=p,a.height=f;let v=new ImageData(_,p,f);return d.putImageData(v,0,0),i}var tM={kernelName:It,backendName:`cpu`,kernelFunc:eM};J();function nM(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;Y(i,`sum`);let s;s=i.dtype===`bool`?LD({inputs:{x:i},backend:n,attrs:{dtype:`int32`}}):MD({inputs:{x:i},backend:n});let c=s.shape.length,l=j(a,s.shape),u=bf(l,c),d=l,f=s;u!=null&&(f=QO({inputs:{x:s},backend:n,attrs:{perm:u}}),d=Sf(d.length,c)),yf(`sum`,d,f.shape.length);let[p,m]=_f(f.shape,d),h=jD(n,p,la(f.dtype,`int32`)),g=k(m),_=n.data.get(h.dataId).values,v=n.data.get(f.dataId).values;for(let e=0;e<_.length;++e){let t=e*g,n=0;for(let e=0;e<g;++e)n+=v[t+e];_[e]=n}if(o){let e=vf(h.shape,l),t=h;h=mA({inputs:{x:h},backend:n,attrs:{shape:e}}),n.disposeIntermediateTensorInfo(t)}return n.disposeIntermediateTensorInfo(s),u!=null&&n.disposeIntermediateTensorInfo(f),h}var rM={kernelName:`Sum`,backendName:`cpu`,kernelFunc:nM};J();function iM(e){let{inputs:t,backend:n,attrs:r}=e,{equation:i}=r,a=t,{allDims:o,summedDims:s,idDims:c}=LE(i,a.length);zE(o.length,c,a);let{path:l,steps:u}=BE(s,c),d=u.length,f=null,p=o.length,m=[];for(let e=0;e<d;++e){for(let t of u[e]){let{permutationIndices:e,expandDims:r}=RE(p,c[t]),i;VE(e)?i=a[t]:(i=QO({inputs:{x:a[t]},backend:n,attrs:{perm:e}}),m.push(i));let o=i.shape.slice();for(let e=0;e<r.length;++e)o.splice(r[e],0,1);A(i.shape,o)||(i=mA({inputs:{x:i},backend:n,attrs:{shape:o}}),m.push(i)),f===null?f=i:(f=UO({inputs:{a:i,b:f},backend:n}),m.push(f))}e<d-1&&(l[e]>=0&&(f=nM({inputs:{x:f},backend:n,attrs:{axis:l[e]-(o.length-p),keepDims:!1}}),m.push(f)),p--)}for(let e of m)e!==f&&n.disposeIntermediateTensorInfo(e);return f}var aM={kernelName:Rt,backendName:`cpu`,kernelFunc:iM};J();function oM(e){let{inputs:t,backend:n}=e,{dy:r,y:i}=t;Y([r,i],`eluGrad`);let a=new Float32Array(k(i.shape)),o=n.data.get(i.dataId).values,s=n.data.get(r.dataId).values;for(let e=0;e<o.length;++e){let t=o[e];t>=0?a[e]=s[e]:a[e]=s[e]*(t+1)}return n.makeTensorInfo(i.shape,`float32`,a)}var sM={kernelName:zt,backendName:`cpu`,kernelFunc:oM};J();var cM=xE,lM=SE,uM=CE,dM=wE,fM=TE,pM=EE,mM={kernelName:`Erf`,backendName:`cpu`,kernelFunc:XD(`Erf`,e=>{let t=Math.sign(e),n=Math.abs(e),r=1/(1+cM*n);return t*(1-((((pM*r+fM)*r+dM)*r+uM)*r+lM)*r*Math.exp(-n*n))})};J();function hM(e){let{inputs:t,backend:n,attrs:r}=e,{input:i}=t,{dim:a}=r,o=i.shape.length,s=i.shape.slice(),c=a;return a<0&&(E(-(o+1)<=a,()=>`Axis must be in the interval [${-(o+1)}, ${o}]`),c=o+a+1),s.splice(c,0,1),mA({inputs:{x:i},backend:n,attrs:{shape:s}})}var gM={kernelName:Vt,backendName:`cpu`,kernelFunc:hM};J();var _M=OD((e,t)=>e/t),vM=zD(Lt,_M),yM={kernelName:Lt,backendName:`cpu`,kernelFunc:vM};J();function bM(e,t,n){let r=e.shape,i=r[0],a=r[1],o=n.data.get(e.dataId),s=o.complexTensorInfos.real,c=o.complexTensorInfos.imag,l=[i,a],u=k(l),d=M(`float32`,u),f=M(`float32`,u);for(let e=0;e<i;e++){let r=Dk({inputs:{x:s},backend:n,attrs:{begin:[e,0],size:[1,a]}}),i=Dk({inputs:{x:c},backend:n,attrs:{begin:[e,0],size:[1,a]}}),o=kD({inputs:{real:r,imag:i},backend:n}),{real:l,imag:u}=xM(o,t,n),p=OE(l,u);for(let t=0;t<a;t++){let n=ME(p,t);d[e*a+t]=n.real,f[e*a+t]=n.imag}n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(o)}let p=n.makeTensorInfo(l,`float32`,d),m=n.makeTensorInfo(l,`float32`,f),h=kD({inputs:{real:p,imag:m},backend:n});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),h}function xM(e,t,n){let r=k(e.shape),i=n.data.get(e.dataId),a=n.data.get(i.complexTensorInfos.real.dataId).values,o=n.data.get(i.complexTensorInfos.imag.dataId).values;if(SM(r)){let i=CM(a,o,r,t,n),s=[e.shape[0],e.shape[1]];if(t){let e=n.makeTensorInfo(s,`float32`,i.real),t=n.makeTensorInfo(s,`float32`,i.imag),a=n.makeTensorInfo([],`float32`,Oi(r,`float32`)),o=MD({inputs:{x:a},backend:n}),c=yM.kernelFunc({inputs:{a:e,b:a},backend:n}),l=yM.kernelFunc({inputs:{a:t,b:o},backend:n}),u=n.data.get(c.dataId).values,d=n.data.get(l.dataId).values;return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(a),n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(l),{real:u,imag:d}}return i}return kE(wM(OE(a,o),r,t))}function SM(e){return!(e&e-1)}function CM(e,t,n,r,i){if(n===1)return{real:e,imag:t};let a=OE(e,t),o=n/2,s=AE(a),c=s.real,l=s.imag,u=[c.length],d=i.makeTensorInfo(u,`float32`,c),f=i.makeTensorInfo(u,`float32`,l),p=kD({inputs:{real:d,imag:f},backend:i}),m=jE(a),h=m.real,g=m.imag,_=[h.length],v=i.makeTensorInfo(_,`float32`,h),y=i.makeTensorInfo(_,`float32`,g),b=kD({inputs:{real:v,imag:y},backend:i}),x=CM(c,l,o,r,i),S=x.real,C=x.imag,w=[S.length],T=i.makeTensorInfo(w,`float32`,S),E=i.makeTensorInfo(w,`float32`,C),D=kD({inputs:{real:T,imag:E},backend:i}),O=CM(h,g,o,r,i),k=O.real,ee=O.imag,te=[k.length],A=i.makeTensorInfo(te,`float32`,k),ne=i.makeTensorInfo(te,`float32`,ee),re=kD({inputs:{real:A,imag:ne},backend:i}),ie=PE(n,r),ae=[ie.real.length],oe=i.makeTensorInfo(ae,`float32`,ie.real),se=i.makeTensorInfo(ae,`float32`,ie.imag),ce=kD({inputs:{real:oe,imag:se},backend:i}),j=UO({inputs:{a:ce,b:re},backend:i}),le=HD({inputs:{a:D,b:j},backend:i}),M=Jk({inputs:{a:D,b:j},backend:i}),ue=PD({inputs:{input:le},backend:i}),de=PD({inputs:{input:M},backend:i}),fe=mj({inputs:{input:le},backend:i}),pe=mj({inputs:{input:M},backend:i}),me=gj({inputs:[ue,de],backend:i,attrs:{axis:0}}),he=gj({inputs:[fe,pe],backend:i,attrs:{axis:0}}),ge=i.data.get(me.dataId).values,_e=i.data.get(he.dataId).values;return i.disposeIntermediateTensorInfo(d),i.disposeIntermediateTensorInfo(f),i.disposeIntermediateTensorInfo(p),i.disposeIntermediateTensorInfo(v),i.disposeIntermediateTensorInfo(y),i.disposeIntermediateTensorInfo(b),i.disposeIntermediateTensorInfo(T),i.disposeIntermediateTensorInfo(E),i.disposeIntermediateTensorInfo(D),i.disposeIntermediateTensorInfo(A),i.disposeIntermediateTensorInfo(ne),i.disposeIntermediateTensorInfo(re),i.disposeIntermediateTensorInfo(oe),i.disposeIntermediateTensorInfo(se),i.disposeIntermediateTensorInfo(ce),i.disposeIntermediateTensorInfo(j),i.disposeIntermediateTensorInfo(le),i.disposeIntermediateTensorInfo(M),i.disposeIntermediateTensorInfo(ue),i.disposeIntermediateTensorInfo(fe),i.disposeIntermediateTensorInfo(de),i.disposeIntermediateTensorInfo(pe),i.disposeIntermediateTensorInfo(me),i.disposeIntermediateTensorInfo(he),{real:ge,imag:_e}}function wM(e,t,n){let r=new Float32Array(t*2);for(let i=0;i<t;i++){let a=0,o=0;for(let r=0;r<t;r++){let s=FE(i*r,t,n),c=ME(e,r);a+=c.real*s.real-c.imag*s.imag,o+=c.real*s.imag+c.imag*s.real}n&&(a/=t,o/=t),NE(r,a,o,i)}return r}J();function TM(e){let{inputs:t,backend:n}=e,{input:r}=t,i=k(r.shape),a=r.shape[r.shape.length-1],o=i/a,s=mA({inputs:{x:r},backend:n,attrs:{shape:[o,a]}}),c=bM(s,!1,n),l=mA({inputs:{x:c},backend:n,attrs:{shape:r.shape}});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(c),l}var EM={kernelName:`FFT`,backendName:`cpu`,kernelFunc:TM};J();function DM(e){let{backend:t,attrs:n}=e,{shape:r,value:i,dtype:a}=n,o=a||ye(i),s=ue(o,k(r));return kM(s,i,o),t.makeTensorInfo(r,o,s)}var OM={kernelName:Ut,backendName:`cpu`,kernelFunc:DM};function kM(e,t,n){e.fill(t)}J();var AM={kernelName:Wt,backendName:`cpu`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{image:r}=e,i=n,a=M(r.dtype,k(r.shape)),[o,s,c,l]=r.shape,u=i.data.get(r.dataId).values;for(let e=0;e<o;e++){let t=e*c*s*l;for(let e=0;e<s;e++){let n=c*l*e;for(let e=0;e<c;e++){let r=e*l;for(let i=0;i<l;i++){let o=Math.round(c-e-1),s=t+n+r+i,d=u[s];if(o>=0&&o<c){let e=o*l;d=u[t+n+e+i]}a[s]=d}}}}return{dataId:i.write(a,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};J();function jM(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=r,h=vj({inputs:{x:i,filter:a},backend:n,attrs:{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f}});if(o){let e=h;if(u===`NCHW`&&o.shape.length===1&&o.shape[0]!==1){let e=mA({inputs:{x:o},backend:n,attrs:{shape:[o.shape[0],1,1]}});h=HD({inputs:{a:h,b:e},backend:n}),n.disposeIntermediateTensorInfo(e)}else h=HD({inputs:{a:h,b:o},backend:n});n.disposeIntermediateTensorInfo(e)}if(p){let e=h;if(u===`NCHW`&&p===`prelu`&&s.shape.length===1&&s.shape[0]!==1){let e=mA({inputs:{x:s},backend:n,attrs:{shape:[s.shape[0],1,1]}});h=pA(n,h,p,e,m),n.disposeIntermediateTensorInfo(e)}else h=pA(n,h,p,s,m);n.disposeIntermediateTensorInfo(e)}return h}var MM={kernelName:Hr,backendName:`cpu`,kernelFunc:jM};J();function NM(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=r,h=Uj({inputs:{x:i,filter:a},backend:n,attrs:{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f}});if(o){let e=h;h=HD({inputs:{a:h,b:o},backend:n}),n.disposeIntermediateTensorInfo(e)}if(p){let e=h;h=pA(n,h,p,s,m),n.disposeIntermediateTensorInfo(e)}return h}var PM={kernelName:Ur,backendName:`cpu`,kernelFunc:NM};J();function FM(e){let{inputs:t,backend:n}=e,{params:r,indices:i}=t,a=k(r.shape),o=i.shape,s=o[o.length-1],[c,l,u,d]=yT(r,i);if(l===0)return n.makeTensorInfo(c,r.dtype,[]);let f=n.data.get(i.dataId).values,p=_O(f,n.bufferSync(r),r.dtype,l,s,u,d,r.shape,a);return n.makeTensorInfo(c,r.dtype,p.values)}var IM={kernelName:Yt,backendName:`cpu`,kernelFunc:FM};J();function LM(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,indices:a}=t,{axis:o,batchDims:s}=r;Y([i,a],`gatherV2`);let c=j(o,i.shape)[0],l=n.data.get(a.dataId).values,u=i.shape[c];for(let e=0;e<l.length;++e){let t=l[e];E(t<=u-1&&t>=0,()=>`GatherV2: the index value ${t} is not in [0, ${u-1}]`)}let d=s;s??(d=0);let f=k(a.shape),p=mD(i,a,c,d),m=mA({inputs:{x:i},backend:n,attrs:{shape:[p.batchSize,p.outerSize,p.dimSize,p.sliceSize]}}),h=mA({inputs:{x:a},backend:n,attrs:{shape:[p.batchSize,f/p.batchSize]}}),g=[p.batchSize,p.outerSize,f/p.batchSize,p.sliceSize],_=n.bufferSync(h),v=vO(n.bufferSync(m),_,g);return n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(h),n.makeTensorInfo(p.outputShape,v.dtype,v.values)}var RM={kernelName:Jt,backendName:`cpu`,kernelFunc:LM};J();function zM(e){let{inputs:t,backend:n}=e,{input:r}=t,i=k(r.shape),a=r.shape[r.shape.length-1],o=i/a,s=mA({inputs:{x:r},backend:n,attrs:{shape:[o,a]}}),c=bM(s,!0,n),l=mA({inputs:{x:c},backend:n,attrs:{shape:r.shape}});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(c),l}var BM={kernelName:$t,backendName:`cpu`,kernelFunc:zM};J();var VM=XD(tn,e=>+!!Number.isFinite(e),`bool`),HM={kernelName:tn,backendName:`cpu`,kernelFunc:VM};J();var UM=XD(nn,e=>+(Math.abs(e)===1/0),`bool`),WM={kernelName:nn,backendName:`cpu`,kernelFunc:UM};J();var GM=XD(rn,e=>+!!Number.isNaN(e),`bool`),KM={kernelName:rn,backendName:`cpu`,kernelFunc:GM};J();function qM(e){let{backend:t,attrs:n}=e,{start:r,stop:i,num:a}=n,o=jO(r,i,a);return t.makeTensorInfo([o.length],`float32`,o)}var JM={kernelName:cn,backendName:`cpu`,kernelFunc:qM};J();var YM=XD(ln,e=>Math.log1p(e)),XM={kernelName:ln,backendName:`cpu`,kernelFunc:YM};J();var ZM=OD((e,t)=>e&&t),QM=zD(un,ZM,null,`bool`),$M={kernelName:un,backendName:`cpu`,kernelFunc:QM};J();var eN=XD(dn,e=>+!e,`bool`),tN={kernelName:dn,backendName:`cpu`,kernelFunc:eN};J();var nN=OD((e,t)=>e||t),rN=zD(fn,nN,null,`bool`),iN={kernelName:fn,backendName:`cpu`,kernelFunc:rN};J();function aN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{depthRadius:a,bias:o,alpha:s,beta:c}=r;Y(i,`LRN`);let l=i.shape[3],u=l-1,d=n.data.get(i.dataId).values,f=k(i.shape),p=new Float32Array(f);function m(e){let t=e%l,n=e-t+Math.max(0,t-a),r=e-t+Math.min(t+a,u),i=0;for(;n<=r;n++){let e=d[n];i+=e*e}return i}for(let e=0;e<f;e++){let t=m(e),n=d[e]*(o+s*t)**+-c;p[e]=n}return n.makeTensorInfo(i.shape,i.dtype,p)}var oN={kernelName:`LRN`,backendName:`cpu`,kernelFunc:aN};J();function sN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,y:a,dy:o}=t,{depthRadius:s,bias:c,alpha:l,beta:u}=r;Y(o,`LRNGrad`);let d=k(o.shape),f=o.shape[3],p=n.data.get(o.dataId).values,m=n.data.get(i.dataId).values,h=n.data.get(a.dataId).values,g=new Float32Array(d),_=d;for(let e=0;e<_;e++){let t=e%f,n=e-t+Math.max(0,t-s),r=e-t+Math.min(f,t+s+1),i=0;for(let e=n;e<r;e++)i+=m[e]**2;i=l*i+c;for(let t=n;t<r;t++){let n=-2*l*u*m[t]*h[e]/i;e===t&&(n+=i**+-u),n*=p[e],g[t]+=n}}return n.makeTensorInfo(o.shape,i.dtype,g)}var cN={kernelName:gn,backendName:`cpu`,kernelFunc:sN};J();function lN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{reductionIndices:a,keepDims:o}=r,s=n,c=i.shape,l=c.length,u=j(a,c),d=u,f=bf(d,l),p=s.data.get(i.dataId).values;if(f!=null){let e=Array(l);for(let t=0;t<e.length;t++)e[t]=c[f[t]];p=ZO(p,c,i.dtype,f,e),d=Sf(d.length,l),c=e}Y(i,`max`),yf(`max`,d,l);let[m,h]=_f(c,d),g=k(h),_=PO(p,g,m,i.dtype),v=s.write(_,m,i.dtype),y=m;return o&&(y=vf(m,u)),{dataId:v,shape:y,dtype:i.dtype}}var uN={kernelName:`Max`,backendName:`cpu`,kernelFunc:lN};J();function dN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;Y(i,`maxPool`);let{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=r;E(_l(o,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let l=rl(i.shape,a,o,1,s,c),u;if(l.filterWidth===1&&l.filterHeight===1&&A(l.inShape,l.outShape))u=MD({inputs:{x:i},backend:n});else{let e=n.data.get(i.dataId).values,t=N(i.shape),r=GA(e,i.shape,i.dtype,t,l,`max`);u=n.makeTensorInfo(l.outShape,i.dtype,r.values)}return u}var fN={kernelName:yn,backendName:`cpu`,kernelFunc:dN};J();function pN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c,dataFormat:l}=r;Y(i,`maxPool3d`);let u=il(i.shape,a,o,1,s,c,l),d=n.data.get(i.dataId).values,f=qA(d,i.shape,i.dtype,N(i.shape),u,`max`);return n.makeTensorInfo(f.shape,`float32`,f.values)}var mN={kernelName:xn,backendName:`cpu`,kernelFunc:pN};J();function hN(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=r;Y([i,a],`maxPool3DGrad`);let u=il(a.shape,o,s,1,c,l),d=JA(n.bufferSync(a),u),f=u.strideDepth,p=u.strideHeight,m=u.strideWidth,h=u.dilationDepth,g=u.dilationHeight,_=u.dilationWidth,v=u.effectiveFilterDepth,y=u.effectiveFilterHeight,b=u.effectiveFilterWidth,x=v-1-u.padInfo.front,S=b-1-u.padInfo.left,C=y-1-u.padInfo.top,w=Xs(a.shape,`float32`),T=n.bufferSync(i);for(let e=0;e<u.batchSize;++e)for(let t=0;t<u.inChannels;++t)for(let n=0;n<u.inDepth;++n)for(let r=0;r<u.inHeight;++r)for(let i=0;i<u.inWidth;++i){let a=n-x,o=r-C,s=i-S,c=0;for(let n=0;n<v;n+=h){let r=(a+n)/f;if(!(r<0||r>=u.outDepth||Math.floor(r)!==r))for(let i=0;i<y;i+=g){let a=(o+i)/p;if(!(a<0||a>=u.outHeight||Math.floor(a)!==a))for(let o=0;o<b;o+=_){let l=(s+o)/m;if(l<0||l>=u.outWidth||Math.floor(l)!==l)continue;let f=+(v*y*b-1-d.get(e,r,a,l,t)===n*y*b+i*b+o);if(f===0)continue;let p=T.get(e,r,a,l,t);c+=p*f}}}w.set(c,e,n,r,i,t)}return n.makeTensorInfo(w.shape,w.dtype,w.values)}var gN={kernelName:Sn,backendName:`cpu`,kernelFunc:hN};J();function _N(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a,output:o}=t,s=a;Y([a,o],`maxPoolGrad`);let{filterSize:c,strides:l,pad:u,dimRoundingMode:d}=r,f=rl(s.shape,c,l,1,u,d),p=n.data.get(s.dataId).values,m=Xs(f.outShape,s.dtype,KA(p,s.shape,s.dtype,f).values),h=f.strideHeight,g=f.strideWidth,_=f.dilationHeight,v=f.dilationWidth,y=f.effectiveFilterHeight,b=f.effectiveFilterWidth,x=b-1-f.padInfo.left,S=y-1-f.padInfo.top,C=Xs(s.shape,`float32`),w=n.data.get(i.dataId).values,T=Xs(i.shape,`float32`,w);for(let e=0;e<f.batchSize;++e)for(let t=0;t<f.inChannels;++t)for(let n=0;n<f.inHeight;++n)for(let r=0;r<f.inWidth;++r){let i=n-S,a=r-x,o=0;for(let n=0;n<y;n+=_){let r=(i+n)/h;if(!(r<0||r>=f.outHeight||Math.floor(r)!==r))for(let i=0;i<b;i+=v){let s=(a+i)/g;if(s<0||s>=f.outWidth||Math.floor(s)!==s)continue;let c=+(y*b-1-m.get(e,r,s,t)===n*b+i);if(c===0)continue;let l=T.get(e,r,s,t);o+=l*c}}C.set(o,e,n,r,t)}return n.makeTensorInfo(C.shape,C.dtype,C.values)}var vN={kernelName:bn,backendName:`cpu`,kernelFunc:_N};J();function yN(e,t,n,r,i){let a=GA(e,t,n,N(t),i,`max`),o=KA(e,t,n,i,!0,r);return[a.values,o.values]}J();var bN={kernelName:Cn,backendName:`cpu`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{x:r}=e,{filterSize:i,strides:a,pad:o,includeBatchInIndex:s}=t,c=n;Y(r,`MaxPoolWithArgmax`);let l=c.data.get(r.dataId).values,u=rl(r.shape,i,a,[1,1],o),[d,f]=yN(l,r.shape,r.dtype,s,u),p=c.write(d,u.outShape,r.dtype),m=c.write(f,u.outShape,r.dtype);return[{dataId:p,shape:u.outShape,dtype:r.dtype},{dataId:m,shape:u.outShape,dtype:`int32`}]}};J();function xN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=j(a,i.shape),c=_f(i.shape,s)[1],l=k(c),u=[],d=n.makeTensorInfo([],`float32`,new Float32Array([l]));u.push(d);let f=LD({inputs:{x:i},backend:n,attrs:{dtype:`float32`}});u.push(f);let p=vM({inputs:{a:f,b:d},backend:n});u.push(p);let m=nM({inputs:{x:p},backend:n,attrs:{axis:a,keepDims:o}});return u.forEach(e=>n.disposeIntermediateTensorInfo(e)),m}var SN={kernelName:wn,backendName:`cpu`,kernelFunc:xN};J();function CN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;Y(i,`min`);let s=j(a,i.shape),c=s,l=bf(c,i.shape.length),u=i;l!=null&&(u=QO({inputs:{x:i},backend:n,attrs:{perm:l}}),c=Sf(c.length,i.shape.length)),yf(`min`,c,u.shape.length);let[d,f]=_f(u.shape,c),p=k(f),m=Ee(k(d),u.dtype),h=n.data.get(u.dataId).values;for(let e=0;e<m.length;++e){let t=e*p,n=h[t];for(let e=0;e<p;++e){let r=h[t+e];(Number.isNaN(r)||r<n)&&(n=r)}m[e]=n}l!=null&&n.disposeIntermediateTensorInfo(u);let g=n.makeTensorInfo(d,u.dtype,m);if(o){let e=vf(d,s),t=mA({inputs:{x:g},backend:n,attrs:{shape:e}});return n.disposeIntermediateTensorInfo(g),t}return g}var wN={kernelName:`Min`,backendName:`cpu`,kernelFunc:CN};J();function TN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{paddings:a,mode:o}=r;Y(i,`mirrorPad`);let s=a.map((e,t)=>e[0]+i.shape[t]+e[1]),c=a.map(e=>e[0]),l=a.map((e,t)=>e[0]+i.shape[t]),u=o===`reflect`?0:1,d=n.data.get(i.dataId).values,f=i.shape.length,p=N(i.shape),m=k(s),h=s.length,g=N(s),_=M(i.dtype,m);for(let e=0;e<m;e++){let t=Ae(e,h,g);for(let e=0;e<h;e++)t[e]<c[e]?t[e]=c[e]*2-t[e]-u:t[e]>=l[e]&&(t[e]=(l[e]-1)*2-t[e]+u);t=t.map((e,t)=>e-c[t]);let n=ke(t,f,p);_[e]=d[n]}return{dataId:n.write(_,s,i.dtype),shape:s,dtype:i.dtype}}var EN={kernelName:En,backendName:`cpu`,kernelFunc:TN};J();var DN={kernelName:`Mod`,backendName:`cpu`,kernelFunc:zD(`Mod`,OD(((e,t)=>{let n=e%t;return e<0&&t<0||e>=0&&t>=0?n:(n+t)%t})))};J();function ON(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{dim:a}=r,o=i.shape.length,s=a;if(s===-1&&(s=o-1),s!==o-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${o} and dim was ${s}`);let c=j([s],i.shape),l=lN({inputs:{x:i},backend:n,attrs:{reductionIndices:c,keepDims:!1}}),u=vf(l.shape,c),d=mA({inputs:{x:l},backend:n,attrs:{shape:u}}),f=Jk({inputs:{a:i,b:d},backend:n}),p=oO({inputs:{x:f},backend:n}),m=nM({inputs:{x:p},backend:n,attrs:{axis:c,keepDims:!1}}),h=mA({inputs:{x:m},backend:n,attrs:{shape:u}}),g=vM({inputs:{a:p,b:h},backend:n});return n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(h),g}var kN={kernelName:hr,backendName:`cpu`,kernelFunc:ON};J();var AN=u(Lg());function jN(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{numSamples:a,seed:o,normalized:s}=r;Y(i,`multinomial`);let c=s?i:ON({inputs:{logits:i},backend:n,attrs:{dim:-1}}),l=c.shape[0],u=c.shape[1],d=n.data.get(c.dataId).values,f=[l,a],p=Ee(k(f),`int32`);for(let e=0;e<l;++e){let t=e*u,n=new Float32Array(u-1);n[0]=d[t];for(let e=1;e<n.length;++e)n[e]=n[e-1]+d[t+e];let r=AN.alea(o.toString()),i=e*a;for(let e=0;e<a;++e){let t=r();p[i+e]=n.length;for(let r=0;r<n.length;r++)if(t<n[r]){p[i+e]=r;break}}}return s||n.disposeIntermediateTensorInfo(c),n.makeTensorInfo(f,`int32`,p)}var MN={kernelName:Dn,backendName:`cpu`,kernelFunc:jN};J();var NN=Hx;function PN(e){let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c}=r;Y(i,`NonMaxSuppression`);let l=n.data.get(i.dataId).values,u=n.data.get(a.dataId).values,{selectedIndices:d}=NN(l,u,o,s,c);return n.makeTensorInfo([d.length],`int32`,new Int32Array(d))}var FN={kernelName:An,backendName:`cpu`,kernelFunc:PN};J();var IN=Ux;function LN(e){let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c,padToMaxOutputSize:l}=r;Y(i,`NonMaxSuppressionPadded`);let u=n.data.get(i.dataId).values,d=n.data.get(a.dataId).values,{selectedIndices:f,validOutputs:p}=IN(u,d,o,s,c,l);return[n.makeTensorInfo([f.length],`int32`,new Int32Array(f)),n.makeTensorInfo([],`int32`,new Int32Array([p]))]}var RN={kernelName:jn,backendName:`cpu`,kernelFunc:LN};J();var zN=Wx;function BN(e){let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c,softNmsSigma:l}=r;Y(i,`NonMaxSuppressionWithScore`);let u=n.data.get(i.dataId).values,d=n.data.get(a.dataId).values,{selectedIndices:f,selectedScores:p}=zN(u,d,o,s,c,l);return[n.makeTensorInfo([f.length],`int32`,new Int32Array(f)),n.makeTensorInfo([p.length],`float32`,new Float32Array(p))]}var VN={kernelName:Mn,backendName:`cpu`,kernelFunc:BN};J();function HN(e){let{inputs:t,backend:n,attrs:r}=e,{indices:i}=t,{dtype:a,depth:o,onValue:s,offValue:c}=r;Y(i,`oneHot`);let l=k(i.shape),u=new Float32Array(l*o);u.fill(c);let d=n.data.get(i.dataId).values;for(let e=0;e<l;++e)d[e]>=0&&d[e]<o&&(u[e*o+d[e]]=s);return n.makeTensorInfo([...i.shape,o],a,u)}var UN={kernelName:Pn,backendName:`cpu`,kernelFunc:HN};J();function WN(e){let{inputs:t,backend:n}=e,{x:r}=t;if(r.dtype===`string`)throw Error(`zerosLike is not supported for string tensors`);if(r.dtype===`complex64`){let e=PD({inputs:{input:r},backend:n}),t=WN({inputs:{x:e},backend:n}),i=mj({inputs:{input:r},backend:n}),a=WN({inputs:{x:i},backend:n}),o=kD({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),o}return DM({backend:n,attrs:{shape:r.shape,value:0,dtype:r.dtype}})}var GN={kernelName:Lr,backendName:`cpu`,kernelFunc:WN};J();function KN(e){let{inputs:t,backend:n}=e,{x:r}=t;if(r.dtype===`string`)throw Error(`onesLike is not supported for string tensors`);if(r.dtype===`complex64`){let e=PD({inputs:{input:r},backend:n}),t=KN({inputs:{x:e},backend:n}),i=mj({inputs:{input:r},backend:n}),a=WN({inputs:{x:i},backend:n}),o=kD({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),o}return DM({backend:n,attrs:{shape:r.shape,value:1,dtype:r.dtype}})}var qN={kernelName:Nn,backendName:`cpu`,kernelFunc:KN};J();function JN(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r;if(t.length===1)return hM({inputs:{input:t[0]},backend:n,attrs:{dim:i}});let a=t[0].shape,o=t[0].dtype;t.forEach(e=>{D(a,e.shape,`All tensors passed to stack must have matching shapes`),E(o===e.dtype,()=>`All tensors passed to stack must have matching dtypes`)});let s=[],c=gj({inputs:t.map(e=>{let t=hM({inputs:{input:e},backend:n,attrs:{dim:i}});return s.push(t),t}),backend:n,attrs:{axis:i}});return s.forEach(e=>n.disposeIntermediateTensorInfo(e)),c}var YN={kernelName:Fn,backendName:`cpu`,kernelFunc:JN};J();function XN(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{paddings:a,constantValue:o}=r;Y(i,`pad`);let s=a.map((e,t)=>e[0]+i.shape[t]+e[1]),c=a.map(e=>e[0]),l=n.data.get(i.dataId).values,u=k(i.shape),d=i.shape.length,f=N(i.shape),p=k(s),m=s.length,h=N(s),g=M(i.dtype,p);o!==0&&g.fill(o);for(let e=0;e<u;e++){let t=ke(Ae(e,d,f).map((e,t)=>e+c[t]),m,h);g[t]=l[e]}return{dataId:n.write(g,s,i.dtype),shape:s,dtype:i.dtype}}var ZN={kernelName:In,backendName:`cpu`,kernelFunc:XN};J();var QN={kernelName:`Pow`,backendName:`cpu`,kernelFunc:zD(`Pow`,OD((e,t)=>e**+t))};J();function $N(e){let{inputs:t,backend:n,attrs:r}=e,{paramsNestedSplits:i,paramsDenseValues:a,indices:o}=t,{outputRaggedRank:s}=r,c=i.map(e=>n.data.get(e.dataId).values),l=i.map(e=>e.shape),u=n.data.get(a.dataId).values,d=n.data.get(o.dataId).values,[f,p,m]=uk(c,l,u,a.shape,a.dtype,d,o.shape,s),h=f.map(e=>n.makeTensorInfo([e.length],`int32`,e)),g=n.makeTensorInfo(m,a.dtype,p);return h.concat([g])}var eP={kernelName:Bn,backendName:`cpu`,kernelFunc:$N};J();function tP(e){let{inputs:t,backend:n}=e,{starts:r,limits:i,deltas:a}=t,o=n.data.get(r.dataId).values,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,[l,u]=fk(o,r.shape,r.dtype,s,i.shape,c,a.shape);return[n.makeTensorInfo([l.length],`int32`,l),n.makeTensorInfo([u.length],r.dtype,u)]}var nP={kernelName:Vn,backendName:`cpu`,kernelFunc:tP};J();function rP(e){let{inputs:t,backend:n,attrs:r}=e,{shape:i,values:a,defaultValue:o,rowPartitionTensors:s}=t,{rowPartitionTypes:c}=r,l=n.data.get(i.dataId).values,u=n.data.get(a.dataId).values,d=n.data.get(o.dataId).values,f=s.map(e=>n.data.get(e.dataId).values),p=s.map(e=>e.shape),[m,h]=_k(l,i.shape,u,a.shape,a.dtype,d,o.shape,f,p,c);return n.makeTensorInfo(m,a.dtype,h)}var iP={kernelName:Hn,backendName:`cpu`,kernelFunc:rP};J();function aP(e){let{backend:t,attrs:n}=e,{start:r,stop:i,dtype:a,step:o}=n,s=vk(r,i,o,a);return t.makeTensorInfo([s.length],a,s)}var oP={kernelName:Un,backendName:`cpu`,kernelFunc:aP};J();var sP=XD(Gn,e=>1/e),cP={kernelName:Gn,backendName:`cpu`,kernelFunc:sP};J();function lP(e){let{inputs:t,backend:n,attrs:r}=e,{images:i}=t,{alignCorners:a,halfPixelCenters:o,size:s}=r;Y(i,`resizeBilinear`);let c=N(i.shape),[l,u]=s,[d,f,p,m]=i.shape,h=n.data.get(i.dataId).values,g=new Float32Array(k([d,l,u,m])),_=[a&&l>1?f-1:f,a&&u>1?p-1:p],v=[a&&l>1?l-1:l,a&&u>1?u-1:u],y=0,b=_[0]/v[0],x=_[1]/v[1];for(let e=0;e<d;e++)for(let t=0;t<l;t++){let n;n=o?b*(t+.5)-.5:b*t;let r=Math.max(0,Math.floor(n)),i=n-r,a=Math.min(f-1,Math.ceil(n)),s=e*c[0]+r*c[1],l=e*c[0]+a*c[1];for(let e=0;e<u;e++){let t;t=o?x*(e+.5)-.5:x*e;let n=Math.max(0,Math.floor(t)),r=t-n,a=Math.min(p-1,Math.ceil(t)),u=s+n*c[2],d=l+n*c[2],f=s+a*c[2],_=l+a*c[2];for(let e=0;e<m;e++){let t=h[u+e],n=h[d+e],a=h[f+e],o=h[_+e],s=t+(a-t)*r,c=s+(n+(o-n)*r-s)*i;g[y++]=c}}}return n.makeTensorInfo([d,l,u,m],`float32`,g)}var uP={kernelName:Xn,backendName:`cpu`,kernelFunc:lP};J();function dP(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r;Y([a,i],`resizeBilinearGrad`);let s=N(i.shape),[c,l,u,d]=i.shape,[,f,p]=a.shape,m=new Float32Array(c*l*u*d),h=[o&&f>1?l-1:l,o&&p>1?u-1:u],g=[o&&f>1?f-1:f,o&&p>1?p-1:p],_=h[0]/g[0],v=h[1]/g[1],y=n.data.get(a.dataId).values,b=0;for(let e=0;e<c;e++){let t=e*s[0];for(let e=0;e<f;e++){let n=e*_,r=Math.floor(n),i=Math.min(Math.ceil(n),l-1),a=t+r*s[1],o=t+i*s[1],c=n-r,f=1-c;for(let e=0;e<p;e++){let t=e*v,n=Math.floor(t),r=Math.min(Math.ceil(t),u-1),i=t-n,l=1-i,p=a+n*s[2],h=a+r*s[2],g=o+n*s[2],_=o+r*s[2],x=f*l,S=f*i,C=c*l,w=c*i;for(let e=0;e<d;e++){let t=y[b++];m[p+e]+=t*x,m[h+e]+=t*S,m[g+e]+=t*C,m[_+e]+=t*w}}}}return n.makeTensorInfo([c,u,l,d],`float32`,m)}var fP={kernelName:Zn,backendName:`cpu`,kernelFunc:dP};J();function pP(e){let{inputs:t,backend:n,attrs:r}=e,{images:i}=t,{alignCorners:a,halfPixelCenters:o,size:s}=r;Y(i,`resizeNearestNeighbor`);let c=N(i.shape),[l,u]=s,[d,f,p,m]=i.shape,h=n.data.get(i.dataId).values,g=new Float32Array(d*l*u*m),_=[a&&l>1?f-1:f,a&&u>1?p-1:p],v=[a&&l>1?l-1:l,a&&u>1?u-1:u],y=_[0]/v[0],b=_[1]/v[1],x=0;for(let e=0;e<d;e++){let t=e*c[0];for(let e=0;e<l;e++){let n=o?y*(e+.5):y*e,r=Math.min(f-1,a?Math.round(n):Math.floor(n));o&&(r=Math.max(0,r));let i=t+r*c[1];for(let e=0;e<u;e++){let t=o?b*(e+.5):b*e,n=Math.min(p-1,a?Math.round(t):Math.floor(t));o&&(n=Math.max(0,n));let r=i+n*c[2];for(let e=0;e<m;e++){let t=h[r+e];g[x++]=t}}}}return n.makeTensorInfo([d,l,u,m],i.dtype,g)}var mP={kernelName:Jn,backendName:`cpu`,kernelFunc:pP};J();function hP(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r;Y([a,i],`resizeNearestNeighborGrad`);let s=N(i.shape),c=N(a.shape),[l,u,d,f]=i.shape,[,p,m]=a.shape,h=new Float32Array(l*u*d*f),g=n.data.get(a.dataId).values,_=[o&&p>1?u-1:u,o&&m>1?d-1:d],v=[o&&p>1?p-1:p,o&&m>1?m-1:m],y=_[0]/v[0],b=_[1]/v[1],x=1/y,S=1/b,C=Math.ceil(x)*2+2,w=Math.ceil(S)*2+2;for(let e=0;e<l;e++){let t=e*s[0];for(let e=0;e<u;e++){let n=t+e*s[1],r=Math.floor(e*x),i=Math.floor(r-C/2);for(let r=0;r<d;r++){let a=n+r*s[2],l=Math.floor(r*S),_=Math.floor(l-w/2);for(let n=0;n<f;n++){let s=0;for(let a=0;a<C;a++){let l=a+i;if(l<0||l>=p)continue;let f=t+l*c[1],h=l*y,v=Math.min(u-1,o?Math.round(h):Math.floor(h));if(e===v)for(let e=0;e<w;e++){let t=e+_;if(t<0||t>=m)continue;let i=f+t*c[2],a=t*b,l=Math.min(d-1,o?Math.round(a):Math.floor(a));r===l&&(s+=g[i+n])}}h[a+n]=s}}}}return n.makeTensorInfo(i.shape,i.dtype,h)}var gP={kernelName:Yn,backendName:`cpu`,kernelFunc:hP};J();function _P(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dims:a}=r;Y(i,`reverse`);let o=i.shape.length,s=j(a,i.shape);if(o===0)return MD({inputs:{x:i},backend:n});let c=new ra(i.shape,i.dtype),l=n.bufferSync(i);for(let e=0;e<c.size;e++){let t=c.indexToLoc(e),n=t.slice();s.forEach(e=>n[e]=i.shape[e]-1-n[e]),c.set(l.get(...n),...t)}return n.makeTensorInfo(c.shape,c.dtype,c.values)}var vP={kernelName:$n,backendName:`cpu`,kernelFunc:_P};J();var yP={kernelName:Br,backendName:`cpu`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{image:r}=e,{radians:i,fillValue:a,center:o}=t,s=n,c=M(r.dtype,k(r.shape)),[l,u,d,f]=r.shape,[p,m]=uE(o,u,d),h=Math.sin(i),g=Math.cos(i),_=s.data.get(r.dataId).values;for(let e=0;e<l;e++){let t=e*d*u*f;for(let e=0;e<u;e++){let n=d*f*e;for(let r=0;r<d;r++){let i=r*f;for(let o=0;o<f;o++){let s=[l,e,r,o],v=s[2],y=s[1],b=(v-p)*g-(y-m)*h,x=(v-p)*h+(y-m)*g;b=Math.round(b+p),x=Math.round(x+m);let S=a;if(typeof a!=`number`&&(S=o===3?255:a[o]),b>=0&&b<d&&x>=0&&x<u){let e=d*f*x,n=b*f;S=_[t+e+n+o]}let C=t+n+i+o;c[C]=S}}}}return{dataId:s.write(c,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};J();var bP=XD(er,e=>{let t=Math.floor(e);return e-t<.5?Math.floor(e):e-t>.5?Math.ceil(e):t%2==0?t:t+1}),xP={kernelName:er,backendName:`cpu`,kernelFunc:bP};J();function SP(e){let{inputs:t,backend:n,attrs:r}=e,{indices:i,updates:a}=t,{shape:o}=r,{sliceRank:s,numUpdates:c,sliceSize:l,strides:u,outputSize:d}=Oy(a,i,o),f=Sk(n.bufferSync(i),n.bufferSync(a),o,d,l,c,s,u,0,!0);return n.makeTensorInfo(o,f.dtype,f.values)}var CP={kernelName:nr,backendName:`cpu`,kernelFunc:SP};J();function wP(e,t){let n=0,r=e.length,i=0;for(;n<r;)i=Math.floor((n+r)/2),e[i]<t?n=i+1:r=i;return r}function TP(e,t){let n=0,r=e.length,i=0;for(;n<r;)i=Math.floor((n+r)/2),e[i]<=t?n=i+1:r=i;return r}function EP(e,t,n,r,i,a){let o=ue(`int32`,n*i);for(let s=0;s<n;++s){let n=e.slice(s*r,(s+1)*r),c=s*i;for(let e=0;e<i;++e)o[c+e]=a===`left`?wP(n,t[e+c]):TP(n,t[e+c])}return o}J();function DP(e){let{inputs:t,backend:n,attrs:r}=e,{sortedSequence:i,values:a}=t,{side:o}=r,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,l=EP(s,c,i.shape[0],i.shape[1],a.shape[1],o);return n.makeTensorInfo(a.shape,`int32`,l)}var OP={kernelName:ir,backendName:`cpu`,kernelFunc:DP};J();function kP(e){let{inputs:t,backend:n}=e,{condition:r,t:i,e:a}=t;Y([r,i,a],`select`);let o=r.shape.length,s=n.data.get(r.dataId).values,c=n.data.get(i.dataId).values,l=n.data.get(a.dataId).values,u=la(i.dtype,a.dtype),d=Ee(k(i.shape),u),f=0,p=o===0||o>1||i.shape.length===1?1:k(i.shape.slice(1));for(let e=0;e<s.length;e++)for(let t=0;t<p;t++)s[e]===1?d[f++]=c[e]:d[f++]=l[e];return n.makeTensorInfo(i.shape,u,d)}var AP={kernelName:ar,backendName:`cpu`,kernelFunc:kP};J();var jP=vE,MP=yE,NP=XD(or,e=>e>=0?MP*e:jP*(Math.exp(e)-1)),PP={kernelName:or,backendName:`cpu`,kernelFunc:NP};J();var FP=XD(lr,e=>e<0?-1:+(e>0)),IP={kernelName:lr,backendName:`cpu`,kernelFunc:FP};J();var LP={kernelName:`Sin`,backendName:`cpu`,kernelFunc:XD(`Sin`,e=>Math.sin(e))};J();var RP=XD(cr,e=>Math.sinh(e)),zP={kernelName:cr,backendName:`cpu`,kernelFunc:RP};J();var BP=Math.log(1.1920928955078125e-7)+2,VP=XD(dr,e=>{let t=e>-BP,n=e<BP,r=Math.exp(e),i;return i=n?r:t?e:Math.log(1+r),i}),HP={kernelName:dr,backendName:`cpu`,kernelFunc:VP};J();function UP(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,paddings:o}=r;Y([i],`spaceToBatchND`);let s=k(a),c=[[0,0]];c.push(...o);for(let e=1+a.length;e<i.shape.length;++e)c.push([0,0]);let l=ZN.kernelFunc({inputs:{x:i},backend:n,attrs:{paddings:c,constantValue:0}}),u=fE(l.shape,a,s,!1),d=pE(u.length,a.length,!1),f=mE(l.shape,a,s,!1),p=mA({inputs:{x:l},backend:n,attrs:{shape:u}}),m=QO({inputs:{x:p},backend:n,attrs:{perm:d}}),h=mA({inputs:{x:m},backend:n,attrs:{shape:f}});return n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),h}var WP={kernelName:pr,backendName:`cpu`,kernelFunc:UP};J();function GP(e){let{inputs:t,backend:n}=e,{indices:r,values:i,denseShape:a,defaultValue:o}=t;if(a.shape.length!==1)throw Error(`Dense shape must be a vector, saw:
        ${a.shape}`);if(r.shape.length!==2)throw Error(`Indices must be a matrix, saw:
        ${r.shape}`);if(i.shape.length!==1)throw Error(`Values must be a vector, saw:
        ${i.shape}`);if(o.shape.length!==0)throw Error(`Default value must be a scalar, saw:
        ${o.shape}`);let s=n.data.get(r.dataId).values,c=n.data.get(i.dataId).values,l=n.data.get(a.dataId).values,u=n.data.get(o.dataId).values[0],[d,f,p,m,h]=kk(s,r.shape,r.dtype,c,i.dtype,l,u);return[n.makeTensorInfo(f,r.dtype,d),n.makeTensorInfo([f[0]],i.dtype,p),n.makeTensorInfo([m.length],`bool`,new Uint8Array(m.map(e=>Number(e)))),n.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}var KP={kernelName:gr,backendName:`cpu`,kernelFunc:GP};J();function qP(e){let{inputs:t,backend:n}=e,{inputIndices:r,inputShape:i,newShape:a}=t;if(r.shape.length!==2)throw Error(`Input indices should be a matrix but received shape
        ${r.shape}`);if(i.shape.length!==1)throw Error(`Input shape should be a vector but received shape
        ${i.shape}`);if(a.shape.length!==1)throw Error(`Target shape should be a vector but received shape ${a.shape}`);let o=Array.from(n.data.get(i.dataId).values),s=n.data.get(r.dataId).values,c=Array.from(n.data.get(a.dataId).values),[l,u,d]=Ak(s,r.shape,r.dtype,o,c);return[n.makeTensorInfo(u,r.dtype,l),n.makeTensorInfo([d.length],a.dtype,new Int32Array(d))]}var JP={kernelName:_r,backendName:`cpu`,kernelFunc:qP};J();function YP(e){let{inputs:t,backend:n}=e,{data:r,indices:i,segmentIds:a}=t;if(r.shape.length<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.shape.length!==1)throw Error(`Indices should be a vector but received shape
          ${i.shape}`);if(a.shape.length!==1)throw Error(`Segment ids should be a vector but received shape
          ${a.shape}`);if(i.shape[0]!==a.shape[0])throw Error(`segmentIds and indices should have same size.`);let o=n.data.get(r.dataId).values,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,[l,u]=jk(o,r.shape,r.dtype,s,c,!0);return n.makeTensorInfo(u,r.dtype,l)}var XP={kernelName:vr,backendName:`cpu`,kernelFunc:YP};J();function ZP(e){let{inputs:t,backend:n}=e,{data:r,indices:i,segmentIds:a}=t;if(r.shape.length<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.shape.length!==1)throw Error(`Indices should be a vector but received shape
         ${i.shape}`);if(a.shape.length!==1)throw Error(`Segment ids should be a vector but received shape
         ${a.shape}`);if(i.shape[0]!==a.shape[0])throw Error(`segmentIds and indices should have same size.`);let o=n.data.get(r.dataId).values,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,[l,u]=jk(o,r.shape,r.dtype,s,c);return n.makeTensorInfo(u,r.dtype,l)}var QP={kernelName:yr,backendName:`cpu`,kernelFunc:ZP};J();function $P(e){let{inputs:t,backend:n,attrs:r}=e,{sparseIndices:i,sparseValues:a,defaultValue:o}=t,{outputShape:s}=r,{sliceRank:c,numUpdates:l,sliceSize:u,strides:d,outputSize:f}=Oy(a,i,s),p=n.bufferSync(i),m;switch(a.dtype){case`bool`:m=Sk(p,n.bufferSync(a),s,f,u,l,c,d,!!n.data.get(o.dataId).values[0],!1);break;case`float32`:{let e=n.bufferSync(a),t=n.data.get(o.dataId).values[0];m=Sk(p,e,s,f,u,l,c,d,t,!1);break}case`int32`:{let e=n.bufferSync(a),t=n.data.get(o.dataId).values[0];m=Sk(p,e,s,f,u,l,c,d,t,!1);break}case`string`:m=Sk(p,n.bufferSync(a),s,f,u,l,c,d,Pi(n.data.get(o.dataId).values[0]),!1);break;default:throw Error(`Unsupported type ${a.dtype}`)}return n.makeTensorInfo(s,m.dtype,m.values)}var eF={kernelName:br,backendName:`cpu`,kernelFunc:$P};J();function tF(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{numOrSizeSplits:a,axis:o}=r,s=j(o,i.shape)[0],c=JE(i,a,s),l=Array(i.shape.length).fill(0),u=i.shape.slice();return c.map(e=>{let t=[...u];t[s]=e;let r=Dk({inputs:{x:i},backend:n,attrs:{begin:l,size:t}});return l[s]+=e,r})}var nF={kernelName:mr,backendName:`cpu`,kernelFunc:tF};J();var rF={kernelName:Sr,backendName:`cpu`,kernelFunc:({inputs:e,backend:t})=>{let{x:n}=e,r=t;Y(n,`square`);let i=r.data.get(n.dataId).values,a=new Float32Array(i.length);for(let e=0;e<i.length;++e){let t=i[e];a[e]=t*t}return{dataId:r.write(a,n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}};J();var iF=XD(Rr,(e,t)=>isNaN(e)?NaN:e>0?1:t.alpha),aF={kernelName:Rr,backendName:`cpu`,kernelFunc:iF};J();function oF(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{begin:a,end:o,strides:s,beginMask:c,endMask:l,ellipsisMask:u,newAxisMask:d,shrinkAxisMask:f}=r;Y(i,`stridedSlice`);let{finalShapeSparse:p,finalShape:m,isIdentity:h,sliceDim0:g,isSimpleSlice:_,begin:v,end:y,strides:b}=LT(i.shape,a,o,s,c,l,u,d,f),x;if(h)x=mA({inputs:{x:i},backend:n,attrs:{shape:m}});else if(g||_){E(i.shape.length>=1,()=>`Input must have rank at least 1, got: ${i.shape.length}`);let e=wT(v,y,b),t=Dk({inputs:{x:i},backend:n,attrs:{begin:v,size:e}});x=mA({inputs:{x:t},backend:n,attrs:{shape:m}}),n.disposeIntermediateTensorInfo(t)}else{let e=Vk(p,n.bufferSync(i),b,v);x=n.makeTensorInfo(m,e.dtype,e.values)}return x}var sF={kernelName:wr,backendName:`cpu`,kernelFunc:oF};J();function cF(e){let{inputs:t,backend:n,attrs:r}=e,{separator:i,nGramWidths:a,leftPad:o,rightPad:s,padWidth:c,preserveShortSequences:l}=r,{data:u,dataSplits:d}=t,f=n.data.get(u.dataId).values,p=n.data.get(d.dataId).values,[m,h]=Uk(f,p,i,a,o,s,c,l);return[n.makeTensorInfo([m.length],`string`,m),n.makeTensorInfo(d.shape,`int32`,h)]}var lF={kernelName:Tr,backendName:`cpu`,kernelFunc:cF};J();function uF(e){let{inputs:t,backend:n,attrs:r}=e,{skipEmpty:i}=r,{input:a,delimiter:o}=t;if(a.dtype!==`string`)throw Error(`Input must be of datatype string`);if(a.shape.length!==1)throw Error(`Input must be a vector, got shape: ${a.shape}`);if(o.shape.length!==0)throw Error(`Delimiter must be a scalar, got shape: ${o.shape}`);let s=n.data.get(a.dataId).values,c=n.data.get(o.dataId).values[0],[l,u,d]=Gk(s,c,i),f=u.length;return[n.makeTensorInfo([f,2],`int32`,l),n.makeTensorInfo([f],`string`,u),n.makeTensorInfo([2],`int32`,new Int32Array(d))]}var dF={kernelName:Er,backendName:`cpu`,kernelFunc:uF};J();function fF(e){let{inputs:t,backend:n,attrs:r}=e,{numBuckets:i}=r,{input:a}=t;if(a.dtype!==`string`)throw Error(`Input must be of datatype string`);if(i<=0)throw Error(`Number of buckets must be at least 1`);let o=n.data.get(a.dataId).values,s=Kk(o,i);return n.makeTensorInfo(a.shape,`int32`,s)}var pF={kernelName:Dr,backendName:`cpu`,kernelFunc:fF};J();var mF={kernelName:`Tan`,backendName:`cpu`,kernelFunc:XD(`Tan`,e=>Math.tan(e))};J();var hF=XD(Or,e=>Math.tanh(e)),gF={kernelName:Or,backendName:`cpu`,kernelFunc:hF};J();function _F(e){let{inputs:t,backend:n}=e,{tensor:r,indices:i,updates:a}=t,{sliceRank:o,numUpdates:s,sliceSize:c,strides:l,outputSize:u}=Oy(a,i,r.shape),d=n.bufferSync(i),f=n.bufferSync(a),p=n.bufferSync(r),m=Sk(d,f,r.shape,u,c,s,o,l,p,!1);return n.makeTensorInfo(r.shape,m.dtype,m.values)}var vF={kernelName:rr,backendName:`cpu`,kernelFunc:_F};J();function yF(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{reps:a}=r;Y(i,`tile`);let o=Xk(n.bufferSync(i),a);return n.makeTensorInfo(o.shape,o.dtype,o.values)}var bF={kernelName:kr,backendName:`cpu`,kernelFunc:yF};J();function xF(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{k:a,sorted:o}=r;Y(i,`topk`);let s=n.data.get(i.dataId).values,[c,l]=$k(s,i.shape,i.dtype,a,o);return[n.makeTensorInfo(c.shape,c.dtype,c.values),n.makeTensorInfo(l.shape,l.dtype,l.values)]}var SF={kernelName:Ar,backendName:`cpu`,kernelFunc:xF};J();function CF(e){let{inputs:t,attrs:n,backend:r}=e,{image:i,transforms:a}=t,{interpolation:o,fillMode:s,fillValue:c,outputShape:l}=n,[u,d,f,p]=i.shape,[m,h]=l??[d,f],g=[u,m,h,p],_=N(i.shape),v=_[0],y=_[1],b=_[2],x=N(g),S=x[0],C=x[1],w=x[2],T=M(i.dtype,k(g));T.fill(c);let E=r.data.get(i.dataId).values,D=r.data.get(a.dataId).values;for(let e=0;e<u;++e){let t=a.shape[0]===1?D:D.subarray(e*8,e*8+8);for(let n=0;n<m;++n)for(let r=0;r<h;++r)for(let i=0;i<p;++i){let a,l=t[6]*r+t[7]*n+1;if(l===0)continue;let u=(t[0]*r+t[1]*n+t[2])/l,p=(t[3]*r+t[4]*n+t[5])/l,m=TF(u,f,s),h=TF(p,d,s);switch(o){case`nearest`:a=jF(E,d,f,v,y,b,e,h,m,i,c);break;case`bilinear`:a=MF(E,d,f,v,y,b,e,h,m,i,c);break;default:throw Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${o}`)}let g=e*S+n*C+r*w+i;T[g]=a}return r.makeTensorInfo(g,i.dtype,T)}return{dataId:r.write(T,g,i.dtype),shape:i.shape,dtype:i.dtype}}var wF={kernelName:jr,backendName:`cpu`,kernelFunc:CF};function TF(e,t,n){switch(n){case`reflect`:return EF(e,t);case`wrap`:return DF(e,t);case`nearest`:return kF(e,t);default:return OF(e,t)}}function EF(e,t){let n=e;if(n<0){if(t<=1)n=0;else{let e=2*t;n<e&&(n=e*Math.trunc(-n/e)+n),n=n<-t?n+e:-n-1}}else if(n>t-1){if(t<=1)n=0;else{let e=2*t;n-=e*Math.trunc(n/e),n>=t&&(n=e-n-1)}}return b(0,n,t-1)}function DF(e,t){let n=e;if(n<0){if(t<=1)n=0;else{let e=t-1;n+=t*(Math.trunc(-n/e)+1)}}else if(n>t-1){if(t<=1)n=0;else{let e=t-1;n-=t*Math.trunc(n/e)}}return b(0,n,t-1)}function OF(e,t){return e}function kF(e,t){return b(0,e,t-1)}function AF(e,t,n,r,i,a,o,s,c,l,u){let d=o*r+s*i+c*a+l;return 0<=s&&s<t&&0<=c&&c<n?e[d]:u}function jF(e,t,n,r,i,a,o,s,c,l,u){return AF(e,t,n,r,i,a,o,Math.round(s),Math.round(c),l,u)}function MF(e,t,n,r,i,a,o,s,c,l,u){let d=Math.floor(s),f=Math.floor(c),p=d+1,m=f+1,h=(m-c)*AF(e,t,n,r,i,a,o,d,f,l,u)+(c-f)*AF(e,t,n,r,i,a,o,d,m,l,u),g=(m-c)*AF(e,t,n,r,i,a,o,p,f,l,u)+(c-f)*AF(e,t,n,r,i,a,o,p,m,l,u);return(p-s)*h+(s-d)*g}J();function NF(e){let{inputs:t,attrs:n,backend:r}=e,{axis:i}=n,{x:a}=t;Y(a,`unique`);let o=r.data.get(a.dataId).values,{outputValues:s,outputShape:c,indices:l}=eA(o,i,a.shape,a.dtype);return[r.makeTensorInfo(c,a.dtype,s),r.makeTensorInfo([l.length],`int32`,l)]}var PF={kernelName:Nr,backendName:`cpu`,kernelFunc:NF};J();function FF(e){let{inputs:t,backend:n,attrs:r}=e,{value:i}=t,{axis:a}=r;a<0&&(a+=i.shape.length);let o=i.shape.length,s=i.shape[a],c=Array(o-1),l=0;for(let e=0;e<o;e++)e!==a&&(c[l++]=i.shape[e]);let u=Array(o).fill(0),d=i.shape.slice();d[a]=1;let f=Array(s);for(let e=0;e<f.length;e++){u[a]=e;let t=Dk({inputs:{x:i},backend:n,attrs:{begin:u,size:d}});f[e]=mA({inputs:{x:t},backend:n,attrs:{shape:c}}),n.disposeIntermediateTensorInfo(t)}return f}var IF={kernelName:Pr,backendName:`cpu`,kernelFunc:FF};J();function LF(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,segmentIds:a}=t,{numSegments:o}=r;Y(i,`unsortedSegmentSum`);let s=i.shape.length,c=a.shape.length,l=[],u=[],d=s-c,f=a;for(let e=0;e<d;++e){let t=hM({inputs:{input:f},backend:n,attrs:{dim:e+1}});f=t,u.push(t)}for(let e=0;e<o;++e){let t=Oi(e,`int32`),r=n.makeTensorInfo([],`int32`,t),a=rO({inputs:{a:r,b:f},backend:n}),o=LD({inputs:{x:a},backend:n,attrs:{dtype:`float32`}}),s=UO({inputs:{a:o,b:i},backend:n}),c=nM({inputs:{x:s},backend:n,attrs:{axis:0,keepDims:!1}});l.push(c),u.push(r),u.push(a),u.push(o),u.push(s),u.push(c)}let p=JN({inputs:l,backend:n,attrs:{axis:0}});return u.forEach(e=>n.disposeIntermediateTensorInfo(e)),p}var RF={kernelName:Fr,backendName:`cpu`,kernelFunc:LF};J();var zF=[yA,DD,xA,CA,UD,TA,DA,kA,jA,NA,FA,LA,zA,HA,WA,XA,QA,ej,nj,_A,ij,oj,cj,JD,uj,RD,eO,fj,AD,pj,_j,yj,xj,Cj,Tj,Dj,kj,Aj,Mj,Pj,Ij,Rj,Bj,Hj,Wj,Kj,Jj,Xj,Zj,Qj,$j,tM,aM,rA,sM,iO,mM,sO,gM,uO,EM,OM,AM,pO,gO,MM,PM,IM,RM,xO,wO,ND,BM,hj,HM,WM,KM,aA,DO,AO,JM,NO,XM,$M,tN,iN,oN,cN,uN,LO,fN,mN,gN,vN,bN,SN,wN,BO,EN,DN,MN,WO,qO,FN,RN,VN,XO,UN,qN,YN,ZN,QN,cA,nk,eP,nP,iP,oP,FD,yM,cP,uA,fA,hA,uP,fP,mP,gP,vP,yP,xP,xk,CP,OP,AP,PP,Tk,IP,LP,zP,Ok,kN,HP,WP,KP,JP,XP,QP,eF,nF,Pk,rF,Lk,Bk,aF,sF,lF,dF,pF,Yk,rM,mF,gF,vF,bF,SF,wF,$O,PF,IF,RF,GN];for(let e of zF)Xr(e);J();var BF={},VF={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function HF(e,t){BF[e]=t}function UF(e,t){if(!(e in BF)||t!=null){let n=GF(e,t);if(n!==null)BF[e]=n;else return console.log(`Could not get context for WebGL version`,e),null}let n=BF[e];return n==null||n.isContextLost()?(delete BF[e],UF(e)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),BF[e])}function WF(e){if(!P().getBool(`IS_SAFARI`)&&typeof OffscreenCanvas<`u`&&e===2)return new OffscreenCanvas(300,150);if(typeof document<`u`)return document.createElement(`canvas`);throw Error(`Cannot create a canvas in this context`)}function GF(e,t){if(e!==1&&e!==2)throw Error(`Cannot get WebGL rendering context, WebGL is disabled.`);let n=t??WF(e);return n.addEventListener(`webglcontextlost`,t=>{t.preventDefault(),delete BF[e]},!1),P().getBool(`SOFTWARE_WEBGL_ENABLED`)&&(VF.failIfMajorPerformanceCaveat=!1),e===1?n.getContext(`webgl`,VF)||n.getContext(`experimental-webgl`,VF):n.getContext(`webgl2`,VF)}J();var KF;(function(e){e[e.DENSE=0]=`DENSE`,e[e.SHARED_BATCH=1]=`SHARED_BATCH`})(KF||={});var qF;(function(e){e[e.RENDER=0]=`RENDER`,e[e.UPLOAD=1]=`UPLOAD`,e[e.PIXELS=2]=`PIXELS`,e[e.DOWNLOAD=3]=`DOWNLOAD`})(qF||={});var JF;(function(e){e[e.UNPACKED_FLOAT16=0]=`UNPACKED_FLOAT16`,e[e.UNPACKED_FLOAT32=1]=`UNPACKED_FLOAT32`,e[e.PACKED_4X1_UNSIGNED_BYTE=2]=`PACKED_4X1_UNSIGNED_BYTE`,e[e.PACKED_2X2_FLOAT32=3]=`PACKED_2X2_FLOAT32`,e[e.PACKED_2X2_FLOAT16=4]=`PACKED_2X2_FLOAT16`})(JF||={});function YF(e,t){return[t,e]}function XF(e,t){return e*t}function ZF(e){let t=k(e);return ie(Math.ceil(t/4))}function QF(e,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(e/2))]}function $F(e,t){let[n,r]=QF(e,t);return n*r*4}function eI(e,t){let n=e,r,i,a,o,s,c,l,u,d,f;return P().getNumber(`WEBGL_VERSION`)===2?(r=n.R32F,i=n.R16F,a=n.RGBA16F,o=n.RGBA32F,s=n.RED,l=4,u=1,d=n.HALF_FLOAT,f=n.FLOAT,c=n.RGBA8):(r=e.RGBA,i=e.RGBA,a=e.RGBA,o=n.RGBA,s=e.RGBA,l=4,u=4,d=t==null?null:t.HALF_FLOAT_OES,f=e.FLOAT,c=e.RGBA),{internalFormatFloat:r,internalFormatHalfFloat:i,internalFormatPackedHalfFloat:a,internalFormatPackedFloat:o,textureFormatFloat:s,downloadTextureFormat:c,downloadUnpackNumChannels:l,defaultNumChannels:u,textureTypeHalfFloat:d,textureTypeFloat:f}}J();function X(e,t){let n=t();return P().getBool(`DEBUG`)&&tI(e),n}function tI(e){let t=e.getError();if(t!==e.NO_ERROR)throw Error(`WebGL Error: `+aI(e,t))}var nI=5.96e-8,rI=65504;function iI(e){return!!(P().getBool(`WEBGL_RENDER_FLOAT32_ENABLED`)||e===0||nI<Math.abs(e)&&Math.abs(e)<rI)}function aI(e,t){switch(t){case e.NO_ERROR:return`NO_ERROR`;case e.INVALID_ENUM:return`INVALID_ENUM`;case e.INVALID_VALUE:return`INVALID_VALUE`;case e.INVALID_OPERATION:return`INVALID_OPERATION`;case e.INVALID_FRAMEBUFFER_OPERATION:return`INVALID_FRAMEBUFFER_OPERATION`;case e.OUT_OF_MEMORY:return`OUT_OF_MEMORY`;case e.CONTEXT_LOST_WEBGL:return`CONTEXT_LOST_WEBGL`;default:return`Unknown error code ${t}`}}function oI(e,t){return OI(e,()=>e.getExtension(t),`Extension "`+t+`" not supported on this browser.`)}function sI(e,t){let n=OI(e,()=>e.createShader(e.VERTEX_SHADER),`Unable to create vertex WebGLShader.`);if(X(e,()=>e.shaderSource(n,t)),X(e,()=>e.compileShader(n)),e.getShaderParameter(n,e.COMPILE_STATUS)===!1)throw console.log(e.getShaderInfoLog(n)),Error(`Failed to compile vertex shader.`);return n}function cI(e,t){let n=OI(e,()=>e.createShader(e.FRAGMENT_SHADER),`Unable to create fragment WebGLShader.`);if(X(e,()=>e.shaderSource(n,t)),X(e,()=>e.compileShader(n)),P().get(`ENGINE_COMPILE_ONLY`))return n;if(e.getShaderParameter(n,e.COMPILE_STATUS)===!1)throw uI(t,e.getShaderInfoLog(n)),Error(`Failed to compile fragment shader.`);return n}var lI=/ERROR: [0-9]+:([0-9]+):/g;function uI(e,t){let n=lI.exec(t);if(n==null){console.log(`Couldn't parse line number in error: ${t}`),console.log(e);return}let r=+n[1],i=e.split(`
`),a=i.length.toString().length+2,o=i.map((e,t)=>oe((t+1).toString(),a)+e),s=0;for(let e=0;e<o.length;e++)s=Math.max(o[e].length,s);let c=o.slice(0,r-1),l=o.slice(r-1,r),u=o.slice(r);console.log(c.join(`
`)),console.log(t.split(`
`)[0]),console.log(`%c ${oe(l[0],s)}`,`border:1px solid red; background-color:#e3d2d2; color:#a61717`),console.log(u.join(`
`))}function dI(e){return OI(e,()=>e.createProgram(),`Unable to create WebGLProgram.`)}function fI(e,t){if(X(e,()=>e.linkProgram(t)),!P().get(`ENGINE_COMPILE_ONLY`)&&e.getProgramParameter(t,e.LINK_STATUS)===!1)throw console.log(e.getProgramInfoLog(t)),Error(`Failed to link vertex and fragment shaders.`)}function pI(e,t){if(X(e,()=>e.validateProgram(t)),e.getProgramParameter(t,e.VALIDATE_STATUS)===!1)throw console.log(e.getProgramInfoLog(t)),Error(`Shader program validation failed.`)}function mI(e,t){let n=OI(e,()=>e.createBuffer(),`Unable to create WebGLBuffer`);return X(e,()=>e.bindBuffer(e.ARRAY_BUFFER,n)),X(e,()=>e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW)),n}function hI(e,t){let n=OI(e,()=>e.createBuffer(),`Unable to create WebGLBuffer`);return X(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n)),X(e,()=>e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,e.STATIC_DRAW)),n}function gI(e){return OI(e,()=>e.createTexture(),`Unable to create WebGLTexture.`)}function _I(e,t){let n=P().getNumber(`WEBGL_MAX_TEXTURE_SIZE`);if(e<=0||t<=0){let n=`[${e}x${t}]`;throw Error(`Requested texture size `+n+` is invalid.`)}if(e>n||t>n){let r=`[${e}x${t}]`,i=`[${n}x${n}]`;throw Error(`Requested texture size `+r+` greater than WebGL maximum on this browser / GPU `+i+`.`)}}function vI(e){return OI(e,()=>e.createFramebuffer(),`Unable to create WebGLFramebuffer.`)}function yI(e,t,n,r,i,a,o){let s=e.getAttribLocation(t,n);return s!==-1&&(X(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r)),X(e,()=>e.vertexAttribPointer(s,i,e.FLOAT,!1,a,o)),X(e,()=>e.enableVertexAttribArray(s)),!0)}function bI(e,t,n){kI(e,n),X(e,()=>e.activeTexture(e.TEXTURE0+n)),X(e,()=>e.bindTexture(e.TEXTURE_2D,t))}function xI(e,t,n){return OI(e,()=>e.getUniformLocation(t,n),`uniform "`+n+`" not present in program.`)}function SI(e,t,n){return e.getUniformLocation(t,n)}function CI(e,t,n,r){X(e,()=>bI(e,t,r)),X(e,()=>e.uniform1i(n,r))}function wI(e,t,n){X(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,n)),X(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0))}function TI(e,t){X(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,t)),X(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0))}function EI(e){let t=e.checkFramebufferStatus(e.FRAMEBUFFER);if(t!==e.FRAMEBUFFER_COMPLETE)throw Error(`Error binding framebuffer: `+DI(e,t))}function DI(e,t){switch(t){case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return`FRAMEBUFFER_INCOMPLETE_ATTACHMENT`;case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return`FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT`;case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return`FRAMEBUFFER_INCOMPLETE_DIMENSIONS`;case e.FRAMEBUFFER_UNSUPPORTED:return`FRAMEBUFFER_UNSUPPORTED`;default:return`unknown error ${t}`}}function OI(e,t,n){let r=X(e,()=>t());if(r==null)throw Error(n);return r}function kI(e,t){let n=e.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,r=t+e.TEXTURE0;if(r<e.TEXTURE0||r>n){let e=`[gl.TEXTURE0, gl.TEXTURE${n}]`;throw Error(`textureUnit must be in ${e}.`)}}function AI(e,t=2){return k(e.slice(0,e.length-t))}function jI(e){if(e.length===0)throw Error(`Cannot get rows and columns of an empty shape array.`);return[e.length>1?e[e.length-2]:1,e[e.length-1]]}function MI(e){let t=[1,1,1];return e.length===0||e.length===1&&e[0]===1||(t=[AI(e),...jI(e)]),t}function NI(e,t=!1){let n=P().getNumber(`WEBGL_MAX_TEXTURE_SIZE`),r=P().getNumber(`WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE`);r===1/0&&P().getBool(`WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE`)&&(r=n/2),t&&(n*=2,r*=2,e=e.map((t,n)=>n>=e.length-2?x(e[n]):e[n]),e.length===1&&(e=[2,e[0]])),e.length!==2&&(e=le(e).newShape);let i=k(e),a=null;e.length<=1&&i<=n?a=[1,i]:e.length===2&&e[0]<=n&&e[1]<=n?a=e:e.length===3&&e[0]*e[1]<=n&&e[2]<=n?a=[e[0]*e[1],e[2]]:e.length===3&&e[0]<=n&&e[1]*e[2]<=n?a=[e[0],e[1]*e[2]]:e.length===4&&e[0]*e[1]*e[2]<=n&&e[3]<=n?a=[e[0]*e[1]*e[2],e[3]]:e.length===4&&e[0]<=n&&e[1]*e[2]*e[3]<=n&&(a=[e[0],e[1]*e[2]*e[3]]);let o=a!=null&&Math.max(...a)>r&&Math.min(...a)<=(t?2:1)&&Math.min(...a)>0;if(a==null||o){if(t){let t=AI(e),n=2,r=2;e.length&&([n,r]=jI(e)),i=n/2*t*(r/2),a=ie(i).map(e=>e*2)}else a=ie(i)}return a}function PI(e){return e%2==0}function FI(e,t){if(e=e.slice(-2),t=t.slice(-2),A(e,t)||!e.length||!t.length||e[0]===0||e[1]===0||t[0]===0||t[1]===0)return!0;if(e.length!==t.length){let n=e[e.length-1],r=t[t.length-1];if(n===r||PI(n)&&PI(r)&&(e[0]===1||t[0]===1))return!0}return e[1]===t[1]&&PI(e[0])&&PI(t[0])}var II,LI;function RI(e){if(II==null){let t=UF(e);II=t.getParameter(t.MAX_TEXTURE_SIZE)}return II}function zI(e){if(LI==null){let t=UF(e);LI=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,LI)}function BI(e){if(e===0)return 0;let t,n=UF(e);return t=VI(n,`EXT_disjoint_timer_query_webgl2`)&&e===2?2:+!!VI(n,`EXT_disjoint_timer_query`),t}function VI(e,t){return e.getExtension(t)!=null}function HI(e){try{if(UF(e)!=null)return!0}catch(e){return console.log(`Error when getting WebGL context: `,e),!1}return!1}function UI(e){if(e===0)return!1;let t=UF(e);if(e===1){if(!VI(t,`OES_texture_float`))return!1}else if(!VI(t,`EXT_color_buffer_float`))return!1;return GI(t)}function WI(e){if(e===0)return!1;let t=UF(e);if(e===1){if(!VI(t,`OES_texture_float`)||!VI(t,`WEBGL_color_buffer_float`))return!1}else{if(VI(t,`EXT_color_buffer_float`))return GI(t);let e=`EXT_color_buffer_half_float`;return VI(t,e)?KI(t,t.getExtension(e)):!1}return GI(t)}function GI(e){let t=eI(e),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);let r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(r),i}function KI(e,t){let n=eI(e,t),r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,n.internalFormatHalfFloat,1,1,0,n.textureFormatFloat,n.textureTypeHalfFloat,null);let i=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let a=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(i),a}function qI(e){return e===2&&UF(e).fenceSync!=null}function JI(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{e!=null&&E(e.dtype!==`complex64`,()=>`${t} does not support complex64 tensors in the WebGL backend.`)})}J();var Z=P();Z.registerFlag(`HAS_WEBGL`,()=>Z.getNumber(`WEBGL_VERSION`)>0),Z.registerFlag(`WEBGL_VERSION`,()=>HI(2)?2:+!!HI(1)),Z.registerFlag(`WEBGL_CHECK_NUMERICAL_PROBLEMS`,()=>!1),Z.registerFlag(`WEBGL_BUFFER_SUPPORTED`,()=>Z.get(`WEBGL_VERSION`)===2),Z.registerFlag(`WEBGL_CPU_FORWARD`,()=>!0),Z.registerFlag(`WEBGL_FORCE_F16_TEXTURES`,()=>!1),Z.registerFlag(`WEBGL_PACK`,()=>Z.getBool(`HAS_WEBGL`)),Z.registerFlag(`WEBGL_PACK_NORMALIZATION`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_PACK_CLIP`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_PACK_DEPTHWISECONV`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_PACK_BINARY_OPERATIONS`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_PACK_UNARY_OPERATIONS`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_PACK_ARRAY_OPERATIONS`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_PACK_IMAGE_OPERATIONS`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_PACK_REDUCE`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_LAZILY_UNPACK`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_CONV_IM2COL`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_PACK_CONV2DTRANSPOSE`,()=>Z.getBool(`WEBGL_PACK`)),Z.registerFlag(`WEBGL_MAX_TEXTURE_SIZE`,()=>RI(Z.getNumber(`WEBGL_VERSION`))),Z.registerFlag(`WEBGL_MAX_TEXTURES_IN_SHADER`,()=>zI(Z.getNumber(`WEBGL_VERSION`))),Z.registerFlag(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`,()=>{let e=Z.getNumber(`WEBGL_VERSION`);return e===0?0:BI(e)}),Z.registerFlag(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`,()=>Z.getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`)>0&&!La()),Z.registerFlag(`WEBGL_RENDER_FLOAT32_CAPABLE`,()=>UI(Z.getNumber(`WEBGL_VERSION`))),Z.registerFlag(`WEBGL_RENDER_FLOAT32_ENABLED`,()=>!Z.getBool(`WEBGL_FORCE_F16_TEXTURES`)&&Z.getBool(`WEBGL_RENDER_FLOAT32_CAPABLE`)),Z.registerFlag(`WEBGL_DOWNLOAD_FLOAT_ENABLED`,()=>WI(Z.getNumber(`WEBGL_VERSION`))),Z.registerFlag(`WEBGL_FENCE_API_ENABLED`,()=>qI(Z.getNumber(`WEBGL_VERSION`))),Z.registerFlag(`WEBGL_SIZE_UPLOAD_UNIFORM`,()=>Z.getBool(`WEBGL_RENDER_FLOAT32_ENABLED`)?4:0),Z.registerFlag(`WEBGL_DELETE_TEXTURE_THRESHOLD`,()=>-1,e=>{if(typeof e!=`number`)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${e}.`);if(e<0&&e!==-1)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${e}.`)}),Z.registerFlag(`WEBGL_FLUSH_THRESHOLD`,()=>La()?1:-1,e=>{if(typeof e!=`number`)throw Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${e}.`);if(e<0&&e!==-1)throw Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${e}.`)}),Z.registerFlag(`CPU_HANDOFF_SIZE_THRESHOLD`,()=>128),Z.registerFlag(`WEBGL_USE_SHAPES_UNIFORMS`,()=>!1),Z.registerFlag(`TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD`,()=>1e5),Z.registerFlag(`TOPK_K_CPU_HANDOFF_THRESHOLD`,()=>128),Z.registerFlag(`WEBGL_EXP_CONV`,()=>!1),Z.registerFlag(`SOFTWARE_WEBGL_ENABLED`,()=>Z.getBool(`IS_TEST`)),Z.registerFlag(`WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE`,()=>1/0),Z.registerFlag(`WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE`,()=>!1),Z.registerFlag(`WEBGL2_ISNAN_CUSTOM`,()=>!1),Z.registerFlag(`ENGINE_COMPILE_ONLY`,()=>!1),J();function YI(){let e,t,n,r,i,a,o,s,c,l;return P().getNumber(`WEBGL_VERSION`)===2?(e=`#version 300 es`,t=`in`,n=`out`,r=`in`,i=`texture`,a=`outputColor`,o=`out vec4 outputColor;`,s=P().getBool(`WEBGL2_ISNAN_CUSTOM`)?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:``,c=``,l=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(e=``,t=`attribute`,n=`varying`,r=`varying`,i=`texture2D`,a=`gl_FragColor`,o=``,s=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,c=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,l=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:e,attribute:t,varyingVs:n,varyingFs:r,texture2D:i,output:a,defineOutput:o,defineSpecialNaN:s,defineSpecialInf:c,defineRound:l}}J();function XI(e,t,n=`index`){let r=N(t);return r.map((t,i)=>`${`int ${e[i]} = ${n} / ${t}`}; ${i===r.length-1?`int ${e[i+1]} = ${n} - ${e[i]} * ${t}`:`index -= ${e[i]} * ${t}`};`).join(``)}function ZI(e,t,n=`index`){let r=N(t);return r.map((t,i)=>`${`int ${e[i]} = ${n} / outShapeStrides[${i}]`}; ${i===r.length-1?`int ${e[i+1]} = ${n} - ${e[i]} * outShapeStrides[${i}]`:`index -= ${e[i]} * outShapeStrides[${i}]`};`).join(``)}function QI(e,t){let n=e.length,r=e.map(e=>`${t}[${e}]`),i=Array(n-1);i[n-2]=r[n-1];for(let e=n-3;e>=0;--e)i[e]=`(${i[e+1]} * ${r[e+1]})`;return i}function $I(e,t,n=`index`){let r=QI(e.map((e,t)=>t),t);return r.map((t,i)=>`${`int ${e[i]} = ${n} / ${r[i]}`}; ${i===r.length-1?`int ${e[i+1]} = ${n} - ${e[i]} * ${r[i]}`:`index -= ${e[i]} * ${r[i]}`};`).join(``)}function eL(e){let t=N(e).map(e=>e.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;
  }
`}function tL(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}var nL=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;J();var{getBroadcastDims:rL}=gD;function iL(e,t,n){let r=[];if(e.forEach(e=>{let t=k(e.shapeInfo.logicalShape);if(e.shapeInfo.isUniform?r.push(`uniform float ${e.name}${t>1?`[${t}]`:``};`):(r.push(`uniform sampler2D ${e.name};`),r.push(`uniform int offset${e.name};`)),n.enableShapeUniforms){let{uniformShape:t}=KL(n.packedInputs,e.shapeInfo.logicalShape,e.shapeInfo.texShape);switch(t.length){case 1:r.push(`uniform int ${e.name}Shape;`);break;case 2:r.push(`uniform ivec2 ${e.name}Shape;`);break;case 3:r.push(`uniform ivec3 ${e.name}Shape;`);break;case 4:r.push(`uniform ivec4 ${e.name}Shape;`)}r.push(`uniform ivec2 ${e.name}TexShape;`)}}),n.enableShapeUniforms){switch(t.logicalShape.length){case 1:r.push(`uniform int outShape;`);break;case 2:r.push(`uniform ivec2 outShape;`),r.push(`uniform int outShapeStrides;`);break;case 3:r.push(`uniform ivec3 outShape;`),r.push(`uniform ivec2 outShapeStrides;`);break;case 4:r.push(`uniform ivec4 outShape;`),r.push(`uniform ivec3 outShapeStrides;`)}r.push(`uniform ivec2 outTexShape;`)}n.customUniforms&&n.customUniforms.forEach(e=>{r.push(`uniform ${e.type} ${e.name}${e.arrayIndex?`[${e.arrayIndex}]`:``};`)});let i=r.join(`
`),a=e.map(e=>sL(e,t,n.packedInputs,n.enableShapeUniforms)).join(`
`),o=t.texShape,s=YI(),c=uL(s),l,u,d=pL(s);return t.isPacked?(l=cL(t.logicalShape,o,n.enableShapeUniforms),u=fL(s)):(l=lL(t.logicalShape,o,n.enableShapeUniforms),u=dL(s)),n.packedInputs&&(d+=_L),[d,c,u,i,l,a,n.userCode].join(`
`)}function aL(e,t=!1){let n=e.shapeInfo.logicalShape;switch(n.length){case 0:return jL(e,t);case 1:return NL(e,t);case 2:return FL(e,t);case 3:return LL(e,t);case 4:return zL(e,t);case 5:return BL(e);case 6:return VL(e);default:throw Error(`${n.length}-D input sampling is not yet supported`)}}function oL(e,t){switch(e.shapeInfo.logicalShape.length){case 0:return AL(e);case 1:return ML(e,t);case 2:return PL(e,t);case 3:return IL(e,t);default:return RL(e,t)}}function sL(e,t,n=!1,r){let i=``;i+=n?oL(e,r):aL(e,r);let a=e.shapeInfo.logicalShape,o=t.logicalShape;return a.length<=o.length&&(i+=n?UL(e,t):WL(e,t)),i}function cL(e,t,n){switch(e.length){case 0:return vL();case 1:return yL(e,t,n);case 2:return DL(e,t,n);case 3:return xL(e,t,n);default:return CL(e,t,n)}}function lL(e,t,n){switch(e.length){case 0:return vL();case 1:return bL(e,t,n);case 2:return OL(e,t,n);case 3:return SL(e,t,n);case 4:return wL(e,t,n);case 5:return TL(e,t);case 6:return EL(e,t);default:throw Error(`${e.length}-D output sampling is not yet supported`)}}function uL(e){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${e.texture2D}(textureSampler, uv).r;
    }
  `}function dL(e){return`
    void setOutput(float val) {
      ${e.output} = vec4(val, 0, 0, 0);
    }
  `}function fL(e){return`
    void setOutput(vec4 val) {
      ${e.output} = val;
    }
  `}function pL(e){return`${e.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${e.varyingFs} vec2 resultUV;
    ${e.defineOutput}
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    ${e.defineSpecialNaN}
    ${e.defineSpecialInf}
    ${e.defineRound}

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${mL}
    ${hL}
    ${gL}
  `}var mL=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,hL=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,gL=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,_L=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function vL(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function yL(e,t,n){let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];return r[0]===1?n?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${r[1]}.0);
      }
    `:r[1]===1?n?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${r[0]}.0);
      }
    `:n?`
    int getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      return 2 * (resTexRC.x * ${r[1]} + resTexRC.y);
    }
  `}function bL(e,t,n){return t[0]===1?n?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${t[1]}.0);
      }
    `:t[1]===1?n?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${t[0]}.0);
      }
    `:n?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      return resTexRC.x * ${t[1]} + resTexRC.y;
    }
  `}function xL(e,t,n){if(n)return`
    ivec3 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec3(b, r, c);
    }
  `;let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],i=Math.ceil(e[2]/2),a=i*Math.ceil(e[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      int b = index / ${a};
      index -= b * ${a};

      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec3(b, r, c);
    }
  `}function SL(e,t,n){if(n)return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${ZI([`r`,`c`,`d`],e)}
    return ivec3(r, c, d);
  }
`;let r=XI([`r`,`c`,`d`],e);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${r}
      return ivec3(r, c, d);
    }
  `}function CL(e,t,n){if(n)return`
    ivec4 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatchN = texelsInBatch * outShape[1];

      int b2 = index / texelsInBatchN;
      index -= b2 * texelsInBatchN;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec4(b2, b, r, c);
    }
  `;let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],i=Math.ceil(e[e.length-1]/2),a=i*Math.ceil(e[e.length-2]/2),o=a,s=``,c=`b, r, c`;for(let t=2;t<e.length-1;t++)o*=e[e.length-t-1],s=`
      int b${t} = index / ${o};
      index -= b${t} * ${o};
    `+s,c=`b${t}, `+c;return`
    ivec${e.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      ${s}

      int b = index / ${a};
      index -= b * ${a};

      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec${e.length}(${c});
    }
  `}function wL(e,t,n){if(n)return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${ZI([`r`,`c`,`d`,`d2`],e)}
      return ivec4(r, c, d, d2);
    }
  `;let r=XI([`r`,`c`,`d`,`d2`],e);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${r}
      return ivec4(r, c, d, d2);
    }
  `}function TL(e,t){let n=XI([`r`,`c`,`d`,`d2`,`d3`],e);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${t[0]},
                             ${t[1]}));

      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${n}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}function EL(e,t){let n=XI([`r`,`c`,`d`,`d2`,`d3`,`d4`],e);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${n}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}function DL(e,t,n){let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(A(e,t))return n?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${r[0]}, ${r[1]}));
      }
    `;let i=Math.ceil(e[1]/2);return n?`
    ivec2 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));

      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;
      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));

      int index = resTexRC.x * ${r[1]} + resTexRC.y;
      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec2(r, c);
    }
  `}function OL(e,t,n){return A(e,t)?n?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${t[0]}, ${t[1]}));
      }
    `:e[1]===1?n?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:e[0]===1?n?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:n?`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      int r = index / outShape[1];
      int c = index - r * outShape[1];
      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      int r = index / ${e[1]};
      int c = index - r * ${e[1]};
      return ivec2(r, c);
    }
  `}function kL(e){return`offset${e}`}function AL(e){let t=e.name;return`
    vec4 ${`get`+t.charAt(0).toUpperCase()+t.slice(1)}() {
      return ${YI().texture2D}(${t}, halfCR);
    }
  `}function jL(e,t){let n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return`float ${r}() {return ${n};}`;let[i,a]=e.shapeInfo.texShape;if(i===1&&a===1)return`
      float ${r}() {
        return sampleTexture(${n}, halfCR);
      }
    `;let o=kL(n);if(t)return`
    float ${r}() {
      vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], ${o});
      return sampleTexture(${n}, uv);
    }
  `;let[s,c]=e.shapeInfo.texShape;return`
    float ${r}() {
      vec2 uv = uvFromFlat(${s}, ${c}, ${o});
      return sampleTexture(${n}, uv);
    }
  `}function ML(e,t){let n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1),i=e.shapeInfo.texShape,a=YI();if(t)return`
    vec4 ${r}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${n}TexShape[0]) / 2.0), ceil(float(${n}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${a.texture2D}(${n}, uv);
    }
  `;let o=[Math.ceil(i[0]/2),Math.ceil(i[1]/2)];return`
    vec4 ${r}(int index) {
      vec2 uv = packedUVfrom1D(
        ${o[0]}, ${o[1]}, index);
      return ${a.texture2D}(${n}, uv);
    }
  `}function NL(e,t){let n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return`
      float ${r}(int index) {
        ${HL(e)}
      }
    `;let i=e.shapeInfo.texShape,a=i[0],o=i[1];if(o===1&&a===1)return`
      float ${r}(int index) {
        return sampleTexture(${n}, halfCR);
      }
    `;let s=kL(n);return o===1?t?`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${s}) + 0.5) / float(${n}TexShape[0]));
        return sampleTexture(${n}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${s}) + 0.5) / ${a}.0);
        return sampleTexture(${n}, uv);
      }
    `:a===1?t?`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${s}) + 0.5) / float(${n}TexShape[1]), 0.5);
        return sampleTexture(${n}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${s}) + 0.5) / ${o}.0, 0.5);
        return sampleTexture(${n}, uv);
      }
    `:t?`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], index + ${s});
      return sampleTexture(${n}, uv);
    }
  `:`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${a}, ${o}, index + ${s});
      return sampleTexture(${n}, uv);
    }
  `}function PL(e,t){let n=e.shapeInfo.logicalShape,r=e.name,i=`get`+r.charAt(0).toUpperCase()+r.slice(1),a=e.shapeInfo.texShape,o=a[0],s=a[1],c=YI();if(a!=null&&A(n,a))return t?`
      vec4 ${i}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);

        return ${c.texture2D}(${r}, uv);
      }
    `:`
      vec4 ${i}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${s}.0, ${o}.0);

        return ${c.texture2D}(${r}, uv);
      }
    `;if(t)return`
    vec4 ${i}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${r}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${c.texture2D}(${r}, uv);
    }
  `;let l=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)];return`
    vec4 ${i}(int row, int col) {
      vec2 uv = packedUVfrom2D(${Math.ceil(n[1]/2)}, ${l[0]}, ${l[1]}, row, col);
      return ${c.texture2D}(${r}, uv);
    }
  `}function FL(e,t){let n=e.shapeInfo.logicalShape,r=e.name,i=`get`+r.charAt(0).toUpperCase()+r.slice(1),a=e.shapeInfo.texShape;if(a!=null&&A(n,a)){if(t)return`
      float ${i}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `;let e=a[0];return`
    float ${i}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${a[1]}.0, ${e}.0);
      return sampleTexture(${r}, uv);
    }
  `}let{newShape:o,keptDims:s}=le(n),c=o;if(c.length<n.length)return`
      ${aL(qL(e,c),t)}
      float ${i}(int row, int col) {
        return ${i}(${JL([`row`,`col`],s)});
      }
    `;if(e.shapeInfo.isUniform)return`
      float ${i}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${n[1]}, 1)));
        ${HL(e)}
      }
    `;let l=a[0],u=a[1],d=kL(r);return u===1?t?`
      float ${i}(int row, int col) {
        float index = dot(vec3(row, col, ${d}), vec3(${r}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${r}TexShape[0]));
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${i}(int row, int col) {
      float index = dot(vec3(row, col, ${d}), vec3(${n[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
      return sampleTexture(${r}, uv);
    }
  `:l===1?t?`
      float ${i}(int row, int col) {
        float index = dot(vec3(row, col, ${d}), vec3(${r}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${r}TexShape[1]), 0.5);
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${i}(int row, int col) {
      float index = dot(vec3(row, col, ${d}), vec3(${n[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${u}.0, 0.5);
      return sampleTexture(${r}, uv);
    }
  `:t?`
      float ${i}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${r}Shape[1] + col + ${d};
        vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index);
        return sampleTexture(${r}, uv);
      }
    `:`
  float ${i}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${n[1]} + col + ${d};
    vec2 uv = uvFromFlat(${l}, ${u}, index);
    return sampleTexture(${r}, uv);
  }
`}function IL(e,t){let n=e.shapeInfo.logicalShape,r=e.name,i=`get`+r.charAt(0).toUpperCase()+r.slice(1),a=e.shapeInfo.texShape,o=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)];if(n[0]===1)return`
        ${oL(qL(e,n.slice(1)),t)}
        vec4 ${i}(int b, int row, int col) {
          return ${i}(${JL([`b`,`row`,`col`],[1,2])});
        }
      `;let s=YI();if(t)return`
    vec4 ${i}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${r}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${r}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${s.texture2D}(${r}, uv);
    }
  `;let c=o[0],l=o[1],u=Math.ceil(n[2]/2);return`
    vec4 ${i}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${l}, ${u*Math.ceil(n[1]/2)}, ${u}, b, row, col);
      return ${s.texture2D}(${r}, uv);
    }
  `}function LL(e,t){let n=e.shapeInfo.logicalShape,r=e.name,i=`get`+r.charAt(0).toUpperCase()+r.slice(1),a=n[1]*n[2],o=n[2],{newShape:s,keptDims:c}=le(n),l=s;if(l.length<n.length)return`
        ${aL(qL(e,l),t)}
        float ${i}(int row, int col, int depth) {
          return ${i}(${JL([`row`,`col`,`depth`],c)});
        }
      `;if(e.shapeInfo.isUniform)return`
      float ${i}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${a}, ${o}, 1)));
        ${HL(e)}
      }
    `;let u=e.shapeInfo.texShape,d=u[0],f=u[1],p=e.shapeInfo.flatOffset;if(f===a&&p==null)return t?`
      float ${i}(int row, int col, int depth) {
        int stride1 = ${r}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
        float ${i}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${o}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${f}.0, ${d}.0);
          return sampleTexture(${r}, uv);
        }
      `;if(f===o&&p==null)return t?`
      float ${i}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${r}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${i}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${n[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${f}.0, ${d}.0);
      return sampleTexture(${r}, uv);
    }
  `;let m=kL(r);return t?`
    float ${i}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${r}Shape[1] * ${r}Shape[2];
      int stride1 = ${r}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${m};
      vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index);
      return sampleTexture(${r}, uv);
    }
    `:`
      float ${i}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${a} + col * ${o} + depth + ${m};
        vec2 uv = uvFromFlat(${d}, ${f}, index);
        return sampleTexture(${r}, uv);
      }
  `}function RL(e,t){let n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1),i=YI();if(t)return`
    vec4 ${r}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${n}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${n}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${n}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${n}TexShape[0]) / 2.0), ceil(float(${n}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${i.texture2D}(${n}, uv);
    }
  `;let a=e.shapeInfo.logicalShape,o=a.length,s=e.shapeInfo.texShape,c=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],l=c[0],u=c[1],d=Math.ceil(a[o-1]/2),f=d*Math.ceil(a[o-2]/2),p=`int b, int row, int col`,m=`b * ${f} + (row / 2) * ${d} + (col / 2)`;for(let e=2;e<o-1;e++)p=`int b${e}, `+p,f*=a[o-e-1],m=`b${e} * ${f} + `+m;return`
    vec4 ${r}(${p}) {
      int index = ${m};
      int texR = index / ${u};
      int texC = index - texR * ${u};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${u}, ${l});
      return ${i.texture2D}(${n}, uv);
    }
  `}function zL(e,t){let n=e.shapeInfo.logicalShape,r=e.name,i=`get`+r.charAt(0).toUpperCase()+r.slice(1),a=n[3],o=n[2]*a,s=n[1]*o,{newShape:c,keptDims:l}=le(n);if(c.length<n.length)return`
      ${aL(qL(e,c),t)}
      float ${i}(int row, int col, int depth, int depth2) {
        return ${i}(${JL([`row`,`col`,`depth`,`depth2`],l)});
      }
    `;if(e.shapeInfo.isUniform)return`
      float ${i}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${s}, ${o}, ${a}, 1)));
        ${HL(e)}
      }
    `;let u=e.shapeInfo.flatOffset,d=e.shapeInfo.texShape,f=d[0],p=d[1],m=`int stride2 = ${r}Shape[3];`,h=`int stride1 = ${r}Shape[2] * stride2;`,g=`int stride0 = ${r}Shape[1] * stride1;`;if(p===s&&u==null)return t?`
      float ${i}(int row, int col, int depth, int depth2) {
        ${m}
        ${h}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
      float ${i}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${o}, ${a}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${p}.0, ${f}.0);
        return sampleTexture(${r}, uv);
      }
    `;if(p===a&&u==null)return t?`
      float ${i}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${r}Shape[1] * ${r}Shape[2], ${r}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
      float ${i}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${n[1]*n[2]}, ${n[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${p}.0, ${f}.0);
        return sampleTexture(${r}, uv);
      }
    `;let _=kL(r);return t?`
    float ${i}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${m}
      ${h}
      ${g}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index + ${_});
      return sampleTexture(${r}, uv);
    }
  `:`
    float ${i}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${s} + col * ${o} +
          depth * ${a} + depth2;
      vec2 uv = uvFromFlat(${f}, ${p}, index + ${_});
      return sampleTexture(${r}, uv);
    }
  `}function BL(e){let t=e.shapeInfo.logicalShape,n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1),i=t[4],a=t[3]*i,o=t[2]*a,s=t[1]*o,{newShape:c,keptDims:l}=le(t);if(c.length<t.length)return`
      ${aL(qL(e,c))}
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        return ${r}(${JL([`row`,`col`,`depth`,`depth2`,`depth3`],l)});
      }
    `;if(e.shapeInfo.isUniform)return`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${s}, ${o}, ${a}, ${i})) +
          depth3;
        ${HL(e)}
      }
    `;let u=e.shapeInfo.flatOffset,d=e.shapeInfo.texShape,f=d[0],p=d[1];return p===s&&u==null?`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${o}, ${a}, ${i}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${p}.0, ${f}.0);
        return sampleTexture(${n}, uv);
      }
    `:p===i&&u==null?`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]},
               ${t[2]*t[3]}, ${t[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${p}.0, ${f}.0);
        return sampleTexture(${n}, uv);
      }
    `:`
    float ${r}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${s} + col * ${o} + depth * ${a} +
          depth2 * ${i} + depth3 + ${kL(n)};
      vec2 uv = uvFromFlat(${f}, ${p}, index);
      return sampleTexture(${n}, uv);
    }
  `}function VL(e){let t=e.shapeInfo.logicalShape,n=e.name,r=`get`+n.charAt(0).toUpperCase()+n.slice(1),{newShape:i,keptDims:a}=le(t);if(i.length<t.length)return`
      ${aL(qL(e,i))}
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${r}(${JL([`row`,`col`,`depth`,`depth2`,`depth3`,`depth4`],a)});
      }
    `;let o=t[5],s=t[4]*o,c=t[3]*s,l=t[2]*c,u=t[1]*l;if(e.shapeInfo.isUniform)return`
      float ${r}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${u}, ${l}, ${c}, ${s})) +
          dot(
            vec2(depth3, depth4),
            vec2(${o}, 1)));
        ${HL(e)}
      }
    `;let d=e.shapeInfo.flatOffset,f=e.shapeInfo.texShape,p=f[0],m=f[1];return m===u&&d==null?`
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${l}, ${c}, ${s}, ${o})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${m}.0, ${p}.0);
        return sampleTexture(${n}, uv);
      }
    `:m===o&&d==null?`
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]*t[4]},
               ${t[2]*t[3]*t[4]},
               ${t[3]*t[4]},
               ${t[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${m}.0, ${p}.0);
        return sampleTexture(${n}, uv);
      }
    `:`
    float ${r}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${l} + depth * ${c} +
          depth2 * ${s} + depth3 * ${o} + depth4 + ${kL(n)};
      vec2 uv = uvFromFlat(${p}, ${m}, index);
      return sampleTexture(${n}, uv);
    }
  `}function HL(e){let t=e.name,n=k(e.shapeInfo.logicalShape);return n<2?`return ${t};`:`
    for (int i = 0; i < ${n}; i++) {
      if (i == index) {
        return ${t}[i];
      }
    }
  `}function UL(e,t){let n=e.name,r=n.charAt(0).toUpperCase()+n.slice(1),i=`get`+r+`AtOutCoords`,a=e.shapeInfo.logicalShape.length,o=t.logicalShape.length,s=rL(e.shapeInfo.logicalShape,t.logicalShape),c=GL(o),l=o-a,u,d=[`x`,`y`,`z`,`w`,`u`,`v`];u=a===0?``:o<2&&s.length>=1?`coords = 0;`:s.map(e=>`coords.${d[e+l]} = 0;`).join(`
`);let f=``;f=o<2&&a>0?`coords`:e.shapeInfo.logicalShape.map((e,t)=>`coords.${d[t+l]}`).join(`, `);let p=`return outputValue;`,m=k(e.shapeInfo.logicalShape)===1,h=k(t.logicalShape)===1;if(a===1&&!m&&!h)p=`
      return vec4(outputValue.xy, outputValue.xy);
    `;else if(m&&!h)p=o===1?`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:`
        return vec4(outputValue.x);
      `;else if(s.length){let e=a-2,t=a-1;s.indexOf(e)>-1&&s.indexOf(t)>-1?p=`return vec4(outputValue.x);`:s.indexOf(e)>-1?p=`return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);`:s.indexOf(t)>-1&&(p=`return vec4(outputValue.xx, outputValue.zz);`)}return`
    vec4 ${i}() {
      ${c} coords = getOutputCoords();
      ${u}
      vec4 outputValue = get${r}(${f});
      ${p}
    }
  `}function WL(e,t){let n=e.name,r=n.charAt(0).toUpperCase()+n.slice(1),i=`get`+r+`AtOutCoords`,a=t.texShape,o=e.shapeInfo.texShape,s=e.shapeInfo.logicalShape.length,c=t.logicalShape.length;if(!e.shapeInfo.isUniform&&s===c&&e.shapeInfo.flatOffset==null&&A(o,a))return`
      float ${i}() {
        return sampleTexture(${n}, resultUV);
      }
    `;let l=GL(c),u=rL(e.shapeInfo.logicalShape,t.logicalShape),d=c-s,f,p=[`x`,`y`,`z`,`w`,`u`,`v`];f=s===0?``:c<2&&u.length>=1?`coords = 0;`:u.map(e=>`coords.${p[e+d]} = 0;`).join(`
`);let m=``;return m=c<2&&s>0?`coords`:e.shapeInfo.logicalShape.map((e,t)=>`coords.${p[t+d]}`).join(`, `),`
    float ${i}() {
      ${l} coords = getOutputCoords();
      ${f}
      return get${r}(${m});
    }
  `}function GL(e){if(e<=1)return`int`;if(e===2)return`ivec2`;if(e===3)return`ivec3`;if(e===4)return`ivec4`;if(e===5)return`ivec5`;if(e===6)return`ivec6`;throw Error(`GPU for rank ${e} is not yet supported`)}function KL(e,t,n){let{newShape:r,keptDims:i}=le(t),a=t.length,o=e&&a===3&&t[0]===1,s=o?t.slice(1):r,c=!e&&a>1&&!A(t,n)&&r.length<a||o;return{useSqueezeShape:c,uniformShape:c?s:t,keptDims:i}}function qL(e,t){let n=JSON.parse(JSON.stringify(e));return n.shapeInfo.logicalShape=t,n}function JL(e,t){return t.map(t=>e[t]).join(`, `)}J();function YL(e,t,n,r){let i=n.map((e,n)=>{let r={logicalShape:e.shape,texShape:e.isUniform?null:e.texData.texShape,isUniform:e.isUniform,isPacked:!e.isUniform&&e.texData.isPacked,flatOffset:null};return e.texData!=null&&e.texData.slice!=null&&e.texData.slice.flatOffset>0&&(r.flatOffset=e.texData.slice.flatOffset),{name:t.variableNames[n],shapeInfo:r}}),a=i.map(e=>e.shapeInfo),o={logicalShape:r.shape,texShape:r.texData.texShape,isUniform:!1,isPacked:r.texData.isPacked,flatOffset:null},s=iL(i,o,t),c=cI(e.gl,s),l=e.createProgram(c);return P().get(`ENGINE_COMPILE_ONLY`)?{program:t,fragmentShader:c,source:s,webGLProgram:l,inShapeInfos:a,outShapeInfo:o,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(e.buildVao(l),Object.assign({program:t,fragmentShader:c,source:s,webGLProgram:l,inShapeInfos:a,outShapeInfo:o},XL(e,t,l)))}function XL(e,t,n){let r=[],i=[],a,o,s,c=null,l=null;l=e.getUniformLocation(n,`NAN`,!1),P().getNumber(`WEBGL_VERSION`)===1&&(c=e.getUniformLocation(n,`INFINITY`,!1));for(let i of t.variableNames){let a={name:i,uniform:e.getUniformLocation(n,i,!1),offset:e.getUniformLocation(n,`offset${i}`,!1)};t.enableShapeUniforms&&(a.shape=e.getUniformLocation(n,`${i}Shape`,!1),a.texShape=e.getUniformLocation(n,`${i}TexShape`,!1)),r.push(a)}if(t.enableShapeUniforms&&(a=e.getUniformLocation(n,`outShape`,!1),s=e.getUniformLocation(n,`outShapeStrides`,!1),o=e.getUniformLocation(n,`outTexShape`,!1)),t.customUniforms)for(let r of t.customUniforms)i.push(e.getUniformLocation(n,r.name,!1));return{variablesLocations:r,customUniformLocations:i,infLoc:c,nanLoc:l,outShapeLocation:a,outShapeStridesLocation:s,outTexShapeLocation:o}}function ZL(e,t){if(e.length!==t.length)throw Error(`Binary was compiled with ${e.length} inputs, but was executed with ${t.length} inputs`);e.forEach((e,n)=>{let r=e.logicalShape,i=t[n],a=i.shape;if(!A(r,a))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${r} and ${a} must match`);if(e.isUniform&&i.isUniform)return;let o=e.texShape,s=i.isUniform?null:i.texData.texShape;if(!A(o,s))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${o} and ${s} must match`)})}function QL(e,t,n,r,i){t.program.enableShapeUniforms||(ZL(t.inShapeInfos,n),ZL([t.outShapeInfo],[r]));let a=r.texData.texture,o=r.texData.texShape;r.texData.isPacked?e.setOutputPackedMatrixTexture(a.texture,o[0],o[1]):e.setOutputMatrixTexture(a.texture,o[0],o[1]),e.setProgram(t.webGLProgram),e.bindVertexArray(t.webGLProgram.vao),P().getNumber(`WEBGL_VERSION`)===1&&t.infLoc!==null&&e.gl.uniform1f(t.infLoc,1/0),t.nanLoc!==null&&e.gl.uniform1f(t.nanLoc,NaN);for(let r=0;r<n.length;++r){let i=n[r],{uniform:a,offset:o,shape:s,texShape:c}=t.variablesLocations[r];if(s){let{uniformShape:n}=KL(t.program.packedInputs,i.shape,i.texData.texShape);switch(n.length){case 1:e.gl.uniform1iv(s,new Int32Array(n));break;case 2:e.gl.uniform2iv(s,new Int32Array(n));break;case 3:e.gl.uniform3iv(s,new Int32Array(n));break;case 4:e.gl.uniform4iv(s,new Int32Array(n))}}if(c&&e.gl.uniform2i(c,i.texData.texShape[0],i.texData.texShape[1]),a!=null){if(i.isUniform){if(k(i.shape)<2)e.gl.uniform1f(a,i.uniformValues[0]);else{let t=i.uniformValues;t instanceof Float32Array||(t=new Float32Array(t)),e.gl.uniform1fv(a,t)}continue}i.texData.slice!=null&&o!=null&&e.gl.uniform1i(o,i.texData.slice.flatOffset),e.setInputMatrixTexture(i.texData.texture.texture,a,r)}}let s=t.outShapeLocation;if(s)switch(r.shape.length){case 1:e.gl.uniform1iv(s,new Int32Array(r.shape));break;case 2:e.gl.uniform2iv(s,new Int32Array(r.shape));break;case 3:e.gl.uniform3iv(s,new Int32Array(r.shape));break;case 4:e.gl.uniform4iv(s,new Int32Array(r.shape))}if(t.outShapeStridesLocation){let n=N(r.shape);switch(r.shape.length){case 2:e.gl.uniform1iv(t.outShapeStridesLocation,new Int32Array(n));break;case 3:e.gl.uniform2iv(t.outShapeStridesLocation,new Int32Array(n));break;case 4:e.gl.uniform3iv(t.outShapeStridesLocation,new Int32Array(n))}}if(t.outTexShapeLocation&&e.gl.uniform2i(t.outTexShapeLocation,r.texData.texShape[0],r.texData.texShape[1]),t.program.customUniforms&&i)for(let n=0;n<t.program.customUniforms.length;++n){let r=t.program.customUniforms[n],a=t.customUniformLocations[n],o=i[n];if(r.type===`float`)e.gl.uniform1fv(a,o);else if(r.type===`vec2`)e.gl.uniform2fv(a,o);else if(r.type===`vec3`)e.gl.uniform3fv(a,o);else if(r.type===`vec4`)e.gl.uniform4fv(a,o);else if(r.type===`int`)e.gl.uniform1iv(a,o);else if(r.type===`ivec2`)e.gl.uniform2iv(a,o);else if(r.type===`ivec3`)e.gl.uniform3iv(a,o);else if(r.type===`ivec4`)e.gl.uniform4iv(a,o);else throw Error(`uniform type ${r.type} is not supported yet.`)}e.executeProgram()}function $L(e,t,n){let r=``;t.concat(n).forEach(t=>{let i=t.texData!=null&&t.texData.slice!=null&&t.texData.slice.flatOffset>0;if(e.enableShapeUniforms&&!t.isUniform){let a=t.texData.texShape,{useSqueezeShape:o,uniformShape:s,keptDims:c}=KL(e.packedInputs,t.shape,a),l=``,u=``,d=``;if(s.length===1&&e.packedInputs){let e=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)];l=`${e[0]>1}_${e[1]>1}`}else if(s.length===2&&!e.packedInputs)u=`${s[0]>1}_${s[1]>1}`;else if(s.length>2&&!e.packedInputs){let e=N(s);d=`${e[0]===a[1]}_${e[e.length-1]===a[1]}`}let f=t.shape.length,p=s.length===2&&A(t.shape,a),m=k(t.shape)===1,h=Ld(t.shape,n.shape),g=!e.packedInputs&&f===n.shape.length&&A(a,n.texData.texShape),_=e.packedInputs||s.length>2?``:`${a[0]>1}_${a[1]>1}`;r+=`${f}_${g}_${o?c:``}_${s.length}_${m}_${h}_${p}_${l}_${u}_${d}_${_}_${i}`}else{let e=t.isUniform?`uniform`:t.texData.texShape;r+=`${t.shape}_${e}_${i}`}});let i=e.userCode,a=e.constructor.name;return a+=`_`+r+`_`+i+`${P().getNumber(`WEBGL_VERSION`)}`,a}function eR(e){return P().getBool(`WEBGL_USE_SHAPES_UNIFORMS`)&&e<=4}var tR=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=KF.DENSE,this.customUniforms=[{name:`texShape`,type:`ivec2`}];let t=YI();this.outputShape=e,this.enableShapeUniforms=eR(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?ZI([`r`,`c`,`d`],e):XI([`r`,`c`,`d`],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        ${t.output} = result;
      }
    `}},nR=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=KF.DENSE,this.customUniforms=[{name:`texShape`,type:`ivec2`}];let t=YI();this.outputShape=e,this.enableShapeUniforms=eR(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?ZI([`r`,`c`,`d`],e):XI([`r`,`c`,`d`],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        ${t.output} = result;
      }
    `}},rR=class{constructor(e){this.variableNames=[`A`],this.outTexUsage=qF.DOWNLOAD;let t=YI();this.outputShape=e,this.userCode=`
      ${nL}

      void main() {
        float x = getAAtOutCoords();
        ${t.output} = encode_float(x);
      }
    `}},iR=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=qF.DOWNLOAD;let t=YI();this.outputShape=e,this.userCode=`
      ${nL}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${t.output} = encode_float(x);
      }
    `}},aR={R:0,G:1,B:2,A:3},oR=class{constructor(e,t=!1,n=`RGBA`){this.variableNames=[`A`],this.customUniforms=[{name:`texShape`,type:`ivec2`}];let r=YI();this.outputShape=e,this.enableShapeUniforms=eR(this.outputShape.length);let i=`result`;t&&(i=`floor(result * 255. + 0.5)`);let a=``;for(let e=0;e<n.length;e++){let t=n[e];a+=`
          if(offset == ${e}) {
            result = values[${aR[t]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?tL():eL(e)}

      void main() {
        ivec3 coords = getOutputCoords();
        int flatIndex = getFlatIndex(coords);
        float result = 0.;
        int offset = imod(flatIndex, ${n.length});

        flatIndex = idiv(flatIndex, ${n.length}, 1.);

        int r = flatIndex / texShape[1];
        if (r < texShape[0]) {
          int c = imod(flatIndex, texShape[1]);
          vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
          vec4 values = ${r.texture2D}(A, uv);
          ${a}
        }
        ${r.output} = vec4(${i}, 0., 0., 0.);
      }
    `}},sR=class{constructor(e,t=!1){this.variableNames=[`A`],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:`texShape`,type:`ivec2`}];let n=YI();this.outputShape=e,this.enableShapeUniforms=eR(this.outputShape.length);let r=``,i=`result`;t&&(i=`floor(result * 255. + 0.5)`);for(let t=0;t<=1;t++)for(let i=0;i<=1;i++){let a=t*2+i;r+=`
          localCoords = coords;
          if(localCoords[2] + ${i} < ${this.enableShapeUniforms?`outShape[2]`:`${e[2]}`}) {
          localCoords[2] += ${i};
          if (localCoords[1] + ${t} < ${this.enableShapeUniforms?`outShape[1]`:`${e[1]}`}) {
            localCoords[1] += ${t};

            flatIndex = getFlatIndex(localCoords);
            offset = imod(flatIndex, 4);

            flatIndex = idiv(flatIndex, 4, 1.);

            int r = flatIndex / texShape[1];
            int c = imod(flatIndex, texShape[1]);
            vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
            values = ${n.texture2D}(A, uv);

            if (offset == 0) {
              result[${a}] = values[0];
            } else if (offset == 1) {
              result[${a}] = values[1];
            } else if (offset == 2) {
              result[${a}] = values[2];
            } else {
              result[${a}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?tL():eL(e)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${r}

          ${n.output} = ${i};
        }
    `}};J();function cR(e){let t=YI();return sI(e,`${t.version}
    precision highp float;
    ${t.attribute} vec3 clipSpacePos;
    ${t.attribute} vec2 uv;
    ${t.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`)}function lR(e){return mI(e,new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]))}function uR(e){return hI(e,new Uint16Array([0,1,2,2,1,3]))}function dR(e,t,n,r,i,a){_I(t,n);let o=gI(e),s=e.TEXTURE_2D;return X(e,()=>e.bindTexture(s,o)),X(e,()=>e.texParameteri(s,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE)),X(e,()=>e.texParameteri(s,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),X(e,()=>e.texParameteri(s,e.TEXTURE_MIN_FILTER,e.NEAREST)),X(e,()=>e.texParameteri(s,e.TEXTURE_MAG_FILTER,e.NEAREST)),P().getNumber(`WEBGL_VERSION`)===1?X(e,()=>e.texImage2D(s,0,r,t,n,0,i,a,null)):X(e,()=>e.texStorage2D(s,1,r,t,n)),X(e,()=>e.bindTexture(e.TEXTURE_2D,null)),{texture:o,texShape:[n,t]}}function fR(e){return e.internalFormatFloat}function pR(e,t,n,r){let[i,a]=YF(t,n);return dR(e,i,a,fR(r),r.textureFormatFloat,e.FLOAT)}function mR(e){return e.internalFormatHalfFloat}function hR(e,t,n,r){let[i,a]=YF(t,n);return dR(e,i,a,mR(r),r.textureFormatFloat,r.textureTypeHalfFloat)}function gR(e){return e.downloadTextureFormat}function _R(e,t,n,r){let[i,a]=YF(t,n);return dR(e,i,a,gR(r),e.RGBA,e.UNSIGNED_BYTE)}function vR(e){return e.internalFormatPackedFloat}function yR(e,t,n,r){let[i,a]=QF(t,n);return dR(e,i,a,vR(r),e.RGBA,e.FLOAT)}function bR(e){return e.internalFormatPackedHalfFloat}function xR(e,t,n,r){let[i,a]=QF(t,n);return dR(e,i,a,bR(r),e.RGBA,r.textureTypeHalfFloat)}function SR(e,t,n){return X(e,()=>e.bindBuffer(e.ARRAY_BUFFER,n)),yI(e,t,`clipSpacePos`,n,3,20,0)&&yI(e,t,`uv`,n,2,20,12)}function CR(e,t,n,r,i,a){X(e,()=>e.bindTexture(e.TEXTURE_2D,t));let o,s,c;i instanceof Uint8Array?(o=new Uint8Array(n*r*4),s=e.UNSIGNED_BYTE,c=e.RGBA):(o=new Float32Array(n*r*4),s=e.FLOAT,c=a.internalFormatPackedFloat),o.set(i),P().getNumber(`WEBGL_VERSION`)===2?X(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,n,r,e.RGBA,s,o)):X(e,()=>e.texImage2D(e.TEXTURE_2D,0,c,n,r,0,e.RGBA,s,o)),X(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function wR(e,t,n){X(e,()=>e.bindTexture(e.TEXTURE_2D,t)),n.data instanceof Uint8Array?P().getNumber(`WEBGL_VERSION`)===2?X(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,e.RGBA,e.UNSIGNED_BYTE,n.data)):X(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data)):P().getNumber(`WEBGL_VERSION`)===2?X(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,e.RGBA,e.UNSIGNED_BYTE,n)):X(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n)),X(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function TR(e,t,n,r){let i=e.createBuffer();X(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,i));let a=16*t*n;return X(e,()=>e.bufferData(e.PIXEL_PACK_BUFFER,a,e.STREAM_READ)),X(e,()=>e.readPixels(0,0,n,t,e.RGBA,e.FLOAT,0)),X(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,null)),i}function ER(e,t,n){let r=e,i=new Float32Array(n);return r.bindBuffer(r.PIXEL_PACK_BUFFER,t),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,i),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),i}function DR(e,t,n,r){let[i,a]=YF(t,n),o=new Uint8Array(XF(t*n,4));return X(e,()=>e.readPixels(0,0,i,a,r.downloadTextureFormat,e.UNSIGNED_BYTE,o)),new Float32Array(o.buffer)}function OR(e,t,n,r,i,a,o,s){let c=e,l=new Float32Array($F(a,o));return c.bindBuffer(c.PIXEL_PACK_BUFFER,t),c.getBufferSubData(c.PIXEL_PACK_BUFFER,0,l),c.bindBuffer(c.PIXEL_PACK_BUFFER,null),l}function kR(e,t,n){let r=new Float32Array(t*n*4);return X(e,()=>e.readPixels(0,0,n,t,e.RGBA,e.FLOAT,r)),r}J();var AR=class{constructor(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];let t=P().getNumber(`WEBGL_VERSION`);if(e==null?this.gl=UF(t):(this.gl=e,HF(t,e)),e=this.gl,P().getNumber(`WEBGL_VERSION`)===2){let t=e;this.createVertexArray=()=>X(t,()=>t.createVertexArray()),this.bindVertexArray=e=>X(t,()=>t.bindVertexArray(e)),this.deleteVertexArray=e=>X(t,()=>t.deleteVertexArray(e)),this.getVertexArray=()=>X(t,()=>t.getParameter(t.VERTEX_ARRAY_BINDING))}else if(e!=null){let t=e.getExtension(`OES_vertex_array_object`);if(t==null)throw Error(`All WebGL1 implementations are expected to offer OES_vertex_array_object.`);this.createVertexArray=()=>X(e,()=>t.createVertexArrayOES()),this.bindVertexArray=n=>X(e,()=>t.bindVertexArrayOES(n)),this.deleteVertexArray=n=>X(e,()=>t.deleteVertexArrayOES(n)),this.getVertexArray=()=>X(e,()=>e.getParameter(t.VERTEX_ARRAY_BINDING_OES))}let n=`WEBGL_color_buffer_float`,r=`EXT_color_buffer_half_float`;if(this.parallelCompilationExtension=this.gl.getExtension(`KHR_parallel_shader_compile`),P().getNumber(`WEBGL_VERSION`)===1){let e=`OES_texture_half_float`;if(this.textureFloatExtension=oI(this.gl,`OES_texture_float`),VI(this.gl,e))this.textureHalfFloatExtension=oI(this.gl,e);else if(P().get(`WEBGL_FORCE_F16_TEXTURES`))throw Error(`GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.`);if(this.colorBufferFloatExtension=this.gl.getExtension(n),VI(this.gl,r))this.colorBufferHalfFloatExtension=oI(this.gl,r);else if(P().get(`WEBGL_FORCE_F16_TEXTURES`))throw Error(`GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.`)}else if(n=`EXT_color_buffer_float`,VI(this.gl,n))this.colorBufferFloatExtension=this.gl.getExtension(n);else if(VI(this.gl,r))this.colorBufferHalfFloatExtension=this.gl.getExtension(r);else throw Error(`GL context does not support color renderable floats`);this.vertexBuffer=lR(this.gl),this.indexBuffer=uR(this.gl),this.framebuffer=vI(this.gl),this.textureConfig=eI(this.gl,this.textureHalfFloatExtension)}get debug(){return P().getBool(`DEBUG`)}dispose(){if(this.disposed)return;this.program!=null&&console.warn(`Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing.`),this.outputTexture!=null&&console.warn(`Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.`);let e=this.gl;X(e,()=>e.finish()),X(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),X(e,()=>e.deleteFramebuffer(this.framebuffer)),X(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),X(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),X(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),pR(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),hR(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),_R(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){this.throwIfDisposed(),wR(this.gl,e,t)}uploadDenseMatrixToTexture(e,t,n,r){this.throwIfDisposed(),CR(this.gl,e,t,n,r,this.textureConfig)}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),xR(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),yR(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(TI(this.gl,this.framebuffer),this.outputTexture=null),X(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,n){return this.downloadMatrixDriver(e,()=>DR(this.gl,t,n,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,n,r,i,a){return OR(this.gl,e,t,n,r,i,a,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){return ER(this.gl,e,t)}createBufferFromTexture(e,t,n){this.bindTextureToFrameBuffer(e);let r=TR(this.gl,t,n,this.textureConfig);return this.unbindTextureToFrameBuffer(),r}createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,n;if(P().getBool(`WEBGL_FENCE_API_ENABLED`)){let r=e,i=r.fenceSync(r.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),n=()=>{let e=r.clientWaitSync(i,0,0);return e===r.ALREADY_SIGNALED||e===r.CONDITION_SATISFIED},t=i}else P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`)>0?(t=this.beginQuery(),this.endQuery(),n=()=>this.isQueryAvailable(t,P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`))):n=()=>!0;return{query:t,isFencePassed:n}}downloadMatrixFromPackedTexture(e,t,n){return this.downloadMatrixDriver(e,()=>kR(this.gl,t,n))}createProgram(e){this.throwIfDisposed();let t=this.gl;this.vertexShader??=cR(t);let n=dI(t);X(t,()=>t.attachShader(n,this.vertexShader)),X(t,()=>t.attachShader(n,e)),fI(t,n);let r=Object.assign(n,{vao:this.createVertexArray()});return this.debug&&pI(t,r),r}buildVao(e){this.setProgram(e),this.bindVertexArray(e.vao);let t=this.gl;X(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),SR(t,e,this.vertexBuffer)}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),e!=null&&(X(this.gl,()=>this.gl.deleteProgram(e)),this.deleteVertexArray(e.vao))}setProgram(e){this.throwIfDisposed(),this.program=e,this.program!=null&&this.debug&&pI(this.gl,this.program),X(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,n=!0){return this.throwIfDisposed(),n?xI(this.gl,e,t):SI(this.gl,e,t)}getAttributeLocation(e,t){return this.throwIfDisposed(),X(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,n){this.throwIfDisposed(),this.throwIfNoProgram(),CI(this.gl,e,t,n)}setOutputMatrixTexture(e,t,n){this.setOutputMatrixTextureDriver(e,n,t)}setOutputPackedMatrixTexture(e,t,n){this.throwIfDisposed();let[r,i]=QF(t,n);this.setOutputMatrixTextureDriver(e,r,i)}setOutputMatrixWriteRegion(e,t,n,r){this.setOutputMatrixWriteRegionDriver(n,e,r,t)}setOutputPackedMatrixWriteRegion(e,t,n,r){throw Error(`setOutputPackedMatrixWriteRegion not implemented.`)}debugValidate(){this.program!=null&&pI(this.gl,this.program),EI(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let e=this.gl;if(this.debug){let e=this.getVertexArray();console.assert(e===this.program.vao,`VAO changed between setProgram and executeProgram!`),this.debugValidate()}X(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),X(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return this.disjointQueryTimerExtension??=oI(this.gl,P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`)===2?`EXT_disjoint_timer_query_webgl2`:`EXT_disjoint_timer_query`),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`)===2){let e=this.gl,t=this.getQueryTimerExtensionWebGL2(),n=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,n),n}let e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`)===2){let e=this.gl,t=this.getQueryTimerExtensionWebGL2();e.endQuery(t.TIME_ELAPSED_EXT);return}let e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(e){return await se(()=>this.disposed||this.isQueryAvailable(e,P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`))),this.getQueryTime(e,P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION`))}getQueryTime(e,t){if(t===0)return null;if(t===2){let t=this.gl;return t.getQueryParameter(e,t.QUERY_RESULT)/1e6}{let t=this.getQueryTimerExtensionWebGL1();return t.getQueryObjectEXT(e,t.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(e,t){if(t===0)return!0;if(t===2){let t=this.gl,n=this.getQueryTimerExtensionWebGL2(),r=t.getQueryParameter(e,t.QUERY_RESULT_AVAILABLE);return this.disjoint??=this.gl.getParameter(n.GPU_DISJOINT_EXT),r&&!this.disjoint}{let t=this.getQueryTimerExtensionWebGL1(),n=t.getQueryObjectEXT(e,t.QUERY_RESULT_AVAILABLE_EXT);return this.disjoint??=this.gl.getParameter(t.GPU_DISJOINT_EXT),n&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=jR(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){if(this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1)return;let n;`setTimeoutCustom`in P().platform&&(n=P().platform.setTimeoutCustom.bind(P().platform)),se(()=>(this.pollItems(),this.itemsToPoll.length===0),()=>0,null,n)}bindTextureToFrameBuffer(e){this.throwIfDisposed(),wI(this.gl,e,this.framebuffer),this.debug&&EI(this.gl)}unbindTextureToFrameBuffer(){this.outputTexture==null?TI(this.gl,this.framebuffer):(wI(this.gl,this.outputTexture,this.framebuffer),this.debug&&EI(this.gl))}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);let n=t();return this.unbindTextureToFrameBuffer(),n}setOutputMatrixTextureDriver(e,t,n){this.throwIfDisposed();let r=this.gl;wI(r,e,this.framebuffer),this.debug&&EI(r),this.outputTexture=e,X(r,()=>r.viewport(0,0,t,n)),X(r,()=>r.scissor(0,0,t,n))}setOutputMatrixWriteRegionDriver(e,t,n,r){this.throwIfDisposed(),X(this.gl,()=>this.gl.scissor(e,t,n,r))}throwIfDisposed(){if(this.disposed)throw Error(`Attempted to use disposed GPGPUContext.`)}throwIfNoProgram(){if(this.program==null)throw Error(`No GPU program is currently set.`)}};function jR(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}var{addImpl:MR,bincountImpl:NR,bincountReduceImpl:PR,bitwiseAndImpl:FR,castImpl:IR,ceilImpl:LR,concatImpl:RR,equalImpl:zR,expImpl:BR,expm1Impl:VR,floorImpl:HR,gatherNdImpl:UR,gatherV2Impl:WR,greaterImpl:GR,greaterEqualImpl:KR,lessImpl:qR,lessEqualImpl:JR,linSpaceImpl:YR,logImpl:XR,maxImpl:ZR,maximumImpl:QR,minimumImpl:$R,multiplyImpl:ez,negImpl:tz,notEqualImpl:nz,prodImpl:rz,raggedGatherImpl:iz,raggedRangeImpl:az,raggedTensorToTensorImpl:oz,rangeImpl:sz,rsqrtImpl:cz,scatterImpl:lz,sigmoidImpl:uz,simpleAbsImpl:dz,sliceImpl:fz,sparseFillEmptyRowsImpl:pz,sparseReshapeImpl:mz,sparseSegmentReductionImpl:hz,sqrtImpl:gz,staticRegexReplaceImpl:_z,stridedSliceImpl:vz,stringNGramsImpl:yz,stringSplitImpl:bz,stringToHashBucketFastImpl:xz,subImpl:Sz,tileImpl:Cz,topKImpl:wz,transposeImpl:Tz,uniqueImpl:Ez}=tA;function Dz(e,t){return[`x`,`y`,`z`,`w`,`u`,`v`].slice(0,t).map(t=>`${e}.${t}`)}function Oz(e,t){return t===1?[e]:Dz(e,t)}function kz(e,t){if(e===1)return`rc`;let n=``;for(let r=0;r<e;r++)n+=t[r],r<e-1&&(n+=`,`);return n}var Az=class{constructor(e){if(this.variableNames=[`A`],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.enableShapeUniforms=eR(this.outputShape.length),this.rank===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let e=Oz(`rc`,this.rank),t=GL(this.rank),n=this.getOutOfBoundsCondition(e),r=this.getSetup(e),i=this.getOutput(e);this.userCode=`
        void main() {
          ${t} rc = getOutputCoords();

          if(${n}) {
            setOutput(vec4(0));
          } else {
            ${r}

            setOutput(vec4(${i}));
          }
        }
      `}}getSourceCoordsArr(e){let t=[];for(let n=0;n<=1;n++)for(let r=0;r<=1;r++){let i=`${n===0?`r`:`rp1`}, ${r===0?`c`:`cp1`}`;for(let t=2;t<this.rank;t++)i=`${e[e.length-1-t]},`+i;t.push(i)}return t}getOutOfBoundsCondition(e){if(this.rank===1)return`rc > ${this.enableShapeUniforms?`outShape`:this.outputShape[0]}`;let t=``;for(let n=this.rank-2;n<this.rank;n++)t+=`${e[n]} >= ${this.enableShapeUniforms?`outShape[${n}]`:this.outputShape[n]}`,n<this.rank-1&&(t+=`||`);return t}getSetup(e){if(this.rank===1)return``;let t=e.slice(-2),n=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],r=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${t[0]};
      int c = ${t[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${n};
      bool rEdge = rp1 >= ${r};
    `}getOutput(e){let t=this.getSourceCoordsArr(e);return this.rank===1?`getA(rc), (rc + 1 >= ${this.enableShapeUniforms?`outShape`:this.outputShape[0]} ? 0. : getA(rc + 1)), 0, 0`:`getA(${t[0]}),
            cEdge ? 0. : getA(${t[1]}),
            rEdge ? 0. : getA(${t[2]}),
            rEdge || cEdge ? 0. : getA(${t[3]})`}},jz=class{constructor(e,t){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`inputShape`,type:`ivec3`}],this.outputShape=e,this.enableShapeUniforms=eR(this.outputShape.length);let n=``;for(let e=0;e<4;e++){let t=`thisRC = rc;`;e%2==1&&(t+=`thisRC.z += 1;`),e>1&&(t+=`thisRC.y += 1;`),n+=`
        ${t}
        ${e>0?`if(thisRC.y < rows && thisRC.z < cols){`:``}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${e>0?`}`:``}
      `}this.userCode=`
      ${Mz(t,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?tL():eL(e)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?`outShape[1]`:e[1]};
        int cols = ${this.enableShapeUniforms?`outShape[2]`:e[2]};

        ${n}

        setOutput(result);
      }
    `}};function Mz(e,t){return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t?$I([`r`,`c`,`d`],`inputShape`):XI([`r`,`c`,`d`],e)}
      return ivec3(r, c, d);
    }
  `}J();var Nz=class{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(e,t,n){let r=Rz(t,n),i=zz(e,r,n);i in this.freeTextures||(this.freeTextures[i]=[]),i in this.usedTextures||(this.usedTextures[i]=[]);let a=Fz(e,r,this.gpgpu.gl,this.gpgpu.textureConfig,n);if(this.freeTextures[i].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=a,this.log();let e=this.freeTextures[i].pop();return this.usedTextures[i].push(e),e}let o;return r===JF.PACKED_2X2_FLOAT32?o=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):r===JF.PACKED_2X2_FLOAT16?o=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):r===JF.UNPACKED_FLOAT32?o=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):r===JF.UNPACKED_FLOAT16?o=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):r===JF.PACKED_4X1_UNSIGNED_BYTE&&(o=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[i].push(o),this.numUsedTextures++,this._numBytesAllocated+=a,this.log(),o}releaseTexture(e,t,n,r){if(this.freeTextures==null)return;let i=Rz(n,r),a=zz(t,i,r);a in this.freeTextures||(this.freeTextures[a]=[]);let o=Fz(t,i,this.gpgpu.gl,this.gpgpu.textureConfig,r),s=P().getNumber(`WEBGL_DELETE_TEXTURE_THRESHOLD`);s!==-1&&this._numBytesAllocated>s?(this.gpgpu.deleteMatrixTexture(e.texture),this._numBytesAllocated-=o):(this.freeTextures[a].push(e),this.numFreeTextures++,this._numBytesFree+=o),this.numUsedTextures--;let c=this.usedTextures[a],l=c&&c.indexOf(e);if(l==null||l<0)throw Error(`Cannot release a texture that was never provided by this texture manager`);c[l]=c[c.length-1],c.pop(),this.log()}log(){if(!this.logEnabled)return;let e=this.numFreeTextures+this.numUsedTextures;console.log(`Free/Used`,`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);let t=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(this.freeTextures!=null){for(let e in this.freeTextures)this.freeTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});for(let e in this.usedTextures)this.usedTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}};function Pz(e,t){let n=e;if(t===n.R32F)return 4;if(t===n.R16F)return 2;if(t===n.RGBA32F||t===e.RGBA)return 16;if(t===n.RGBA16F)return 8;if(t===n.RGBA8)return 4;throw Error(`Unknown internal format ${t}`)}function Fz(e,t,n,r,i){let a=Iz(t,r),o;if(i){let[t,n]=QF(e[0],e[1]);o=t*n}else{let[t,n]=YF(e[0],e[1]);o=t*n}let s=Pz(n,a);return o*s}function Iz(e,t){switch(e){case JF.PACKED_2X2_FLOAT32:return vR(t);case JF.PACKED_2X2_FLOAT16:return bR(t);case JF.UNPACKED_FLOAT32:return fR(t);case JF.UNPACKED_FLOAT16:return mR(t);case JF.PACKED_4X1_UNSIGNED_BYTE:return gR(t);default:throw Error(`Unknown physical texture type ${e}`)}}function Lz(e){return P().getBool(`WEBGL_RENDER_FLOAT32_ENABLED`)?e?JF.PACKED_2X2_FLOAT32:JF.UNPACKED_FLOAT32:e?JF.PACKED_2X2_FLOAT16:JF.UNPACKED_FLOAT16}function Rz(e,t){if(e===qF.UPLOAD)return JF.PACKED_2X2_FLOAT32;if(e===qF.RENDER||e==null)return Lz(t);if(e===qF.DOWNLOAD||e===qF.PIXELS)return JF.PACKED_4X1_UNSIGNED_BYTE;throw Error(`Unknown logical texture type ${e}`)}function zz(e,t,n){return`${e[0]}_${e[1]}_${t}_${n}`}var Bz=class{constructor(e,t){this.variableNames=[`A`],this.outputShape=e,this.enableShapeUniforms=eR(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${t}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}},Vz=`if (isnan(x)) return x;`,Hz=`return x;`,Uz=`return abs(x);`,Wz=`return (x >= 0.0) ? x : (exp(x) - 1.0);`,Gz=Vz+`
  return (x < 0.0) ? 0.0 : x;
`,Kz=Vz+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,qz=`return x;`,Jz=`return 1.0 / (1.0 + exp(-1.0 * x));`,Yz=`return x;`,Xz=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,Zz=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Qz=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,$z=`return 1.0 / (1.0 + exp(-1.0 * x));`,eB=class{constructor(e,t){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.enableShapeUniforms=eR(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${t}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}},tB=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e,this.enableShapeUniforms=eR(this.outputShape.length);let t=e.length,n=Oz(`rc`,t),r=GL(t),i=kz(t,n),a=n.slice(-2),o=t<=1?`rc`:`vec2(${a.join(`,`)})`;this.userCode=`
      void main() {
        ${r} rc = getOutputCoords();
        vec4 packedInput = getA(${i});

        setOutput(getChannel(packedInput, ${o}));
      }
    `}};J();var nB=Qy,rB=1e-7,iB=1e-4,aB={};function oB(e){return e in aB||(aB[e]={}),aB[e]}var sB=P().getNumber(`CPU_HANDOFF_SIZE_THRESHOLD`),cB=600;function lB(){return P().global.screen==null?1024:P().global.screen.height*P().global.screen.width*window.devicePixelRatio*cB/1024/1024}var uB=class e extends g{nextDataId(){return e.nextDataId++}constructor(e){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!P().getBool(`HAS_WEBGL`))throw Error(`WebGL is not supported on this device`);let t;e==null?(t=new AR(UF(P().getNumber(`WEBGL_VERSION`))),this.binaryCache=oB(P().getNumber(`WEBGL_VERSION`)),this.gpgpuCreatedLocally=!0):(t=e instanceof AR?e:new AR(UF(P().getNumber(`WEBGL_VERSION`),e)),this.binaryCache={},this.gpgpuCreatedLocally=!1),this.gpgpu=t,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new Nz(this.gpgpu),this.numMBBeforeWarning=lB(),this.texData=new h(this,fo())}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}writeTexture(e,t,n,r,i,a){let o=this.makeTensorInfo(t,n),s=this.texData.get(o.dataId);s.isPacked=!1,s.texture={texture:e,texShape:[r,i]},s.texShape=[r,i];let c=new oR(MI(t),!1,a),l=this.runWebGLProgram(c,[o],n,[[r,i]]);return l.shape=t,s.texture=null,this.disposeIntermediateTensorInfo(o),l.dataId}write(e,t,n){if((P().getBool(`WEBGL_CHECK_NUMERICAL_PROBLEMS`)||P().getBool(`DEBUG`))&&this.checkNumericalProblems(e),n===`complex64`&&e!=null)throw Error(`Cannot write to a complex64 dtype. Please use tf.complex(real, imag).`);let r={id:this.nextDataId()};return this.texData.set(r,{shape:t,dtype:n,values:e,usage:qF.UPLOAD,refCount:1}),r}refCount(e){return this.texData.has(e)?this.texData.get(e).refCount:0}incRef(e){let t=this.texData.get(e);t.refCount++}decRef(e){if(this.texData.has(e)){let t=this.texData.get(e);t.refCount--}}move(e,t,n,r,i){if(P().getBool(`DEBUG`)&&this.checkNumericalProblems(t),r===`complex64`)throw Error(`Cannot write to a complex64 dtype. Please use tf.complex(real, imag).`);this.texData.set(e,{shape:n,dtype:r,values:t,usage:qF.UPLOAD,refCount:i})}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}readSync(e){let{values:t,dtype:n,complexTensorInfos:r,slice:i,shape:a,isPacked:o}=this.texData.get(e);if(i!=null){let t;t=o?new eB(a,qz):new Bz(a,qz);let r=this.runWebGLProgram(t,[{dataId:e,shape:a,dtype:n}],n),i=this.readSync(r.dataId);return this.disposeIntermediateTensorInfo(r),i}if(t!=null)return this.convertAndCacheOnCPU(e);if(n===`string`)return t;let s=this.activeTimers!=null,c;s&&(c=ji());let l;return l=n===`complex64`?OE(this.readSync(r.real.dataId),this.readSync(r.imag.dataId)):this.getValuesFromTexture(e),s&&(this.downloadWaitMs+=ji()-c),this.convertAndCacheOnCPU(e,l)}async read(e){if(this.pendingRead.has(e)){let t=this.pendingRead.get(e);return new Promise(e=>t.push(e))}let{values:t,shape:n,slice:r,dtype:i,complexTensorInfos:a,isPacked:o}=this.texData.get(e);if(r!=null){let t;t=o?new eB(n,qz):new Bz(n,qz);let r=this.runWebGLProgram(t,[{dataId:e,shape:n,dtype:i}],i),a=this.read(r.dataId);return this.disposeIntermediateTensorInfo(r),a}if(t!=null)return this.convertAndCacheOnCPU(e);if(P().getBool(`DEBUG`)&&!P().getBool(`WEBGL_DOWNLOAD_FLOAT_ENABLED`)&&P().getNumber(`WEBGL_VERSION`)===2)throw Error(`tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.`);let s=null,c;if(i!==`complex64`&&P().get(`WEBGL_BUFFER_SUPPORTED`)){c=this.decode(e);let t=this.texData.get(c.dataId);s=this.gpgpu.createBufferFromTexture(t.texture.texture,...ZF(n))}this.pendingRead.set(e,[]),i!==`complex64`&&await this.gpgpu.createAndWaitForFence();let l;if(i===`complex64`){let e=await Promise.all([this.read(a.real.dataId),this.read(a.imag.dataId)]),t=e[0],n=e[1];l=OE(t,n)}else if(s==null)l=this.getValuesFromTexture(e);else{let e=k(n);l=this.gpgpu.downloadFloat32MatrixFromBuffer(s,e)}if(c!=null&&this.disposeIntermediateTensorInfo(c),s!=null){let e=this.gpgpu.gl;X(e,()=>e.deleteBuffer(s))}let u=this.convertAndCacheOnCPU(e,l),d=this.pendingRead.get(e);return this.pendingRead.delete(e),d.forEach(e=>e(u)),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e)&&fo().removeDataId(e,this),this.pendingDeletes--),u}readToGPU(e,t={}){let{values:n,shape:r,slice:i,dtype:a,isPacked:o,texture:s}=this.texData.get(e);if(a===`complex64`)throw Error(`Does not support reading texture for complex64 dtype.`);if(i!=null){let n;n=o?new eB(r,qz):new Bz(r,qz);let i=this.runWebGLProgram(n,[{dataId:e,shape:r,dtype:a}],a),s=this.readToGPU(i,t);return this.disposeIntermediateTensorInfo(i),s}if(s==null)throw Error(n==null?`There is no data on GPU or CPU.`:`Data is not on GPU but on CPU.`);let c=this.decode(e,t.customTexShape),l=fo().makeTensorFromTensorInfo(c),u=this.texData.get(c.dataId);return Object.assign({tensorRef:l},u.texture)}bufferSync(e){let t=this.readSync(e.dataId);if(e.dtype===`string`)try{let n=t.map(e=>Pi(e));return Xs(e.shape,e.dtype,n)}catch{throw Error(`Failed to decode encoded string bytes into utf-8`)}return Xs(e.shape,e.dtype,t)}checkNumericalProblems(e){if(e!=null)for(let t=0;t<e.length;t++){let n=e[t];if(!iI(n))throw P().getBool(`WEBGL_RENDER_FLOAT32_CAPABLE`)?Error(`The value ${n} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`):Error(`The value ${n} cannot be represented on this device.`)}}getValuesFromTexture(e){let{shape:t,dtype:n,isPacked:r}=this.texData.get(e),i=k(t);if(P().getBool(`WEBGL_DOWNLOAD_FLOAT_ENABLED`)){let n=this.decode(e),r=this.texData.get(n.dataId),a=this.gpgpu.downloadMatrixFromPackedTexture(r.texture.texture,...ZF(t)).subarray(0,i);return this.disposeIntermediateTensorInfo(n),a}let a=P().getBool(`WEBGL_PACK`)&&r===!0,o=a?MI(t):t,s=a?new iR(o):new rR(o),c=this.runWebGLProgram(s,[{shape:o,dtype:n,dataId:e}],`float32`),l=this.texData.get(c.dataId),u=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(l.texture.texture,l.texShape[0],l.texShape[1]).subarray(0,i);return this.disposeIntermediateTensorInfo(c),u}timerAvailable(){return P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`)>0}time(e){let t=this.activeTimers,n=[],r=!1;this.programTimersStack==null?(this.programTimersStack=n,r=!0):this.activeTimers.push(n),this.activeTimers=n,e();let i=Ii(this.activeTimers.map(e=>e.query)).filter(e=>e!=null),a=Ii(this.activeTimers.map(e=>e.name)).filter(e=>e!=null);this.activeTimers=t,r&&(this.programTimersStack=null);let o={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return(async()=>{if(P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`)>0){let e=await Promise.all(i);o.kernelMs=C(e),o.getExtraProfileInfo=()=>e.map((e,t)=>({name:a[t],ms:e})).map(e=>`${e.name}: ${e.ms}`).join(`, `)}else o.kernelMs={error:`WebGL query timers are not supported in this environment.`};return this.uploadWaitMs=0,this.downloadWaitMs=0,o})()}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`)>0?this.gpgpu.beginQuery():{startMs:ji(),endMs:null}}endTimer(e){return P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`)>0?(this.gpgpu.endQuery(),e):(e.endMs=ji(),e)}async getQueryTime(e){if(P().getNumber(`WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE`)>0)return this.gpgpu.waitForQueryAndGetTime(e);let t=e;return t.endMs-t.startMs}disposeData(e,t=!1){if(this.pendingDisposal.has(e))return!1;if(!this.texData.has(e))return!0;if(t?this.texData.get(e).refCount=0:this.texData.get(e).refCount--,!t&&this.texData.get(e).refCount>0)return!1;if(this.pendingRead.has(e))return this.pendingDisposal.add(e),this.pendingDeletes++,!1;this.releaseGPUData(e);let{complexTensorInfos:n}=this.texData.get(e);return n!=null&&(this.disposeData(n.real.dataId,t),this.disposeData(n.imag.dataId,t)),this.texData.delete(e),!0}releaseGPUData(e){let{texture:t,dtype:n,texShape:r,usage:i,isPacked:a,slice:o}=this.texData.get(e),s=o&&o.origDataId||e,c=this.dataRefCount.get(s);c>1?this.dataRefCount.set(s,c-1):(this.dataRefCount.delete(s),t!=null&&(this.numBytesInGPU-=this.computeBytes(r,n),this.textureManager.releaseTexture(t,r,i,a)));let l=this.texData.get(e);l.texture=null,l.texShape=null,l.isPacked=!1,l.slice=null}getTexture(e){return this.uploadToGPU(e),this.texData.get(e).texture.texture}getDataInfo(e){return this.texData.get(e)}shouldExecuteOnCPU(e,t=sB){return P().getBool(`WEBGL_CPU_FORWARD`)&&e.every(e=>this.texData.get(e.dataId).texture==null&&k(e.shape)<t)}getGPGPUContext(){return this.gpgpu}where(e){Wr(`tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead`);let t=e.dataSync();return nB(e.shape,t)}packedUnaryOp(e,t,n){let r=new eB(e.shape,t),i=this.compileAndRun(r,[e],n);return fo().makeTensorFromTensorInfo(i)}abs(e){if(this.shouldExecuteOnCPU([e])&&e.dtype!==`complex64`){let t=dz(this.texData.get(e.dataId).values);return this.makeOutput(e.shape,e.dtype,t)}if(P().getBool(`WEBGL_PACK_UNARY_OPERATIONS`))return this.packedUnaryOp(e,Uz,e.dtype);let t=new Bz(e.shape,Uz),n=this.compileAndRun(t,[e]);return fo().makeTensorFromTensorInfo(n)}makeTensorInfo(e,t,n){let r;if(t===`string`&&n!=null&&n.length>0&&ge(n[0])){let i=n.map(e=>Ni(e));r=this.write(i,e,t)}else r=this.write(n,e,t);return this.texData.get(r).usage=null,{dataId:r,shape:e,dtype:t}}makeOutput(e,t,n){return fo().makeTensorFromTensorInfo(this.makeTensorInfo(e,t,n),this)}unpackTensor(e){let t=new tB(e.shape);return this.runWebGLProgram(t,[e],e.dtype)}packTensor(e){let t=new Az(e.shape);return this.runWebGLProgram(t,[e],e.dtype,null,!0)}packedReshape(e,t){let n=[AI(e.shape),...jI(e.shape)],r={dtype:e.dtype,shape:n,dataId:e.dataId},i=new jz([AI(t),...jI(t)],n),a=[n],o=this.runWebGLProgram(i,[r],e.dtype,a,!0);return{dataId:o.dataId,shape:t,dtype:o.dtype}}decode(e,t){let{isPacked:n,shape:r,dtype:i}=this.texData.get(e);t!=null&&E(k(r)<=t[0]*t[1]*4,()=>`customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.`);let a=MI(r),o;o=n?new nR(a):new tR(a);let s=[t??ZF(a)];return{dtype:i,shape:r,dataId:this.runWebGLProgram(o,[{shape:a,dtype:i,dataId:e}],i,s,!0,t).dataId}}runWebGLProgram(e,t,n,r,i=!1,a){let o=this.makeTensorInfo(e.outputShape,n),s=this.texData.get(o.dataId);if(e.packedOutput&&(s.isPacked=!0),e.outPackingScheme===KF.DENSE&&(s.texShape=(a??ZF(e.outputShape)).map(e=>e*2)),e.outTexUsage!=null&&(s.usage=e.outTexUsage),k(o.shape)===0)return s.values=M(o.dtype,0),o;let c=[],l=t.map(t=>{if(t.dtype===`complex64`)throw Error(`GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.`);let n=this.texData.get(t.dataId);if(n.texture==null){if(!e.packedInputs&&k(t.shape)<=P().getNumber(`WEBGL_SIZE_UPLOAD_UNIFORM`))return{shape:t.shape,texData:null,isUniform:!0,uniformValues:n.values};e.packedInputs&&(n.isPacked=!0,n.shape=t.shape)}if(this.uploadToGPU(t.dataId),!!n.isPacked!=!!e.packedInputs)t=n.isPacked?this.unpackTensor(t):this.packTensor(t),c.push(t),n=this.texData.get(t.dataId);else if(n.isPacked&&!FI(n.shape,t.shape)){let e=t,r=t.shape;t.shape=n.shape,t=this.packedReshape(t,r),c.push(t),n=this.texData.get(t.dataId),e.shape=r}return{shape:t.shape,texData:n,isUniform:!1}});this.uploadToGPU(o.dataId);let u={shape:o.shape,texData:s,isUniform:!1},d=$L(e,l,u),f=this.getAndSaveBinary(d,()=>YL(this.gpgpu,e,l,u)),p=this.activeTimers!=null,m;p&&(m=this.startTimer()),P().get(`ENGINE_COMPILE_ONLY`)||QL(this.gpgpu,f,l,u,r),c.forEach(e=>this.disposeIntermediateTensorInfo(e)),p&&(m=this.endTimer(m),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(m)}));let h=P().getNumber(`WEBGL_FLUSH_THRESHOLD`);if(h>0){let e=ji();e-this.lastGlFlushTime>h&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=e)}if(!P().getBool(`WEBGL_LAZILY_UNPACK`)&&s.isPacked&&i===!1){let e=this.unpackTensor(o);return this.disposeIntermediateTensorInfo(o),e}return o}compileAndRun(e,t,n,r,i=!1){return n||=t[0].dtype,this.runWebGLProgram(e,t,n,r,i)}getAndSaveBinary(e,t){return e in this.binaryCache||(this.binaryCache[e]=t()),this.binaryCache[e]}getTextureManager(){return this.textureManager}dispose(){this.disposed||=(P().getBool(`IS_TEST`)||Object.keys(this.binaryCache).forEach(e=>{this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram),delete this.binaryCache[e]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<`u`&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),!0)}floatPrecision(){return this.floatPrecisionValue??=ho(()=>{if(!P().get(`WEBGL_RENDER_FLOAT32_ENABLED`)){let e=P().getBool(`DEBUG`);P().set(`DEBUG`,!1);let t=this.abs(Nf(1e-8)).dataSync()[0];if(P().set(`DEBUG`,e),t>0)return 32}return 16}),this.floatPrecisionValue}epsilon(){return this.floatPrecision()===32?rB:iB}uploadToGPU(e){let t=this.texData.get(e),{shape:n,dtype:r,values:i,texture:a,usage:o,isPacked:s}=t;if(a!=null)return;let c=this.activeTimers!=null,l;c&&(l=ji());let u=t.texShape;if(u??(u=NI(n,s),t.texShape=u),i!=null){let e=MI(n),a,o=u[1],d=u[0],f=i instanceof Uint8Array||i instanceof Uint8ClampedArray;(s||!f)&&([o,d]=QF(u[0],u[1])),a=s?new sR(e,f):new oR(e,f);let p=f?[d,o]:u,m=this.makeTensorInfo(p,r),h=this.texData.get(m.dataId);h.usage=f?qF.PIXELS:qF.UPLOAD,h.texShape=p,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(m.dataId),o,d,i);let g=[[d,o]],_=this.runWebGLProgram(a,[m],r,g,!0),v=this.texData.get(_.dataId);t.texShape=v.texShape,t.isPacked=v.isPacked,t.usage=v.usage,P().get(`ENGINE_COMPILE_ONLY`)?this.disposeData(_.dataId):(t.texture=v.texture,t.values=null,this.texData.delete(_.dataId)),this.disposeIntermediateTensorInfo(m),c&&(this.uploadWaitMs+=ji()-l)}else t.texture=this.acquireTexture(u,o,r,s)}convertAndCacheOnCPU(e,t){let n=this.texData.get(e),{dtype:r}=n;return t!=null&&(n.values=dB(t,r)),n.values}acquireTexture(e,t,n,r){if(this.numBytesInGPU+=this.computeBytes(e,n),!this.warnedAboutMemory&&this.numBytesInGPU>this.numMBBeforeWarning*1024*1024){let e=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${e} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(e,t,r)}computeBytes(e,t){return e[0]*e[1]*me(t)}checkCompileCompletion(){for(let[,e]of Object.entries(this.binaryCache))this.checkCompletion_(e)}async checkCompileCompletionAsync(){let e=[];if(this.gpgpu.parallelCompilationExtension){for(let[,t]of Object.entries(this.binaryCache))e.push(this.checkCompletionAsync_(t));return Promise.all(e)}for(let[,t]of Object.entries(this.binaryCache)){let n=new Promise(e=>{try{this.checkCompletion_(t),e(!0)}catch(e){throw e}});e.push(n)}return Promise.all(e)}async checkCompletionAsync_(e){return this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?this.checkCompletion_(e):(await YT(),this.checkCompletionAsync_(e))}checkCompletion_(e){if(this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.gl.LINK_STATUS)===!1)throw console.log(this.gpgpu.gl.getProgramInfoLog(e.webGLProgram)),this.gpgpu.gl.getShaderParameter(e.fragmentShader,this.gpgpu.gl.COMPILE_STATUS)===!1?(uI(e.source,this.gpgpu.gl.getShaderInfoLog(e.fragmentShader)),Error(`Failed to compile fragment shader.`)):Error(`Failed to link vertex and fragment shaders.`);return!0}getUniformLocations(){for(let e of Object.values(this.binaryCache)){this.gpgpu.buildVao(e.webGLProgram);let{variablesLocations:t,customUniformLocations:n,infLoc:r,nanLoc:i,outShapeLocation:a,outShapeStridesLocation:o,outTexShapeLocation:s}=XL(this.gpgpu,e.program,e.webGLProgram);e.variablesLocations=t,e.customUniformLocations=n,e.infLoc=r,e.nanLoc=i,e.outShapeLocation=a,e.outShapeStridesLocation=o,e.outTexShapeLocation=s}}createTensorFromGPUData(e,t,n){e.channels=e.channels||`RGBA`;let{texture:r,height:i,width:a,channels:o}=e,s=fo().backend;if(!s.gpgpu.gl.isTexture(r))throw Error(`The texture is invalid. Also, please make sure the texture and the TFJS WebGL backend are using the same canvas. If you want to use your own custom canvas, you have to create and use the custom TFJS WebGL backend created from the canvas through 'new tf.MathBackendWebGL(customCanvas)'.`);let c=s.writeTexture(r,t,n,i,a,o);return fo().makeTensorFromDataId(c,t,n,s)}};uB.nextDataId=0;function dB(e,t){if(t===`float32`||t===`complex64`)return e;if(t===`int32`||t===`bool`){let n=t===`int32`?new Int32Array(e.length):new Uint8Array(e.length);for(let t=0;t<n.length;++t)n[t]=Math.round(e[t]);return n}throw Error(`Unknown dtype ${t}`)}J(),Ra()&&To(`webgl`,()=>new uB,2),J();var fB=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`,pB=class{constructor(e,t,n){this.variableNames=[`A`,`B`],this.outputShape=zd(t,n),this.enableShapeUniforms=eR(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${e}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}};J();var mB=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`,hB=class{constructor(e,t,n,r=!1){this.variableNames=[`A`,`B`],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=zd(t,n);let i=this.outputShape.length;this.enableShapeUniforms=eR(i);let a=``;if(r){if(i===0||k(this.outputShape)===1)a=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(a=`
          ${GL(i)} coords = getOutputCoords();
        `,i===1)this.enableShapeUniforms?a+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:a+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let e=Oz(`coords`,i);this.enableShapeUniforms?a+=`
            bool nextRowOutOfBounds =
              (${e[i-2]} + 1) >= outShape[${i} - 2];
            bool nextColOutOfBounds =
              (${e[i-1]} + 1) >= outShape[${i} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:a+=`
            bool nextRowOutOfBounds =
              (${e[i-2]} + 1) >= ${this.outputShape[i-2]};
            bool nextColOutOfBounds =
              (${e[i-1]} + 1) >= ${this.outputShape[i-1]};
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        ${e}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${a}

        setOutput(result);
      }
    `}};J();function gB(e){let{inputs:t,backend:n}=e,{x:r}=t;return n.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}var _B={kernelName:Qt,backendName:`webgl`,kernelFunc:gB};J();function vB(e){let{inputs:t,backend:n}=e,{real:r,imag:i}=t,a=n.makeTensorInfo(r.shape,`complex64`),o=n.texData.get(a.dataId);return o.complexTensorInfos={real:gB({inputs:{x:r},backend:n}),imag:gB({inputs:{x:i},backend:n})},a}var yB={kernelName:mt,backendName:`webgl`,kernelFunc:vB};J();var bB=`return (a < 0.) ? b * a : a;`,xB=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function SB(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{alpha:a}=r,o=n.makeTensorInfo([],`float32`,Oi(a,`float32`)),s=P().getBool(`WEBGL_PACK_BINARY_OPERATIONS`)?new hB(xB,i.shape,o.shape):new pB(bB,i.shape,o.shape),c=n.runWebGLProgram(s,[i,o],`float32`);return n.disposeIntermediateTensorInfo(o),c}var CB={kernelName:an,backendName:`webgl`,kernelFunc:SB};J();var wB=`return (a < 0.) ? b * a : a;`,TB=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function EB(e){let{inputs:t,backend:n}=e,{x:r,alpha:i}=t,a=P().getBool(`WEBGL_PACK_BINARY_OPERATIONS`)?new hB(TB,r.shape,i.shape):new pB(wB,r.shape,i.shape);return n.runWebGLProgram(a,[r,i],`float32`)}var DB={kernelName:Rn,backendName:`webgl`,kernelFunc:EB};J();var OB=`if (isnan(x)) return x;`;function kB({opSnippet:e,packedOpSnippet:t,cpuKernelImpl:n,dtype:r}){return({inputs:i,backend:a})=>{let{x:o}=i,s=a,c=r||o.dtype;if(s.shouldExecuteOnCPU([o])&&n!=null){let e=n(s.texData.get(o.dataId).values,c);return s.makeTensorInfo(o.shape,c,e)}let l=P().getBool(`WEBGL_PACK_UNARY_OPERATIONS`)&&t!=null,u;return u=l?new eB(o.shape,t):new Bz(o.shape,e),s.runWebGLProgram(u,[o],c)}}function AB({opSnippet:e,packedOpSnippet:t,checkOutOfBounds:n=!1,supportsComplex:r=!1,cpuKernelImpl:i,dtype:a}){return({inputs:o,backend:s})=>{let{a:c,b:l}=o,u=s;if(r&&c.dtype===`complex64`){let t=u.texData.get(c.dataId),n=u.texData.get(l.dataId),[r,i]=[[t.complexTensorInfos.real,n.complexTensorInfos.real],[t.complexTensorInfos.imag,n.complexTensorInfos.imag]].map(t=>{let[n,r]=t,i={dataId:n.dataId,dtype:n.dtype,shape:c.shape},a={dataId:r.dataId,dtype:r.dtype,shape:l.shape},o=new pB(e,c.shape,l.shape);return u.runWebGLProgram(o,[i,a],la(n.dtype,r.dtype))}),a=vB({inputs:{real:r,imag:i},backend:u});return u.disposeIntermediateTensorInfo(r),u.disposeIntermediateTensorInfo(i),a}let d=a||la(c.dtype,l.dtype);if((c.dtype===`string`||l.dtype===`string`||u.shouldExecuteOnCPU([c,l]))&&i!=null){let e=u.texData.get(c.dataId).values,t=u.texData.get(l.dataId).values,n=c.dtype===`string`?_D(e):e,r=c.dtype===`string`?_D(t):t,[a,o]=i(c.shape,l.shape,n,r,d),s=u.makeTensorInfo(o,d),f=u.texData.get(s.dataId);return f.values=a,s}let f=P().getBool(`WEBGL_PACK_BINARY_OPERATIONS`)&&t!=null,p;return p=f?new hB(t,c.shape,l.shape,n):new pB(e,c.shape,l.shape),u.runWebGLProgram(p,[c,l],d)}}function jB(e,t=!1){if(e===`linear`)return t?Yz:Hz;if(e===`relu`)return t?Zz:Gz;if(e===`elu`)return t?Xz:Wz;if(e===`relu6`)return t?Qz:Kz;if(e===`prelu`)return t?TB:wB;if(e===`leakyrelu`)return t?xB:bB;if(e===`sigmoid`)return t?$z:Jz;throw Error(`Activation ${e} has not been implemented for the WebGL backend.`)}var MB=class{constructor(e,t,n,r=!1,i=!1,a=!1,o=null,s=!1,c=!1){this.variableNames=[`matrixA`,`matrixB`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=n,this.enableShapeUniforms=eR(this.outputShape.length);let l=r?e[1]:e[2],u=Math.ceil(l/2),d=r?`i * 2, rc.y`:`rc.y, i * 2`,f=i?`rc.z, i * 2`:`i * 2, rc.z`,p=r?[`a.xxyy`,`a.zzww`]:[`a.xxzz`,`a.yyww`],m=i?[`b.xzxz`,`b.ywyw`]:[`b.xyxy`,`b.zwzw`],h=``,g=``;o&&(h=s?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:c?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:`vec4 activation(vec4 x) {
          ${o}
        }`,g=`result = activation(result);`);let _=a?`result += getBiasAtOutCoords();`:``;a&&this.variableNames.push(`bias`),s&&this.variableNames.push(`preluActivationWeights`),c&&this.variableNames.push(`leakyreluAlpha`);let v=`rc.x`,y=`rc.x`;e[0]<t[0]?v=`imod(rc.x, ${e[0]})`:t[0]<e[0]&&(y=`imod(rc.x, ${t[0]})`),this.userCode=`
      ${h}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${u}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${v};
        int batchB = ${y};
        for (int i = 0; i < ${u}; i++) {
          vec4 a = getMatrixA(batchA, ${d});
          vec4 b = getMatrixB(batchB, ${f});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${p[0]} * ${m[0]});
          result += (${p[1]} * ${m[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${_}

        ${g}

        setOutput(result);
      }
    `}};J();var NB={REAL:`return areal * breal - aimag * bimag;`,IMAG:`return areal * bimag + aimag * breal;`},PB=class{constructor(e,t,n){this.variableNames=[`AReal`,`AImag`,`BReal`,`BImag`],this.outputShape=zd(t,n),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${e}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}};J();var FB=`return a * b;`;function IB(e){let{inputs:t,backend:n}=e,{a:r,b:i}=t,a=la(r.dtype,i.dtype);if(r.dtype===`complex64`){let e=n.texData.get(r.dataId),t=n.texData.get(i.dataId),a=new PB(NB.REAL,r.shape,i.shape),o=new PB(NB.IMAG,r.shape,i.shape),s=[{dataId:e.complexTensorInfos.real.dataId,dtype:e.complexTensorInfos.real.dtype,shape:r.shape},{dataId:e.complexTensorInfos.imag.dataId,dtype:e.complexTensorInfos.imag.dtype,shape:r.shape},{dataId:t.complexTensorInfos.real.dataId,dtype:t.complexTensorInfos.real.dtype,shape:i.shape},{dataId:t.complexTensorInfos.imag.dataId,dtype:t.complexTensorInfos.imag.dtype,shape:i.shape}],c=n.runWebGLProgram(a,s,`float32`),l=n.runWebGLProgram(o,s,`float32`),u=vB({inputs:{real:c,imag:l},backend:n});return n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(l),u}if(n.shouldExecuteOnCPU([r,i])){let e=n.texData.get(r.dataId),t=n.texData.get(i.dataId),[o,s]=ez(r.shape,i.shape,e.values,t.values,a),c=n.makeTensorInfo(s,a),l=n.texData.get(c.dataId);return l.values=o,c}let o;return o=P().getBool(`WEBGL_PACK_BINARY_OPERATIONS`)?new hB(FB,r.shape,i.shape):new pB(FB,r.shape,i.shape),n.runWebGLProgram(o,[r,i],a)}var LB={kernelName:On,backendName:`webgl`,kernelFunc:IB};function RB(e,t,n){let r=[AI(e.shape),...jI(e.shape)],i={dtype:e.dtype,shape:r,dataId:e.dataId},a=new jz([AI(t),...jI(t)],r),o=[r],s=n.runWebGLProgram(a,[i],e.dtype,o,!0);return{dataId:s.dataId,shape:t,dtype:s.dtype}}J();function Q(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{shape:a}=r,o=n,s=k(i.shape),c=ce(a,s),l=k(c);E(s===l,()=>`The new shape (${c}) has ${l} elements and the old shape (${i.shape}) has ${s} elements. The new shape and old shape must have the same number of elements.`);let u=o.texData.get(i.dataId);return u.isPacked&&!FI(i.shape,c)&&!(u.texture!==null&&FI(u.shape,c))?RB(i,c,o):(o.incRef(i.dataId),{dataId:i.dataId,shape:c,dtype:i.dtype})}var zB={kernelName:qn,backendName:`webgl`,kernelFunc:Q};J();var BB=class{constructor(e,t){this.variableNames=[`x`];let{windowSize:n,batchSize:r,inSize:i,outSize:a}=e;this.outputShape=[r,a];let o=Math.floor(n/4)*4,s=n%4,c=`sumValue += dot(values, ones);`;if(t!=null){let e=1/t;c=`sumValue += dot(values * ${ne(e)?e.toPrecision(2):e}, ones);`}let l=``;i%n>0&&(l=`
        if (inIdx < 0 || inIdx >= ${i}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${l}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${n};

        float sumValue = 0.0;

        for (int i = 0; i < ${o}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${c}
        }

        int inIdx = inOffset + ${o};
        if (${s===1}) {
          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);

          ${c}
        } else if (${s===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1), 0.0, 0.0);

          ${c}
        } else if (${s===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2), 0.0);

          ${c}
        }
        setOutput(sumValue);
      }
    `}},VB=class{constructor(e,t){this.variableNames=[`x`];let{windowSize:n,batchSize:r,inSize:i,outSize:a}=e;this.outputShape=[r,a];let o=`0.0`,s=``;t===`prod`?o=`1.0`:t===`min`?(o=`1.0 / 1e-20`,s=`min`):t===`max`&&(o=`-1.0 / 1e-20`,s=`max`);let c=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t===`sum`?c=`sumValue`:t===`prod`?c=`prodValue`:t===`all`?c=`allValue`:t===`any`&&(c=`anyValue`);let l=Math.floor(n/4)*4,u=n%4,d=`
      if (${t===`sum`}) {
        sumValue += dot(values, ones);
      } else if (${t===`prod`}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${s}(values, minMaxValue);
        if (${t===`min`} || ${t===`max`}) {
          minMaxValue = ${s}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,f=`vec4`;t===`all`?(o=`1.0`,d=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,f=`bvec4`):t===`any`&&(o=`0.0`,d=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,f=`bvec4`);let p=``;i%n>0&&(p=`
        if (inIdx < 0 || inIdx >= ${i}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${o};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${p}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${n};

        vec4 minMaxValue = vec4(${o});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${l}; i += 4) {
          int inIdx = inOffset + i;
          ${f} values = ${f}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${d}
        }

        int inIdx = inOffset + ${l};
        if (${u===1}) {
          ${f} values = ${f}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${d}
        } else if (${u===2}) {
          ${f} values = ${f}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${d}
        } else if (${u===3}) {
          ${f} values = ${f}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${d}
        }
        setOutput(${c});
      }
    `}};J();function HB(e){let t=[];for(;t.length===0||t[t.length-1].outSize!==1;){let n=t.length?t[t.length-1].outSize:e[1],r=cE(n);t.push({inSize:n,windowSize:r,outSize:Math.ceil(n/r)})}return t}function UB(e,t,n,r){let i=HB(e.shape),a=e;for(let o=0;o<i.length;o++){let{inSize:s,windowSize:c,outSize:l}=i[o],u,d;u=n===`mean`?o===0?new BB({windowSize:c,inSize:s,batchSize:e.shape[0],outSize:l},s):new BB({windowSize:c,inSize:s,batchSize:e.shape[0],outSize:l}):new VB({windowSize:c,inSize:s,batchSize:e.shape[0],outSize:l},n),d=a,a=r.runWebGLProgram(u,[a],t),d.dataId!==e.dataId&&r.disposeIntermediateTensorInfo(d)}return a}var WB=class{constructor(e,t){this.variableNames=[`A`];let n=Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[t[r]];this.outputShape=n,this.rank=n.length;let r=GL(this.rank),i=GB(t);this.userCode=`
    void main() {
      ${r} resRC = getOutputCoords();
      setOutput(getA(${i}));
    }
    `}};function GB(e){let t=e.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let n=[`resRC.x`,`resRC.y`,`resRC.z`,`resRC.w`,`resRC.u`,`resRC.v`],r=Array(t);for(let t=0;t<e.length;t++)r[e[t]]=n[t];return r.join()}var KB=class{constructor(e,t){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0;let n=Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[t[r]];if(this.outputShape=n,this.rank=n.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let r=GL(this.rank),i=Dz(`rc`,this.rank),a=Array(this.rank);for(let e=0;e<t.length;e++)a[t[e]]=i[e];let o=`vec2(${a.slice(-2).join()})`,s=`++${i[this.rank-1]} < ${n[this.rank-1]}`,c=`getChannel(getA(${a.join()}), ${o})`;this.userCode=`
    void main() {
      ${r} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${c};
      if(${s}) {
        result[1] = ${c};
      }
      --${i[this.rank-1]};
      if(++${i[this.rank-2]} < ${n[this.rank-2]}) {
        result[2] = ${c};
        if(${s}) {
          result[3] = ${c};
        }
      }
      setOutput(result);
    }
    `}};J();function qB(e,t,n){let r=P().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)?new KB(e.shape,t):new WB(e.shape,t);return n.runWebGLProgram(r,[e],e.dtype)}J();function JB(e,t,n,r){let i=t,a=e.shape.length,o=j(i,e.shape),s=o,c=bf(s,a),l=c!=null,u=e;l&&(u=qB(e,c,r),s=Sf(s.length,a)),yf(`sum`,s,a);let[d,f]=_f(u.shape,s),p=d;n&&(p=vf(d,o));let m=k(f),h=k(e.shape)/m,g=Q({inputs:{x:u},attrs:{shape:[h,m]},backend:r}),_=UB(g,ua(e.dtype),`sum`,r),v=Q({inputs:{x:_},attrs:{shape:p},backend:r});return r.disposeIntermediateTensorInfo(g),r.disposeIntermediateTensorInfo(_),l&&r.disposeIntermediateTensorInfo(u),v}J();function YB(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;return JB(i,a,o,n)}var XB={kernelName:`Sum`,backendName:`webgl`,kernelFunc:YB};J();function ZB(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{perm:a}=r,o=n,s=i.shape.length,c=Array(s);for(let e=0;e<c.length;e++)c[e]=i.shape[a[e]];let l;if(o.shouldExecuteOnCPU([i])){let e=o.texData.get(i.dataId).values,t=Tz(e,i.shape,i.dtype,a,c);l=o.makeTensorInfo(c,i.dtype);let n=o.texData.get(l.dataId);n.values=t}else l=qB(i,a,o);return l}var QB={kernelName:Mr,backendName:`webgl`,kernelFunc:ZB};J();function $B({a:e,b:t,transposeA:n,transposeB:r,backend:i,bias:a=null,preluActivationWeights:o=null,leakyreluAlpha:s=0,activation:c=null}){let l=e.shape.length,u=t.shape.length,d=n?e.shape[l-2]:e.shape[l-1],f=r?t.shape[u-1]:t.shape[u-2],p=n?e.shape[l-1]:e.shape[l-2],m=r?t.shape[u-2]:t.shape[u-1],h=e.shape.slice(0,-2),g=t.shape.slice(0,-2),_=k(h),v=k(g),y=zd(e.shape.slice(0,-2),t.shape.slice(0,-2)).concat([p,m]);E(d===f,()=>`Error in matMul: inner shapes (${d}) and (${f}) of Tensors with shapes ${e.shape} and ${t.shape} and transposeA=${n} and transposeB=${r} must match.`);let b=n?[_,d,p]:[_,p,d],x=r?[v,m,f]:[v,f,m],S=Q({inputs:{x:e},backend:i,attrs:{shape:b}}),C=Q({inputs:{x:t},backend:i,attrs:{shape:x}}),w=[S,C],T=Math.max(_,v),D=n?S.shape[1]:S.shape[2],O=a!=null,ee=o!=null,te=c===`leakyrelu`,A=c==null?null:jB(c,!0),ne=O||ee||te||A!=null,re;if((p===1||m===1)&&D>1e3&&ne===!1){let e=S,t=C;n&&(e=ZB({inputs:{x:S},backend:i,attrs:{perm:[0,2,1]}}),w.push(e)),r&&(t=ZB({inputs:{x:C},backend:i,attrs:{perm:[0,2,1]}}),w.push(t));let a=m!==1,o=m===1,s=e;a&&(s=Q({inputs:{x:e},backend:i,attrs:{shape:[T,D,1]}}),w.push(s));let c=m===1?2:1,l=t;o&&(l=Q({inputs:{x:t},backend:i,attrs:{shape:[T,1,D]}}),w.push(l));let u=IB({inputs:{a:s,b:l},backend:i});re=YB({inputs:{x:u},backend:i,attrs:{axis:c,keepDims:!0}}),w.push(u)}else{let c=la(e.dtype,t.dtype),l=new MB(b,x,[T,p,m],n,r,O,A,ee,te),u=[S,C];if(a!=null&&u.push(a),ee&&u.push(o),te){let e=i.makeTensorInfo([],`float32`,Oi(s,`float32`));u.push(e),w.push(e)}re=i.runWebGLProgram(l,u,c)}let ie=Q({inputs:{x:re},backend:i,attrs:{shape:y}});w.push(re);for(let e of w)i.disposeIntermediateTensorInfo(e);return ie}J();function eV(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a,bias:o,preluActivationWeights:s}=t,{transposeA:c,transposeB:l,activation:u,leakyreluAlpha:d}=r;return $B({a:i,b:a,transposeA:c,transposeB:l,backend:n,bias:o,preluActivationWeights:s,leakyreluAlpha:d,activation:u})}var tV={kernelName:Vr,backendName:`webgl`,kernelFunc:eV};J();var nV=`return abs(x);`;function rV(e){let{inputs:t,backend:n}=e,{x:r}=t;if(n.shouldExecuteOnCPU([r])&&r.dtype!==`complex64`){let e=dz(n.texData.get(r.dataId).values);return n.makeTensorInfo(r.shape,r.dtype,e)}let i;return i=P().getBool(`WEBGL_PACK_UNARY_OPERATIONS`)?new eB(r.shape,nV):new Bz(r.shape,nV),n.runWebGLProgram(i,[r],r.dtype)}var iV={kernelName:`Abs`,backendName:`webgl`,kernelFunc:rV};J();var aV=kB({opSnippet:Vz+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`}),oV={kernelName:Ke,backendName:`webgl`,kernelFunc:aV};J();var sV=kB({opSnippet:Vz+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`}),cV={kernelName:qe,backendName:`webgl`,kernelFunc:sV};J();var lV=`return a + b;`,uV={kernelName:`Add`,backendName:`webgl`,kernelFunc:AB({opSnippet:lV,packedOpSnippet:lV,supportsComplex:!0,cpuKernelImpl:MR})},dV=class{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let n=[];this.variableNames.forEach(e=>{n.push(`float v${e} = get${e}AtOutCoords();`)});let r=this.variableNames.map(e=>`v${e}`).join(` + `);this.userCode=`
      void main() {
        ${n.join(`
        `)}

        float result = ${r};
        setOutput(result);
      }
    `}},fV=class{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let n=[];this.variableNames.forEach(e=>{n.push(`vec4 v${e} = get${e}AtOutCoords();`)});let r=this.variableNames.map(e=>`v${e}`).join(` + `);this.userCode=`
      void main() {
        ${n.join(`
        `)}

        vec4 result = ${r};
        setOutput(result);
      }
    `}};J();function pV(e){let{inputs:t,backend:n}=e,r=t;if(r.length===1)return gB({inputs:{x:r[0]},backend:n});if(r.length>P().getNumber(`WEBGL_MAX_TEXTURES_IN_SHADER`)){let e=Math.floor(r.length/2);return pV({inputs:[pV({inputs:r.slice(0,e),backend:n}),pV({inputs:r.slice(e),backend:n})],backend:n})}let i=r.map(e=>e.dtype).reduce((e,t)=>la(e,t)),a=r.map(e=>e.shape),o=P().getBool(`WEBGL_PACK`)?new fV(r[0].shape,a):new dV(r[0].shape,a);return n.runWebGLProgram(o,r,i)}var mV={kernelName:Je,backendName:`webgl`,kernelFunc:pV};J();function hV(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=i.shape.length,c=j(a,i.shape),l=c,u=bf(l,s),d=i;u!=null&&(d=ZB({inputs:{x:i},backend:n,attrs:{perm:u}}),l=Sf(l.length,s)),yf(`all`,l,s);let[f,p]=_f(d.shape,l),m=k(p),h=Q({inputs:{x:d},backend:n,attrs:{shape:[-1,m]}}),g=UB(h,h.dtype,`all`,n),_;if(o){let e=vf(f,c);_=Q({inputs:{x:g},backend:n,attrs:{shape:e}})}else _=Q({inputs:{x:g},backend:n,attrs:{shape:f}});return n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(g),u!=null&&n.disposeIntermediateTensorInfo(d),_}var gV={kernelName:`All`,backendName:`webgl`,kernelFunc:hV};J();function _V(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=i.shape.length,c=j(a,i.shape),l=c,u=bf(l,s),d=i;u!=null&&(d=ZB({inputs:{x:i},backend:n,attrs:{perm:u}}),l=Sf(l.length,s)),yf(`any`,l,s);let[f,p]=_f(d.shape,l),m=k(p),h=Q({inputs:{x:d},backend:n,attrs:{shape:[-1,m]}}),g=UB(h,h.dtype,`any`,n),_;if(o){let e=vf(f,c);_=Q({inputs:{x:g},backend:n,attrs:{shape:e}})}else _=Q({inputs:{x:g},backend:n,attrs:{shape:f}});return n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(g),u!=null&&n.disposeIntermediateTensorInfo(d),_}var vV={kernelName:`Any`,backendName:`webgl`,kernelFunc:_V},yV=class{constructor(e,t,n){this.variableNames=[`A`];let{windowSize:r,batchSize:i,outSize:a}=e;n||this.variableNames.push(`bestIndicesA`),this.outputShape=[i,a];let o=t===`max`?`>`:`<`,s=n?`inOffset + i;`:`round(getBestIndicesA(batch, inOffset + i));`;this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${r}; i++) {
          int inIdx = ${s};
          float candidate = getA(batch, inIdx);
          if (candidate ${o} bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}};J();var bV=class{constructor(e,t,n,r){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,E(e.length>2,()=>`Packed arg${n.charAt(0).toUpperCase()+n.slice(1)} supports only inputs with rank above 2.`);let i=e[e.length-1],a=Math.ceil(i/t);this.outputShape=e.slice(0,-1),a>1&&this.outputShape.push(a),r||this.variableNames.push(`bestIndicesA`);let o=this.outputShape,s=o.length,c=GL(s),l=Oz(`coords`,s),u,d;if(a===1){d=s+1;let e=GL(d);u=`
        ${e} sourceLocR = ${e}(${l.join()}, 0);
        ++${l[s-1]};
        ${e} sourceLocG = ${e}(${l.join()}, 0);
        ++${l[s-2]};
        ${e} sourceLocA = ${e}(${l.join()}, 0);
        --${l[s-1]};
        ${e} sourceLocB = ${e}(${l.join()}, 0);
        --${l[s-2]};`}else d=s,u=`
        ${c} sourceLocR = coords;
        ++${l[s-1]};
        ${c} sourceLocG = coords;
        ++${l[s-2]};
        ${c} sourceLocA = coords;
        --${l[s-1]};
        ${c} sourceLocB = coords;
        --${l[s-2]};`;let f=[`x`,`y`,`z`,`w`,`u`,`v`].slice(0,d),p=`.`+f[d-1],m=f.map(e=>`int `+e),h=Oz(`sourceLocR`,d-1).concat(`inIdx.r`),g=Oz(`sourceLocG`,d-1).concat(`inIdx.g`),_=Oz(`sourceLocB`,d-1).concat(`inIdx.b`),v=Oz(`sourceLocA`,d-1).concat(`inIdx.a`),y=n===`max`?`greaterThan`:`lessThan`,b=r?``:`
          inIdx = round(vec4(getBestIndicesAChannel(${h.join()}),
                             getBestIndicesAChannel(${g.join()}),
                             getBestIndicesAChannel(${_.join()}),
                             getBestIndicesAChannel(${v.join()})));`,x=`vec4(
            getAChannel(${h.join()}),
            hasNextCol ? getAChannel(${g.join()}) : 0.,
            hasNextRow ? getAChannel(${_.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${v.join()}) : 0.)`,S=r?``:`
      float getBestIndicesAChannel(${m.join()}) {
        return getChannel(getBestIndicesA(${f.join()}),
                                          vec2(${f.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${m.join()}) {
        return getChannel(getA(${f.join()}),
                               vec2(${f.slice(-2).join()}));
      }
      ${S}
      void main() {
        ${c} coords = getOutputCoords();
        bool hasNextCol = ${l[s-1]} < ${o[s-1]-1};
        bool hasNextRow = ${l[s-2]} < ${o[s-2]-1};
        ${u}
        ivec4 srcIdx = ivec4(sourceLocR${p}, sourceLocG${p},
          sourceLocB${p}, sourceLocA${p}) * ${t};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${x};

        for (int i = 0; i < ${t}; i++) {
          inIdx = srcIdx;
          ${b}
          vec4 candidate = ${x};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${y}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}};J();function xV(e,t,n,r=null){let i=t.shape[0],a=t.shape[1];r!=null&&(i=r.shape[0],a=r.shape[1]);let o=cE(a),s=new yV({windowSize:o,inSize:a,batchSize:i,outSize:Math.ceil(a/o)},n,r==null),c=[t];r!=null&&c.push(r);let l=e.runWebGLProgram(s,c,`int32`);if(l.shape[1]===1)return l;let u=xV(e,t,n,l);return e.disposeIntermediateTensorInfo(l),u}function SV(e,t,n,r=null){let i=r==null?t.shape:r.shape,a=i[i.length-1],o=new bV(i,cE(a),n,r==null),s=r==null?[t]:[t,r],c=e.runWebGLProgram(o,s,`int32`);if(c.shape.length===t.shape.length){let r=SV(e,t,n,c);return e.disposeIntermediateTensorInfo(c),r}return c}function CV(e,t,n,r){let i=[n];if(yf(`arg`+r.charAt(0).toUpperCase()+r.slice(1),i,t.shape.length),!P().getBool(`WEBGL_PACK_REDUCE`)||t.shape.length<=2){let n=[],a=e.texData.get(t.dataId),o=a!==null&&a.isPacked,s=t;o&&(s=e.unpackTensor(t),n.push(s));let[c,l]=_f(s.shape,i),u=k(l),d=Q({inputs:{x:s},backend:e,attrs:{shape:[-1,u]}});n.push(d);let f=xV(e,d,r);n.push(f);let p=Q({inputs:{x:f},backend:e,attrs:{shape:c}});return n.forEach(t=>e.disposeIntermediateTensorInfo(t)),p}return SV(e,t,r)}J();function wV(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a}=r,o=j(a,i.shape),s=bf(o,i.shape.length),c=i,l=[];s!=null&&(c=ZB({inputs:{x:i},backend:n,attrs:{perm:s}}),l.push(c),o=Sf(o.length,c.shape.length)),yf(`argMax`,[o[0]],c.shape.length);let u=CV(n,c,o[0],`max`);return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),u}var TV={kernelName:Ye,backendName:`webgl`,kernelFunc:wV};J();function EV(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a}=r,o=j(a,i.shape),s=bf(o,i.shape.length),c=i,l=[];s!=null&&(c=ZB({inputs:{x:i},backend:n,attrs:{perm:s}}),l.push(c),o=Sf(o.length,c.shape.length)),yf(`argMin`,[o[0]],c.shape.length);let u=CV(n,c,o[0],`min`);return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),u}var DV={kernelName:F,backendName:`webgl`,kernelFunc:EV};J();var OV=kB({opSnippet:Vz+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`}),kV={kernelName:Xe,backendName:`webgl`,kernelFunc:OV};J();var AV=kB({opSnippet:Vz+`return log(x + sqrt(x * x + 1.0));`}),jV={kernelName:Ze,backendName:`webgl`,kernelFunc:AV};J();var MV=kB({opSnippet:Vz+`
  return atan(x);
`}),NV={kernelName:Qe,backendName:`webgl`,kernelFunc:MV};J();var PV=AB({opSnippet:fB+`
  return atan(a, b);
`,packedOpSnippet:`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+mB+`
  return result;
`}),FV={kernelName:et,backendName:`webgl`,kernelFunc:PV};J();var IV=kB({opSnippet:Vz+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`}),LV={kernelName:$e,backendName:`webgl`,kernelFunc:IV},RV=class{constructor(e,t,n,r=!1,i=!1){if(this.variableNames=[`x`],t===`avg`&&n)throw Error(`Cannot compute positions for average pool.`);let a=e.filterWidth,o=e.strideHeight,s=e.strideWidth,c=e.dilationHeight,l=e.dilationWidth,u=e.effectiveFilterHeight,d=e.effectiveFilterWidth,f=e.padInfo.top,p=e.padInfo.left;this.outputShape=e.outShape;let m=t===`avg`,h=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,g=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`,_=`0.0`;if(m||(_=`-1.0 / 1e-20`),n){this.userCode=`
        const ivec2 strides = ivec2(${o}, ${s});
        const ivec2 pads = ivec2(${f}, ${p});

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < ${u};
              wR += ${c}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${d};
                wC += ${l}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${r?i?h:g:`wR * ${d} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let v=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t===`avg`&&(v=`avgValue / max(count, 1.0)`);let y=Math.floor(a/4)*4,b=a%4,x=`
      if (${m}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${o}, ${s});
      const ivec2 pads = ivec2(${f}, ${p});
      const float initializationValue = ${_};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(${_});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${u};
            wR += ${c}) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${y}; wC += 4) {
            int xC = xCCorner + wC * ${l};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              getValue(batch, xR, xC + 2 * ${l}, d),
              getValue(batch, xR, xC + 3 * ${l}, d)
            );

            ${x}
          }

          int xC = xCCorner + ${y};
          if (${b===1}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${x}
          } else if (${b===2}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              initializationValue,
              initializationValue
            );

            ${x}
          } else if (${b===3}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              getValue(batch, xR, xC + 2 * ${l}, d),
              initializationValue
            );

            ${x}
          }
        }
        setOutput(${v});
      }
    `}},zV=class{constructor(e,t,n,r=!1,i=!1){if(this.variableNames=[`x`],t===`avg`&&n)throw Error(`Cannot compute positions for average pool.`);let a=e.filterWidth,o=e.strideDepth,s=e.strideHeight,c=e.strideWidth,l=e.dilationDepth,u=e.dilationHeight,d=e.dilationWidth,f=e.effectiveFilterDepth,p=e.effectiveFilterHeight,m=e.effectiveFilterWidth,h=e.padInfo.front,g=e.padInfo.top,_=e.padInfo.left;this.outputShape=e.outShape;let v=t===`avg`,y=`0.0`;if(v||(y=`-1.0 / 1e-20`),n){this.userCode=`
        const ivec3 strides =
            ivec3(${o}, ${s}, ${c});
        const ivec3 pads = ivec3(${h}, ${g}, ${_});

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < ${f};
              wD += ${l}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${e.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${p};
                wR += ${u}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${m};
                  wC += ${d}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition = ${r?i?`(((batch * ${e.inDepth} + xD) * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`((xD * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`wD * ${p} * ${m} +
                      wR * ${m} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let b=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t===`avg`&&(b=`avgValue / max(count, 1.0)`);let x=Math.floor(a/4)*4,S=a%4,C=`
      if (${v}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${o}, ${s}, ${c});
      const ivec3 pads = ivec3(${h}, ${g}, ${_});
      const float initializationValue = ${y};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(${y});
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < ${f};
            wD += ${l}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${p};
            wR += ${u}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${x}; wC += 4) {
              int xC = xCCorner + wC * ${d};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                getValue(batch, xD, xR, xC + 3 * ${d}, ch)
              );

              ${C}
            }

            int xC = xCCorner + ${x};
            if (${S===1}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${C}
            } else if (${S===2}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                initializationValue,
                initializationValue
              );

              ${C}
            } else if (${S===3}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                initializationValue
              );

              ${C}
            }
          }
        }
        setOutput(${b});
      }
    `}};J();function BV(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;JI(i,`avgPool`);let{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=r;E(_l(o,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let l=rl(i.shape,a,o,1,s,c);if(l.filterWidth===1&&l.filterHeight===1&&A(l.inShape,l.outShape))return gB({inputs:{x:i},backend:n});let u=new RV(l,`avg`,!1);return n.runWebGLProgram(u,[i],`float32`)}var VV={kernelName:tt,backendName:`webgl`,kernelFunc:BV};J();function HV(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c,dataFormat:l}=r,u=new zV(il(i.shape,a,o,[1,1,1],s,c,l),`avg`,!1);return n.runWebGLProgram(u,[i],`float32`)}var UV={kernelName:rt,backendName:`webgl`,kernelFunc:HV},WV=class{constructor(e){this.variableNames=[`dy`],this.outputShape=e.inShape;let t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,i=e.strideWidth,a=e.dilationHeight,o=e.dilationWidth,s=e.effectiveFilterHeight,c=e.effectiveFilterWidth,l=s-1-e.padInfo.top,u=c-1-e.padInfo.left,d=1/(t*n);this.userCode=`
      const ivec2 pads = ivec2(${l}, ${u});
      const float avgMultiplier = float(${d});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${s};
            wR += ${a}) {
          float dyR = float(dyRCorner + wR) / ${r}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${c};
            wC+= ${o}) {
            float dyC = float(dyCCorner + wC) / ${i}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}},GV=class{constructor(e){this.variableNames=[`dy`],this.outputShape=e.inShape;let t=e.filterDepth,n=e.filterHeight,r=e.filterWidth,i=e.strideDepth,a=e.strideHeight,o=e.strideWidth,s=e.dilationDepth,c=e.dilationHeight,l=e.dilationWidth,u=e.effectiveFilterDepth,d=e.effectiveFilterHeight,f=e.effectiveFilterWidth,p=u-1-e.padInfo.front,m=d-1-e.padInfo.top,h=f-1-e.padInfo.left,g=1/(t*n*r);this.userCode=`
      const ivec3 pads = ivec3(${p}, ${m}, ${h});
      const float avgMultiplier = float(${g});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${u};
            wD += ${s}) {
          float dyD = float(dyDCorner + wD) / ${i}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${d};
              wR += ${c}) {
            float dyR = float(dyRCorner + wR) / ${a}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${f};
                wC += ${l}) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};J();function KV(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,o=a,{filterSize:s,strides:c,pad:l,dimRoundingMode:u}=r,d=new GV(il(o.shape,s,c,[1,1,1],l,u));return n.runWebGLProgram(d,[i],o.dtype)}var qV={kernelName:it,backendName:`webgl`,kernelFunc:KV};J();function JV(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,o=a;JI([i,a],`avgPoolGrad`);let{filterSize:s,strides:c,pad:l}=r,u=new WV(rl(o.shape,s,c,1,l));return n.runWebGLProgram(u,[i],o.dtype)}var YV={kernelName:nt,backendName:`webgl`,kernelFunc:JV};J();function XV(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a}=t,{transposeA:o,transposeB:s}=r;return $B({a:i,b:a,transposeA:o,transposeB:s,backend:n})}var ZV={kernelName:at,backendName:`webgl`,kernelFunc:XV};J();var QV=class{constructor(e,t,n,r,i,a){this.outputShape=[],this.variableNames=[`x`,`mean`,`variance`],zd(e,t),zd(e,n);let o=`0.0`;r!=null&&(zd(e,r),this.variableNames.push(`offset`),o=`getOffsetAtOutCoords()`);let s=`1.0`;i!=null&&(zd(e,i),this.variableNames.push(`scale`),s=`getScaleAtOutCoords()`),this.outputShape=e,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${o};
        float scale = ${s};
        float inv = scale * inversesqrt(variance + float(${a}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}};J();var $V=class{constructor(e,t,n,r,i,a){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=[`x`,`mean`,`variance`],zd(e,t),zd(e,n);let o=`vec4(0.0)`;r!=null&&(zd(e,r),this.variableNames.push(`offset`),o=`getOffsetAtOutCoords()`);let s=`vec4(1.0)`;i!=null&&(zd(e,i),this.variableNames.push(`scale`),s=`getScaleAtOutCoords()`),this.outputShape=e,this.userCode=`
      void main() {
        vec4 offset = ${o};
        vec4 scale = ${s};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${a}));

        setOutput((x - mean) * inv + offset);
      }
    `}};J();var eH={kernelName:qt,backendName:`webgl`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r,mean:i,variance:a,offset:o,scale:s}=e;E(i.shape.length===a.shape.length,()=>`Batch normalization gradient requires mean and variance to have equal ranks.`),E(o==null||i.shape.length===o.shape.length,()=>`Batch normalization gradient requires mean and offset to have equal ranks.`),E(s==null||i.shape.length===s.shape.length,()=>`Batch normalization gradient requires mean and scale to have equal ranks.`);let{varianceEpsilon:c}=n;c??=.001;let l=[r,i,a],u=null;o!=null&&(u=o.shape,l.push(o));let d=null;s!=null&&(d=s.shape,l.push(s));let f=P().getBool(`WEBGL_PACK_NORMALIZATION`)?new $V(r.shape,i.shape,a.shape,u,d,c):new QV(r.shape,i.shape,a.shape,u,d,c);return t.runWebGLProgram(f,l,l[0].dtype)}},tH=class{constructor(e){this.variableNames=[`source`],this.outputShape=e,this.rank=e.length;let t=GL(this.rank);this.customUniforms=[{name:`start`,arrayIndex:this.rank,type:`int`}];let n=rH(this.rank),r;r=`
        ${t} sourceLoc;
        ${t} coords = getOutputCoords();
        ${e.map((e,t)=>`sourceLoc.${nH[t]} = start[${t}] + coords.${nH[t]};`).join(`
`)}
      `,this.userCode=`
      void main() {
        ${r}
        setOutput(getSource(${n}));
      }
    `}},nH=[`x`,`y`,`z`,`w`,`u`,`v`];function rH(e){if(e===1)return`sourceLoc`;if(e<=6)return nH.slice(0,e).map(e=>`sourceLoc.`+e).join(`,`);throw Error(`Slicing for rank ${e} is not yet supported`)}var iH=class{constructor(e){this.variableNames=[`source`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.customUniforms=[{name:`start`,arrayIndex:this.rank,type:`int`}];let t=GL(this.rank),n=Oz(`coords`,this.rank),r=Oz(`sourceLoc`,this.rank),i=this.rank===1?`sourceLoc`:`vec2(${r.slice(-2).join()})`,a=`getChannel(getSource(${r.join()}), ${i})`,o=`
      result.x = ${a};
      if (++${n[this.rank-1]} < ${e[this.rank-1]}) {
        ++${r[this.rank-1]};
        result.y = ${a};
        --${r[this.rank-1]};
      }
    `,s=this.rank===1?``:`
      --${n[this.rank-1]};
      if (++${n[this.rank-2]} < ${e[this.rank-2]}) {
        ++${r[this.rank-2]};
        result.z = ${a};
        if (++${n[this.rank-1]} < ${e[this.rank-1]}) {
          ++${r[this.rank-1]};
          result.w = ${a};
        }
      }
    `,c=this.rank<=4?`sourceLoc = coords +
            ${t}(${e.map((e,t)=>`start[${t}]`).join()});`:e.map((e,t)=>`${r[t]} = ${n[t]} + start[${t}];`).join(`
`);this.userCode=`
      void main() {
        ${t} coords = getOutputCoords();
        ${t} sourceLoc;
        ${c}
        vec4 result = vec4(0.);
        ${o}
        ${s}
        setOutput(result);
      }
    `}};J();function aH(e,t,n,r){let i=r.texData.get(e.dataId),a=r.makeTensorInfo(n,e.dtype),o=r.texData.get(a.dataId);Object.assign(o,i),o.refCount=1,o.shape=n,o.dtype=e.dtype;let s=FT(t,N(e.shape));i.slice&&(s+=i.slice.flatOffset),o.slice={flatOffset:s,origDataId:i.slice&&i.slice.origDataId||e.dataId};let c=r.dataRefCount.get(o.slice.origDataId)||1;return r.dataRefCount.set(o.slice.origDataId,c+1),a}function oH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{begin:a,size:o}=r,[s,c]=IT(i,a,o);if(ST(i,s,c),k(c)===0)return n.makeTensorInfo(c,i.dtype,[]);if(n.shouldExecuteOnCPU([i])||i.dtype===`string`){let e=fz(n.texData.get(i.dataId).values,s,c,i.shape,i.dtype);return n.makeTensorInfo(c,i.dtype,e)}let{isPacked:l}=n.texData.get(i.dataId),u=PT(i.shape,s,c);if(l||!u){let e=P().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)?new iH(c):new tH(c),t=[s];return n.runWebGLProgram(e,[i],i.dtype,t)}return n.uploadToGPU(i.dataId),aH(i,s,c,n)}var sH={kernelName:sr,backendName:`webgl`,kernelFunc:oH};J();var cH={kernelName:ot,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,crops:o}=r;E(i.shape.length<=4,()=>`batchToSpaceND for rank > 4 with a WebGL backend not implemented yet`);let s=a.reduce((e,t)=>e*t),c=fE(i.shape,a,s),l=pE(c.length,a.length),u=mE(i.shape,a,s),d=hE(o,a.length),f=gE(u,o,a.length),p=[],m=Q({inputs:{x:i},backend:n,attrs:{shape:c}}),h=ZB({inputs:{x:m},backend:n,attrs:{perm:l}}),g=Q({inputs:{x:h},backend:n,attrs:{shape:u}}),_=oH({inputs:{x:g},backend:n,attrs:{begin:d,size:f}});return p.push(m),p.push(h),p.push(g),p.forEach(e=>n.disposeIntermediateTensorInfo(e)),_}};J();function lH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,weights:a}=t,{size:o}=r,s=NR(n.readSync(i.dataId),n.readSync(a.dataId),a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,s)}var uH={kernelName:st,backendName:`webgl`,kernelFunc:lH};J();var dH=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,fH=`
  return float(int(a.r) & int(b.r));
`;function pH(e){let{inputs:t,backend:n}=e,{a:r,b:i}=t,a=P().getBool(`WEBGL_PACK_BINARY_OPERATIONS`),o=P().getNumber(`WEBGL_VERSION`);if(n.shouldExecuteOnCPU([r,i])||o===1){let e=n.texData.get(r.dataId).values,t=n.texData.get(i.dataId).values,[a,o]=FR(r.shape,i.shape,e,t,r.dtype),s=n.makeTensorInfo(o,r.dtype),c=n.texData.get(s.dataId);return c.values=a,s}let s;return s=a?new hB(dH,r.shape,i.shape,!1):new pB(fH,r.shape,i.shape),n.runWebGLProgram(s,[r,i],r.dtype)}var mH={kernelName:ct,backendName:`webgl`,kernelFunc:pH};J();function hH(e){let{inputs:t,backend:n}=e,{s0:r,s1:i}=t,a=n.readSync(r.dataId),o=n.readSync(i.dataId),s=zd(Array.from(a),Array.from(o));return n.makeTensorInfo([s.length],`int32`,Int32Array.from(s))}var gH={kernelName:ut,backendName:`webgl`,kernelFunc:hH};J();var _H=AB({opSnippet:`return float(a != b);`,cpuKernelImpl:nz,dtype:`bool`}),vH={kernelName:kn,backendName:`webgl`,kernelFunc:_H};J();function yH(e){let{inputs:t,backend:n}=e,{input:r}=t;return gB({inputs:{x:n.texData.get(r.dataId).complexTensorInfos.real},backend:n})}var bH={kernelName:Wn,backendName:`webgl`,kernelFunc:yH},xH=`return float(int(x));`;function SH(e,t){let n=new Bz(e.shape,xH),r=t.runWebGLProgram(n,[e],`int32`);return{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}J();function CH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dtype:a}=r;if(a===`complex64`){if(i.dtype===`complex64`)return gB({inputs:{x:i},backend:n});let e=sh(i.shape),t=CH({inputs:{x:i},backend:n,attrs:{dtype:`float32`}}),r=vB({inputs:{real:t,imag:e},backend:n});return e.dispose(),n.disposeIntermediateTensorInfo(t),r}if(i.dtype===`complex64`){let e=yH({inputs:{input:i},backend:n}),t=CH({inputs:{x:e},backend:n,attrs:{dtype:a}});return n.disposeIntermediateTensorInfo(e),t}if(!pe(i.dtype,a)){let e=gB({inputs:{x:i},backend:n});return{dataId:e.dataId,shape:e.shape,dtype:a}}if(n.shouldExecuteOnCPU([i])){let e=n.texData.get(i.dataId).values,[t,r,o]=IR(e,i.shape,i.dtype,a);return n.makeTensorInfo(t,r,o)}if(a===`int32`)return SH(i,n);if(a===`bool`){let e=n.makeTensorInfo([],`bool`,M(`bool`,1)),t=_H({inputs:{a:i,b:e},backend:n});return n.disposeIntermediateTensorInfo(e),t}throw Error(`Error in Cast: failed to cast ${i.dtype} to ${a}`)}var wH={kernelName:dt,backendName:`webgl`,kernelFunc:CH};J();var TH=`return ceil(x);`,EH=kB({opSnippet:TH,packedOpSnippet:TH,cpuKernelImpl:LR}),DH={kernelName:ft,backendName:`webgl`,kernelFunc:EH},OH=class{constructor(e){this.variableNames=[`A`],this.customUniforms=[{name:`minVal`,type:`float`},{name:`maxVal`,type:`float`}],this.outputShape=e,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}},kH=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`minVal`,type:`float`},{name:`maxVal`,type:`float`}],this.outputShape=e,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}};J();function AH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{clipValueMin:a,clipValueMax:o}=r,s;s=P().getBool(`WEBGL_PACK_CLIP`)?new kH(i.shape):new OH(i.shape);let c=[[a],[o]];return n.runWebGLProgram(s,[i],i.dtype,c)}var jH={kernelName:pt,backendName:`webgl`,kernelFunc:AH},MH=class{constructor(e){this.variableNames=[`real`,`imag`],this.outputShape=e,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}};J();function NH(e,t){return{dataId:t.dataId,dtype:t.dtype,shape:e.shape}}function PH(e){let{inputs:t,backend:n}=e,{x:r}=t,i=n.texData.get(r.dataId),a=new MH(r.shape),o=[NH(r,i.complexTensorInfos.real),NH(r,i.complexTensorInfos.imag)];return n.runWebGLProgram(a,o,o[0].dtype)}var FH={kernelName:ht,backendName:`webgl`,kernelFunc:PH};J();var IH=class{constructor(e){this.outputShape=[],this.outputShape=$T(e,1),this.variableNames=e.map((e,t)=>`T${t}`);let t=Array(e.length-1);t[0]=e[0][1];for(let n=1;n<t.length;n++)t[n]=t[n-1]+e[n][1];let n=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let e=1;e<t.length;e++){let r=t[e-1];n.push(`else if (yC < ${t[e]}) setOutput(getT${e}(yR, yC-${r}));`)}let r=t.length,i=t[t.length-1];n.push(`else setOutput(getT${r}(yR, yC-${i}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${n.join(`
        `)}
      }
    `}};J();var LH=class{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=$T(e,t);let n=this.outputShape,r=n.length,i=GL(r),a=Oz(`coords`,r),o=[`x`,`y`,`z`,`w`,`u`,`v`].slice(0,r);this.variableNames=e.map((e,t)=>`T${t}`);let s=Array(e.length-1);s[0]=e[0][t];for(let n=1;n<s.length;n++)s[n]=s[n-1]+e[n][t];let c=o[t],l=o.slice(-2),u=o.join(),d=`if (${c} < ${s[0]}) {
        return getChannel(
            getT0(${u}), vec2(${l.join()}));
        }`;for(let e=1;e<s.length;e++){let t=s[e-1];d+=`
        if (${c} < ${s[e]}  && ${c} >= ${s[e-1]}) {
          return getChannel(
            getT${e}(${RH(o,c,t)}),
            vec2(${RH(l,c,t)}));
        }`}let f=s.length,p=s[s.length-1];d+=`
        return getChannel(
          getT${f}(${RH(o,c,p)}),
          vec2(${RH(l,c,p)}));`,this.userCode=`
      float getValue(${o.map(e=>`int `+e)}) {
        ${d}
      }

      void main() {
        ${i} coords = getOutputCoords();
        vec4 result = vec4(getValue(${a}), 0., 0., 0.);

        ${a[r-1]} = ${a[r-1]} + 1;
        if (${a[r-1]} < ${n[r-1]}) {
          result.g = getValue(${a});
        }

        ${a[r-2]} = ${a[r-2]} + 1;
        if (${a[r-2]} < ${n[r-2]}) {
          result.a = getValue(${a});
        }

        ${a[r-1]} = ${a[r-1]} - 1;
        if (${a[r-2]} < ${n[r-2]} &&
            ${a[r-1]} < ${n[r-1]}) {
          result.b = getValue(${a});
        }
        setOutput(result);
      }
    `}};function RH(e,t,n){let r=e.indexOf(t);return e.map((e,t)=>t===r?`${e} - ${n}`:e).join()}J();function zH(e){let{inputs:t,backend:n}=e,{input:r}=t;return gB({inputs:{x:n.texData.get(r.dataId).complexTensorInfos.imag},backend:n})}var BH={kernelName:en,backendName:`webgl`,kernelFunc:zH};J();function VH(e,t,n){let r=e[0].dtype;if(r===`complex64`){let r=e.map(e=>yH({inputs:{input:e},backend:n})),i=e.map(e=>zH({inputs:{input:e},backend:n})),a=VH(r,t,n),o=VH(i,t,n),s=vB({inputs:{real:a,imag:o},backend:n});return r.forEach(e=>n.disposeIntermediateTensorInfo(e)),i.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.disposeIntermediateTensorInfo(a),n.disposeIntermediateTensorInfo(o),s}let i=n.shouldExecuteOnCPU(e);if(r===`string`&&(i=!0),i){let i=e.map(e=>{let r=[-1,k(e.shape.slice(t))];return Q({inputs:{x:e},backend:n,attrs:{shape:r}})}),a=RR(i.map(e=>({vals:n.readSync(e.dataId),shape:e.shape})),$T(i.map(e=>e.shape),1),r,i[0].shape[0]===1),o=$T(e.map(e=>e.shape),t),s=n.makeTensorInfo(o,r,a);return i.forEach(e=>n.disposeIntermediateTensorInfo(e)),s}let a=e.filter(e=>k(e.shape)>0),o=P().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)&&a[0].shape.length>1;if(a.length===1){let t=o?new Bz(e[0].shape,qz):new eB(e[0].shape,qz);return n.runWebGLProgram(t,e,r)}let s=P().getNumber(`WEBGL_MAX_TEXTURES_IN_SHADER`);if(a.length>s){let e=[];for(let r=0;r<a.length;r+=s){let i=a.slice(r,r+s);e.push(VH(i,t,n))}let r=VH(e,t,n);for(let t of e)n.disposeIntermediateTensorInfo(t);return r}if(o){let e=new LH(a.map(e=>e.shape),t);return n.runWebGLProgram(e,a,r)}let{tensors2D:c,outShape:l}=HH(a,t,n),u=new IH(c.map(e=>e.shape)),d=n.runWebGLProgram(u,c,r);c.forEach(e=>n.disposeIntermediateTensorInfo(e));let f=Q({inputs:{x:d},attrs:{shape:l},backend:n});return n.disposeIntermediateTensorInfo(d),f}function HH(e,t,n){let r=$T(e.map(e=>e.shape),t);return{tensors2D:e.map(e=>Q({inputs:{x:e},attrs:{shape:[-1,k(e.shape.slice(t))]},backend:n})),outShape:r}}J();function UH(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r,a=j(i,t[0].shape)[0];QT(t.map(e=>e.shape),a);let o=$T(t.map(e=>e.shape),a);if(k(o)===0)return n.makeTensorInfo(o,t[0].dtype,[]);let s=t.filter(e=>k(e.shape)>0);return s.length===1?gB({inputs:{x:s[0]},backend:n}):VH(s,a,n)}var WH={kernelName:gt,backendName:`webgl`,kernelFunc:UH},GH=class{constructor(e,t=!1,n=null,r=!1,i=!1){this.variableNames=[`x`,`W`],this.outputShape=e.outShape;let a=e.padInfo.top,o=e.padInfo.left,s=e.strideHeight,c=e.strideWidth,l=e.dilationHeight,u=e.dilationWidth,d=e.filterHeight,f=e.filterWidth,p=Math.floor(e.inChannels/4)*4,m=e.inChannels%4,h=e.dataFormat===`channelsLast`,g=h?1:2,_=h?2:3,v=h?3:1,y=``,b=``;n&&(y=r?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${n}
        }`:i?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${n}
        }`:`
          float activation(float x) {
            ${n}
          }
        `,b=`result = activation(result);`);let x=t?`result += getBiasAtOutCoords();`:``;t&&this.variableNames.push(`bias`),r&&this.variableNames.push(`preluActivationWeights`),i&&this.variableNames.push(`leakyreluAlpha`),this.userCode=`
      ${y}

      const ivec2 strides = ivec2(${s}, ${c});
      const ivec2 pads = ivec2(${a}, ${o});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${v}];

        ivec2 xRCCorner =
            ivec2(coords[${g}], coords[${_}]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${d}; wR++) {
          int xR = xRCorner + wR * ${l};

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${f}; wC++) {
            int xC = xCCorner + wC * ${u};

            if (xC < 0 || xC >= ${e.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${p}; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (${h}) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (${m===1}) {

              if (${h}) {
                dotProd +=
                    getX(batch, xR, xC, ${p}) *
                    getW(wR, wC, ${p}, d2);
              } else {
                dotProd +=
                    getX(batch, ${p}, xR, xC) *
                    getW(wR, wC, ${p}, d2);
              }

            } else if (${m===2}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${p}, d2),
                getW(wR, wC, ${p} + 1, d2)
              );

              if (${h}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${p}),
                  getX(batch, xR, xC, ${p} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${p}, xR, xC),
                  getX(batch, ${p} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${m===3}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${p}, d2),
                getW(wR, wC, ${p} + 1, d2),
                getW(wR, wC, ${p} + 2, d2)
              );

              if (${h}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${p}),
                  getX(batch, xR, xC, ${p} + 1),
                  getX(batch, xR, xC, ${p} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${p}, xR, xC),
                  getX(batch, ${p} + 1, xR, xC),
                  getX(batch, ${p} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${x}
        ${b}
        setOutput(result);
      }
    `}},KH=class{constructor(e){this.variableNames=[`x`,`W`],this.outputShape=e.outShape;let t=e.padInfo.front,n=e.padInfo.top,r=e.padInfo.left,i=e.strideDepth,a=e.strideHeight,o=e.strideWidth,s=e.dilationDepth,c=e.dilationHeight,l=e.dilationWidth,u=e.filterDepth,d=e.filterHeight,f=e.filterWidth,p=Math.floor(e.inChannels/4)*4,m=e.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${i}, ${a}, ${o});
      const ivec3 pads = ivec3(${t}, ${n}, ${r});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < ${u}; wF++) {
          int xF = xFCorner + wF * ${s};

          if (xF < 0 || xF >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${d}; wR++) {
            int xR = xRCorner + wR * ${c};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${f}; wC++) {
              int xC = xCCorner + wC * ${l};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${p}; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (${m===1}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${p}) *
                  getW(wF, wR, wC, ${p}, d2);
              } else if (${m===2}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${p}),
                  getX(batch, xF, xR, xC, ${p} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${p}, d2),
                  getW(wF, wR, wC, ${p} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${m===3}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${p}),
                  getX(batch, xF, xR, xC, ${p} + 1),
                  getX(batch, xF, xR, xC, ${p} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${p}, d2),
                  getW(wF, wR, wC, ${p} + 1, d2),
                  getW(wF, wR, wC, ${p} + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};J();var qH=class{constructor(e,t=!1,n=null,r=!1,i=!1){this.variableNames=[`x`,`W`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`pads`,type:`ivec2`},{name:`strides`,type:`ivec2`},{name:`dilations`,type:`ivec2`},{name:`inDims`,type:`ivec2`}],this.outputShape=e.outShape,this.enableShapeUniforms=eR(this.outputShape.length);let a=e.padInfo.left,o=e.strideWidth,s=e.dilationWidth,c=e.filterHeight,l=e.filterWidth,u=l,d=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<l;e++)d+=`
           vec4 xTexelC${e*2};
           int xTexelC${e*2}Ready;
           vec4 xTexelC${e*2+1};
           int xTexelC${e*2+1}Ready;
           vec4 xC${e};`;d+=`
     for (int r = 0; r < ${c}; r++) {
      for (int d1 = 0; d1 < ${e.inChannels}; d1 += 2) {
       `;for(let e=0;e<l;e++)d+=`
           xTexelC${e*2} = vec4(0.0);
           xTexelC${e*2}Ready = 0;
           xTexelC${e*2+1} = vec4(0.0);
           xTexelC${e*2+1}Ready = 0;
           xC${e} = vec4(0.0);`;d+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let t=0;t<(u+1)/2;t++){let n=t*2;if(d+=`
           xC = xCCorner + ${n*s};
           `,o===1){if(n<l&&(a%2==1?(d+=`
                 xCOffset = xC + 1;
                 if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${n}Ready == 0) {
                   xTexelC${n} = getX(batch, xR, xCOffset, d1);

                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${n}.zw = vec2(0.0);
                   }
                   xTexelC${n}Ready = 1;
                 }
               `,d+=s===1&&n>0?`
                 xC${n} = vec4(xTexelC${n-2}.zw, xTexelC${n}.xy);
                 `:`
                   xCOffset = xC + 1 - 2;

                   if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       previous.zw = vec2(0.0);
                     }

                     xC${n} = vec4(previous.zw, xTexelC${n}.xy);
                   } else {
                     xC${n} = vec4(0.0, 0.0, xTexelC${n}.xy);
                   }
                   `):d+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${n}Ready == 0) {
                   xTexelC${n} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${n}.zw = vec2(0.0);
                   }
                   xTexelC${n}Ready = 1;
                 }

                 xC${n} = xTexelC${n};
                 `,n+1<l)){let e=a%2==0?x(s):s;s%2==0&&a%2==1||s%2!=0&&a%2!=1?(d+=`
                   xCOffset = xC + imod(pads[1], 2) + ${e};

                   if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${n+1}Ready == 0) {
                     xTexelC${n+1} = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       xTexelC${n+1}.zw = vec2(0.0);
                     }
                     xTexelC${n+1}Ready = 1;
                   }
                   `,d+=s>1?`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${n+1} = vec4(previous.zw, xTexelC${n+1}.xy);
                     } else {
                      xC${n+1} = vec4(0.0, 0.0, xTexelC${n+1}.xy);
                     }
                     `:`
                     xC${n+1} = vec4(xTexelC${n}.zw, xTexelC${n+1}.xy);
                     `):d+=e===1?`
                     xC${n+1} = xTexelC${n};
                     `:`
                     xCOffset = xC + ${e};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${n+1}Ready == 0) {
                       xTexelC${n+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${n+1}.zw = vec2(0.0);
                       }
                       xTexelC${n+1}Ready = 1;
                     }

                     xC${n+1} = xTexelC${n+1};
                     `}}else n<l&&(a%2==1?(d+=`
                 xCOffset = xC + 1 - strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${n}Ready == 0) {
                   xTexelC${n} = getX(batch, xR, xCOffset, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${n}.zw = vec2(0.0);
                   }
                   xTexelC${n}Ready = 1;
                 }

                 if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${n+1}Ready == 0) {
                   xTexelC${n+1} = getX(batch, xR, xC + 1, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xC + 2 >= inDims[1]) {
                     xTexelC${n+1}.zw = vec2(0.0);
                   }
                   xTexelC${n+1}Ready = 1;
                 }

                 xC${n} = vec4(xTexelC${n}.zw, xTexelC${n+1}.zw);
               `,n+1<l&&(d+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${n+1} = vec4(xTexelC${n+1}.xy, final.xy);
                 `)):(d+=`
                 if(xC >= 0 && xC < inDims[1] && xTexelC${n}Ready == 0) {
                   xTexelC${n} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${n}.zw = vec2(0.0);
                   }
                   xTexelC${n}Ready = 1;
                 }

                 xCOffset = xC + strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${n+1}Ready == 0) {
                   xTexelC${n+1} = getX(batch, xR, xCOffset, d1);
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${n+1}.zw = vec2(0.);
                   }
                   xTexelC${n+1}Ready = 1;
                 }

                 xC${n} = vec4(
                   xTexelC${n}.xy, xTexelC${n+1}.xy);
               `,n+1<l&&(d+=`
                   xC${n+1} = vec4(xTexelC${n}.zw, xTexelC${n+1}.zw);
                 `)));n<l&&(d+=`
             wTexel = getW(r, ${n}, d1, d2);
             dotProd += xC${n}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${e.inChannels}) {
               dotProd += xC${n}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,n+1<l&&(d+=`
               wTexel = getW(r, ${n+1}, d1, d2);
               dotProd += xC${n+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${e.inChannels}) {
                 dotProd += xC${n+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}d+=`
     }
   `,d+=`
     }
   `,d+=`
     }
   `;let f=``,p=``;n&&(f=r?`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${n}
         }`:i?`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${n}
         }`:`vec4 activation(vec4 x) {
           ${n}
         }`,p=`result = activation(result);`);let m=t?`result += getBiasAtOutCoords();`:``;t&&this.variableNames.push(`bias`),r&&this.variableNames.push(`preluActivationWeights`),i&&this.variableNames.push(`leakyreluAlpha`),this.userCode=`
       ${f}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${d}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${m}
         ${p}
         setOutput(result);
       }
     `}},JH=class{constructor(e,t){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`inputShape`,type:`ivec4`},{name:`pad`,type:`ivec2`},{name:`stride`,type:`ivec2`},{name:`dilation`,type:`ivec2`},{name:`inChannels`,type:`int`},{name:`itemsPerBlockRow`,type:`int`},{name:`outWidth`,type:`int`}],this.outputShape=e,this.enableShapeUniforms=eR(this.outputShape.length);let{dataFormat:n}=t,r=YI(),i=n===`channelsLast`,a=i?1:2,o=i?2:3,s=this.enableShapeUniforms?`if(blockIndex < outShape[2] && pos < outShape[1]) {`:`if(blockIndex < ${e[2]} && pos < ${e[1]}) {`,c=``;for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)c+=`
          blockIndex = rc.z + ${t};
          pos = rc.y + ${e};

          ${s}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${a}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${o}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${i}) {
                  innerDims = vec2(d1, ch);
                  result[${e*2+t}] = getChannel(
                    getA(rc.x, d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[${e*2+t}] = getChannel(
                    getA(rc.x, ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        ${c}

        ${r.output} = result;
      }
    `}};J();function YH(e,t){let n=e.length;return n>=3?t?[...e.slice(0,-3),e[n-3]*e[n-2],e[n-1]]:[...e.slice(0,-3),e[n-3],e[n-2]*e[n-1]]:!t&&n===1&&e[0]>1?[e[0],1]:null}function XH({x:e,filter:t,convInfo:n,backend:r,bias:i=null,preluActivationWeights:a=null,leakyreluAlpha:o=0,activation:s=null}){let c=e.shape,l=r.texData.get(e.dataId),u=n.inChannels,d=c[0]*c[1]*c[2],f=n.outChannels,p=n.dataFormat===`channelsLast`,m,h=[];if(a!=null){let e=YH(a.shape,p);e!=null&&(a=Q({inputs:{x:a},backend:r,attrs:{shape:e}}),h.push(a))}if(i!=null){let e=YH(i.shape,p);e!=null&&(i=Q({inputs:{x:i},backend:r,attrs:{shape:e}}),h.push(i))}if(!((d===1||f===1)&&u>1e3)&&l.isPacked&&p&&l.texture!=null&&c[2]%2!=0&&A(l.shape.slice(-3),c.slice(-3))){let u=c[0]*c[1]*(c[2]+1),d={dataId:e.dataId,shape:[1,u,n.inChannels],dtype:e.dtype},f=l.shape;l.shape=l.shape.slice(),l.shape[l.shape.length-2]++,E(FI(l.shape,d.shape),()=>`packed reshape ${l.shape} to ${d.shape} isn't free`);let p=Q({inputs:{x:t},backend:r,attrs:{shape:[1,n.inChannels,n.outChannels]}});h.push(p);let g=$B({a:d,b:p,backend:r,transposeA:!1,transposeB:!1,bias:i,activation:s,preluActivationWeights:a,leakyreluAlpha:o}),_=r.texData.get(g.dataId);E(_.isPacked,()=>`batchMatMul result is expected to be packed`),l.shape=f,_.shape=n.outShape,m=gB({inputs:{x:g},backend:r}),m.shape=n.outShape,h.push(g)}else{let c=n.outHeight*n.outWidth,l=Q({inputs:{x:e},backend:r,attrs:{shape:p?[n.batchSize,c,n.inChannels]:[n.batchSize,n.inChannels,c]}}),u=Q({inputs:{x:t},backend:r,attrs:{shape:[1,n.inChannels,n.outChannels]}}),d=$B({a:p?l:u,b:p?u:l,transposeA:!p,transposeB:!1,backend:r,bias:i,activation:s,preluActivationWeights:a,leakyreluAlpha:o});m=Q({inputs:{x:d},backend:r,attrs:{shape:n.outShape}}),h.push(l),h.push(u),h.push(d)}for(let e of h)r.disposeIntermediateTensorInfo(e);return m}function ZH({x:e,filter:t,convInfo:n,backend:r,bias:i=null,preluActivationWeights:a=null,leakyreluAlpha:o=0,activation:s=null}){let{filterWidth:c,filterHeight:l,inChannels:u,outWidth:d,outHeight:f,dataFormat:p}=n,m=p===`channelsLast`,h=c*l*u,g=f*d,_=[n.batchSize,h,g],v=[];if(a!=null){let e=YH(a.shape,m);e!=null&&(a=Q({inputs:{x:a},backend:r,attrs:{shape:e}}),v.push(a))}if(i!=null){let e=YH(i.shape,m);e!=null&&(i=Q({inputs:{x:i},backend:r,attrs:{shape:e}}),v.push(i))}let y=Q({inputs:{x:t},backend:r,attrs:{shape:[1,h,k(t.shape)/h]}});v.push(y);let b=new JH(_,n),x=[e.shape,[n.padInfo.top,n.padInfo.left],[n.strideHeight,n.strideWidth],[n.dilationHeight,n.dilationWidth],[n.inChannels],[n.filterWidth*n.inChannels],[n.outWidth]],S=r.runWebGLProgram(b,[e],`float32`,x),C=Q({inputs:{x:S},backend:r,attrs:{shape:_}});v.push(S),v.push(C);let w=i!=null,T=a!=null,E=s===`leakyrelu`,D=s?jB(s,!0):null,O=new MB(m?C.shape:y.shape,m?y.shape:C.shape,m?[n.batchSize,g,n.outChannels]:[n.batchSize,n.outChannels,g],!0,!1,w,D,T,E),ee=m?[C,y]:[y,C];if(i&&ee.push(i),T&&ee.push(a),E){let e=r.makeTensorInfo([],`float32`,Oi(o,`float32`));ee.push(e),v.push(e)}let te=r.runWebGLProgram(O,ee,`float32`),A=Q({inputs:{x:te},backend:r,attrs:{shape:n.outShape}});v.push(te);for(let e of v)r.disposeIntermediateTensorInfo(e);return A}J();function QH(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dataFormat:c,dilations:l,dimRoundingMode:u}=r,d=yl(c),f=al(i.shape,a.shape,o,l,s,u,!1,d),p;if(f.filterHeight===1&&f.filterWidth===1&&f.dilationHeight===1&&f.dilationWidth===1&&f.strideHeight===1&&f.strideWidth===1&&(f.padInfo.type===`SAME`||f.padInfo.type===`VALID`))p=XH({x:i,filter:a,convInfo:f,backend:n});else if(f.strideWidth<=2&&d===`channelsLast`&&P().getBool(`WEBGL_EXP_CONV`)){let e=new qH(f),t=[[f.padInfo.top,f.padInfo.left],[f.strideHeight,f.strideWidth],[f.dilationHeight,f.dilationWidth],[f.inHeight,f.inWidth]];p=n.runWebGLProgram(e,[i,a],`float32`,t)}else if(P().getBool(`WEBGL_CONV_IM2COL`))p=ZH({x:i,filter:a,convInfo:f,backend:n});else{let e=new GH(f);p=n.runWebGLProgram(e,[i,a],`float32`)}let m=Q({inputs:{x:p},backend:n,attrs:{shape:f.outShape}});return n.disposeIntermediateTensorInfo(p),m}var $H={kernelName:_t,backendName:`webgl`,kernelFunc:QH},eU=class{constructor(e){this.variableNames=[`x`,`dy`],this.outputShape=e.filterShape;let t=e.strideHeight,n=e.strideWidth,r=e.padInfo.top,i=e.padInfo.left,a=e.dataFormat===`channelsLast`;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${r};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${n} - ${i};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              ${a?`float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);`:`float dyValue = getDy(b, d2, yR, yC);
              float xValue = getX(b, d1, xR, xC);
              dotProd += (xValue * dyValue);`}
            }
          }
        }
        setOutput(dotProd);
      }
    `}},tU=class{constructor(e){this.variableNames=[`dy`,`W`],this.outputShape=e.inShape;let t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,i=e.strideWidth,a=e.dataFormat===`channelsLast`,o=t-1-e.padInfo.top,s=n-1-e.padInfo.left,c=a?1:2,l=a?2:3,u=a?3:1;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${u}];

        ivec2 dyCorner = ivec2(coords[${c}], coords[${l}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${r}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${n}; wC++) {
            float dyC = float(dyCCorner + wC) / ${i}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${n} - 1 - wC;

            for (int d2 = 0; d2 < ${e.outChannels}; d2++) {

              if (${a}) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}},nU=class{constructor(e){this.variableNames=[`x`,`dy`],this.outputShape=e.filterShape;let t=e.strideDepth,n=e.strideHeight,r=e.strideWidth,i=e.padInfo.front,a=e.padInfo.top,o=e.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yF = 0; yF < ${e.outDepth}; yF++) {
            int xF = wF + yF * ${t} - ${i};

            if (xF < 0 || xF >= ${e.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${e.outHeight}; yR++) {
              int xR = wR + yR * ${n} - ${a};

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${e.outWidth}; yC++) {
                int xC = wC + yC * ${r} - ${o};

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}},rU=class{constructor(e){this.variableNames=[`dy`,`W`],this.outputShape=e.inShape;let t=e.filterDepth,n=e.filterHeight,r=e.filterWidth,i=e.strideDepth,a=e.strideHeight,o=e.strideWidth,s=t-1-e.padInfo.front,c=n-1-e.padInfo.top,l=r-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${s}, ${c}, ${l});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < ${t}; wF++) {
          float dyF = float(dyFCorner + wF) / ${i}.0;

          if (dyF < 0.0 || dyF >= ${e.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${t} - 1 - wF;

          for (int wR = 0; wR < ${n}; wR++) {
            float dyR = float(dyRCorner + wR) / ${a}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${n} - 1 - wR;

            for (int wC = 0; wC < ${r}; wC++) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${r} - 1 - wC;

              for (int d2 = 0; d2 < ${e.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};J();function iU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,dataFormat:c,dimRoundingMode:l,filterShape:u}=r,d=yl(c),f=new eU(al(i.shape,u,o,1,s,l,!1,d));return n.runWebGLProgram(f,[i,a],`float32`)}var aU={kernelName:vt,backendName:`webgl`,kernelFunc:iU},oU=class{constructor(e){this.variableNames=[`dy`,`W`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`strides`,type:`vec2`}],this.outputShape=e.inShape,this.enableShapeUniforms=eR(this.outputShape.length);let t=e.filterHeight,n=e.filterWidth,r=t-1-e.padInfo.top,i=n-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${r}, ${i});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];

        ivec2 dyCorner = ivec2(coords[1], coords[2]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        vec4 result = vec4(0.);
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / strides[0];
          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);
          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${n}; wC++) {
            int wCPerm = ${n} - 1 - wC;

            float dyC = float(dyCCorner + wC) / strides[1];
            bool idyCVal = (dyC >= 0.0) && (dyC < ${e.outWidth}.0)
              && (fract(dyC) == 0.0);
            int idyC = int(dyC);

            float dyC2 = float(dyCCorner + wC + 1) / strides[1];
            bool idyCVal2 = (dyC2 >= 0.0) && (dyC2 < ${e.outWidth}.0)
              && (fract(dyC2) == 0.0);
            int idyC2 = int(dyC2);

            if (idyCVal && idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec4 dySample2 = (idyC / 2 == idyC2 / 2) ?
                  dySample : getDy(batch, idyR, idyC2, d2);

                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));

                dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample2.xy : dySample2.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC2, d2);
                vec2 dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            }
          }
        }
        setOutput(result);
      }
    `}};J();function sU(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{inputShape:o,strides:s,pad:c,dataFormat:l,dimRoundingMode:u}=r,d=yl(l),f=al(o,a.shape,s,1,c,u,!1,d);if(P().getBool(`WEBGL_PACK_CONV2DTRANSPOSE`)&&d===`channelsLast`){let e=[[f.strideHeight,f.strideWidth]],t=new oU(f);return n.runWebGLProgram(t,[i,a],`float32`,e)}{let e=new tU(f);return n.runWebGLProgram(e,[i,a],`float32`)}}var cU={kernelName:yt,backendName:`webgl`,kernelFunc:sU};J();function lU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c}=r,l=new KH(ol(i.shape,a.shape,o,c,s));return n.runWebGLProgram(l,[i,a],`float32`)}var uU={kernelName:bt,backendName:`webgl`,kernelFunc:lU};J();function dU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,filterShape:c}=r,l=new nU(ol(i.shape,c,o,1,s));return n.runWebGLProgram(l,[i,a],`float32`)}var fU={kernelName:xt,backendName:`webgl`,kernelFunc:dU};J();function pU(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{pad:o,strides:s,inputShape:c}=r,l=new rU(ol(c,a.shape,s,1,o));return n.runWebGLProgram(l,[i,a],`float32`)}var mU={kernelName:St,backendName:`webgl`,kernelFunc:pU};J();var hU={kernelName:`Cos`,backendName:`webgl`,kernelFunc:kB({opSnippet:OB+`
  return cos(x);
`,packedOpSnippet:`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${mB}
  return result;
`})};J();var gU=kB({opSnippet:`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`}),_U={kernelName:Ct,backendName:`webgl`,kernelFunc:gU},vU=class{constructor(e,t,n,r,i){this.variableNames=[`Image`,`Boxes`,`BoxInd`],this.outputShape=[];let[a,o,s,c]=e,[l]=t,[u,d]=n;this.outputShape=[l,u,d,c];let f=+(r===`bilinear`),[p,m]=[`${o-1}.0`,`${s-1}.0`],[h,g,_]=u>1?[`${(o-1)/(u-1)}`,`(y2-y1) * height_ratio`,`y1*${p} + float(y)*(height_scale)`]:[`0.0`,`0.0`,`0.5 * (y1+y2) * ${p}`],[v,y,b]=d>1?[`${(s-1)/(d-1)}`,`(x2-x1) * width_ratio`,`x1*${m} + float(x)*(width_scale)`]:[`0.0`,`0.0`,`0.5 * (x1+x2) * ${m}`];this.userCode=`
      const float height_ratio = float(${h});
      const float width_ratio = float(${v});
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= ${a}) {
          return;
        }

        float height_scale = ${g};
        float width_scale = ${y};

        float in_y = ${_};
        if( in_y < 0.0 || in_y > ${p} ) {
          setOutput(float(${i}));
          return;
        }
        float in_x = ${b};
        if( in_x < 0.0 || in_x > ${m} ) {
          setOutput(float(${i}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${f} == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}};J();var yU={kernelName:Et,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{image:i,boxes:a,boxInd:o}=t,{cropSize:s,method:c,extrapolationValue:l}=r,u=new vU(i.shape,a.shape,s,c,l);return n.runWebGLProgram(u,[i,a,o],`float32`)}},bU;(function(e){e.Prod=`*`,e.Sum=`+`})(bU||={});var xU=class{constructor(e,t,n,r){this.op=e,this.outputShape=t,this.variableNames=[`x`],this.customUniforms=[{name:`index`,type:`float`}];let i=this.outputShape.length,a=this.op===bU.Prod?`1.0`:`0.0`,o=n?a:`getX(${SU(i,`coords`,this.op)})`,s=this.outputShape[this.outputShape.length-1],c=``,l=``;n?(c=r?`end != ${s-1}`:`end != 0`,l=r?`end + 1`:`end - 1`):(c=r?`end + pow2 < ${s}`:`end >= pow2`,l=r?`end + pow2`:`end - pow2`),this.userCode=`
      void main() {
        ${GL(i)} coords = getOutputCoords();
        int end = ${CU(i,`coords`,this.op)};
        float val = ${o};
        int pow2 = int(pow(2.0, index));
        if (${c}) {
          int idx = ${l};
          ${CU(i,`coords`,this.op)} = idx;
          val ${this.op}= getX(${SU(i,`coords`,this.op)});
        }
        setOutput(val);
      }
    `}};function SU(e,t,n){if(e===1)return`${t}`;if(e===2)return`${t}.x, ${t}.y`;if(e===3)return`${t}.x, ${t}.y, ${t}.z`;if(e===4)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative ${n} for rank ${e} is not yet supported`)}function CU(e,t,n){if(e===1)return`${t}`;if(e===2)return`${t}.y`;if(e===3)return`${t}.z`;if(e===4)return`${t}.w`;throw Error(`Cumulative ${n} for rank ${e} is not yet supported`)}J();function wU(e,t,n,r,i,a){let o=t.shape.length,s=bf([r],o),c=t;s!=null&&(c=ZB({inputs:{x:t},backend:n,attrs:{perm:s}}));let l=Sf(1,o)[0];if(l!==o-1)throw Error(`WebGL cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${r}`);let u=c.shape[l],d=gB({inputs:{x:c},backend:n});for(let t=0;t<=Math.ceil(Math.log2(u))-1;t++){let r=new xU(e,c.shape,!1,a),i=[[t]],o=d;d=n.runWebGLProgram(r,[d],d.dtype,i),n.disposeIntermediateTensorInfo(o)}if(i){let t=new xU(e,c.shape,i,a),r=d;d=n.runWebGLProgram(t,[d],d.dtype),n.disposeIntermediateTensorInfo(r)}if(s!=null){let e=xf(s),t=ZB({inputs:{x:d},backend:n,attrs:{perm:e}});return n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(c),t}return d}J();function TU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r;return wU(bU.Prod,i,n,a,o,s)}var EU={kernelName:wt,backendName:`webgl`,kernelFunc:TU};J();function DU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r;return wU(bU.Sum,i,n,a,o,s)}var OU={kernelName:Tt,backendName:`webgl`,kernelFunc:DU};J();function kU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,weights:a}=t,{size:o,binaryOutput:s}=r;if(i.shape.length===1){let e=NR(n.readSync(i.dataId),n.readSync(a.dataId),a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,e)}if(i.shape.length===2){let e=PR(n.bufferSync(i),n.bufferSync(a),o,s);return n.makeTensorInfo(e.shape,a.dtype,e.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${i.shape.length}.`)}var AU={kernelName:Dt,backendName:`webgl`,kernelFunc:kU},jU=class{constructor(e,t,n){this.variableNames=[`x`],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=n,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${t};
      int offset_h = imod(h, ${t});
      int in_w = w / ${t};
      int offset_w = imod(w, ${t});
      int offset_d = (offset_h * ${t} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return this.dataFormat===`NHWC`?`coords[1]`:`coords[2]`}getWidthCoordString(){return this.dataFormat===`NHWC`?`coords[2]`:`coords[3]`}getDepthCoordString(){return this.dataFormat===`NHWC`?`coords[3]`:`coords[1]`}getOutputDepthSize(){return this.dataFormat===`NHWC`?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return this.dataFormat===`NHWC`?`getX(b, in_h, in_w, in_d)`:`getX(b, in_d, in_h, in_w)`}};J();function MU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockSize:a,dataFormat:o}=r,s=i.shape[0],c=o===`NHWC`?i.shape[1]:i.shape[2],l=o===`NHWC`?i.shape[2]:i.shape[3],u=o===`NHWC`?i.shape[3]:i.shape[1],d=c*a,f=l*a,p=u/(a*a),m=new jU(o===`NHWC`?[s,d,f,p]:[s,p,d,f],a,o);return n.runWebGLProgram(m,[i],i.dtype)}var NU={kernelName:Ot,backendName:`webgl`,kernelFunc:MU},PU=class{constructor(e,t=!1,n=null,r=!1,i=!1){this.variableNames=[`x`,`W`],this.customUniforms=[{name:`pads`,type:`ivec2`},{name:`strides`,type:`ivec2`},{name:`dilations`,type:`ivec2`},{name:`inDims`,type:`ivec2`}],this.outputShape=e.outShape,this.enableShapeUniforms=eR(this.outputShape.length);let a=e.filterHeight,o=e.filterWidth,s=e.outChannels/e.inChannels,c=``,l=``;n&&(c=r?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${n}
        }`:i?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${n}
        }`:`
          float activation(float x) {
            ${n}
          }
        `,l=`result = activation(result);`);let u=t?`result += getBiasAtOutCoords();`:``;t&&this.variableNames.push(`bias`),r&&this.variableNames.push(`preluActivationWeights`),i&&this.variableNames.push(`leakyreluAlpha`),this.userCode=`
      ${c}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${s};
        int q = d2 - d1 * ${s};

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < ${a}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${o}; wC++) {
            int xC = xCCorner + wC * dilations[1];

            if (xC < 0 || xC >= inDims[1]) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        ${u}
        ${l}
        setOutput(result);
      }
    `}};J();var FU=class{constructor(e,t=!1,n=null,r=!1,i=!1){this.variableNames=[`x`,`W`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`pads`,type:`ivec2`},{name:`strides`,type:`ivec2`},{name:`dilations`,type:`ivec2`},{name:`inDims`,type:`ivec2`}],this.outputShape=e.outShape,this.enableShapeUniforms=eR(this.outputShape.length);let a=e.outChannels/e.inChannels,o=e.padInfo.left,s=e.strideWidth,c=e.dilationWidth,l=e.filterHeight,u=e.filterWidth,d=u,f=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<u;e++)f+=`
          vec4 xTexelC${e*2};
          int xTexelC${e*2}Ready;
          vec4 xTexelC${e*2+1};
          int xTexelC${e*2+1}Ready;
          vec4 xC${e};`;f+=`
    for (int r = 0; r < ${l}; r++) {
      `;for(let e=0;e<u;e++)f+=`
          xTexelC${e*2} = vec4(0.0);
          xTexelC${e*2}Ready = 0;
          xTexelC${e*2+1} = vec4(0.0);
          xTexelC${e*2+1}Ready = 0;
          xC${e} = vec4(0.0);`;f+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let e=0;e<(d+1)/2;e++){let t=e*2;if(f+=`
          xC = xCCorner + ${t*c};
          `,s===1){if(t<u&&(o%2==1?(f+=`
                xCOffset = xC + 1;
                if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }
              `,f+=c===1&&t>0?`
                xC${t} = vec4(xTexelC${t-2}.zw, xTexelC${t}.xy);
                `:`
                  xCOffset = xC + 1 - 2;

                  if (xCOffset >= 0 && xCOffset < inDims[1]) {
                    previous = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      previous.zw = vec2(0.0);
                    }

                    xC${t} = vec4(previous.zw, xTexelC${t}.xy);
                  } else {
                    xC${t} = vec4(0.0, 0.0, xTexelC${t}.xy);
                  }
                  `):f+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xC${t} = xTexelC${t};
                `,t+1<u)){let e=o%2==0?x(c):c;c%2==0&&o%2==1||c%2!=0&&o%2!=1?(f+=`
                  xCOffset = xC + imod(pads[1], 2) + ${e};

                  if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                    xTexelC${t+1} = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      xTexelC${t+1}.zw = vec2(0.0);
                    }
                    xTexelC${t+1}Ready = 1;
                  }
                  `,f+=c>1?`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${t+1} = vec4(previous.zw, xTexelC${t+1}.xy);
                    } else {
                     xC${t+1} = vec4(0.0, 0.0, xTexelC${t+1}.xy);
                    }
                    `:`
                    xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.xy);
                    `):f+=e===1?`
                    xC${t+1} = xTexelC${t};
                    `:`
                    xCOffset = xC + ${e};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                      xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${t+1}.zw = vec2(0.0);
                      }
                      xTexelC${t+1}Ready = 1;
                    }

                    xC${t+1} = xTexelC${t+1};
                    `}}else t<u&&(o%2==1?(f+=`
                xCOffset = xC + 1 - strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xCOffset, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${t+1}Ready == 0) {
                  xTexelC${t+1} = getX(batch, xR, xC + 1, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xC + 2 >= inDims[1]) {
                    xTexelC${t+1}.zw = vec2(0.0);
                  }
                  xTexelC${t+1}Ready = 1;
                }

                xC${t} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
              `,t+1<u&&(f+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${t+1} = vec4(xTexelC${t+1}.xy, final.xy);
                `)):(f+=`
                if(xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xCOffset = xC + strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                  xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t+1}.zw = vec2(0.);
                  }
                  xTexelC${t+1}Ready = 1;
                }

                xC${t} = vec4(
                  xTexelC${t}.xy, xTexelC${t+1}.xy);
              `,t+1<u&&(f+=`
                  xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
                `)));t<u&&(f+=`
            wTexel = getW(r, ${t}, d1, q);
            dotProd += xC${t} * vec4(wTexel.xz, wTexel.xz);
          `,t+1<u&&(f+=`
              wTexel = getW(r, ${t+1}, d1, q);
              dotProd += xC${t+1} * vec4(wTexel.xz, wTexel.xz);
            `))}f+=`
    }
  `,f+=`
      }
    `;let p=``,m=``;n&&(p=r?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${n}
        }`:i?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${n}
        }`:`vec4 activation(vec4 x) {
          ${n}
        }`,m=`result = activation(result);`);let h=t?`result += getBiasAtOutCoords();`:``;t&&this.variableNames.push(`bias`),r&&this.variableNames.push(`preluActivationWeights`),i&&this.variableNames.push(`leakyreluAlpha`),this.userCode=`
      ${p}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${a};
        int q = d2 - d1 * ${a};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${f}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${h}
        ${m}
        setOutput(result);
      }
    `}};J();function IU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c,dimRoundingMode:l}=r,u=c;u??=[1,1],E(_l(o,u),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${o} and dilations '${u}'`);let d=al(i.shape,a.shape,o,u,s,l,!0),f;f=P().getBool(`WEBGL_PACK_DEPTHWISECONV`)&&d.strideWidth<=2&&d.outChannels/d.inChannels===1?new FU(d):new PU(d);let p=[[d.padInfo.top,d.padInfo.left],[d.strideHeight,d.strideWidth],[d.dilationHeight,d.dilationWidth],[d.inHeight,d.inWidth]];return n.runWebGLProgram(f,[i,a],`float32`,p)}var LU={kernelName:kt,backendName:`webgl`,kernelFunc:IU},RU=class{constructor(e){this.variableNames=[`x`,`dy`],this.outputShape=e.filterShape;let t=e.strideHeight,n=e.strideWidth,r=e.padInfo.top,i=e.padInfo.left,a=e.outChannels/e.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${a} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${r};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${n} - ${i};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}},zU=class{constructor(e){this.variableNames=[`dy`,`W`],this.outputShape=e.inShape;let t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,i=e.strideWidth,a=t-1-e.padInfo.top,o=n-1-e.padInfo.left,s=e.outChannels/e.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${a}, ${o});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${r}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${n}; wC++) {
            float dyC = float(dyCCorner + wC) / ${i}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${n} - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < ${s}; dm++) {
              int d2 = d1 * ${s} + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};J();function BU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,dilations:s,pad:c,dimRoundingMode:l,filterShape:u}=r,d=new RU(al(i.shape,u,o,s,c,l,!0));return n.runWebGLProgram(d,[i,a],`float32`)}var VU={kernelName:At,backendName:`webgl`,kernelFunc:BU};J();function HU(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{strides:o,dilations:s,pad:c,dimRoundingMode:l,inputShape:u}=r,d=new zU(al(u,a.shape,o,s,c,l,!0));return n.runWebGLProgram(d,[i,a],`float32`)}var UU={kernelName:jt,backendName:`webgl`,kernelFunc:HU},WU=class{constructor(e){this.variableNames=[`X`],this.outputShape=[e,e],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}};J();function GU(e){let{inputs:t,backend:n}=e,{x:r}=t,i=[...r.shape,...r.shape],a=k(r.shape),o=Q({inputs:{x:r},backend:n,attrs:{shape:[a]}}),s=new WU(a),c=n.runWebGLProgram(s,[o],o.dtype),l=Q({inputs:{x:c},backend:n,attrs:{shape:i}});return n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(c),l}var KU={kernelName:Mt,backendName:`webgl`,kernelFunc:GU},qU=class{constructor(e){this.variableNames=[`x`,`W`],this.outputShape=e.outShape;let{inHeight:t,inWidth:n,padInfo:r,strideHeight:i,strideWidth:a,filterHeight:o,filterWidth:s,dilationHeight:c,dilationWidth:l}=e,{top:u,left:d}=r;this.userCode=`
      const ivec2 strides = ivec2(${i}, ${a});
      const ivec2 pads = ivec2(${u}, ${d});
      const float neg_infinity = -3.4e38;

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.w;
        ivec2 outTopLeftCorner =
            coords.yz * strides - pads;
        int hBeg = outTopLeftCorner.x;
        int wBeg = outTopLeftCorner.y;

        float curVal = neg_infinity;
        for (int h = 0; h < ${o}; h++) {
          int hIn = hBeg + h * ${c};

          if (hIn >= 0 && hIn < ${t}) {
            for (int w = 0; w < ${s}; w++) {
              int wIn = wBeg + w * ${l};

              if (wIn >= 0 && wIn < ${n}) {
                float xVal = getX(batch, hIn, wIn, d1);
                float wVal = getW(h, w, d1);

                float val = xVal + wVal;
                if (val > curVal) {
                  curVal = val;
                }
              }
            }
          }
        }

        float result = curVal;
        setOutput(result);
      }
    `}};J();function JU(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c}=r,l=nl(i.shape,a.shape,o,s,`NHWC`,c),u,d=new qU(l);u=n.runWebGLProgram(d,[i,a],`float32`);let f=Q({inputs:{x:u},backend:n,attrs:{shape:l.outShape}});return n.disposeIntermediateTensorInfo(u),f}var YU={kernelName:Nt,backendName:`webgl`,kernelFunc:JU};J();function XU(e){let{inputs:t,backend:n,attrs:r}=e,{equation:i}=r,a=t,{allDims:o,summedDims:s,idDims:c}=LE(i,a.length);zE(o.length,c,a);let{path:l,steps:u}=BE(s,c),d=u.length,f=null,p=o.length,m=[];for(let e=0;e<d;++e){for(let t of u[e]){let{permutationIndices:e,expandDims:r}=RE(p,c[t]),i;VE(e)?i=a[t]:(i=ZB({inputs:{x:a[t]},backend:n,attrs:{perm:e}}),m.push(i));let o=i.shape.slice();for(let e=0;e<r.length;++e)o.splice(r[e],0,1);A(i.shape,o)||(i=Q({inputs:{x:i},backend:n,attrs:{shape:o}}),m.push(i)),f===null?f=i:(f=IB({inputs:{a:i,b:f},backend:n}),m.push(f))}e<d-1&&(l[e]>=0&&(f=YB({inputs:{x:f},backend:n,attrs:{axis:l[e]-(o.length-p),keepDims:!1}}),m.push(f)),p--)}for(let e of m)e!==f&&n.disposeIntermediateTensorInfo(e);return f}var ZU={kernelName:Rt,backendName:`webgl`,kernelFunc:XU};J();var QU={kernelName:`Elu`,backendName:`webgl`,kernelFunc:kB({opSnippet:`return (x >= 0.0) ? x : (exp(x) - 1.0);`,packedOpSnippet:`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`})};J();var $U=`return (b >= 0.0) ? a : a * (b + 1.0);`,eW=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,tW={kernelName:zt,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n}=e,{dy:r,y:i}=t,a=P().getBool(`WEBGL_PACK_BINARY_OPERATIONS`)?new hB(eW,r.shape,i.shape):new pB($U,r.shape,i.shape);return n.runWebGLProgram(a,[r,i],r.dtype)}};J();var nW=AB({opSnippet:`return float(a == b);`,packedOpSnippet:`
  return vec4(equal(a, b));
`,dtype:`bool`,cpuKernelImpl:zR}),rW={kernelName:Bt,backendName:`webgl`,kernelFunc:nW};J();var iW={kernelName:`Erf`,backendName:`webgl`,kernelFunc:kB({opSnippet:`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${xE};
  float a1 = ${SE};
  float a2 = ${CE};
  float a3 = ${wE};
  float a4 = ${TE};
  float a5 = ${EE};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`})};J();var aW=kB({opSnippet:OB+`
  return exp(x);
`,packedOpSnippet:`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:BR,dtype:`float32`}),oW={kernelName:`Exp`,backendName:`webgl`,kernelFunc:aW};J();function sW(e){let{inputs:t,attrs:n,backend:r}=e,{dim:i}=n,{input:a}=t,o=a.shape.length,s=a.shape.slice(),c=i;return i<0&&(E(-(o+1)<=i,()=>`Axis must be in the interval [${-(o+1)}, ${o}]`),c=o+i+1),s.splice(c,0,1),Q({inputs:{x:a},backend:r,attrs:{shape:s}})}var cW={kernelName:Vt,backendName:`webgl`,kernelFunc:sW};J();var lW=`return exp(x) - 1.0;`,uW=kB({opSnippet:lW,packedOpSnippet:lW,cpuKernelImpl:VR}),dW={kernelName:Ht,backendName:`webgl`,kernelFunc:uW},fW=class{constructor(e,t,n){this.variableNames=[`real`,`imag`];let r=t[1];this.outputShape=t;let i=n?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,a=n?`${r}.0`:`1.0`,o;if(e===`real`)o=`return real * expR - imag * expI;`;else if(e===`imag`)o=`return real * expI + imag * expR;`;else throw Error(`FFT component must be either "real" or "imag", got ${e}.`);this.userCode=`
      const float exponentMultiplier = ${i};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${o}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${r});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${r}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${a};
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}};J();function pW(e,t,n){let r=n.texData.get(e.dataId),i=k(e.shape),a=e.shape[e.shape.length-1],o=i/a,s=Q({inputs:{x:e},backend:n,attrs:{shape:[o,a]}}),c=s.shape,l=new fW(`real`,c,t),u=new fW(`imag`,c,t),d=[{dataId:r.complexTensorInfos.real.dataId,dtype:r.complexTensorInfos.real.dtype,shape:c},{dataId:r.complexTensorInfos.imag.dataId,dtype:r.complexTensorInfos.imag.dtype,shape:c}],f=n.runWebGLProgram(l,d,`float32`),p=n.runWebGLProgram(u,d,`float32`),m=vB({inputs:{real:f,imag:p},backend:n});n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(p);let h=Q({inputs:{x:m},backend:n,attrs:{shape:e.shape}});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(m),h}J();function mW(e){let{inputs:t,backend:n}=e,{input:r}=t;return pW(r,!1,n)}var hW={kernelName:`FFT`,backendName:`webgl`,kernelFunc:mW},gW=class{constructor(e,t){this.outputShape=[],this.customUniforms=[{name:`value`,type:`float`}],this.variableNames=[`x`],this.outputShape=e,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}};J();function _W(e){let{backend:t,attrs:n}=e,{shape:r,value:i}=n,{dtype:a}=n;if(a||=ye(i),a===`string`){let e=ue(a,k(r));return e.fill(i),t.makeTensorInfo(r,a,e)}{let e=new gW(r,i),n=[[i]];return t.runWebGLProgram(e,[],a,n)}}var vW={kernelName:Ut,backendName:`webgl`,kernelFunc:_W},yW=class{constructor(e){this.variableNames=[`Image`],this.outputShape=[];let t=e[2];this.outputShape=e,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${t} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${t}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}};J();var bW={kernelName:Wt,backendName:`webgl`,kernelFunc:({inputs:e,backend:t})=>{let{image:n}=e,r=t,i=new yW(n.shape);return r.runWebGLProgram(i,[n],n.dtype)}};J();var xW=`return floor(x);`,SW=kB({opSnippet:xW,packedOpSnippet:xW,cpuKernelImpl:HR}),CW={kernelName:Gt,backendName:`webgl`,kernelFunc:SW};J();var wW=AB({opSnippet:`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,packedOpSnippet:`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,dtype:`int32`}),TW={kernelName:Kt,backendName:`webgl`,kernelFunc:wW},EW=class{constructor(e){this.variableNames=[`A`];let t=YI(),[n,r]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${r}.0, ${n}.0);

        vec4 values = ${t.texture2D}(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `}},DW=class{constructor(e){this.variableNames=[`A`],this.packedInputs=!1,this.packedOutput=!0;let t=YI(),[n,r]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(${r}.0, ${n}.0);
            vec4 values = ${t.texture2D}(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        ${t.output} = result;
      }
    `}};J();var OW={kernelName:zr,backendName:`webgl`,kernelFunc:jW},kW,AW=P().getBool(`CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU`);function jW(e){let{inputs:t,backend:n,attrs:r}=e,{pixels:i}=t,{numChannels:a}=r,o=typeof HTMLVideoElement<`u`&&i instanceof HTMLVideoElement,s=typeof HTMLImageElement<`u`&&i instanceof HTMLImageElement,[c,l]=o?[i.videoWidth,i.videoHeight]:[i.width,i.height],u=[l,c],d=[l,c,a];if(s||o){let e=P().getBool(`CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU`);(kW==null||e!==AW)&&(AW=e,kW=document.createElement(`canvas`).getContext(`2d`,{willReadFrequently:AW})),kW.canvas.width=c,kW.canvas.height=l,kW.drawImage(i,0,0,c,l),i=kW.canvas}let f=n.makeTensorInfo(u,`int32`);n.texData.get(f.dataId).usage=qF.PIXELS,n.gpgpu.uploadPixelDataToTexture(n.getTexture(f.dataId),i);let p=P().getBool(`WEBGL_PACK`)?new DW(d):new EW(d),m=n.runWebGLProgram(p,[f],`int32`);return n.disposeData(f.dataId),m}J();function MW(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=r,h=yl(u),g=al(i.shape,a.shape,c,d,l,f,!1,h),_,v=[],y=o!=null,b=s!=null,x=p===`leakyrelu`,S=()=>{let e=[i,a],t=(e,t)=>{if(t===`NCHW`&&e.shape.length===1&&e.shape[0]!==1){let t=Q({inputs:{x:e},backend:n,attrs:{shape:[e.shape[0],1,1]}});return v.push(t),t}return e};if(y&&e.push(t(o,u)),b&&e.push(t(s,u)),x){let t=n.makeTensorInfo([],`float32`,Oi(m,`float32`));e.push(t),v.push(t)}return e};if(g.filterHeight===1&&g.filterWidth===1&&g.dilationHeight===1&&g.dilationWidth===1&&g.strideHeight===1&&g.strideWidth===1&&(g.padInfo.type===`SAME`||g.padInfo.type===`VALID`))_=XH({x:i,filter:a,convInfo:g,backend:n,bias:o,activation:p,preluActivationWeights:s,leakyreluAlpha:m});else if(g.strideWidth<=2&&h===`channelsLast`&&P().getBool(`WEBGL_EXP_CONV`)){let e=new qH(g,y,p?jB(p,!0):null,b,x),t=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],r=S();_=n.runWebGLProgram(e,r,`float32`,t)}else if(P().getBool(`WEBGL_CONV_IM2COL`))_=ZH({x:i,filter:a,convInfo:g,backend:n,bias:o,activation:p,preluActivationWeights:s,leakyreluAlpha:m});else{let e=new GH(g,y,p?jB(p,!1):null,b,x),t=S();_=n.runWebGLProgram(e,t,`float32`)}let C=Q({inputs:{x:_},backend:n,attrs:{shape:g.outShape}});return v.push(_),v.forEach(e=>n.disposeIntermediateTensorInfo(e)),C}var NW={kernelName:Hr,backendName:`webgl`,kernelFunc:MW};J();function PW(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dilations:u,dimRoundingMode:d,activation:f,leakyreluAlpha:p}=r,m=[],h=u;h??=[1,1],E(_l(c,h),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${c} and dilations '${h}'`);let g=al(i.shape,a.shape,c,h,l,d,!0),_=P().getBool(`WEBGL_PACK_DEPTHWISECONV`)&&g.strideWidth<=2&&g.outChannels/g.inChannels===1,v=f?jB(f,_):null,y=[i,a],b=o!=null,x=s!=null,S=f===`leakyrelu`;if(b&&y.push(o),x&&y.push(s),S){let e=n.makeTensorInfo([],`float32`,Oi(p,`float32`));y.push(e),m.push(e)}let C;C=_?new FU(g,b,v,x,S):new PU(g,b,v,x,S);let w=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],T=n.runWebGLProgram(C,y,`float32`,w);return m.forEach(e=>n.disposeIntermediateTensorInfo(e)),T}var FW={kernelName:Ur,backendName:`webgl`,kernelFunc:PW},IW=class{constructor(e,t,n,r){this.sliceDim=e,this.strides=t,this.paramsShape=r,this.variableNames=[`x`,`indices`],this.outputShape=n;let i=GL(n.length),a=`
    int index;`;for(let e=0;e<this.sliceDim;e++)a+=`
          index = round(getIndices(coords[0], ${e}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[e]};
          flattenIndex += index * ${this.strides[e]};`;this.userCode=`
         void main() {
          ${i} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${a}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}};J();function LW(e){let{inputs:t,backend:n}=e,{params:r,indices:i}=t,a=i.shape,o=a[a.length-1],s=k(r.shape),[c,l,u,d]=yT(r,i),f=Q({inputs:{x:i},backend:n,attrs:{shape:[l,o]}}),p=Q({inputs:{x:r},backend:n,attrs:{shape:[k(r.shape)/u,u]}});if(n.shouldExecuteOnCPU([r,i])||r.dtype===`string`){let e=UR(n.readSync(i.dataId),n.bufferSync(r),r.dtype,l,o,u,d,r.shape,s);return n.makeTensorInfo(c,r.dtype,e.values)}let m=new IW(o,d,[l,u],r.shape),h=n.runWebGLProgram(m,[p,f],p.dtype),g=Q({inputs:{x:h},backend:n,attrs:{shape:c}});return n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(h),g}var RW={kernelName:Yt,backendName:`webgl`,kernelFunc:LW},zW=class{constructor(e,t){this.variableNames=[`A`,`indices`],this.outputShape=t,this.rank=t.length;let n=GL(this.rank),r=BW(e,2);this.userCode=`
      void main() {
        ${n} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${e[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${r}));
      }
    `}};function BW(e,t){let n=[`resRC.x`,`resRC.y`,`resRC.z`,`resRC.w`],r=[];for(let t=0;t<e.length;t++)t===2?r.push(`index`):r.push(`${n[t]}`);return r.join()}J();function VW(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,indices:a}=t,{axis:o,batchDims:s}=r,c=j(o,i.shape)[0];if(P().get(`DEBUG`)){let e=n.readSync(a.dataId),t=i.shape[c];for(let n=0;n<e.length;++n){let r=e[n];E(r<=t-1&&r>=0,()=>`GatherV2: the index value ${r} is not in [0, ${t-1}]`)}}let l=mD(i,a,c,s),u=k(a.shape),d=[],f=Q({inputs:{x:i},backend:n,attrs:{shape:[l.batchSize,l.outerSize,l.dimSize,l.sliceSize]}}),p=Q({inputs:{x:a},backend:n,attrs:{shape:[l.batchSize,u/l.batchSize]}});d.push(f),d.push(p);let m=[l.batchSize,l.outerSize,u/l.batchSize,l.sliceSize];if(n.shouldExecuteOnCPU([i,a])||i.dtype===`string`){let e=n.bufferSync(p),t=WR(n.bufferSync(f),e,m);return d.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(l.outputShape,t.dtype,t.values)}let h=new zW(f.shape,m),g=n.runWebGLProgram(h,[f,p],f.dtype);d.push(g);let _=Q({inputs:{x:g},backend:n,attrs:{shape:l.outputShape}});return d.forEach(e=>n.disposeIntermediateTensorInfo(e)),_}var HW={kernelName:Jt,backendName:`webgl`,kernelFunc:VW};J();var UW=AB({opSnippet:`return float(a > b);`,packedOpSnippet:`
  return vec4(greaterThan(a, b));
`,cpuKernelImpl:GR,dtype:`bool`}),WW={kernelName:Xt,backendName:`webgl`,kernelFunc:UW};J();var GW=AB({opSnippet:`return float(a >= b);`,packedOpSnippet:`
  return vec4(greaterThanEqual(a, b));
`,dtype:`bool`,cpuKernelImpl:KR}),KW={kernelName:Zt,backendName:`webgl`,kernelFunc:GW};J();function qW(e){let{inputs:t,backend:n}=e,{input:r}=t;return pW(r,!0,n)}var JW={kernelName:$t,backendName:`webgl`,kernelFunc:qW};J();var YW=kB({opSnippet:`return float(!isnan(x) && !isinf(x));`,dtype:`bool`}),XW={kernelName:tn,backendName:`webgl`,kernelFunc:YW};J();var ZW=kB({opSnippet:`return float(isinf(x));`,dtype:`bool`}),QW={kernelName:nn,backendName:`webgl`,kernelFunc:ZW};J();var $W=kB({opSnippet:`return float(isnan(x));`,dtype:`bool`}),eG={kernelName:rn,backendName:`webgl`,kernelFunc:$W};J();var tG=AB({opSnippet:`return float(a < b);`,packedOpSnippet:`
  return vec4(lessThan(a, b));
`,cpuKernelImpl:qR,dtype:`bool`}),nG={kernelName:on,backendName:`webgl`,kernelFunc:tG};J();var rG=AB({opSnippet:`return float(a <= b);`,packedOpSnippet:`
  return vec4(lessThanEqual(a, b));
`,cpuKernelImpl:JR,dtype:`bool`}),iG={kernelName:sn,backendName:`webgl`,kernelFunc:rG};J();function aG(e){let{backend:t,attrs:n}=e,{start:r,stop:i,num:a}=n,o=YR(r,i,a);return t.makeTensorInfo([o.length],`float32`,o)}var oG={kernelName:cn,backendName:`webgl`,kernelFunc:aG};J();var sG={kernelName:`Log`,backendName:`webgl`,kernelFunc:kB({opSnippet:OB+`
  return x < 0.0 ? 0./0. : log(x);
`,packedOpSnippet:`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,cpuKernelImpl:XR})};J();var cG=kB({opSnippet:OB+`
  return log(1.0 + x);
`}),lG={kernelName:ln,backendName:`webgl`,kernelFunc:cG};J();var uG=AB({opSnippet:`return float(a >= 1.0 && b >= 1.0);`,packedOpSnippet:`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,dtype:`bool`}),dG={kernelName:un,backendName:`webgl`,kernelFunc:uG};J();var fG=kB({opSnippet:`return float(!(x >= 1.0));`}),pG={kernelName:dn,backendName:`webgl`,kernelFunc:fG};J();var mG=AB({opSnippet:`return float(a >= 1.0 || b >= 1.0);`,packedOpSnippet:`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,dtype:`bool`}),hG={kernelName:fn,backendName:`webgl`,kernelFunc:mG},gG=class{constructor(e,t,n,r,i){this.variableNames=[`x`],this.outputShape=[];let a=t,o=e[3]-1;this.outputShape=e;let s,c=`float(${n}) + float(${r}) * sum`;s=i===.5?`inversesqrt(${c})`:i===1?`1.0/(${c})`:`exp(log(${c}) * float(-${i}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -${a}; j <= ${a}; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  ${o}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${s};
        setOutput(val);
      }
    `}},_G=class{constructor(e,t,n,r,i){this.variableNames=[`x`],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let a=t,o=e[3]-1;this.outputShape=e;let s,c=`float(${n}) + float(${r}) * sum`;s=i===.5?`inversesqrt(${c})`:i===1?`1.0/(${c})`:`exp(log(${c}) * float(-${i}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < ${this.outputShape[3]};
        bool hasNextRow = c < ${this.outputShape[2]};

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - ${a};
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - ${a}; j <= ${a}; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${o}));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * ${s};
        setOutput(result);
      }
    `}};J();var vG={kernelName:`LRN`,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{depthRadius:a,bias:o,alpha:s,beta:c}=r,l=P().getBool(`WEBGL_PACK_NORMALIZATION`)?new _G(i.shape,a,o,s,c):new gG(i.shape,a,o,s,c);return n.runWebGLProgram(l,[i],i.dtype)}},yG=class{constructor(e,t,n,r,i){this.variableNames=[`inputImage`,`outputImage`,`dy`],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=n,this.alpha=r,this.beta=i,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${t})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${t} + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = ${this.depth};

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(${r}) * norm + float(${n});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${r})
                * float(${i})
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${i});
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}};J();var bG={kernelName:gn,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{x:i,y:a,dy:o}=t,{depthRadius:s,bias:c,alpha:l,beta:u}=r,d=new yG(i.shape,s,c,l,u);return n.runWebGLProgram(d,[i,a,o],i.dtype)}};J();function xG(e,t,n,r){let i=k(t),a=k(e.shape)/i,o=Q({inputs:{x:e},attrs:{shape:[a,i]},backend:r}),s=UB(o,e.dtype,`max`,r),c=Q({inputs:{x:s},attrs:{shape:n},backend:r});return r.disposeIntermediateTensorInfo(o),r.disposeIntermediateTensorInfo(s),c}J();function SG(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{reductionIndices:a,keepDims:o}=r,s=i.shape.length,c=j(a,i.shape),l=c,u=bf(l,s),d=u!=null,f=n.shouldExecuteOnCPU([i]),p=i;if(d){if(f){let e=n.texData.get(p.dataId).values,t=Array(s);for(let e=0;e<t.length;e++)t[e]=i.shape[u[e]];let r=Tz(e,i.shape,i.dtype,u,t);p=n.makeTensorInfo(t,i.dtype);let a=n.texData.get(p.dataId);a.values=r}else p=qB(i,u,n);l=Sf(l.length,s)}yf(`max`,l,s);let[m,h]=_f(p.shape,l),g=m;o&&(g=vf(m,c));let _;if(f){let e=n.texData.get(p.dataId).values,t=ZR(e,k(h),g,i.dtype);_=n.makeTensorInfo(g,i.dtype);let r=n.texData.get(_.dataId);r.values=t}else _=xG(p,h,g,n);return d&&n.disposeIntermediateTensorInfo(p),_}var CG={kernelName:`Max`,backendName:`webgl`,kernelFunc:SG};J();var wG=AB({opSnippet:fB+`
  return max(a, b);
`,packedOpSnippet:`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+mB+`
  return result;
`,cpuKernelImpl:QR}),TG={kernelName:vn,backendName:`webgl`,kernelFunc:wG};J();function EG(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;JI(i,`maxPool`);let{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=r;E(_l(o,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let l=rl(i.shape,a,o,1,s,c);if(l.filterWidth===1&&l.filterHeight===1&&A(l.inShape,l.outShape))return gB({inputs:{x:i},backend:n});let u=new RV(l,`max`,!1);return n.runWebGLProgram(u,[i],i.dtype)}var DG={kernelName:yn,backendName:`webgl`,kernelFunc:EG};J();function OG(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dataFormat:c,dimRoundingMode:l}=r,u=new zV(il(i.shape,a,o,[1,1,1],s,l,c),`max`,!1);return n.runWebGLProgram(u,[i],i.dtype)}var kG={kernelName:xn,backendName:`webgl`,kernelFunc:OG},AG=class{constructor(e){this.variableNames=[`dy`,`maxPos`],this.outputShape=e.inShape;let t=e.strideHeight,n=e.strideWidth,r=e.dilationHeight,i=e.effectiveFilterHeight,a=e.effectiveFilterWidth,o=i-1-e.padInfo.top,s=a-1-e.padInfo.left,c=i*a-1;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${i};
          wR += ${r}) {
          float dyR = float(dyRCorner + wR) / ${t}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${a}; wC++) {
            float dyC = float(dyCCorner + wC) / ${n}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${c} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${a} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}},jG=class{constructor(e){this.variableNames=[`dy`,`maxPos`],this.outputShape=e.inShape;let t=e.strideDepth,n=e.strideHeight,r=e.strideWidth,i=e.dilationDepth,a=e.dilationHeight,o=e.dilationWidth,s=e.effectiveFilterDepth,c=e.effectiveFilterHeight,l=e.effectiveFilterWidth,u=s-1-e.padInfo.front,d=c-1-e.padInfo.top,f=l-1-e.padInfo.left,p=s*c*l-1;this.userCode=`
      const ivec3 pads = ivec3(${u}, ${d}, ${f});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${s};
           wD += ${i}) {
          float dyD = float(dyDCorner + wD) / ${t}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${c};
              wR += ${a}) {
            float dyR = float(dyRCorner + wR) / ${n}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${l};
                wC += ${o}) {
              float dyC = float(dyCCorner + wC) / ${r}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = ${p} -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * ${c} * ${l} +
                  wR * ${l} + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};J();function MG(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,o=a,{filterSize:s,strides:c,pad:l,dimRoundingMode:u}=r,d=il(o.shape,s,c,[1,1,1],l,u),f=new zV(d,`max`,!0),p=n.runWebGLProgram(f,[o],o.dtype),m=new jG(d),h=n.runWebGLProgram(m,[i,p],o.dtype);return n.disposeIntermediateTensorInfo(p),h}var NG={kernelName:Sn,backendName:`webgl`,kernelFunc:MG};J();function PG(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a,output:o}=t,s=a;JI([a,o],`maxPoolGrad`);let{filterSize:c,strides:l,pad:u,dimRoundingMode:d}=r,f=rl(s.shape,c,l,1,u,d),p=new RV(f,`max`,!0),m=n.runWebGLProgram(p,[s],s.dtype),h=new AG(f),g=n.runWebGLProgram(h,[i,m],s.dtype);return n.disposeIntermediateTensorInfo(m),g}var FG={kernelName:bn,backendName:`webgl`,kernelFunc:PG};function IG(e,t,n,r){let i=new RV(n,`max`,!1),a=r.runWebGLProgram(i,[e],`float32`);return i=new RV(n,`max`,!0,!0,t),[a,r.runWebGLProgram(i,[e],`float32`)]}J();var LG={kernelName:Cn,backendName:`webgl`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{x:r}=e,{filterSize:i,strides:a,pad:o,includeBatchInIndex:s}=t,c=n;E(r.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${r.shape.length}.`);let l=[1,1];E(_l(a,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let[u,d]=IG(r,s,rl(r.shape,i,a,l,o),c);return[u,d]}};J();function RG(e,t,n,r){let i=k(t),a=k(e.shape)/i,o=Q({inputs:{x:e},attrs:{shape:[a,i]},backend:r}),s=UB(o,`float32`,`mean`,r),c=Q({inputs:{x:s},attrs:{shape:n},backend:r});return r.disposeIntermediateTensorInfo(o),r.disposeIntermediateTensorInfo(s),c}J();var zG={kernelName:wn,backendName:`webgl`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{x:r}=e,{keepDims:i,axis:a}=t,o=n,s=r.shape.length,c=j(a,r.shape),l=c,u=bf(l,s),d=u!=null,f=o.shouldExecuteOnCPU([r]),p=[],m=r;if(d){if(f){let e=o.texData.get(m.dataId).values,t=Array(s);for(let e=0;e<t.length;e++)t[e]=r.shape[u[e]];let n=Tz(e,r.shape,r.dtype,u,t);m=o.makeTensorInfo(t,r.dtype);let i=o.texData.get(m.dataId);i.values=n}else m=qB(r,u,o);p.push(m),l=Sf(l.length,s)}yf(`sum`,l,s);let[h,g]=_f(m.shape,l),_=h;i&&(_=vf(h,c));let v=RG(m,g,_,o);for(let e of p)o.disposeIntermediateTensorInfo(e);return v}};J();function BG(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=i.shape.length,c=j(a,i.shape),l=c,u=bf(l,s),d=i;u!=null&&(d=ZB({inputs:{x:i},backend:n,attrs:{perm:u}}),l=Sf(l.length,i.shape.length)),yf(`min`,l,s);let[f,p]=_f(d.shape,l),m=k(p),h=Q({inputs:{x:d},backend:n,attrs:{shape:[-1,m]}}),g=UB(h,h.dtype,`min`,n),_;if(o){let e=vf(f,c);_=Q({inputs:{x:g},backend:n,attrs:{shape:e}})}else _=Q({inputs:{x:g},backend:n,attrs:{shape:f}});return n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(g),u!=null&&n.disposeIntermediateTensorInfo(d),_}var VG={kernelName:`Min`,backendName:`webgl`,kernelFunc:BG};J();var HG=AB({opSnippet:fB+`
  return min(a, b);
`,packedOpSnippet:`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+mB+`
  return result;
`,cpuKernelImpl:$R}),UG={kernelName:Tn,backendName:`webgl`,kernelFunc:HG},WG=class{constructor(e,t,n){this.variableNames=[`x`],this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);let r=e.length,i=GL(r),a=t.map(e=>e[0]).join(`,`),o=t.map((t,n)=>t[0]+e[n]).join(`,`),s=[`coords[0]`,`coords[1]`,`coords[2]`,`coords[3]`].slice(0,r),c=n===`reflect`?0:1;if(r===1){this.userCode=`
        int start = ${a};
        int end = ${o};

        void main() {
          int outC = getOutputCoords();
          if (outC < start) {
            outC = start * 2 - outC - ${c};
          } else if(outC >= end) {
            outC = (end - 1) * 2 - outC + ${c};
          }
          setOutput(getX(outC - start));
        }
      `;return}this.userCode=`
      ${i} start = ${i}(${a});
      ${i} end = ${i}(${o});

      void main() {
        ${i} outC = getOutputCoords();
        for (int i = 0; i < ${r}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${c};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${c};
          }
        }
        ${i} coords = outC - start;
        setOutput(getX(${s}));
      }
    `}},GG=class{constructor(e,t,n){this.variableNames=[`x`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);let r=e.length,i=GL(r),a=t.map(e=>e[0]).join(`,`),o=t.map((t,n)=>t[0]+e[n]).join(`,`),s=Oz(`rc`,r),c=Oz(`source`,r),l=`${s[r-1]} < ${this.outputShape[r-1]}`,u=r===1?`source`:`vec2(${c.slice(-2).join()})`,d=n===`reflect`?0:1,f=``;if(r===1){let e=`
        ${i} source = rc;
        if (source < start) {
          source = start * 2 - source - ${d};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${d};
        }
        source -= start;
      `;f=`
        ${i} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${c.join()}), ${u});
        ${s[r-1]} += 1;
        if(${l}) {
          ${e}
          result[1] = getChannel(getX(${c.join()}), ${u});
        }
      `}else{let e=`
        ${i} source = rc;
        ${i} lt = ${i}(lessThan(source, start));
        ${i} gte = ${i}(greaterThanEqual(source, end));
        ${i} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${d}) +
                gte * ((end - 1) * 2 - source + ${d});
        source -= start;
      `;f=`
        ${i} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${c.join()}), ${u});
        ${s[r-1]} += 1;
        if(${l}) {
          ${e}
          result[1] = getChannel(getX(${c.join()}), ${u});
        }
        rc = outputLoc;
        ${s[r-2]} += 1;
        if(${s[r-2]} < ${this.outputShape[r-2]}) {
          ${e}
          result[2] = getChannel(getX(${c.join()}), ${u});
          ${s[r-1]} += 1;
          if(${l}) {
            ${e}
            result[3] = getChannel(getX(${c.join()}), ${u});
          }
        }
      `}this.userCode=`
      const ${i} start = ${i}(${a});
      const ${i} end = ${i}(${o});

      void main() {
        ${i} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${f}
        setOutput(result);
      }
    `}};J();var KG={kernelName:En,backendName:`webgl`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r}=e,{paddings:i,mode:a}=n,o=P().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)?new GG(r.shape,i,a):new WG(r.shape,i,a);return t.runWebGLProgram(o,[r],r.dtype)}};J();var qG={kernelName:`Mod`,backendName:`webgl`,kernelFunc:AB({opSnippet:`if (b == 0.0) return NAN;
  return mod(a, b);`,packedOpSnippet:`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+mB+`
  return result;
`})},JG=class{constructor(e,t,n){this.variableNames=[`probs`],this.customUniforms=[{name:`seed`,type:`float`}],this.outputShape=[e,n],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${t-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${t-1}));
      }
    `}};J();var YG=AB({opSnippet:`
if (a == b) {
  return 1.0;
};
return a / b;`,packedOpSnippet:`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,checkOutOfBounds:!0}),XG={kernelName:Lt,backendName:`webgl`,kernelFunc:YG};J();var ZG=`return a - b;`,QG=AB({opSnippet:ZG,packedOpSnippet:ZG,supportsComplex:!0,cpuKernelImpl:Sz}),$G={kernelName:`Sub`,backendName:`webgl`,kernelFunc:QG};J();function eK(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{dim:a}=r,o=j([a],i.shape),s=SG({inputs:{x:i},backend:n,attrs:{reductionIndices:o,keepDims:!1}}),c=vf(s.shape,o),l=Q({inputs:{x:s},backend:n,attrs:{shape:c}}),u=QG({inputs:{a:i,b:l},backend:n}),d=aW({inputs:{x:u},backend:n}),f=YB({inputs:{x:d},backend:n,attrs:{axis:o,keepDims:!1}}),p=Q({inputs:{x:f},backend:n,attrs:{shape:c}}),m=YG({inputs:{a:d,b:p},backend:n});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(u),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(p),m}var tK={kernelName:hr,backendName:`webgl`,kernelFunc:eK};J();function nK(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{numSamples:a,seed:o,normalized:s}=r,c=s?i:eK({inputs:{logits:i},backend:n,attrs:{dim:i.shape.length-1}}),l=c.shape[0],u=c.shape[1],d=new JG(l,u,a),f=[[o]],p=n.runWebGLProgram(d,[c],`int32`,f);return s||n.disposeIntermediateTensorInfo(c),p}var rK={kernelName:Dn,backendName:`webgl`,kernelFunc:nK};J();var iK=Vz+`
  return -x;
`,aK=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`;function oK(e){let{inputs:t,backend:n}=e,{x:r}=t;if(n.shouldExecuteOnCPU([r])){let[e,t]=tz(n.texData.get(r.dataId).values,r.shape,r.dtype);return n.makeTensorInfo(t,r.dtype,e)}let i;return i=P().getBool(`WEBGL_PACK_UNARY_OPERATIONS`)?new eB(r.shape,aK):new Bz(r.shape,iK),n.runWebGLProgram(i,[r],r.dtype)}var sK={kernelName:`Neg`,backendName:`webgl`,kernelFunc:oK};J();var cK=Hx;function lK(e){Wr(`tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead`);let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c}=r,{selectedIndices:l}=cK(n.readSync(i.dataId),n.readSync(a.dataId),o,s,c);return n.makeTensorInfo([l.length],`int32`,new Int32Array(l))}var uK={kernelName:An,backendName:`webgl`,kernelFunc:lK};J();var dK=Ux;function fK(e){Wr(`tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead`);let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c,padToMaxOutputSize:l}=r,{selectedIndices:u,validOutputs:d}=dK(n.readSync(i.dataId),n.readSync(a.dataId),o,s,c,l);return[n.makeTensorInfo([u.length],`int32`,new Int32Array(u)),n.makeTensorInfo([],`int32`,new Int32Array([d]))]}var pK={kernelName:jn,backendName:`webgl`,kernelFunc:fK};J();var mK=Wx;function hK(e){Wr(`tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead`);let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c,softNmsSigma:l}=r,{selectedIndices:u,selectedScores:d}=mK(n.readSync(i.dataId),n.readSync(a.dataId),o,s,c,l);return[n.makeTensorInfo([u.length],`int32`,new Int32Array(u)),n.makeTensorInfo([d.length],`float32`,new Float32Array(d))]}var gK={kernelName:Mn,backendName:`webgl`,kernelFunc:hK},_K=class{constructor(e,t,n,r){this.variableNames=[`indices`],this.outputShape=[e,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${r}), float(${n}),
                      float(index == coords.y)));
      }
    `}};J();var vK={kernelName:Pn,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{indices:i}=t,{dtype:a,depth:o,onValue:s,offValue:c}=r,l=k(i.shape),u=new _K(l,o,s,c),d=Q({inputs:{x:i},backend:n,attrs:{shape:[l]}}),f=n.runWebGLProgram(u,[d],a);n.disposeIntermediateTensorInfo(d);let p=[...i.shape,o],m=Q({inputs:{x:f},backend:n,attrs:{shape:p}});return n.disposeIntermediateTensorInfo(f),m}};J();function yK(e){let{inputs:t,backend:n}=e,{x:r}=t;if(r.dtype===`complex64`){let e=yH({inputs:{input:r},backend:n}),t=yK({inputs:{x:e},backend:n}),i=zH({inputs:{input:r},backend:n}),a=yK({inputs:{x:i},backend:n}),o=vB({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),o}return _W({attrs:{shape:r.shape,dtype:r.dtype,value:r.dtype===`string`?``:0},backend:n})}var bK={kernelName:Lr,backendName:`webgl`,kernelFunc:yK};J();function xK(e){let{inputs:t,backend:n}=e,{x:r}=t;if(r.dtype===`string`)throw Error(`onesLike is not supported under string dtype`);if(r.dtype===`complex64`){let e=yH({inputs:{input:r},backend:n}),t=xK({inputs:{x:e},backend:n}),i=zH({inputs:{input:r},backend:n}),a=yK({inputs:{x:i},backend:n}),o=vB({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),o}return _W({attrs:{shape:r.shape,dtype:r.dtype,value:1},backend:n})}var SK={kernelName:Nn,backendName:`webgl`,kernelFunc:xK};J();function CK(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r;if(t.length===1)return sW({inputs:{input:t[0]},backend:n,attrs:{dim:i}});let a=t[0].shape,o=t[0].dtype;t.forEach(e=>{D(a,e.shape,`All tensors passed to stack must have matching shapes`),E(o===e.dtype,()=>`All tensors passed to stack must have matching dtypes`)});let s=[],c=UH({inputs:t.map(e=>{let t=sW({inputs:{input:e},backend:n,attrs:{dim:i}});return s.push(t),t}),backend:n,attrs:{axis:i}});return s.forEach(e=>n.disposeIntermediateTensorInfo(e)),c}var wK={kernelName:Fn,backendName:`webgl`,kernelFunc:CK},TK=class{constructor(e,t,n){this.variableNames=[`x`],this.customUniforms=[{name:`value`,type:`float`}],this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);let r=e.length,i=GL(r),a=t.map(e=>e[0]).join(`,`),o=t.map((t,n)=>t[0]+e[n]).join(`,`),s=[`coords[0]`,`coords[1]`,`coords[2]`,`coords[3]`].slice(0,r);if(r===1){this.userCode=`
        int start = ${a};
        int end = ${o};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${i} start = ${i}(${a});
      ${i} end = ${i}(${o});

      void main() {
        ${i} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${i} coords = outC - start;
          setOutput(getX(${s}));
        }
      }
    `}},EK=class{constructor(e,t,n){this.variableNames=[`x`],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:`value`,type:`float`}],this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);let r=e.length,i=GL(r),a=t.map(e=>e[0]).join(`,`),o=t.map((t,n)=>t[0]+e[n]).join(`,`),s=Oz(`rc`,r),c=Oz(`source`,r),l=`${s[r-1]} < ${this.outputShape[r-1]}`,u=r===1?`source`:`vec2(${c.slice(-2).join()})`,d=[`${i} rc = outputLoc;`,`${s[r-1]} += 1;
       if(${l}) {
      `,r===1?``:`}
       rc = outputLoc;
       ${s[r-2]} += 1;
       if(${s[r-2]} < ${this.outputShape[r-2]}) {`,r===1?``:`  ${s[r-1]} += 1;
         if(${l}) {`],f=r===1?`rc < start || rc >= end`:`any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))`,p=``;for(let e=0,t=r===1?2:4;e<t;e++)p+=`
        ${d[e]}
        if (${f}) {
          result[${e}] = float(value);
        } else {
          ${i} source = rc - start;
          result[${e}] = getChannel(getX(${c.join()}), ${u});
        }
      `;p+=r===1?`} `:`}}`,this.userCode=`
      const ${i} start = ${i}(${a});
      const ${i} end = ${i}(${o});

      void main() {
        ${i} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${p}
        setOutput(result);
      }
    `}};J();var DK=e=>{let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{paddings:a,constantValue:o}=r;if(k(i.shape)===0)return _W({backend:n,attrs:{shape:a.map((e,t)=>e[0]+i.shape[t]+e[1]),value:o,dtype:i.dtype}});let s=P().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)?new EK(i.shape,a,o):new TK(i.shape,a,o),c=[[o]];return n.runWebGLProgram(s,[i],i.dtype,c)},OK={kernelName:In,backendName:`webgl`,kernelFunc:DK};J();var kK={kernelName:`Pow`,backendName:`webgl`,kernelFunc:AB({opSnippet:`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,packedOpSnippet:`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  bvec4 isNaN1 = lessThan(a, vec4(0.0));
  bvec4 isNaN2 = lessThan(floor(b), b);
  bvec4 isNaN = bvec4(isNaN1.x && isNaN2.x, isNaN1.y && isNaN2.y, isNaN1.z && isNaN2.z, isNaN1.w && isNaN2.w);
  `+mB+`
  return result;
`})};J();function AK(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=i.shape.length,c=[],l=j(a,i.shape),u=l,d=bf(u,s),f=i;d!=null&&(f=ZB({inputs:{x:i},backend:n,attrs:{perm:d}}),u=Sf(u.length,s),c.push(f)),yf(`prod`,u,s);let p;if(n.shouldExecuteOnCPU([f])){let e=n.texData.get(f.dataId).values,{outVals:t,outShape:r,outDtype:i}=rz(f.shape,f.dtype,e,u);p=n.makeTensorInfo(r,i,t)}else{let[e,t]=_f(f.shape,u),r=k(t),a=Q({inputs:{x:f},backend:n,attrs:{shape:[-1,r]}}),o=UB(a,ua(i.dtype),`prod`,n);p=Q({inputs:{x:o},backend:n,attrs:{shape:e}}),c.push(a),c.push(o)}if(o){c.push(p);let e=vf(p.shape,l);p=Q({inputs:{x:p},backend:n,attrs:{shape:e}})}return c.forEach(e=>n.disposeIntermediateTensorInfo(e)),p}var jK={kernelName:zn,backendName:`webgl`,kernelFunc:AK};J();function MK(e){let{inputs:t,backend:n,attrs:r}=e,{paramsNestedSplits:i,paramsDenseValues:a,indices:o}=t,{outputRaggedRank:s}=r,c=i.map(e=>n.readSync(e.dataId)),l=i.map(e=>e.shape),u=n.readSync(a.dataId),d=n.readSync(o.dataId),[f,p,m]=iz(c,l,u,a.shape,a.dtype,d,o.shape,s),h=f.map(e=>n.makeTensorInfo([e.length],`int32`,e)),g=n.makeTensorInfo(m,a.dtype,p);return h.concat([g])}var NK={kernelName:Bn,backendName:`webgl`,kernelFunc:MK};J();function PK(e){let{inputs:t,backend:n}=e,{starts:r,limits:i,deltas:a}=t,o=n.readSync(r.dataId),s=n.readSync(i.dataId),c=n.readSync(a.dataId),[l,u]=az(o,r.shape,r.dtype,s,i.shape,c,a.shape);return[n.makeTensorInfo([l.length],`int32`,l),n.makeTensorInfo([u.length],r.dtype,u)]}var FK={kernelName:Vn,backendName:`webgl`,kernelFunc:PK};J();function IK(e){let{inputs:t,backend:n,attrs:r}=e,{shape:i,values:a,defaultValue:o,rowPartitionTensors:s}=t,{rowPartitionTypes:c}=r,l=n.readSync(i.dataId),u=n.readSync(a.dataId),d=n.readSync(o.dataId),f=s.map(e=>n.readSync(e.dataId)),p=s.map(e=>e.shape),[m,h]=oz(l,i.shape,u,a.shape,a.dtype,d,o.shape,f,p,c);return n.makeTensorInfo(m,a.dtype,h)}var LK={kernelName:Hn,backendName:`webgl`,kernelFunc:IK};J();var RK=e=>{let{backend:t,attrs:n}=e,{start:r,stop:i,step:a,dtype:o}=n,s=sz(r,i,a,o);return t.makeTensorInfo([s.length],o,s)},zK={kernelName:Un,backendName:`webgl`,kernelFunc:RK};J();var BK=kB({opSnippet:`return 1.0 / x;`}),VK={kernelName:Gn,backendName:`webgl`,kernelFunc:BK};J();var HK=kB({opSnippet:Vz+`
  return (x < 0.0) ? 0.0 : x;
`,packedOpSnippet:`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`}),UK={kernelName:Kn,backendName:`webgl`,kernelFunc:HK};J();var WK=kB({opSnippet:Vz+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,packedOpSnippet:`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`}),GK={kernelName:Qn,backendName:`webgl`,kernelFunc:WK},KK=class{constructor(e,t,n,r,i){this.variableNames=[`A`],this.outputShape=[];let[a,o,s,c]=e;this.outputShape=[a,t,n,c];let l=[r&&t>1?o-1:o,r&&n>1?s-1:s],u=[r&&t>1?t-1:t,r&&n>1?n-1:n],d;d=i?`(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)`:`vec2(yRC) * effectiveInputOverOutputRatioRC`,this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${l[0]/u[0]},
          ${l[1]/u[1]});
      const vec2 inputShapeRC = vec2(${o}.0, ${s}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${d};

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}},qK=class{constructor(e,t,n,r,i){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[a,o,s,c]=e;this.outputShape=[a,t,n,c];let l=[r&&t>1?o-1:o,r&&n>1?s-1:s],u=[r&&t>1?t-1:t,r&&n>1?n-1:n],d;d=i?`(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)`:`vec3(yRC) * effectiveInputOverOutputRatioRC`,this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${l[0]/u[0]},
          ${l[1]/u[1]},
          ${l[1]/u[1]});
      const vec3 inputShapeRC = vec3(${o}.0, ${s}.0,
                                     ${s}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${d};

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${c-1};
        bool hasNextRow = coords.z < ${n-1};

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}};J();function JK(e){let{inputs:t,backend:n,attrs:r}=e,{images:i}=t,{alignCorners:a,halfPixelCenters:o,size:s}=r,[c,l]=s,u=P().getBool(`WEBGL_PACK_IMAGE_OPERATIONS`)?new qK(i.shape,c,l,a,o):new KK(i.shape,c,l,a,o);return n.runWebGLProgram(u,[i],`float32`)}var YK={kernelName:Xn,backendName:`webgl`,kernelFunc:JK},XK=class{constructor(e,t,n){this.variableNames=[`dy`],this.outputShape=[],this.outputShape=t;let[,r,i]=t,[,a,o]=e,s=[n&&a>1?r-1:r,n&&o>1?i-1:i],c=[n&&a>1?a-1:a,n&&o>1?o-1:o],l=s[0]/c[0],u=s[1]/c[1],d=1/l,f=1/u,p=Math.ceil(d)*2+2,m=Math.ceil(f)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${l});
        const float widthScale = float(${u});

        const float invHeightScale = float(${d});
        const float invWidthScale = float(${f});

        const int winHeight = int(${p});
        const int winWidth = int(${m});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${a}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${o}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${r-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${i-1}.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};J();function ZK(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r,s=new XK(a.shape,i.shape,o);return n.runWebGLProgram(s,[a],a.dtype)}var QK={kernelName:Zn,backendName:`webgl`,kernelFunc:ZK},$K=class{constructor(e,t,n,r,i){this.variableNames=[`A`],this.outputShape=[];let[a,o,s,c]=e;this.outputShape=[a,t,n,c];let l=[r&&t>1?o-1:o,r&&n>1?s-1:s],u=[r&&t>1?t-1:t,r&&n>1?n-1:n],d=r?`0.5`:`0.0`,f;f=i?`max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))`:`vec2(yRC) * effectiveInputOverOutputRatioRC`,this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${l[0]/u[0]},
          ${l[1]/u[1]});
      const vec2 inputShapeRC = vec2(${o}.0, ${s}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${f};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${d})));
        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}},eq=class{constructor(e,t,n,r,i){this.variableNames=[`A`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[a,o,s,c]=e;this.outputShape=[a,t,n,c];let l=[r&&t>1?o-1:o,r&&n>1?s-1:s],u=[r&&t>1?t-1:t,r&&n>1?n-1:n],d=r?`0.5`:`0.0`,f;f=i?`max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))`:`vec3(yRC) * effectiveInputOverOutputRatioRC`,this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${l[0]/u[0]},
          ${l[1]/u[1]},
          ${l[1]/u[1]});
      const vec3 inputShapeRC = vec3(${o}.0, ${s}.0,
                                     ${s}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${f};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${d})));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${c-1};
        bool hasNextRow = coords.z < ${n-1};

        vec4 newValue = vec4(
          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),
          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);

        setOutput(newValue);
      }
    `}};J();function tq(e){let{inputs:t,backend:n,attrs:r}=e,{images:i}=t,{alignCorners:a,halfPixelCenters:o,size:s}=r,[c,l]=s,u=P().getBool(`WEBGL_PACK_IMAGE_OPERATIONS`)?new eq(i.shape,c,l,a,o):new $K(i.shape,c,l,a,o);return n.runWebGLProgram(u,[i],i.dtype)}var nq={kernelName:Jn,backendName:`webgl`,kernelFunc:tq},rq=class{constructor(e,t,n){this.variableNames=[`dy`],this.outputShape=[],this.outputShape=t;let[,r,i]=t,[,a,o]=e,s=[n&&a>1?r-1:r,n&&o>1?i-1:i],c=[n&&a>1?a-1:a,n&&o>1?o-1:o],l=s[0]/c[0],u=s[1]/c[1],d=1/l,f=1/u,p=Math.ceil(d)*2+2,m=Math.ceil(f)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${l});
        const float widthScale = float(${u});

        const float invHeightScale = float(${d});
        const float invWidthScale = float(${f});

        const int winHeight = int(${p});
        const int winWidth = int(${m});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${a}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${o}) {
              continue;
            }

            float sourceFracRow =
              float(${s[0]}) *
                (float(dyR) / float(${c[0]}));

            float sourceFracCol =
                float(${s[1]}) *
                  (float(dyC) / float(${c[1]}));

            int sourceNearestRow = int(min(
                float(int(${r}) - 1),
                ${n} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${i}) - 1),
                ${n} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};J();function iq(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r,s=new rq(a.shape,i.shape,o);return n.runWebGLProgram(s,[a],a.dtype)}var aq={kernelName:Yn,backendName:`webgl`,kernelFunc:iq},oq=class{constructor(e,t){this.variableNames=[`x`];let n=e.length;if(n>4)throw Error(`WebGL backend: Reverse of rank-${n} tensor is not yet supported`);if(this.outputShape=e,n===1){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${e[0]} - coord - 1));
        }
      `;return}let r=n=>t.indexOf(n)!==-1&&e[n]!==1?`${e[n]} - coords[${n}] - 1`:`coords[${n}]`,i=e.map((e,t)=>r(t)).join(`,`),a=GL(n);this.userCode=`
      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${i}));
      }
    `}},sq=class{constructor(e,t){this.variableNames=[`x`],this.packedInputs=!0,this.packedOutput=!0;let n=e.length;if(n>4)throw Error(`WebGL backend: Reverse of rank-${n} tensor is not yet supported`);this.outputShape=e;let r=Oz(`rc`,n),i=`${r[n-1]} + 1 < ${this.outputShape[n-1]}`,a=`${r[n-2]} + 1 < ${this.outputShape[n-2]}`,o=GL(n);this.userCode=n===1?`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${e[0]} - rc - 1),
            ${e[0]} - rc - 1);
          if(${i}){
              result.g = getChannel(getX(${e[0]} - (rc  + 1) - 1),
                ${e[0]} - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:`
        void main() {
          ${o} rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = ${s(r.slice())};
          if(${i}){
            result.g = ${c(r.slice())};
          }
          if(${a}) {
            result.b = ${l(r.slice())};
            if(${i}) {
              result.a = ${u(r.slice())};
            }
          }
          setOutput(result);
        }
    `;function s(e){return d(e)}function c(e){return e[n-1]=`(`+e[n-1]+` + 1)`,d(e)}function l(e){return e[n-2]=`(`+e[n-2]+` + 1)`,d(e)}function u(e){return e[n-1]=`(`+e[n-1]+` + 1)`,e[n-2]=`(`+e[n-2]+` + 1)`,d(e)}function d(t){let n=e.map((e,n)=>f(n,t));return`getChannel(getX(${n.join(`,`)}), vec2(${n.slice(-2).join(`,`)}))`}function f(n,r){return t.indexOf(n)!==-1&&e[n]!==1?`${e[n]} - ${r[n]} - 1`:`${r[n]}`}}};J();function cq(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dims:a}=r,o=i.shape.length,s=j(a,i.shape);if(o===0)return gB({inputs:{x:i},backend:n});let c=P().getBool(`WEBGL_PACK_ARRAY_OPERATIONS`)?new sq(i.shape,s):new oq(i.shape,s);return n.runWebGLProgram(c,[i],i.dtype)}var lq={kernelName:$n,backendName:`webgl`,kernelFunc:cq},uq=class{constructor(e,t){this.variableNames=[`Image`],this.outputShape=[],this.customUniforms=[{name:`params`,type:`vec4`}];let n=e[1],r=e[2];this.outputShape=e;let i=``;i=typeof t==`number`?`float outputValue = ${t.toFixed(2)};`:`
        vec3 fill = vec3(${t.join(`,`)});
        float outputValue = fill[coords[3]];`,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];
          int y = coords[1];
          float coordXFloat = (float(x) - params[0]) * params[3] -
            (float(y) - params[1]) * params[2];
          float coordYFloat = (float(x) - params[0]) * params[2] +
            (float(y) - params[1]) * params[3];
          int coordX = int(round(coordXFloat + params[0]));
          int coordY = int(round(coordYFloat + params[1]));
          ${i}
          if(coordX >= 0 && coordX < ${r} && coordY >= 0 && coordY < ${n}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}};J();var dq={kernelName:Br,backendName:`webgl`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{image:r}=e,{radians:i,fillValue:a,center:o}=t,s=n,c=new uq(r.shape,a),[l,u]=uE(o,r.shape[1],r.shape[2]),d=[[l,u,Math.sin(i),Math.cos(i)]];return s.runWebGLProgram(c,[r],r.dtype,d)}};J();var fq=kB({opSnippet:`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`}),pq={kernelName:er,backendName:`webgl`,kernelFunc:fq};J();var mq=kB({opSnippet:`return inversesqrt(x);`,cpuKernelImpl:cz}),hq={kernelName:tr,backendName:`webgl`,kernelFunc:mq},gq=class{constructor(e,t,n,r,i,a,o=!0,s=!1){this.variableNames=[`updates`,`indices`,`defaultValue`],this.outputShape=a;let c=GL(i.length),l=GL(a.length),u=``;n===1?u=`i`:n===2&&(u=`i, j`);let d=`getIndices(${u})`,f=``;r===1?f=`i`:r===2&&(f=`i, coords[1]`);let p=`getUpdates(${f})`,m=``;s&&(m=`coords[0], coords[1]`);let h=`getDefaultValue(${m})`,g=t>1?`strides[j]`:`strides`;this.userCode=`
        ${c} strides = ${c}(${i});

        void main() {
          ${l} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${e}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${t}; j++) {
              int index = round(${d});
              flattenedIndex += index * ${g};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${p};
              found = true;
            }
          }
          setOutput(mix(${h}, sum, float(found)));
        }
      `}},_q=class{constructor(e,t,n,r,i,a,o=!0,s=!1){this.variableNames=[`updates`,`indices`,`defaultValue`],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=a;let c=GL(i.length),l=GL(a.length),u=``;n===1?u=`i`:n===2&&(u=`i, j`);let d=`getIndices(${u})`,f=``;r===1?f=`i`:r===2&&(f=`i, coords[1]`);let p=`getUpdates(${f})`,m=``;s&&(m=`coords[0], coords[1]`);let h=`getDefaultValue(${m})`,g=t>1?`strides[j]`:`strides`,_=t>1?`strides[j + 1]`:`strides`;this.userCode=`
        ${c} strides = ${c}(${i});

        void main() {
          ${l} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${e}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${t}; j+=2) {
              ivec4 index = round(${d});
              flattenedIndex += index.xz * ${g};
              if (j + 1 < ${t}) {
                flattenedIndex += index.yw * ${_};
              }
            }
            if (flattenedIndex[0] == coords[0] || flattenedIndex[1] == coords[0] ||
                flattenedIndex[0] == coords[0] + 1 || flattenedIndex[1] == coords[0] + 1) {
              vec4 updVals = ${p};
              if (flattenedIndex[0] == coords[0]) {
                sum.xy += updVals.xy;
                found.xy = vec2(1.);
              } else if (flattenedIndex[0] == coords[0] + 1) {
                sum.zw += updVals.xy;
                found.zw = vec2(1.);
              }
              if (flattenedIndex[1] == coords[0]) {
                sum.xy += updVals.zw;
                found.xy = vec2(1.);
              } else if (flattenedIndex[1] == coords[0] + 1) {
                sum.zw += updVals.zw;
                found.zw = vec2(1.);
              }
            }
          }
          setOutput(mix(${h}, sum, found));
        }
      `}};J();function vq(e){let{inputs:t,backend:n,attrs:r}=e,{indices:i,updates:a}=t,{shape:o}=r,{sliceRank:s,numUpdates:c,sliceSize:l,strides:u,outputSize:d}=Oy(a,i,o),f=[d/l,l];if(d===0)return n.makeTensorInfo(o,i.dtype);let p=Q({inputs:{x:i},backend:n,attrs:{shape:[c,s]}}),m=Q({inputs:{x:a},backend:n,attrs:{shape:[c,l]}}),h=n.makeTensorInfo([],`float32`,new Float32Array([0])),g;g=P().getBool(`WEBGL_PACK`)?new _q(c,s,p.shape.length,m.shape.length,u,f):new gq(c,s,p.shape.length,m.shape.length,u,f);let _=n.runWebGLProgram(g,[m,p,h],m.dtype),v=Q({inputs:{x:_},backend:n,attrs:{shape:o}});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(_),n.disposeIntermediateTensorInfo(h),v}var yq={kernelName:nr,backendName:`webgl`,kernelFunc:vq};J();var bq=class{constructor(e,t,n,r){this.variableNames=[`sortedSequence`,`values`],this.customUniforms=[{name:`numInputs`,type:`int`}],this.outputShape=[e,n];let i=`for (int i = 0; i < ${Math.ceil(Math.log2(t+1))}; ++i) { if (left >= right) break;`,a=P().getNumber(`WEBGL_VERSION`)===2?`while (left < right) {`:i,o=r===`left`?`<`:`<=`;this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${a}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${o} value) {
             left = mid + 1;
           } else {
             right = mid;
           }
         }
         return right;
       }

       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int valueIndex = coords[1];

         float value = getValues(batch, valueIndex);

         setOutput(float(findBound(batch, value)));
       }
     `}};J();function xq(e){let{inputs:t,backend:n,attrs:r}=e,{sortedSequence:i,values:a}=t,{side:o}=r,s=new bq(i.shape[0],i.shape[1],a.shape[1],o),c=[[i.shape[1]]];return n.runWebGLProgram(s,[i,a],`int32`,c)}var Sq={kernelName:ir,backendName:`webgl`,kernelFunc:xq},Cq=class{constructor(e,t,n){this.variableNames=[`c`,`a`,`b`],this.outputShape=t;let r,i;if(n>4)throw Error(`Where for rank ${n} is not yet supported`);if(n===1)i=`resRC`,r=`resRC`;else{let n=[`resRC.x`,`resRC.y`,`resRC.z`,`resRC.w`],a=[],o=[];for(let r=0;r<t.length;r++)o.push(`${n[r]}`),r<e&&a.push(`${n[r]}`);r=a.join(),i=o.join()}let a=GL(n);this.userCode=`
      void main() {
        ${a} resRC = getOutputCoords();
        float cVal = getC(${r});
        if (cVal >= 1.0) {
          setOutput(getA(${i}));
        } else {
          setOutput(getB(${i}));
        }
      }
    `}};J();function wq(e){let{inputs:t,backend:n}=e,{condition:r,t:i,e:a}=t,o=new Cq(r.shape.length,i.shape,i.shape.length);return n.runWebGLProgram(o,[r,i,a],la(i.dtype,a.dtype))}var Tq={kernelName:ar,backendName:`webgl`,kernelFunc:wq};J();var Eq=kB({opSnippet:`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${vE};
  float scale = ${yE};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`}),Dq={kernelName:or,backendName:`webgl`,kernelFunc:Eq};J();var Oq=kB({opSnippet:OB+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,packedOpSnippet:`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:uz}),kq={kernelName:ur,backendName:`webgl`,kernelFunc:Oq};J();var Aq=kB({opSnippet:`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`}),jq={kernelName:lr,backendName:`webgl`,kernelFunc:Aq};J();var Mq={kernelName:`Sin`,backendName:`webgl`,kernelFunc:kB({opSnippet:OB+`
  return sin(x);
`,packedOpSnippet:`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${mB}
  return result;
`})};J();var Nq=kB({opSnippet:`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`}),Pq={kernelName:cr,backendName:`webgl`,kernelFunc:Nq};J();var Fq=kB({opSnippet:`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`}),Iq={kernelName:dr,backendName:`webgl`,kernelFunc:Fq};J();var Lq={kernelName:pr,backendName:`webgl`,kernelFunc:e=>{let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,paddings:o}=r;E(i.shape.length<=4,()=>`spaceToBatchND for rank > 4 with a WebGL backend not implemented yet`);let s=a.reduce((e,t)=>e*t),c=[[0,0]];c.push(...o);for(let e=1+a.length;e<i.shape.length;++e)c.push([0,0]);let l=[],u=DK({inputs:{x:i},backend:n,attrs:{paddings:c,constantValue:0}}),d=fE(u.shape,a,s,!1),f=pE(d.length,a.length,!1),p=mE(u.shape,a,s,!1),m=Q({inputs:{x:u},backend:n,attrs:{shape:d}}),h=ZB({inputs:{x:m},backend:n,attrs:{perm:f}}),g=Q({inputs:{x:h},backend:n,attrs:{shape:p}});return l.push(u),l.push(m),l.push(h),l.forEach(e=>n.disposeIntermediateTensorInfo(e)),g}};J();function Rq(e){let{inputs:t,backend:n}=e,{indices:r,values:i,denseShape:a,defaultValue:o}=t;if(a.shape.length!==1)throw Error(`Dense shape must be a vector, saw:
         ${a.shape}`);if(r.shape.length!==2)throw Error(`Indices must be a matrix, saw:
         ${r.shape}`);if(i.shape.length!==1)throw Error(`Values must be a vector, saw:
         ${i.shape}`);if(o.shape.length!==0)throw Error(`Default value must be a scalar, saw:
        ${o.shape}`);let s=n.readSync(r.dataId),c=n.readSync(i.dataId),l=n.readSync(a.dataId),u=n.readSync(o.dataId)[0],[d,f,p,m,h]=pz(s,r.shape,r.dtype,c,i.dtype,l,u);return[n.makeTensorInfo(f,r.dtype,d),n.makeTensorInfo([f[0]],i.dtype,p),n.makeTensorInfo([m.length],`bool`,new Uint8Array(m.map(e=>Number(e)))),n.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}var zq={kernelName:gr,backendName:`webgl`,kernelFunc:Rq};J();function Bq(e){let{inputs:t,backend:n}=e,{inputIndices:r,inputShape:i,newShape:a}=t;if(r.shape.length!==2)throw Error(`Input indices should be a matrix but received shape ${r.shape}`);if(i.shape.length!==1)throw Error(`Input shape should be a vector but received shape ${i.shape}`);if(a.shape.length!==1)throw Error(`Target shape should be a vector but received shape ${a.shape}`);let o=Array.from(n.readSync(i.dataId)),s=n.readSync(r.dataId),c=Array.from(n.readSync(a.dataId)),[l,u,d]=mz(s,r.shape,r.dtype,o,c);return[n.makeTensorInfo(u,r.dtype,l),n.makeTensorInfo([d.length],a.dtype,new Int32Array(d))]}var Vq={kernelName:_r,backendName:`webgl`,kernelFunc:Bq};J();function Hq(e){let{inputs:t,backend:n}=e,{data:r,indices:i,segmentIds:a}=t;if(r.shape.length<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.shape.length!==1)throw Error(`Indices should be a vector but received shape
              ${i.shape}`);if(a.shape.length!==1)throw Error(`Segment ids should be a vector but received shape
              ${a.shape}`);let o=n.readSync(r.dataId),s=n.readSync(i.dataId),c=n.readSync(a.dataId),[l,u]=hz(o,r.shape,r.dtype,s,c,!0);return n.makeTensorInfo(u,r.dtype,l)}var Uq={kernelName:vr,backendName:`webgl`,kernelFunc:Hq};J();function Wq(e){let{inputs:t,backend:n}=e,{data:r,indices:i,segmentIds:a}=t;if(r.shape.length<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.shape.length!==1)throw Error(`Indices should be a vector but received shape
             ${i.shape}`);if(a.shape.length!==1)throw Error(`Segment ids should be a vector but received shape
             ${a.shape}`);let o=n.readSync(r.dataId),s=n.readSync(i.dataId),c=n.readSync(a.dataId),[l,u]=hz(o,r.shape,r.dtype,s,c);return n.makeTensorInfo(u,r.dtype,l)}var Gq={kernelName:yr,backendName:`webgl`,kernelFunc:Wq};J();function Kq(e){let{inputs:t,backend:n,attrs:r}=e,{sparseIndices:i,sparseValues:a,defaultValue:o}=t,{outputShape:s}=r,{sliceRank:c,numUpdates:l,sliceSize:u,strides:d,outputSize:f}=Oy(a,i,s);if(a.dtype===`string`){let e=lz(n.bufferSync(i),n.bufferSync(a),s,f,u,l,c,d,Pi(n.readSync(o.dataId)[0]),!1);return n.makeTensorInfo(s,e.dtype,e.values)}let p=new gq(l,c,i.shape.length,a.shape.length,d,[f,1],!1),m=n.runWebGLProgram(p,[a,i,o],a.dtype),h=Q({inputs:{x:m},backend:n,attrs:{shape:s}});return n.disposeIntermediateTensorInfo(m),h}var qq={kernelName:br,backendName:`webgl`,kernelFunc:Kq};J();function Jq(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{numOrSizeSplits:a,axis:o}=r,s=j(o,i.shape)[0],c=JE(i,a,s),l=i.shape.length,u=Array(l).fill(0),d=i.shape.slice();return c.map(e=>{let t=[...d];t[s]=e;let r=oH({inputs:{x:i},backend:n,attrs:{begin:u,size:t}});return u[s]+=e,r})}var Yq={kernelName:mr,backendName:`webgl`,kernelFunc:Jq};J();var Xq=`return sqrt(x);`,Zq=kB({opSnippet:Xq,packedOpSnippet:Xq,cpuKernelImpl:gz}),Qq={kernelName:fr,backendName:`webgl`,kernelFunc:Zq};J();var $q=kB({opSnippet:`return x * x;`}),eJ={kernelName:Sr,backendName:`webgl`,kernelFunc:$q};J();var tJ=`return (a - b) * (a - b);`,nJ=AB({opSnippet:tJ,packedOpSnippet:tJ}),rJ={kernelName:xr,backendName:`webgl`,kernelFunc:nJ};J();function iJ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;if(i.dtype!==`string`)throw Error(`Input must be of datatype string`);let a=_z(_D(n.readSync(i.dataId)),`string`,r);return n.makeTensorInfo(i.shape,`string`,a)}var aJ={kernelName:Cr,backendName:`webgl`,kernelFunc:iJ};J();function oJ({inputs:e,attrs:t,backend:n}){let{x:r}=e,i=Vz+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,a=new Bz(r.shape,i);return n.runWebGLProgram(a,[r],r.dtype)}var sJ={kernelName:Rr,backendName:`webgl`,kernelFunc:oJ},cJ=class{constructor(e,t,n){this.variableNames=[`x`],this.outputShape=n;let r=n.length,i=GL(n.length),a=GL(n.length),o=``;if(r===1)o=`coords * strides + begin`;else{let e=0;o=n.map((t,r)=>(e++,n.length===1?`coords * strides[${r}] + begin[${r}]`:`coords[${e-1}] * strides[${r}] + begin[${r}]`)).join(`,`)}this.userCode=`
      ${i} begin = ${i}(${e});
      ${i} strides = ${i}(${t});

      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${o}));
      }
    `}};J();function lJ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{begin:a,end:o,strides:s,beginMask:c,endMask:l,ellipsisMask:u,newAxisMask:d,shrinkAxisMask:f}=r,{finalShapeSparse:p,finalShape:m,isIdentity:h,sliceDim0:g,isSimpleSlice:_,begin:v,end:y,strides:b}=LT(i.shape,a,o,s,c,l,u,d,f),x;if(h)x=Q({inputs:{x:i},backend:n,attrs:{shape:m}});else if(g||_){E(i.shape.length>=1,()=>`Input must have rank at least 1, got: ${i.shape.length}`);let e=wT(v,y,b),t=oH({inputs:{x:i},backend:n,attrs:{begin:v,size:e}});x=Q({inputs:{x:t},backend:n,attrs:{shape:m}}),n.disposeIntermediateTensorInfo(t)}else if(n.shouldExecuteOnCPU([i])){let e=n.readSync(i.dataId),t=vz(p,Xs(i.shape,i.dtype,e),b,v);x=n.makeTensorInfo(m,i.dtype,t.values)}else{let e=new cJ(v,b,p);x=n.runWebGLProgram(e,[i],i.dtype)}let S=Q({inputs:{x},backend:n,attrs:{shape:m}});return n.disposeIntermediateTensorInfo(x),S}var uJ={kernelName:wr,backendName:`webgl`,kernelFunc:lJ};J();function dJ(e){let{inputs:t,backend:n,attrs:r}=e,{separator:i,nGramWidths:a,leftPad:o,rightPad:s,padWidth:c,preserveShortSequences:l}=r,{data:u,dataSplits:d}=t,[f,p]=yz(n.readSync(u.dataId),n.readSync(d.dataId),i,a,o,s,c,l);return[n.makeTensorInfo([f.length],`string`,f),n.makeTensorInfo(d.shape,`int32`,p)]}var fJ={kernelName:Tr,backendName:`webgl`,kernelFunc:dJ};J();function pJ(e){let{inputs:t,backend:n,attrs:r}=e,{skipEmpty:i}=r,{input:a,delimiter:o}=t;if(a.dtype!==`string`)throw Error(`Input must be of datatype string`);if(a.shape.length!==1)throw Error(`Input must be a vector, got shape: ${a.shape}`);if(o.shape.length!==0)throw Error(`Delimiter must be a scalar, got shape: ${o.shape}`);let s=n.readSync(a.dataId),c=n.readSync(o.dataId)[0],[l,u,d]=bz(s,c,i),f=u.length;return[n.makeTensorInfo([f,2],`int32`,l),n.makeTensorInfo([f],`string`,u),n.makeTensorInfo([2],`int32`,new Int32Array(d))]}var mJ={kernelName:Er,backendName:`webgl`,kernelFunc:pJ};J();function hJ(e){let{inputs:t,backend:n,attrs:r}=e,{numBuckets:i}=r,{input:a}=t;if(a.dtype!==`string`)throw Error(`Input must be of datatype string`);if(i<=0)throw Error(`Number of buckets must be at least 1`);let o=xz(n.readSync(a.dataId),i);return n.makeTensorInfo(a.shape,`int32`,o)}var gJ={kernelName:Dr,backendName:`webgl`,kernelFunc:hJ};J();var _J={kernelName:`Tan`,backendName:`webgl`,kernelFunc:kB({opSnippet:`return tan(x);`})};J();var vJ=kB({opSnippet:`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`}),yJ={kernelName:Or,backendName:`webgl`,kernelFunc:vJ};J();function bJ(e){let{inputs:t,backend:n,attrs:r}=e,{tensor:i,indices:a,updates:o}=t,{}=r,{sliceRank:s,numUpdates:c,sliceSize:l,strides:u,outputSize:d}=Oy(o,a,i.shape),f=[d/l,l];if(d===0)return n.makeTensorInfo(i.shape,a.dtype);let p=Q({inputs:{x:a},backend:n,attrs:{shape:[c,s]}}),m=Q({inputs:{x:o},backend:n,attrs:{shape:[c,l]}}),h=Q({inputs:{x:i},backend:n,attrs:{shape:f}}),g=new gq(c,s,p.shape.length,m.shape.length,u,f,!1,!0),_=n.runWebGLProgram(g,[m,p,h],h.dtype),v=Q({inputs:{x:_},backend:n,attrs:{shape:i.shape}});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(_),v}var xJ={kernelName:rr,backendName:`webgl`,kernelFunc:bJ},SJ=class{constructor(e,t){this.variableNames=[`A`];let n=Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[r]*t[r];this.outputShape=n,this.rank=n.length;let r=GL(this.rank),i=CJ(e);this.userCode=`
      void main() {
        ${r} resRC = getOutputCoords();
        setOutput(getA(${i}));
      }
    `}};function CJ(e){let t=e.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(t===1)return`imod(resRC, ${e[0]})`;let n=[`resRC.x`,`resRC.y`,`resRC.z`,`resRC.w`,`resRC.u`],r=[];for(let t=0;t<e.length;t++)r.push(`imod(${n[t]}, ${e[t]})`);return r.join()}J();function wJ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{reps:a}=r;if(i.dtype===`string`||i.shape.length>5){let e=n.readSync(i.dataId),t=i.dtype===`string`?e.map(e=>Pi(e)):e,r=Cz(Xs(i.shape,i.dtype,t),a);return n.makeTensorInfo(r.shape,r.dtype,r.values)}let o=new SJ(i.shape,a);return n.runWebGLProgram(o,[i],i.dtype)}var TJ={kernelName:kr,backendName:`webgl`,kernelFunc:wJ},EJ=class{constructor(e){this.variableNames=[`x`,`indices`],this.customUniforms=[{name:`n`,type:`int`},{name:`firstPass`,type:`int`},{name:`negativeInf`,type:`float`},{name:`dir`,type:`int`},{name:`inc`,type:`int`}],this.outputShape=e,this.userCode=`
       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // We compare elements pair-wise within a group of size 2 * inc.
         // The comparing rule for each group alternates between ascending
         // and descending. Within each group, we compare each pair at
         // positions i and i+inc. To decide whether an element at position i
         // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
         // inc, it is in the first half of the group, we denote it as x0,
         // otherwise we denote it as x1.
         // For example, as shown in the Bitonic top K paper referenced above,
         // Figure5(a) shows that element[1] is in the
         // second half of the group when group size is 2, but it is in the
         // first half of the group when group size is 4.

         bool isFirstInPair = imod(elemIdx, 2 * inc) < inc;
         int i = isFirstInPair ? elemIdx : elemIdx - inc;

         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + inc : int(getIndices(batch, i + inc));
         float x0 = i0 < n ? getX(batch, i0) : negativeInf;
         float x1 = i1 < n ? getX(batch, i1) : negativeInf;

         // Denotes which direction indices are in (ascending or descending).
         bool reverse = imod(elemIdx, 2 * dir) >= dir;
         bool isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
         if (reverse == isGreater) { // Elements in opposite order of direction
           int iTemp = i0;
           i0 = i1;
           i1 = iTemp;
         }
         if (isFirstInPair) {
            setOutput(float(i0));
         } else {
            setOutput(float(i1));
         }
       }
     `}},DJ=class{constructor(e){this.variableNames=[`x`,`indices`],this.customUniforms=[{name:`n`,type:`int`},{name:`firstPass`,type:`int`},{name:`k`,type:`int`}],this.outputShape=e,this.userCode=`
    void main() {
         // Takes max of indices (0, k), (1, k + 1), (2, k + 2) ...
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // The output size is half of the previous size.
         // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _ (k=4),
         // we only need to output the indices at positions |, the indices at
         // positions _ can be thrown away, see Figure5(b) After Phase 2
         // (Merge phase) in the Bitonic Top K paper referenced above.
         // For example, the paper shows we only need to output the orange bars.
         // The output sequence should look like this | | | | | | | |.
         // Because the sequence is halved, to map the output index back
         // to the previous sequence to find the corresponding value,
         // we need to double the index. When we double the index,
         // we basically interpolate a position, so 2i looks like
         // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k position
         // of each 2k positions by - elemIdx % k. E.g. for output at
         // index 4,5,6,7, we want to get the corresponding element at
         // original index 8,9,10,11, for output at index 8,9,10,11,
         // we want to get the corresponding element at original index
         // 16,17,18,19, so on and so forth.

         int i = elemIdx < k ? elemIdx : (elemIdx * 2 - imod(elemIdx, k));
         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + k : int(getIndices(batch, i + k));

         float x0 = getX(batch, i0);
         float x1 = i1 < n ? getX(batch, i1) : x0;

         setOutput(x0 >= x1 ? float(i0) : float(i1));
       }
     `}};J();function OJ(e,t){t!==null&&e.disposeIntermediateTensorInfo(t)}function kJ(e){let t=1;for(;t<e;)t*=2;return t}function AJ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{k:a,sorted:o}=r,s=P().getNumber(`TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD`),c=P().getNumber(`TOPK_K_CPU_HANDOFF_THRESHOLD`),l=i.shape,u=l[l.length-1];if(n.shouldExecuteOnCPU([i])||u<s||a>c){let[e,t]=wz(n.readSync(i.dataId),l,i.dtype,a,o);return[n.makeTensorInfo(e.shape,e.dtype,e.values),n.makeTensorInfo(t.shape,t.dtype,t.values)]}if(a===0)return l[l.length-1]=0,[n.makeTensorInfo(l,i.dtype,[]),n.makeTensorInfo(l,`int32`,[])];if(u===1)return[i,_W({attrs:{shape:l,dtype:`int32`,value:0},backend:n})];let d=n.texData.get(i.dataId),f=d!==null&&d.isPacked,p=f?n.unpackTensor(i):i,m=k(l)/u,h=Q({inputs:{x:p},attrs:{shape:[m,u]},backend:n});f&&OJ(n,p);let g=kJ(a),_=kJ(u),v=null,y=()=>v===null?[h,h]:[h,v],b=(e,t,r)=>{let i=y(),a=new EJ(r),o=[[u],[+(v===null)],[-1/0],[e],[t]],s=v;v=n.runWebGLProgram(a,i,`int32`,o),OJ(n,s)};for(let e=1;e<g;e*=2){let t=e*2;for(let n=e;n>=1;n/=2)b(t,n,[m,_])}for(let e=_;e>g;e/=2){let t=y(),r=new DJ([m,e/2]),i=[[u],[+(v===null)],[g]],a=v;v=n.runWebGLProgram(r,t,`int32`,i),OJ(n,a);let o=g/2,s=o*2;for(let e=o;e>=1;e/=2)b(s,e,v.shape)}let x=v;v=oH({inputs:{x:v},backend:n,attrs:{begin:0,size:[m,a]}}),OJ(n,x);let S=VW({inputs:{x:h,indices:v},backend:n,attrs:{axis:1,batchDims:1}});OJ(n,h);let C=l.slice(0,-1);C.push(a),x=v,v=Q({inputs:{x:v},attrs:{shape:C},backend:n}),OJ(n,x);let w=S;return S=Q({inputs:{x:S},attrs:{shape:C},backend:n}),OJ(n,w),[S,v]}var jJ={kernelName:Ar,backendName:`webgl`,kernelFunc:AJ},MJ=class{constructor(e,t,n,r,i,a){this.variableNames=[`Image`,`Transforms`],this.outputShape=a;let o=n===`nearest`?1:2,s;switch(r){case`constant`:s=1;break;case`reflect`:s=2;break;case`wrap`:s=3;break;case`nearest`:s=4;break;default:s=1}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${s} == 2) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    if (inCoord < sz2) {
                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +
                      inCoord;
                    }
                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    inCoord -= sz2 * float(int(float(inCoord / sz2)));
                    if (inCoord >= len) {
                      inCoord = sz2 - inCoord - 1.0;
                    }
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${s} == 3) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord -= len * float(int(float(inCoord / sz)));
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${s} == 4) {
                return clamp(outCoord, 0.0, len - 1.0);
              } else {
                return outCoord;
              }
            }

            float readWithFillValue(int batch, int coordY, int coordX,
              int channel) {
              float outputValue;
              if (0 <= coordY && coordY < ${e} && 0 <= coordX && coordX < ${t}) {
                  outputValue = getImage(batch, coordY, coordX, channel);
              } else {
                outputValue = float(${i});
              }
              return outputValue;
            }

            void main() {
              ivec4 coords = getOutputCoords();
              float outputValue;
              int batch = coords[0];
              int x = coords[2];
              int y = coords[1];
              int channel = coords[3];
              float xf = float(x);
              float yf = float(y);
              float a1 = getTransforms(batch, 0);
              float a2 = getTransforms(batch, 1);
              float a3 = getTransforms(batch, 2);
              float b1 = getTransforms(batch, 3);
              float b2 = getTransforms(batch, 4);
              float b3 = getTransforms(batch, 5);
              float c1 = getTransforms(batch, 6);
              float c2 = getTransforms(batch, 7);
              float projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = float(${i});
              } else {
                float inX = (a1 * xf + a2 * yf + a3) / projection;
                float inY = (b1 * xf + b2 * yf + b3) / projection;
                float mapX = mapCoord(inX, float(${t}));
                float mapY = mapCoord(inY, float(${e}));

                if (${o} == 1) {
                  int coordY = int(round(mapY));
                  int coordX = int(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  float yFloor = floor(mapY);
                  float xFloor = floor(mapX);
                  float yCeil = yFloor + 1.0;
                  float xCeil = xFloor + 1.0;
                  float valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);
                  float valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutput(outputValue);
            }
        `}};J();function NJ(e){let{inputs:t,backend:n,attrs:r}=e,{image:i,transforms:a}=t,{interpolation:o,fillMode:s,fillValue:c,outputShape:l}=r,[u,d,f,p]=i.shape,[m,h]=l??[d,f],g=new MJ(d,f,o,s,c,[u,m,h,p]);return n.runWebGLProgram(g,[i,a],`float32`)}var PJ={kernelName:jr,backendName:`webgl`,kernelFunc:NJ};J();function FJ(e){let{inputs:t,attrs:n,backend:r}=e,{axis:i}=n,{x:a}=t;JI(a,`unique`),console.warn(`WARNING: `,`UI might be locked temporarily as data is being downloaded`);let{outputValues:o,outputShape:s,indices:c}=Ez(r.readSync(a.dataId),i,a.shape,a.dtype);return[r.makeTensorInfo(s,a.dtype,o),r.makeTensorInfo([c.length],`int32`,c)]}var IJ={kernelName:Nr,backendName:`webgl`,kernelFunc:FJ};J();function LJ(e){let{inputs:t,backend:n,attrs:r}=e,{value:i}=t,{axis:a}=r;a<0&&(a+=i.shape.length);let o=i,s=o.shape.length,c=i.shape[a],l=Array(s-1),u=0;for(let e=0;e<s;e++)e!==a&&(l[u++]=o.shape[e]);let d=[],f=Array(s).fill(0),p=o.shape.slice();p[a]=1;let m=Array(c);for(let e=0;e<m.length;e++){f[a]=e;let t=oH({inputs:{x:o},backend:n,attrs:{begin:f,size:p}}),r=Q({inputs:{x:t},backend:n,attrs:{shape:l}});m[e]=r,d.push(t)}return d.forEach(e=>n.disposeIntermediateTensorInfo(e)),m}var RJ={kernelName:Pr,backendName:`webgl`,kernelFunc:LJ},zJ=class{constructor(e,t){this.variableNames=[`x`,`segmentIds`];let n=e.windowSize,r=e.batchSize,i=e.inSize,a=e.numSegments,o=a*Math.ceil(i/n);this.outputShape=[r,o];let s=Math.floor(n/4)*4,c=n%4,l=`
        sumValue += dot(values, segFilter);
    `,u=``;i%n>0&&(u=`
        if (inIdx < 0 || inIdx >= ${i}) {
          return initializationValue;
        }
      `);let d=``;i%n>0&&(d=`
        if (inIdx < 0 || inIdx >= ${i}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        ${u}
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        ${d}
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          ${a})) * float(${n}));
        int currentSeg = int(mod(float(outIdx), float(${a})));

        float sumValue = 0.0;

        for (int i = 0; i < ${s}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          ${l}
        }

        int inIdx = inOffset + ${s};
        if (${c===1}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          ${l}
        } else if (${c===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          ${l}
        } else if (${c===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          ${l}
        }
        setOutput(sumValue);
      }
    `}};J();function BJ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,segmentIds:a}=t,{numSegments:o}=r,s=i.shape.length,c=[],l=0,u=bf([l],s),d=i;u!=null&&(d=ZB({inputs:{x:i},backend:n,attrs:{perm:u}}),c.push(d),l=Sf(1,s)[0]);let f=pD(d.shape,l,o),p=k([d.shape[l]]),m=Q({inputs:{x:d},backend:n,attrs:{shape:[-1,p]}});c.push(m);let h=ua(i.dtype),g=(e,t,r,i,a)=>{let o=e.shape[0],s=e.shape[1],l=fD(s,a),u=new zJ({windowSize:l,inSize:s,batchSize:o,numSegments:a},t),d=n.compileAndRun(u,[e,r],i);if(c.push(d),d.shape[1]===a)return d;let f=RK({backend:n,attrs:{start:0,stop:a,step:1,dtype:`float32`}}),p=wJ({inputs:{x:f},backend:n,attrs:{reps:[s/l]}});return c.push(f),c.push(p),g(d,t,p,i,a)},_=Q({inputs:{x:g(m,`unsortedSegmentSum`,a,h,o)},backend:n,attrs:{shape:f}}),v=_;if(u!=null){c.push(_);let e=xf(u);v=ZB({inputs:{x:v},backend:n,attrs:{perm:e}})}return c.forEach(e=>n.disposeIntermediateTensorInfo(e)),v}var VJ={kernelName:Fr,backendName:`webgl`,kernelFunc:BJ};J();var HJ=[tV,iV,oV,cV,uV,mV,gV,vV,TV,DV,kV,jV,NV,FV,LV,VV,UV,qV,YV,ZV,eH,cH,uH,mH,gH,wH,DH,jH,yB,FH,WH,$H,aU,cU,uU,fU,mU,hU,_U,yU,EU,OU,AU,NU,LU,VU,UU,KU,YU,ZU,QU,tW,rW,iW,oW,cW,dW,hW,vW,bW,CW,TW,OW,NW,FW,RW,HW,WW,KW,_B,JW,BH,XW,QW,eG,CB,nG,iG,oG,sG,lG,dG,pG,hG,vG,bG,CG,TG,DG,kG,NG,FG,LG,zG,VG,UG,KG,qG,rK,LB,sK,uK,pK,gK,vH,vK,SK,wK,OK,kK,DB,jK,NK,FK,LK,zK,bH,XG,VK,UK,GK,zB,YK,QK,nq,aq,lq,dq,pq,hq,yq,Sq,Tq,Dq,kq,jq,Mq,Pq,sH,tK,Iq,Lq,zq,Vq,Uq,Gq,qq,Yq,Qq,eJ,rJ,aJ,sJ,uJ,fJ,mJ,gJ,$G,XB,_J,yJ,xJ,TJ,jJ,PJ,QB,IJ,RJ,VJ,bK];for(let e of HJ)Xr(e);var UJ;(function(e){e[e.float32=0]=`float32`,e[e.int32=1]=`int32`,e[e.bool=2]=`bool`,e[e.string=3]=`string`,e[e.complex64=4]=`complex64`})(UJ||={});var WJ;(function(e){e[e.linear=0]=`linear`,e[e.relu=1]=`relu`,e[e.relu6=2]=`relu6`,e[e.prelu=3]=`prelu`,e[e.leakyrelu=4]=`leakyrelu`,e[e.sigmoid=5]=`sigmoid`,e[e.elu=6]=`elu`})(WJ||={}),J();var GJ;function KJ(e){GJ=e.wasm.cwrap(Vr,null,[`number`,`array`,`number`,`number`,`array`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function qJ(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a,bias:o,preluActivationWeights:s}=t;if(i.dtype!==`float32`||a.dtype!==`float32`)throw Error(`_FusedMatMul for non non-float32 tensors not yet supported.`);let{transposeA:c,transposeB:l,activation:u,leakyreluAlpha:d}=r,f=n.dataIdMap.get(i.dataId).id,p=n.dataIdMap.get(a.dataId).id,m=0;if(o!=null){let e=n.dataIdMap.get(o.dataId);if(e.shape.length!==1)throw Error(`_FusedMatMul only supports rank-1 bias but got rank ${e.shape.length}.`);m=e.id}let h=s==null?0:n.dataIdMap.get(s.dataId).id,g=WJ[u];if(g==null)throw Error(`${u} activation not yet supported for FusedConv2D in the wasm backend.`);let _=c?i.shape[2]:i.shape[1],v=l?a.shape[1]:a.shape[2],y=zd(i.shape.slice(0,-2),a.shape.slice(0,-2)),b=n.makeOutput([...y,_,v],i.dtype),x=n.dataIdMap.get(b.dataId).id,S=new Uint8Array(new Int32Array(i.shape).buffer),C=new Uint8Array(new Int32Array(a.shape).buffer);return GJ(f,S,i.shape.length,p,C,a.shape.length,c,l,g,m,h,d||0,x),b}var JJ={kernelName:Vr,backendName:`wasm`,setupFunc:KJ,kernelFunc:qJ};J();function YJ(e,t){let n;function r(t){n=t.wasm.cwrap(e,null,[`number`,`number`,`number`])}function i(e){let{backend:r,inputs:{x:i}}=e,a=r.dataIdMap.get(i.dataId).id,o=r.makeOutput(i.shape,t||i.dtype),s=r.dataIdMap.get(o.dataId).id;return k(o.shape)===0||n(a,UJ[i.dtype],s),o}return{kernelName:e,backendName:`wasm`,setupFunc:r,kernelFunc:i}}J();var XJ=YJ(`Abs`);J();var ZJ=YJ(Ke);J();var QJ=YJ(qe);J();function $J(e,t,n){let r;function i(t){r=t.wasm.cwrap(e,null,[`number`,`array`,`number`,`number`,`array`,`number`,`number`,`number`])}function a(e){let{backend:t,inputs:i}=e,{a,b:o}=i,s=t.dataIdMap.get(a.dataId).id,c=t.dataIdMap.get(o.dataId).id,l=n??a.dtype,u=zd(a.shape,o.shape),d=t.makeOutput(u,l);if(k(u)===0)return d;let f=new Uint8Array(new Int32Array(a.shape).buffer),p=new Uint8Array(new Int32Array(o.shape).buffer),m=t.dataIdMap.get(d.dataId).id;return r(s,f,a.shape.length,c,p,o.shape.length,UJ[a.dtype],m),d}return{kernelName:e,backendName:`wasm`,setupFunc:i,kernelFunc:a}}J();var eY=$J(`Add`,!0);J();var tY;function nY(e){tY=e.wasm.cwrap(Je,null,[`array`,`number`,`number`,`number`])}function rY(e){let{inputs:t,backend:n}=e,r=n.makeOutput(t[0].shape,t[0].dtype);if(k(r.shape)===0)return r;let i=t.map(e=>n.dataIdMap.get(e.dataId).id),a=new Uint8Array(new Int32Array(i).buffer),o=n.dataIdMap.get(r.dataId).id;return tY(a,i.length,UJ[r.dtype],o),r}var iY={kernelName:Je,backendName:`wasm`,setupFunc:nY,kernelFunc:rY};J();function aY(e){let{inputs:{x:t},backend:n}=e;if(t.dtype===`string`)return $a(n.readSync(t.dataId),t.shape,t.dtype);let r=n.makeOutput(t.shape,t.dtype),i=n.typedArrayFromHeap(t);return n.typedArrayFromHeap(r).set(i),r}var oY={kernelName:Qt,backendName:`wasm`,kernelFunc:aY};J();var sY;function cY(e){sY=e.wasm.cwrap(Mr,null,[`number`,`array`,`number`,`number`,`number`,`array`,`number`])}function lY(e){let{inputs:t,backend:n,attrs:r}=e,[i,a]=dY(t.x.shape,r.perm),o=!0;for(let e=0;e<a.length;e++)a[e]!==e&&(o=!1);let s=uY(t.x.shape,r.perm),c={dataId:t.x.dataId,shape:i,dtype:t.x.dtype};if(o){let e=aY({inputs:t,backend:n});return e.shape=s,e}let l=n.makeOutput(s,c.dtype),u=n.dataIdMap.get(c.dataId).id,d=n.dataIdMap.get(l.dataId).id,f=new Uint8Array(new Int32Array(a).buffer),p=new Uint8Array(new Int32Array(c.shape).buffer);return sY(u,p,c.shape.length,UJ[c.dtype],d,f,a.length),l}function uY(e,t){let n=Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[t[r]];return n}function dY(e,t){let n=[],r=[];for(let i=0;i<e.length;++i)e[i]!==1&&n.push(e[i]),e[t[i]]!==1&&r.push(t[i]);for(let e=0;e<r.length;++e){let t=-1;for(let n=0;n<r.length;++n)r[n]>=e&&(t===-1||r[t]>r[n])&&(t=n);r[t]=e}return[n,r]}var fY={kernelName:Mr,backendName:`wasm`,kernelFunc:lY,setupFunc:cY};J();function pY(e,t,n){let r=e.shape,i=e.shape.length,a=j(t,r),o=a,s=bf(o,i),c=null,l=!1;if(s!=null){let t=Array(i);for(let e=0;e<t.length;e++)t[e]=r[s[e]];o=Sf(o.length,i),c=lY({inputs:{x:e},attrs:{perm:s},backend:n});let a=n.dataIdMap.get(e.dataId).id;n.dataIdMap.get(c.dataId).id!==a&&(l=!0)}return{transposed:c,originalAxes:a,axes:o,inputWasTransposed:l}}J();var mY;function hY(e){mY=e.wasm.cwrap(`All`,null,[`number, number, number`])}function gY(e){let{backend:t,inputs:n,attrs:r}=e,{axis:i,keepDims:a}=r,{x:o}=n,s=t.dataIdMap.get(o.dataId).id,c=o,{transposed:l,axes:u,originalAxes:d,inputWasTransposed:f}=pY(o,i,t);if(f){let e=t.dataIdMap.get(l.dataId).id;c=l,s=e}let p=c.shape.length;yf(`all`,u,p);let[m,h]=_f(c.shape,u),g=k(h),_=t.makeOutput(m,o.dtype);if(k(c.shape)!==0){let e=t.dataIdMap.get(_.dataId).id;mY(s,g,e)}return f&&t.disposeData(l.dataId),a&&(_.shape=vf(_.shape,d)),_}var _Y={kernelName:`All`,backendName:`wasm`,setupFunc:hY,kernelFunc:gY};J();var vY;function yY(e){vY=e.wasm.cwrap(`Any`,null,[`number, number, number`])}function bY(e){let{backend:t,inputs:n,attrs:r}=e,{axis:i,keepDims:a}=r,{x:o}=n,s=t.dataIdMap.get(o.dataId).id,c=o,{transposed:l,axes:u,originalAxes:d,inputWasTransposed:f}=pY(o,i,t);if(f){let e=t.dataIdMap.get(l.dataId).id;c=l,s=e}let p=c.shape.length;yf(`any`,u,p);let[m,h]=_f(c.shape,u),g=k(h),_=t.makeOutput(m,o.dtype);if(k(c.shape)!==0){let e=t.dataIdMap.get(_.dataId).id;vY(s,g,e)}return f&&t.disposeData(l.dataId),a&&(_.shape=vf(_.shape,d)),_}var xY={kernelName:`Any`,backendName:`wasm`,setupFunc:yY,kernelFunc:bY};J();function SY(e){let t;function n(n){t=n.wasm.cwrap(e,null,[`number`,`number`,`number`,`number`,`number`])}function r(e){let{backend:n,inputs:r,attrs:i}=e,{axis:a}=i,{x:o}=r,s=n.dataIdMap.get(o.dataId).id,c=s,l=o,{transposed:u,axes:d,inputWasTransposed:f}=pY(o,a,n);if(f){let e=n.dataIdMap.get(u.dataId).id;e!==s&&(l=u,c=e)}let p=l.shape.slice(0,-1),m=n.makeOutput(p,`int32`),h=n.dataIdMap.get(m.dataId).id,g=k(m.shape),_=l.shape[d[0]];return t(c,UJ[l.dtype],g,_,h),f&&n.disposeData(u.dataId),m}return{kernelName:e,backendName:`wasm`,setupFunc:n,kernelFunc:r}}J();var CY=SY(Ye);J();var wY=SY(F);J();var TY=YJ(Xe);J();var EY=YJ(Ze);J();var DY=YJ(Qe);J();var OY=$J(et,!1);J();var kY=YJ($e);J();var AY;function jY(e){AY=e.wasm.cwrap(tt,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function MY(e){let{inputs:t,attrs:n,backend:r}=e,i=t.x,a=r.dataIdMap.get(i.dataId).id,{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=n,u=rl(i.shape,o,s,1,c,l),d=u.filterHeight,f=u.filterWidth,p=u.padInfo.top,m=u.padInfo.right,h=u.padInfo.bottom,g=u.padInfo.left,_=u.strideHeight,v=u.strideWidth,y=u.inChannels;if(u.dataFormat!==`channelsLast`)throw Error(`wasm backend does not support dataFormat:'${u.dataFormat}'. Please use 'channelsLast'.`);if(u.dilationWidth!==1||u.dilationHeight!==1)throw Error(`was backend only supports average pooling with dilation = [1, 1], got [${u.dilationHeight}, ${u.dilationWidth}].`);let b=r.makeOutput(u.outShape,`float32`),x=r.dataIdMap.get(b.dataId).id;return AY(a,i.shape[0],i.shape[1],i.shape[2],d,f,p,m,h,g,_,v,y,x),b}var NY={kernelName:tt,backendName:`wasm`,setupFunc:jY,kernelFunc:MY};J();var PY;function FY(e){PY=e.wasm.cwrap(`AvgPool3D`,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function IY(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c,dataFormat:l}=r,u=il(i.shape,a,o,1,s,c,l),d=n.makeOutput(u.outShape,i.dtype);return PY(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(d.dataId).id,u.batchSize,u.inChannels,u.inDepth,u.inHeight,u.inWidth,u.outDepth,u.outHeight,u.outWidth,u.strideDepth,u.strideHeight,u.strideWidth,u.dilationDepth,u.dilationHeight,u.dilationWidth,u.effectiveFilterDepth,u.effectiveFilterHeight,u.effectiveFilterWidth,u.padInfo.front,u.padInfo.top,u.padInfo.left),d}var LY={kernelName:rt,backendName:`wasm`,setupFunc:FY,kernelFunc:IY};J();var RY;function zY(e){RY=e.wasm.cwrap(`AvgPool3DGrad`,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function BY(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=r,u=il(a.shape,o,s,1,c,l),d=n.makeOutput(a.shape,a.dtype);return RY(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(d.dataId).id,u.batchSize,u.inChannels,u.inDepth,u.inHeight,u.inWidth,u.outDepth,u.outHeight,u.outWidth,u.strideDepth,u.strideHeight,u.strideWidth,u.dilationDepth,u.dilationHeight,u.dilationWidth,u.effectiveFilterDepth,u.effectiveFilterHeight,u.effectiveFilterWidth,u.padInfo.front,u.padInfo.top,u.padInfo.left,u.filterDepth,u.filterHeight,u.filterWidth),d}var VY={kernelName:it,backendName:`wasm`,setupFunc:zY,kernelFunc:BY};J();var HY;function UY(e){HY=e.wasm.cwrap(`AvgPoolGrad`,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function WY(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,{filterSize:o,strides:s,pad:c}=r,l=rl(a.shape,o,s,1,c),u=n.makeOutput(a.shape,a.dtype);return HY(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(u.dataId).id,l.batchSize,l.inChannels,l.inHeight,l.inWidth,l.outHeight,l.outWidth,l.strideHeight,l.strideWidth,l.dilationHeight,l.dilationWidth,l.effectiveFilterHeight,l.effectiveFilterWidth,l.padInfo.top,l.padInfo.left,l.filterHeight,l.filterWidth),u}var GY={kernelName:nt,backendName:`wasm`,setupFunc:UY,kernelFunc:WY};J();function KY(e){let{inputs:t,attrs:n}=e,{x:r}=t,{shape:i}=n,a=k(r.shape),o=ce(i,a);return E(a===k(o),()=>`new shape: ${o}, old shape: ${r.shape}. New shape and old shape must have the same number of elements.`),e.backend.incRef(r.dataId),{dataId:r.dataId,shape:o,dtype:r.dtype}}var qY={kernelName:qn,backendName:`wasm`,kernelFunc:KY};J();var JY;function YY(e){JY=e.wasm.cwrap(at,null,[`number`,`array`,`number`,`number`,`array`,`number`,`number`,`number`,`number`])}function XY(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a}=t,{transposeA:o,transposeB:s}=r;if(i.dtype!==`float32`||a.dtype!==`float32`)throw Error(`BatchMatMul for non non-float32 tensors not yet supported.`);let c=i.shape.length,l=a.shape.length,u=o?i.shape[c-2]:i.shape[c-1],d=s?a.shape[l-1]:a.shape[l-2],f=o?i.shape[c-1]:i.shape[c-2],p=s?a.shape[l-2]:a.shape[l-1],m=i.shape.slice(0,-2),h=a.shape.slice(0,-2),g=k(m),_=k(h),v=zd(i.shape.slice(0,-2),a.shape.slice(0,-2)).concat([f,p]);E(u===d,()=>`Error in matMul: inner shapes (${u}) and (${d}) of Tensors with shapes ${i.shape} and ${a.shape} and transposeA=${o} and transposeB=${s} must match.`);let y=o?[g,u,f]:[g,f,u],b=s?[_,p,d]:[_,d,p],x=KY({inputs:{x:i},backend:n,attrs:{shape:y}}),S=KY({inputs:{x:a},backend:n,attrs:{shape:b}}),C=n.dataIdMap.get(x.dataId).id,w=n.dataIdMap.get(S.dataId).id,T=o?x.shape[2]:x.shape[1],D=s?S.shape[1]:S.shape[2],O=Math.max(g,_),ee=n.makeOutput([O,T,D],x.dtype),te=n.dataIdMap.get(ee.dataId).id,A=new Uint8Array(new Int32Array(x.shape).buffer),ne=new Uint8Array(new Int32Array(S.shape).buffer);return JY(C,A,x.shape.length,w,ne,S.shape.length,o,s,te),n.disposeData(x.dataId),n.disposeData(S.dataId),ee.shape=v,ee}var ZY={kernelName:at,backendName:`wasm`,setupFunc:YY,kernelFunc:XY};J();function QY(e){let{inputs:{x:t},attrs:{begin:n,size:r},backend:i}=e,[a,o]=IT(t,n,r),s=PT(t.shape,a,o),c=i.readSync(t.dataId),l=i.makeOutput(o,t.dtype),u=N(t.shape),d=i.dataIdMap.get(l.dataId);if(s){let e=FT(a,u);return t.dtype===`string`?d.stringBytes=c.slice(e,e+k(o)):i.typedArrayFromHeap(l).set(c.subarray(e,e+k(o))),l}if(t.dtype===`string`)return d.stringBytes=Ek(c,a,o,t.shape,t.dtype),l;let f=i.typedArrayFromHeap(l),p=t.shape.length;if(p===2)$Y(c,u[0],f,a,o);else if(p===3)eX(c,u[0],u[1],f,a,o);else if(p===4)tX(c,u[0],u[1],u[2],f,a,o);else{let e=Ek(c,a,o,t.shape,t.dtype);f.set(e)}return l}function $Y(e,t,n,r,i){let a=0,o=r[0],s=r[1],c=o+i[0];for(let r=o;r<c;r++){let o=r*t+s;n.set(e.subarray(o,o+i[1]),a),a+=i[1]}}function eX(e,t,n,r,i,a){let o=0,s=i[0],c=i[1],l=i[2],u=s+a[0],d=c+a[1];for(let i=s;i<u;i++)for(let s=c;s<d;s++){let c=i*t+s*n+l;r.set(e.subarray(c,c+a[2]),o),o+=a[2]}}function tX(e,t,n,r,i,a,o){let s=0,c=a[0],l=a[1],u=a[2],d=c+o[0],f=l+o[1],p=u+o[2],m=a[3];for(let a=c;a<d;a++)for(let c=l;c<f;c++)for(let l=u;l<p;l++){let u=a*t+c*n+l*r+m;i.set(e.subarray(u,u+o[3]),s),s+=o[3]}}var nX={kernelName:sr,backendName:`wasm`,kernelFunc:QY};J();function rX(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,crops:o}=r,s=a.reduce((e,t)=>e*t),c=fE(i.shape,a,s),l=pE(c.length,a.length),u=mE(i.shape,a,s),d=hE(o,a.length),f=gE(u,o,a.length),p=KY({inputs:{x:i},backend:n,attrs:{shape:c}}),m=lY({inputs:{x:p},backend:n,attrs:{perm:l}}),h=KY({inputs:{x:m},backend:n,attrs:{shape:u}}),g=QY({inputs:{x:h},backend:n,attrs:{begin:d,size:f}});return n.disposeData(p.dataId),n.disposeData(m.dataId),n.disposeData(h.dataId),g}var iX={kernelName:ot,backendName:`wasm`,kernelFunc:rX};J();var aX;function oX(e){aX=e.wasm.cwrap(st,null,[`number`,`number`,`boolean`,`number`,`number`,`number`])}function sX(e){let{backend:t,inputs:n,attrs:r}=e,{x:i,weights:a}=n,{size:o}=r,s=a.shape.reduce((e,t)=>e*t,1)!==0,c=i.shape.length===1?[o]:[i.shape[0],o],l=t.makeOutput(c,a.dtype);function u(e){return t.dataIdMap.get(e.dataId).id}return aX(u(i),o,s,u(a),UJ[a.dtype],u(l)),l}var cX={kernelName:st,backendName:`wasm`,setupFunc:oX,kernelFunc:sX};J();var lX=$J(ct,!0);J();function uX(e){let{inputs:t,backend:n}=e,{s0:r,s1:i}=t,a=n.typedArrayFromHeap(r),o=n.typedArrayFromHeap(i),s=zd(Array.from(a),Array.from(o));return n.makeOutput([s.length],`int32`,void 0,new Int32Array(s))}var dX={kernelName:ut,backendName:`wasm`,kernelFunc:uX};J();function fX(e){let{inputs:{x:t},attrs:{dtype:n},backend:r}=e,i=r.makeOutput(t.shape,n),a=r.typedArrayFromHeap(t);return r.typedArrayFromHeap(i).set(a),i}var pX={kernelName:dt,backendName:`wasm`,kernelFunc:fX};J();var mX=YJ(ft);J();var hX;function gX(e){hX=e.wasm.cwrap(pt,null,[`number`,`number`,`number`,`number`])}function _X(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{clipValueMin:a,clipValueMax:o}=r,s=n.dataIdMap.get(i.dataId).id,c=n.makeOutput(i.shape,i.dtype),l=n.dataIdMap.get(c.dataId).id;return hX(s,a,o,l),c}var vX={kernelName:pt,backendName:`wasm`,setupFunc:gX,kernelFunc:_X};J();function yX(e){let{inputs:t,backend:n}=e,r=j(e.attrs.axis,t[0].shape)[0];QT(t.map(e=>e.shape),r);let i=$T(t.map(e=>e.shape),r),a=t.filter(e=>k(e.shape)>0);if(a.length===1)return aY({inputs:{x:a[0]},backend:n});let o=n.makeOutput(i,t[0].dtype);if(k(i)===0)return o;if(a[0].dtype===`string`){let e=a.map(e=>{let t=[-1,k(e.shape.slice(r))];return KY({inputs:{x:e},backend:n,attrs:{shape:t}})}),s=e.map(e=>({vals:n.readSync(e.dataId),shape:e.shape}));i=$T(e.map(e=>e.shape),1);let c=e[0].shape[0]===1,l=tO(s,i,t[0].dtype,c);o.shape=$T(a.map(e=>e.shape),r);let u=n.dataIdMap.get(o.dataId);return u.stringBytes=vD(l),e.forEach(e=>n.disposeData(e.dataId)),o}let s=k(a[0].shape.slice(0,r)),c=0,l=a.map(e=>{let t=k(e.shape.slice(r));return c+=t,t}),u=a.map(e=>n.typedArrayFromHeap(e)),d=n.typedArrayFromHeap(o);for(let e=0;e<s;e++){let t=e*c;for(let n=0;n<u.length;n++){let r=l[n],i=e*r,a=u[n].subarray(i,i+r);d.set(a,t),t+=r}}return o}var bX={kernelName:gt,backendName:`wasm`,kernelFunc:yX};J();var xX;function SX(e){xX=e.wasm.cwrap(_t,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function CX(e){let{inputs:t,attrs:n,backend:r}=e,{x:i,filter:a}=t,o=r.dataIdMap.get(i.dataId).id,s=r.dataIdMap.get(a.dataId).id,{strides:c,dilations:l,pad:u,dimRoundingMode:d,dataFormat:f}=n,p=yl(f),m=al(i.shape,a.shape,c,l,u,d,!1,p),h=m.filterHeight,g=m.filterWidth,_=m.padInfo.top,v=m.padInfo.right,y=m.padInfo.bottom,b=m.padInfo.left,x=m.dilationHeight,S=m.dilationWidth,C=m.strideHeight,w=m.strideWidth,T=m.inChannels,E=m.outChannels,D=+(m.padInfo.type===`SAME`);if(m.dataFormat!==`channelsLast`)throw Error(`wasm backend Conv2D does not support dataFormat:'${m.dataFormat}'. Please use 'channelsLast'.`);let O=r.makeOutput(m.outShape,`float32`),k=r.dataIdMap.get(O.dataId).id;return xX(o,i.shape[0],i.shape[1],i.shape[2],s,h,g,_,v,y,b,D,x,S,C,w,T,E,k),O}var wX={kernelName:_t,backendName:`wasm`,setupFunc:SX,kernelFunc:CX};J();var TX;function EX(e){TX=e.wasm.cwrap(yt,null,`number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number.number`.split(`.`))}function DX(e){let{backend:t,inputs:n,attrs:r}=e,{dy:i,filter:a}=n,{strides:o,pad:s,dataFormat:c,dimRoundingMode:l,inputShape:u}=r,d=yl(c),f=al(u,a.shape,o,1,s,l,!1,d),{batchSize:p,filterHeight:m,filterWidth:h,inChannels:g,inHeight:_,inWidth:v,outChannels:y,outHeight:b,outWidth:x,strideHeight:S,strideWidth:C}=f,w=m-1-f.padInfo.top,T=h-1-f.padInfo.left,E=f.dataFormat===`channelsLast`,D=N(f.inShape),O=N(i.shape),[k,ee,te]=N(a.shape),A=D[0],ne=E?D[1]:D[2],re=E?D[2]:1,ie=E?1:D[1],ae=O[0],oe=E?O[1]:O[2],se=E?O[2]:1,ce=E?1:O[1],j=t.makeOutput(f.inShape,`float32`),le=t.dataIdMap.get(j.dataId).id,M=t.dataIdMap.get(i.dataId).id,ue=t.dataIdMap.get(a.dataId).id;return TX(M,ue,p,m,h,_,v,g,b,x,y,S,C,w,T,k,ee,te,A,ne,re,ie,ae,oe,se,ce,le),j}var OX={kernelName:yt,backendName:`wasm`,setupFunc:EX,kernelFunc:DX};J();var kX;function AX(e){kX=e.wasm.cwrap(bt,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function jX(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c}=r;if(i.dtype!==`float32`)throw Error(`Tensor x must have dtype float32, got ${i.dtype}`);if(a.dtype!==`float32`)throw Error(`Tensor filter must have dtype float32, got ${a.dtype}`);let l=ol(i.shape,a.shape,o,c,s),u=n.makeOutput(l.outShape,i.dtype);return kX(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(u.dataId).id,l.batchSize,l.inDepth,l.inHeight,l.inWidth,l.inChannels,l.outDepth,l.outHeight,l.outWidth,l.outChannels,l.strideDepth,l.strideHeight,l.strideWidth,l.dilationDepth,l.dilationHeight,l.dilationWidth,l.filterDepth,l.filterHeight,l.filterWidth,l.padInfo.front,l.padInfo.top,l.padInfo.left),u}var MX={kernelName:bt,backendName:`wasm`,setupFunc:AX,kernelFunc:jX};J();var NX;function PX(e){NX=e.wasm.cwrap(xt,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function FX(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,filterShape:c}=r;if(i.dtype!==`float32`)throw Error(`Tensor dy must have dtype float32, got ${i.dtype}`);if(a.dtype!==`float32`)throw Error(`Tensor filter must have dtype float32, got ${a.dtype}`);let l=ol(i.shape,c,o,1,s),u=n.makeOutput(l.filterShape,a.dtype);return NX(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(u.dataId).id,l.batchSize,l.inDepth,l.inHeight,l.inWidth,l.inChannels,l.outDepth,l.outHeight,l.outWidth,l.outChannels,l.strideDepth,l.strideHeight,l.strideWidth,l.dilationDepth,l.dilationHeight,l.dilationWidth,l.filterDepth,l.filterHeight,l.filterWidth,l.padInfo.front,l.padInfo.top,l.padInfo.left),u}var IX={kernelName:xt,backendName:`wasm`,setupFunc:PX,kernelFunc:FX};J();var LX;function RX(e){LX=e.wasm.cwrap(St,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function zX(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{pad:o,strides:s,inputShape:c}=r;if(i.dtype!==`float32`)throw Error(`Tensor dy must have dtype float32, got ${i.dtype}`);if(a.dtype!==`float32`)throw Error(`Tensor filter must have dtype float32, got ${a.dtype}`);let l=ol(c,a.shape,s,1,o),u=n.makeOutput(l.inShape,i.dtype);return LX(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(u.dataId).id,l.batchSize,l.inDepth,l.inHeight,l.inWidth,l.inChannels,l.outDepth,l.outHeight,l.outWidth,l.outChannels,l.strideDepth,l.strideHeight,l.strideWidth,l.dilationDepth,l.dilationHeight,l.dilationWidth,l.filterDepth,l.filterHeight,l.filterWidth,l.padInfo.front,l.padInfo.top,l.padInfo.left),u}var BX={kernelName:St,backendName:`wasm`,setupFunc:RX,kernelFunc:zX};J();var VX=YJ(`Cos`);J();var HX=YJ(Ct);J();var UX;(function(e){e[e.bilinear=0]=`bilinear`,e[e.nearest=1]=`nearest`})(UX||={});var WX;function GX(e){WX=e.wasm.cwrap(Et,null,[`number`,`number`,`number`,`number`,`array`,`number`,`number`,`number`,`number`,`number`])}function KX(e){let{backend:t,inputs:n,attrs:r}=e,{method:i,extrapolationValue:a,cropSize:o}=r,{image:s,boxes:c,boxInd:l}=n,u=c.shape[0],[d,f]=o,p=[u,d,f,s.shape[3]],m=t.dataIdMap.get(s.dataId),h;s.dtype!==`float32`&&(h=fX({backend:t,inputs:{x:s},attrs:{dtype:`float32`}}),m=t.dataIdMap.get(h.dataId));let g=m.id,_=t.dataIdMap.get(c.dataId).id,v=t.dataIdMap.get(l.dataId).id,y=t.makeOutput(p,`float32`),b=t.dataIdMap.get(y.dataId).id,x=new Uint8Array(new Int32Array(s.shape).buffer);return WX(g,_,v,u,x,d,f,UX[i],a,b),h!=null&&t.disposeData(h.dataId),y}var qX={kernelName:Et,backendName:`wasm`,setupFunc:GX,kernelFunc:KX};J();var JX;function YX(e){JX=e.wasm.cwrap(wt,null,[`number`,`number`,`number`,`number`,`number`,`number`])}function XX(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r,c=i.shape.length;E(i.dtype===`float32`||i.dtype===`int32`,()=>`cumprod does not support ${i.dtype} tensors in the WASM backend`);let l=bf([a],c),u=i;l!==null&&(u=lY({inputs:{x:i},attrs:{perm:l},backend:n}));let d=Sf(1,c)[0];yf(`cumprod`,[d],c);let f=n.makeOutput(u.shape,u.dtype),p=u.shape[d],m=n.dataIdMap.get(u.dataId).id,h=n.dataIdMap.get(f.dataId).id;JX(m,+!!o,+!!s,p,h,UJ[i.dtype]);let g=f;if(l!==null){let e=xf(l);g=lY({inputs:{x:f},attrs:{perm:e},backend:n}),n.disposeData(u.dataId),n.disposeData(f.dataId)}return g}var ZX={kernelName:wt,backendName:`wasm`,setupFunc:YX,kernelFunc:XX};J();var QX;function $X(e){QX=e.wasm.cwrap(Tt,null,[`number`,`number`,`number`,`number`,`number`,`number`])}function eZ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r,c=i.shape.length;E(i.dtype===`float32`||i.dtype===`int32`,()=>`cumsum does not support ${i.dtype} tensors in the WASM backend`);let l=bf([a],c),u=i;l!==null&&(u=lY({inputs:{x:i},attrs:{perm:l},backend:n}));let d=Sf(1,c)[0];yf(`cumsum`,[d],c);let f=n.makeOutput(u.shape,u.dtype),p=u.shape[d],m=n.dataIdMap.get(u.dataId).id,h=n.dataIdMap.get(f.dataId).id;QX(m,+!!o,+!!s,p,h,UJ[i.dtype]);let g=f;if(l!==null){let e=xf(l);g=lY({inputs:{x:f},attrs:{perm:e},backend:n}),n.disposeData(u.dataId),n.disposeData(f.dataId)}return g}var tZ={kernelName:Tt,backendName:`wasm`,setupFunc:$X,kernelFunc:eZ};J();var nZ;function rZ(e){nZ=e.wasm.cwrap(`DenseBincount`,null,[`number`,`array`,`number`,`number`,`boolean`,`number`,`number`,`boolean`,`number`])}function iZ(e){let{backend:t,inputs:n,attrs:r}=e,{x:i,weights:a}=n,{size:o,binaryOutput:s}=r,c=a.shape.reduce((e,t)=>e*t,1)!==0,l=i.shape.length===1?[o]:[i.shape[0],o],u=t.makeOutput(l,a.dtype);function d(e){return t.dataIdMap.get(e.dataId).id}return nZ(d(i),new Uint8Array(new Int32Array(i.shape).buffer),i.shape.length,o,c,d(a),UJ[a.dtype],s,d(u)),u}var aZ={kernelName:Dt,backendName:`wasm`,setupFunc:rZ,kernelFunc:iZ};J();var oZ;function sZ(e){oZ=e.wasm.cwrap(Ot,null,[`number`,`number`,`number`,`array`,`number`,`array`,`array`,`number`,`number`])}function cZ(e){let{backend:t,inputs:n,attrs:r}=e,{x:i}=n,{blockSize:a,dataFormat:o}=r,s=i.shape[0],c=o===`NHWC`?i.shape[1]:i.shape[2],l=o===`NHWC`?i.shape[2]:i.shape[3],u=o===`NHWC`?i.shape[3]:i.shape[1],d=c*a,f=l*a,p=u/(a*a),m=o===`NHWC`?[s,d,f,p]:[s,p,d,f],h=t.makeOutput(m,`float32`),g=t.dataIdMap.get(i.dataId).id,_=new Uint8Array(new Int32Array(N(i.shape)).buffer),v=new Uint8Array(new Int32Array(m).buffer),y=new Uint8Array(new Int32Array(N(m)).buffer),b=t.dataIdMap.get(h.dataId).id;return oZ(g,a,+(o===`NHWC`),_,i.shape.length-1,v,y,m.length,b),h}var lZ={kernelName:Ot,backendName:`wasm`,setupFunc:sZ,kernelFunc:cZ};J();var uZ;function dZ(e){uZ=e.wasm.cwrap(kt,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function fZ(e){let{inputs:t,attrs:n,backend:r}=e,{x:i,filter:a}=t,o=r.dataIdMap.get(i.dataId).id,s=r.dataIdMap.get(a.dataId).id,{strides:c,dilations:l,pad:u,dimRoundingMode:d}=n,f=l??[1,1],p=al(i.shape,a.shape,c,f,u,d,!0),m=p.filterHeight,h=p.filterWidth,g=p.padInfo.top,_=p.padInfo.right,v=p.padInfo.bottom,y=p.padInfo.left,b=p.dilationHeight,x=p.dilationWidth,S=p.strideHeight,C=p.strideWidth,w=p.inChannels,T=p.outChannels,E=+(p.padInfo.type===`SAME`);if(p.dataFormat!==`channelsLast`)throw Error(`wasm backend DepthwiseConv2dNative does not support dataFormat:'${p.dataFormat}'. Please use 'channelsLast'.`);let D=r.makeOutput(p.outShape,`float32`),O=r.dataIdMap.get(D.dataId).id;return uZ(o,i.shape[0],i.shape[1],i.shape[2],s,m,h,g,_,v,y,E,b,x,S,C,w,T,O),D}var pZ={kernelName:kt,backendName:`wasm`,setupFunc:dZ,kernelFunc:fZ};J();var mZ;function hZ(e){mZ=e.wasm.cwrap(`Diag`,null,[`number`,`number`,`number`,`number`])}function gZ(e){let{inputs:t,backend:n}=e,{x:r}=t,i=k(r.shape),a=n.makeOutput([...r.shape,...r.shape],r.dtype);return mZ(n.dataIdMap.get(r.dataId).id,UJ[r.dtype],i,n.dataIdMap.get(a.dataId).id),a}var _Z={kernelName:Mt,backendName:`wasm`,setupFunc:hZ,kernelFunc:gZ};J();var vZ;function yZ(e){vZ=e.wasm.cwrap(Nt,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function bZ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c}=r;if(i.dtype!==a.dtype)throw Error(`Dilation2D error: x must have the same dtype as filter. Got ${i.dtype} and ${a.dtype}`);let l=nl(i.shape,a.shape,o,s,`NHWC`,c),u=n.makeOutput(l.outShape,i.dtype);return vZ(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(u.dataId).id,UJ[i.dtype],l.batchSize,l.inChannels,l.inHeight,l.inWidth,l.outHeight,l.outWidth,l.strideHeight,l.strideWidth,l.dilationHeight,l.dilationWidth,l.filterHeight,l.filterWidth,l.padInfo.top,l.padInfo.left),u}var xZ={kernelName:Nt,backendName:`wasm`,setupFunc:yZ,kernelFunc:bZ};J();var SZ;function CZ(e){SZ=e.wasm.cwrap(Ft,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function wZ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,dy:o}=t,{strides:s,pad:c,dilations:l}=r;if(i.dtype!==a.dtype||i.dtype!==o.dtype)throw Error(`Dilation2DBackpropFilter error: x must have the same dtype as filter and dy. Got ${i.dtype}, ${a.dtype}, and ${o.dtype}`);let u=nl(i.shape,a.shape,s,c,`NHWC`,l),d=n.makeOutput(a.shape,a.dtype);return SZ(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(o.dataId).id,n.dataIdMap.get(d.dataId).id,UJ[i.dtype],u.batchSize,u.inChannels,u.inHeight,u.inWidth,u.outHeight,u.outWidth,u.strideHeight,u.strideWidth,u.dilationHeight,u.dilationWidth,u.filterHeight,u.filterWidth,u.padInfo.top,u.padInfo.left),d}var TZ={kernelName:Ft,backendName:`wasm`,setupFunc:CZ,kernelFunc:wZ};J();var EZ;function DZ(e){EZ=e.wasm.cwrap(Pt,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function OZ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,dy:o}=t,{strides:s,pad:c,dilations:l}=r;if(i.dtype!==a.dtype||i.dtype!==o.dtype)throw Error(`Dilation2DBackpropInput error: x must have the same dtype as filter and dy. Got ${i.dtype}, ${a.dtype}, and ${o.dtype}`);let u=nl(i.shape,a.shape,s,c,`NHWC`,l),d=n.makeOutput(i.shape,i.dtype);return EZ(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(o.dataId).id,n.dataIdMap.get(d.dataId).id,UJ[i.dtype],u.batchSize,u.inChannels,u.inHeight,u.inWidth,u.outHeight,u.outWidth,u.strideHeight,u.strideWidth,u.dilationHeight,u.dilationWidth,u.filterHeight,u.filterWidth,u.padInfo.top,u.padInfo.left),d}var kZ={kernelName:Pt,backendName:`wasm`,setupFunc:DZ,kernelFunc:OZ};J();var AZ=YJ(`Elu`);J();var jZ;function MZ(e){jZ=e.wasm.cwrap(zt,null,[`number`,`number`,`number`])}function NZ(e){let{inputs:t,backend:n}=e,{dy:r,y:i}=t,a=n.makeOutput(i.shape,`float32`),o=e=>n.dataIdMap.get(e.dataId).id;return jZ(o(i),o(r),o(a)),a}var PZ={kernelName:zt,backendName:`wasm`,setupFunc:MZ,kernelFunc:NZ};J();var FZ=$J(Bt,!1,`bool`);J();var IZ=YJ(`Erf`);J();var LZ=YJ(`Exp`,`float32`);J();function RZ(e){let{inputs:t,attrs:n,backend:r}=e,{input:i}=t,{dim:a}=n,o=i.shape.length,s=i.shape.slice(),c=a;return a<0&&(E(-(o+1)<=a,()=>`Axis must be in the interval [${-(o+1)}, ${o}]`),c=o+a+1),s.splice(c,0,1),KY({inputs:{x:i},backend:r,attrs:{shape:s}})}var zZ={kernelName:Vt,backendName:`wasm`,kernelFunc:RZ};J();var BZ=YJ(Ht,`float32`);J();function VZ(e){let{attrs:{shape:t,value:n},backend:r}=e,{attrs:{dtype:i}}=e;i||=ye(n);let a=r.makeOutput(t,i);return r.typedArrayFromHeap(a).fill(n),a}var HZ={kernelName:Ut,backendName:`wasm`,kernelFunc:VZ};J();var UZ;function WZ(e){UZ=e.wasm.cwrap(Wt,null,[`number`,`number`,`number`,`number`,`number`,`number`])}function GZ(e){let{inputs:t,backend:n}=e,{image:r}=t,i=n.makeOutput(r.shape,r.dtype),a=n.dataIdMap.get(r.dataId).id,o=n.dataIdMap.get(i.dataId).id,[s,c,l,u]=r.shape;return UZ(a,s,c,l,u,o),i}var KZ={kernelName:Wt,backendName:`wasm`,kernelFunc:GZ,setupFunc:WZ};J();var qZ=YJ(Gt);J();var JZ=$J(Kt,!1);J();var YZ;function XZ(e){YZ=e.wasm.cwrap(qt,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function ZZ(e){let{backend:t,inputs:n,attrs:r}=e,{varianceEpsilon:i}=r,{x:a,mean:o,variance:s,offset:c,scale:l}=n,u=t.dataIdMap.get(a.dataId).id,d=t.dataIdMap.get(o.dataId).id,f=t.dataIdMap.get(s.dataId).id,p=c==null?0:t.dataIdMap.get(c.dataId).id,m=l==null?0:t.dataIdMap.get(l.dataId).id,h=t.makeOutput(a.shape,a.dtype);if(k(a.shape)===0)return h;let g=t.dataIdMap.get(h.dataId).id;return YZ(u,d,f,p,m,i,g),h}var QZ={kernelName:qt,backendName:`wasm`,setupFunc:XZ,kernelFunc:ZZ};J();var $Z;function eQ(e){$Z=e.wasm.cwrap(Hr,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function tQ(e){let{inputs:t,attrs:n,backend:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dilations:u,dataFormat:d,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=n,h=al(i.shape,a.shape,c,u,l,f),g=WJ[p];if(g==null)throw Error(`${p} activation not yet supported for FusedConv2D in the wasm backend.`);let _=r.dataIdMap.get(i.dataId).id,v=r.dataIdMap.get(a.dataId).id,y=h.outChannels,b=0;if(o!=null){let e=r.dataIdMap.get(o.dataId);if(e.shape.length!==1)throw Error(`FusedConv2D only supports rank-1 bias but got rank ${e.shape.length}.`);if(e.shape[0]!==y)throw Error(`FusedConv2D bias shape (${e.shape}) does not match the number of output channels (${y})`);b=e.id}let x=h.filterHeight,S=h.filterWidth,C=h.padInfo.top,w=h.padInfo.right,T=h.padInfo.bottom,E=h.padInfo.left,D=h.dilationHeight,O=h.dilationWidth,k=h.strideHeight,ee=h.strideWidth,te=h.inChannels,A=+(h.padInfo.type===`SAME`),ne=h.batchSize,re=h.inHeight,ie=h.inWidth;if(d!==`NHWC`)throw Error(`wasm backend FusedConv2D does not support dataFormat:'${d}'. Please use 'NHWC'.`);let ae=r.makeOutput(h.outShape,`float32`),oe=r.dataIdMap.get(ae.dataId).id,se=s==null?0:r.dataIdMap.get(s.dataId).id;return $Z(_,ne,re,ie,v,x,S,b,C,w,T,E,A,D,O,k,ee,te,y,g,se,m||0,oe),ae}var nQ={kernelName:Hr,backendName:`wasm`,setupFunc:eQ,kernelFunc:tQ};J();var rQ;function iQ(e){rQ=e.wasm.cwrap(Ur,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function aQ(e){let{inputs:t,attrs:n,backend:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dilations:u,dataFormat:d,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=n,h=al(i.shape,a.shape,c,u,l,f,!0),g=WJ[p];if(g==null)throw Error(`${p} activation not yet supported for FusedDepthwiseConv2D in the wasm backend.`);let _=r.dataIdMap.get(i.dataId).id,v=r.dataIdMap.get(a.dataId).id,y=h.outChannels,b=0;if(o!=null){let e=r.dataIdMap.get(o.dataId);if(e.shape.length!==1)throw Error(`FusedDepthwiseConv2D only supports rank-1 bias but got rank ${e.shape.length}.`);if(e.shape[0]!==y)throw Error(`FusedDepthwiseConv2D bias shape (${e.shape}) does not match the number of output channels (${y})`);b=e.id}let x=h.filterHeight,S=h.filterWidth,C=h.padInfo.top,w=h.padInfo.right,T=h.padInfo.bottom,E=h.padInfo.left,D=h.dilationHeight,O=h.dilationWidth,k=h.strideHeight,ee=h.strideWidth,te=h.inChannels,A=+(h.padInfo.type===`SAME`),ne=h.batchSize,re=h.inHeight,ie=h.inWidth;if(d!==`NHWC`)throw Error(`wasm backend FusedDepthwiseConv2D does not support dataFormat:'${d}'. Please use 'NHWC'.`);let ae=r.makeOutput(h.outShape,`float32`),oe=r.dataIdMap.get(ae.dataId).id,se=s==null?0:r.dataIdMap.get(s.dataId).id;return rQ(_,ne,re,ie,v,x,S,b,C,w,T,E,A,D,O,k,ee,te,y,g,se,m||0,oe),ae}var oQ={kernelName:Ur,backendName:`wasm`,setupFunc:iQ,kernelFunc:aQ};J();var sQ;function cQ(e){sQ=e.wasm.cwrap(Yt,null,[`number`,`number`,`number`,`number`,`number`,`number`,`array`,`number`])}function lQ(e){let{backend:t,inputs:n}=e,{params:r,indices:i}=n,[a,o,s,c]=yT(r,i),l=t.makeOutput(a,r.dtype);if(o===0)return l;let u=i.shape,d=u[u.length-1],f=t.dataIdMap.get(r.dataId).id,p=t.dataIdMap.get(i.dataId).id,m=new Uint8Array(new Int32Array(c).buffer),h=t.dataIdMap.get(l.dataId).id;return sQ(f,UJ[r.dtype],p,o,d,s,m,h),l}var uQ={kernelName:Yt,backendName:`wasm`,setupFunc:cQ,kernelFunc:lQ};J();var dQ;function fQ(e){dQ=e.wasm.cwrap(`Gather`,null,[`number`,`number`,`array`,`number`,`number`,`number`,`array`,`number`])}function pQ(e){let{backend:t,inputs:n,attrs:r}=e,{x:i,indices:a}=n,{axis:o,batchDims:s}=r,c=j(o,i.shape)[0],l=t.readSync(a.dataId),u=i.shape[c];for(let e=0;e<l.length;++e){let t=l[e];E(t<=u-1&&t>=0,()=>`GatherV2: the index value ${t} is not in [0, ${u-1}]`)}let d=mD(i,a,c,s),f=KY({inputs:{x:i},attrs:{shape:[d.batchSize,d.outerSize,d.dimSize,d.sliceSize]},backend:t}),p=k(a.shape),m=KY({inputs:{x:a},attrs:{shape:[d.batchSize,p/d.batchSize]},backend:t}),h=[d.batchSize,d.outerSize,p/d.batchSize,d.sliceSize],g=t.makeOutput(h,i.dtype);if(k(i.shape)===0)return g;let _=f.shape.length-1,v=t.dataIdMap.get(f.dataId).id,y=t.dataIdMap.get(m.dataId).id,b=t.dataIdMap.get(g.dataId).id,x=new Uint8Array(new Int32Array(N(f.shape)).buffer),S=new Uint8Array(new Int32Array(N(h)).buffer);return dQ(v,UJ[i.dtype],x,_,y,d.batchSize,S,b),t.disposeData(f.dataId),t.disposeData(m.dataId),g.shape=d.outputShape,g}var mQ={kernelName:Jt,backendName:`wasm`,setupFunc:fQ,kernelFunc:pQ};J();var hQ=$J(Xt,!1,`bool`);J();var gQ=$J(Zt,!1,`bool`);J();var _Q=YJ(tn,`bool`);J();var vQ=YJ(nn,`bool`);J();var yQ=YJ(rn,`bool`);J();var bQ;function xQ(e){bQ=e.wasm.cwrap(an,null,[`number`,`number`,`number`,`number`])}function SQ(e){let{inputs:{x:t},attrs:{alpha:n},backend:r}=e,i=r.dataIdMap.get(t.dataId).id,a=r.makeOutput(t.shape,`float32`);if(k(t.shape)!==0){let e=r.dataIdMap.get(a.dataId).id;bQ(i,UJ[t.dtype],n,e)}return a}var CQ={kernelName:an,backendName:`wasm`,setupFunc:xQ,kernelFunc:SQ};J();var wQ=$J(on,!1,`bool`);J();var TQ=$J(sn,!1,`bool`);J();var EQ;function DQ(e){EQ=e.wasm.cwrap(cn,null,[`number`,`number`,`number`,`number`])}function OQ(e){let{attrs:t,backend:n}=e,{start:r,stop:i,num:a}=t,o=Math.floor(a),s=n.makeOutput([o],`float32`);return EQ(n.dataIdMap.get(s.dataId).id,r,i,o),s}var kQ={kernelName:cn,backendName:`wasm`,setupFunc:DQ,kernelFunc:OQ};J();var AQ=YJ(`Log`);J();var jQ=YJ(ln);J();var MQ=$J(un,!1,`bool`);J();var NQ=YJ(dn);J();var PQ=$J(fn,!1,`bool`);J();var FQ=$J(pn,!1,`bool`);J();var IQ;function LQ(e){IQ=e.wasm.cwrap(`LRN`,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function RQ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{depthRadius:a,bias:o,alpha:s,beta:c}=r;if(i.dtype!==`float32`)throw Error(`LRN error: x must have dtype float32`);let l=n.makeOutput(i.shape,i.dtype);return IQ(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(l.dataId).id,i.shape[3],a,o,s,c),l}var zQ={kernelName:`LRN`,backendName:`wasm`,setupFunc:LQ,kernelFunc:RQ};J();var BQ;function VQ(e){BQ=e.wasm.cwrap(gn,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function HQ(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,y:a,dy:o}=t,{depthRadius:s,bias:c,alpha:l,beta:u}=r;if(i.dtype!==`float32`||a.dtype!==`float32`||o.dtype!==`float32`)throw Error(`LRNGrad error: x, y, and dy must have dtype float32`);let d=n.makeOutput(i.shape,i.dtype);return BQ(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(o.dataId).id,n.dataIdMap.get(d.dataId).id,o.shape[3],s,c,l,u),d}var UQ={kernelName:gn,backendName:`wasm`,setupFunc:VQ,kernelFunc:HQ};J();var WQ;function GQ(e){WQ=e.wasm.cwrap(`Max`,null,[`number`,`number`,`number`,`number`])}function KQ(e){let{backend:t,inputs:n,attrs:r}=e,{reductionIndices:i,keepDims:a}=r,{x:o}=n,s=t.dataIdMap.get(o.dataId).id,c=o,{transposed:l,axes:u,originalAxes:d,inputWasTransposed:f}=pY(o,i,t);if(f){let e=t.dataIdMap.get(l.dataId).id;c=l,s=e}let p=c.shape.length;yf(`max`,u,p);let[m,h]=_f(c.shape,u),g=k(h),_=t.makeOutput(m,o.dtype);if(k(c.shape)!==0){let e=t.dataIdMap.get(_.dataId).id;WQ(s,UJ[o.dtype],g,e)}return f&&t.disposeData(l.dataId),a&&(_.shape=vf(_.shape,d)),_}var qQ={kernelName:`Max`,backendName:`wasm`,setupFunc:GQ,kernelFunc:KQ};J();var JQ=$J(vn,!1);J();var YQ;function XQ(e){YQ=e.wasm.cwrap(yn,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function ZQ(e){let{inputs:t,attrs:n,backend:r}=e,i=t.x,a=r.dataIdMap.get(i.dataId).id;E(i.dtype===`float32`,()=>`Error in MaxPool: only float32 input is supported. Got ${i.dtype}.`);let{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=n,u=rl(i.shape,o,s,1,c,l),d=u.filterHeight,f=u.filterWidth,p=u.padInfo.top,m=u.padInfo.right,h=u.padInfo.bottom,g=u.padInfo.left,_=u.dilationHeight,v=u.dilationWidth,y=u.strideHeight,b=u.strideWidth,x=u.inChannels,S=u.outChannels;if(u.dataFormat!==`channelsLast`)throw Error(`wasm backend does not support dataFormat:'${u.dataFormat}'. Please use 'channelsLast'.`);let C=r.makeOutput(u.outShape,`float32`),w=r.dataIdMap.get(C.dataId).id;return YQ(a,i.shape[0],i.shape[1],i.shape[2],d,f,p,m,h,g,_,v,y,b,x,S,w),C}var QQ={kernelName:yn,backendName:`wasm`,setupFunc:XQ,kernelFunc:ZQ};J();var $Q;function e$(e){$Q=e.wasm.cwrap(`MaxPool3D`,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function t$(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c,dataFormat:l}=r,u=il(i.shape,a,o,1,s,c,l),d=n.makeOutput(u.outShape,i.dtype);return $Q(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(d.dataId).id,u.batchSize,u.inChannels,u.inDepth,u.inHeight,u.inWidth,u.outDepth,u.outHeight,u.outWidth,u.strideDepth,u.strideHeight,u.strideWidth,u.dilationDepth,u.dilationHeight,u.dilationWidth,u.effectiveFilterDepth,u.effectiveFilterHeight,u.effectiveFilterWidth,u.padInfo.front,u.padInfo.top,u.padInfo.left),d}var n$={kernelName:xn,backendName:`wasm`,setupFunc:e$,kernelFunc:t$};J();var r$;function i$(e){r$=e.wasm.cwrap(`MaxPool3DGrad`,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function a$(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=r,u=il(a.shape,o,s,1,c,l),d=n.makeOutput(a.shape,a.dtype);return r$(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(d.dataId).id,u.batchSize,u.inChannels,u.inDepth,u.inHeight,u.inWidth,u.outDepth,u.outHeight,u.outWidth,u.strideDepth,u.strideHeight,u.strideWidth,u.dilationDepth,u.dilationHeight,u.dilationWidth,u.effectiveFilterDepth,u.effectiveFilterHeight,u.effectiveFilterWidth,u.padInfo.front,u.padInfo.top,u.padInfo.left),d}var o$={kernelName:Sn,backendName:`wasm`,setupFunc:i$,kernelFunc:a$};J();var s$;function c$(e){s$=e.wasm.cwrap(`MaxPoolGrad`,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function l$(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=r,u=rl(a.shape,o,s,1,c,l),d=n.makeOutput(a.shape,a.dtype);return s$(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(d.dataId).id,u.batchSize,u.inChannels,u.inHeight,u.inWidth,u.outHeight,u.outWidth,u.strideHeight,u.strideWidth,u.dilationHeight,u.dilationWidth,u.effectiveFilterHeight,u.effectiveFilterWidth,u.padInfo.top,u.padInfo.left),d}var u$={kernelName:bn,backendName:`wasm`,setupFunc:c$,kernelFunc:l$};J();var d$;function f$(e){d$=e.wasm.cwrap(`MaxPoolWithArgmax`,null,[`number`,`number`,`number`,`number`,`boolean`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function p$(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,includeBatchInIndex:c}=r;E(i.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${i.shape.length}.`);let l=[1,1];E(_l(o,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${o} and dilations '${l}'`);let u=rl(i.shape,a,o,[1,1],s),d=n.makeOutput(u.outShape,i.dtype),f=n.makeOutput(u.outShape,`int32`);return d$(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(d.dataId).id,n.dataIdMap.get(f.dataId).id,UJ[i.dtype],c,u.batchSize,u.inChannels,u.inHeight,u.inWidth,u.outHeight,u.outWidth,u.strideHeight,u.strideWidth,u.dilationHeight,u.dilationWidth,u.effectiveFilterHeight,u.effectiveFilterWidth,u.padInfo.top,u.padInfo.left),[d,f]}var m$={kernelName:Cn,backendName:`wasm`,setupFunc:f$,kernelFunc:p$};J();var h$;function g$(e){h$=e.wasm.cwrap(wn,null,[`number, number, number`])}function _$(e){let{backend:t,inputs:n,attrs:r}=e,{axis:i,keepDims:a}=r,{x:o}=n,s=t.dataIdMap.get(o.dataId).id,c=s,l=o,{transposed:u,axes:d,originalAxes:f,inputWasTransposed:p}=pY(o,i,t),m=d;if(p){let e=t.dataIdMap.get(u.dataId).id;e!==s&&(l=u,c=e,m=Sf(m.length,l.shape.length))}yf(`mean`,m,l.shape.length);let[h,g]=_f(l.shape,m),_=k(g),v=l;l.dtype!==`float32`&&(v=fX({backend:t,inputs:{x:l},attrs:{dtype:`float32`}}),c=t.dataIdMap.get(v.dataId).id);let y=t.makeOutput(h,`float32`);if(k(l.shape)!==0){let e=t.dataIdMap.get(y.dataId).id;h$(c,_,e)}return p&&t.disposeData(u.dataId),a&&(y.shape=vf(y.shape,f)),l.dtype!==`float32`&&t.disposeData(v.dataId),y}var v$={kernelName:wn,backendName:`wasm`,setupFunc:g$,kernelFunc:_$};J();var y$;function b$(e){y$=e.wasm.cwrap(`Min`,null,[`number`,`number`,`number`,`number`])}function x$(e){let{backend:t,inputs:n,attrs:r}=e,{axis:i,keepDims:a}=r,{x:o}=n,s=t.dataIdMap.get(o.dataId).id,c=s,l=o,{transposed:u,axes:d,originalAxes:f,inputWasTransposed:p}=pY(o,i,t);if(p){let e=t.dataIdMap.get(u.dataId).id;e!==s&&(l=u,c=e)}let m=l.shape.length;yf(`min`,d,m);let[h,g]=_f(l.shape,d),_=k(g),v=t.makeOutput(h,l.dtype);if(k(l.shape)!==0){let e=t.dataIdMap.get(v.dataId).id;y$(c,UJ[o.dtype],_,e)}return p&&t.disposeData(u.dataId),a&&(v.shape=vf(v.shape,f)),v}var S$={kernelName:`Min`,backendName:`wasm`,setupFunc:b$,kernelFunc:x$};J();var C$=$J(Tn,!1);J();var w$;(function(e){e[e.reflect=0]=`reflect`,e[e.symmetric=1]=`symmetric`})(w$||={});var T$;function E$(e){T$=e.wasm.cwrap(En,null,[`number`,`array`,`number`,`number`,`array`,`array`,`number`,`number`])}function D$(e){let{inputs:{x:t},backend:n,attrs:{paddings:r,mode:i}}=e,a=r.map((e,n)=>e[0]+t.shape[n]+e[1]),o=n.dataIdMap.get(t.dataId).id,s=n.makeOutput(a,t.dtype),c=n.dataIdMap.get(s.dataId).id,l=new Uint8Array(new Int32Array(t.shape).buffer),u=r.map(e=>e[0]),d=r.map(e=>e[1]),f=new Uint8Array(new Int32Array(u).buffer),p=new Uint8Array(new Int32Array(d).buffer);return T$(o,l,t.shape.length,UJ[t.dtype],f,p,w$[i],c),s}var O$={kernelName:En,backendName:`wasm`,kernelFunc:D$,setupFunc:E$};J();var k$;function A$(e){k$=e.wasm.cwrap(hr,null,[`number`,`number`,`number`,`number`])}function j$(e){let{backend:t,inputs:{logits:n},attrs:{dim:r}}=e,i=t.dataIdMap.get(n.dataId).id,a=t.makeOutput(n.shape,n.dtype),o=t.dataIdMap.get(a.dataId).id,s=n.shape[r],c=k(n.shape)/s;return k(a.shape)===0||k$(i,o,s,c),a}var M$={kernelName:hr,backendName:`wasm`,setupFunc:A$,kernelFunc:j$};J();var N$;function P$(e){N$=e.wasm.cwrap(Dn,null,[`number`,`number`,`number`,`number`,`number`,`number`])}function F$(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{numSamples:a,seed:o,normalized:s}=r;if(i.dtype!==`float32`)throw Error(`Tensor logits must have dtype float32, got ${i.dtype}`);let c=s?i:j$({inputs:{logits:i},backend:n,attrs:{dim:i.shape.length-1}}),[l,u]=c.shape,d=n.makeOutput([l,a],`int32`);return N$(n.dataIdMap.get(c.dataId).id,l,u,a,o,n.dataIdMap.get(d.dataId).id),s||n.disposeData(c.dataId),d}var I$={kernelName:Dn,backendName:`wasm`,setupFunc:P$,kernelFunc:F$};J();var L$=$J(`Mod`,!0);J();var R$=$J(On,!0);J();var z$=YJ(`Neg`);function B$(e,t){let n=new Int32Array(e.wasm.HEAPU8.buffer,t,4),r=n[0],i=n[1],a=n[2],o=n[3];return e.wasm._free(t),{pSelectedIndices:r,selectedSize:i,pSelectedScores:a,pValidOutputs:o}}J();var V$;function H$(e){V$=e.wasm.cwrap(An,`number`,[`number`,`number`,`number`,`number`,`number`])}function U$(e){let{backend:t,inputs:n,attrs:r}=e,{iouThreshold:i,maxOutputSize:a,scoreThreshold:o}=r,{boxes:s,scores:c}=n,l=t.dataIdMap.get(s.dataId).id,u=t.dataIdMap.get(c.dataId).id,{pSelectedIndices:d,selectedSize:f,pSelectedScores:p,pValidOutputs:m}=B$(t,V$(l,u,a,i,o));return t.wasm._free(p),t.wasm._free(m),t.makeOutput([f],`int32`,d)}var W$={kernelName:An,backendName:`wasm`,setupFunc:H$,kernelFunc:U$};J();var G$;function K$(e){G$=e.wasm.cwrap(jn,`number`,[`number`,`number`,`number`,`number`,`number`,`bool`])}function q$(e){let{backend:t,inputs:n,attrs:r}=e,{iouThreshold:i,maxOutputSize:a,scoreThreshold:o,padToMaxOutputSize:s}=r,{boxes:c,scores:l}=n,u=t.dataIdMap.get(c.dataId).id,d=t.dataIdMap.get(l.dataId).id,{pSelectedIndices:f,selectedSize:p,pSelectedScores:m,pValidOutputs:h}=B$(t,G$(u,d,a,i,o,s));return t.wasm._free(m),[t.makeOutput([p],`int32`,f),t.makeOutput([],`int32`,h)]}var J$={kernelName:jn,backendName:`wasm`,setupFunc:K$,kernelFunc:q$};J();var Y$;function X$(e){Y$=e.wasm.cwrap(Mn,`number`,[`number`,`number`,`number`,`number`,`number`,`number`])}function Z$(e){let{backend:t,inputs:n,attrs:r}=e,{iouThreshold:i,maxOutputSize:a,scoreThreshold:o,softNmsSigma:s}=r,{boxes:c,scores:l}=n,u=t.dataIdMap.get(c.dataId).id,d=t.dataIdMap.get(l.dataId).id,{pSelectedIndices:f,selectedSize:p,pSelectedScores:m,pValidOutputs:h}=B$(t,Y$(u,d,a,i,o,s));return t.wasm._free(h),[t.makeOutput([p],`int32`,f),t.makeOutput([p],`float32`,m)]}var Q$={kernelName:Mn,backendName:`wasm`,setupFunc:X$,kernelFunc:Z$};J();var $$=$J(kn,!1,`bool`);J();var e1;function t1(e){e1=e.wasm.cwrap(Pn,null,[`number`,`number`,`number`,`number`,`number`])}function n1(e){let{inputs:t,backend:n,attrs:r}=e,{indices:i}=t,{dtype:a,depth:o,onValue:s,offValue:c}=r,l=n.makeOutput([...i.shape,o],a),u=n.dataIdMap.get(l.dataId).id,d=n.dataIdMap.get(i.dataId).id;return e1(d,o,s,c,u),l}var r1={kernelName:Pn,backendName:`wasm`,setupFunc:t1,kernelFunc:n1};J();function i1(e){let{inputs:{x:t},backend:n}=e,r=n.makeOutput(t.shape,t.dtype);return n.typedArrayFromHeap(r).fill(1),r}var a1={kernelName:Nn,backendName:`wasm`,kernelFunc:i1};J();function o1(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r;if(t.length===1)return RZ({inputs:{input:t[0]},backend:n,attrs:{dim:i}});let a=t[0].shape,o=t[0].dtype;t.forEach(e=>{D(a,e.shape,`All tensors passed to stack must have matching shapes`),E(o===e.dtype,()=>`All tensors passed to stack must have matching dtypes`)});let s=[],c=yX({inputs:t.map(e=>{let t=RZ({inputs:{input:e},backend:n,attrs:{dim:i}});return s.push(t),t}),backend:n,attrs:{axis:i}});return s.forEach(e=>n.disposeData(e.dataId)),c}var s1={kernelName:Fn,backendName:`wasm`,kernelFunc:o1};J();var c1;function l1(e){c1=e.wasm.cwrap(In,null,[`number`,`array`,`number`,`number`,`array`,`array`,`number`,`number`])}function u1(e){let{inputs:{x:t},backend:n,attrs:{paddings:r,constantValue:i}}=e,a=r.map((e,n)=>e[0]+t.shape[n]+e[1]);if(k(t.shape)===0)return VZ({backend:n,attrs:{shape:a,value:i,dtype:t.dtype}});let o=n.dataIdMap.get(t.dataId).id,s=n.makeOutput(a,t.dtype),c=n.dataIdMap.get(s.dataId).id,l=new Uint8Array(new Int32Array(t.shape).buffer),u=r.map(e=>e[0]),d=r.map(e=>e[1]),f=new Uint8Array(new Int32Array(u).buffer),p=new Uint8Array(new Int32Array(d).buffer);return c1(o,l,t.shape.length,UJ[t.dtype],f,p,i,c),s}var d1={kernelName:In,backendName:`wasm`,kernelFunc:u1,setupFunc:l1};J();var f1=$J(`Pow`,!1);J();var p1;function m1(e){p1=e.wasm.cwrap(Rn,null,[`number`,`number`,`number`])}function h1(e){let{inputs:t,backend:n}=e,{x:r,alpha:i}=t,a=n.dataIdMap.get(r.dataId).id,o=n.dataIdMap.get(i.dataId).id,s=a,c=r,l=c;c.dtype!==`float32`&&(l=fX({backend:n,inputs:{x:r},attrs:{dtype:`float32`}}),s=n.dataIdMap.get(l.dataId).id);let u=n.makeOutput(r.shape,`float32`),d=n.dataIdMap.get(u.dataId).id;return p1(s,o,d),c.dtype!==`float32`&&n.disposeData(l.dataId),u}var g1={kernelName:Rn,backendName:`wasm`,setupFunc:m1,kernelFunc:h1};J();var _1;function v1(e){_1=e.wasm.cwrap(zn,null,[`number`,`number`,`number`,`number`])}function y1(e){let{backend:t,inputs:n,attrs:r}=e,{axis:i,keepDims:a}=r,{x:o}=n,s=t.dataIdMap.get(o.dataId).id,c=s,l=o,{transposed:u,axes:d,originalAxes:f,inputWasTransposed:p}=pY(o,i,t),m=d;if(p){let e=t.dataIdMap.get(u.dataId).id;e!==s&&(l=u,c=e,m=Sf(m.length,l.shape.length))}yf(`prod`,m,l.shape.length);let[h,g]=_f(l.shape,m),_=k(g),v=t.makeOutput(h,l.dtype);if(k(l.shape)!==0){let e=t.dataIdMap.get(v.dataId).id;_1(c,_,UJ[v.dtype],e)}return p&&t.disposeData(u.dataId),a&&(v.shape=vf(v.shape,f)),v}var b1={kernelName:zn,backendName:`wasm`,setupFunc:v1,kernelFunc:y1};J();var x1={kernelName:Un,backendName:`wasm`,kernelFunc:e=>{let{backend:t,attrs:n}=e,{start:r,stop:i,step:a,dtype:o}=n,s=vk(r,i,a,o),c=t.makeOutput([s.length],o);return t.typedArrayFromHeap(c).set(s),c}};J();var S1=$J(Lt,!0);J();var C1=YJ(Gn);J();var w1=YJ(Kn);J();var T1=YJ(Qn);J();var E1;function D1(e){E1=e.wasm.cwrap(Xn,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function O1(e){let{backend:t,inputs:n,attrs:r}=e,{images:i}=n,{alignCorners:a,halfPixelCenters:o,size:s}=r,[c,l]=s,[u,d,f,p]=i.shape,m=[u,c,l,p],h=t.dataIdMap.get(i.dataId),g;h.dtype!==`float32`&&(g=fX({backend:t,inputs:{x:i},attrs:{dtype:`float32`}}),h=t.dataIdMap.get(g.dataId));let _=h.id,v=t.makeOutput(m,`float32`);if(k(i.shape)===0)return v;let y=t.dataIdMap.get(v.dataId).id;return E1(_,u,d,f,p,c,l,+!!a,+!!o,y),g!=null&&t.disposeData(g.dataId),v}var k1={kernelName:Xn,backendName:`wasm`,setupFunc:D1,kernelFunc:O1};J();var A1;function j1(e){A1=e.wasm.cwrap(Zn,null,[`number`,`number`,`number`,`array`,`array`,`boolean`])}function M1(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r,s=n.makeOutput(i.shape,`float32`),c=n.dataIdMap.get(i.dataId),l;return c.dtype!==`float32`&&(l=fX({backend:n,inputs:{x:i},attrs:{dtype:`float32`}}),c=n.dataIdMap.get(l.dataId)),A1(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(s.dataId).id,new Uint8Array(new Int32Array(i.shape).buffer),new Uint8Array(new Int32Array(a.shape).buffer),o),l!=null&&n.disposeData(l.dataId),s}var N1={kernelName:Zn,backendName:`wasm`,setupFunc:j1,kernelFunc:M1};J();var P1;function F1(e){P1=e.wasm.cwrap(Jn,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function I1(e){let{backend:t,inputs:n,attrs:r}=e,{images:i}=n,{alignCorners:a,halfPixelCenters:o,size:s}=r,[c,l]=s,[u,d,f,p]=i.shape,m=[u,c,l,p],h=t.makeOutput(m,`float32`);if(k(i.shape)===0)return h;let g=t.dataIdMap.get(i.dataId),_;g.dtype!==`float32`&&(_=fX({backend:t,inputs:{x:i},attrs:{dtype:`float32`}}),g=t.dataIdMap.get(_.dataId));let v=g.id,y=t.dataIdMap.get(h.dataId).id;return P1(v,u,d,f,p,c,l,+!!a,+!!o,y),_!=null&&t.disposeData(_.dataId),h}var L1={kernelName:Jn,backendName:`wasm`,setupFunc:F1,kernelFunc:I1};J();var R1;function z1(e){R1=e.wasm.cwrap(Yn,null,[`number`,`number`,`number`,`array`,`array`,`boolean`])}function B1(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r,s=n.makeOutput(i.shape,`float32`),c=n.dataIdMap.get(i.dataId),l;return c.dtype!==`float32`&&(l=fX({backend:n,inputs:{x:i},attrs:{dtype:`float32`}}),c=n.dataIdMap.get(l.dataId)),R1(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(s.dataId).id,new Uint8Array(new Int32Array(i.shape).buffer),new Uint8Array(new Int32Array(a.shape).buffer),o),l!=null&&n.disposeData(l.dataId),s}var V1={kernelName:Yn,backendName:`wasm`,setupFunc:z1,kernelFunc:B1};J();var H1;function U1(e){H1=e.wasm.cwrap($n,null,[`number`,`array`,`number`,`array`,`number`,`number`])}function W1(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dims:a}=r,o=j(a,i.shape);if(i.shape.length===0)return aY({inputs:{x:i},backend:n});let s=n.makeOutput(i.shape,i.dtype),c=n.dataIdMap.get(i.dataId).id,l=n.dataIdMap.get(s.dataId).id,u=new Uint8Array(new Int32Array(o).buffer),d=new Uint8Array(new Int32Array(i.shape).buffer);H1(c,u,o.length,d,i.shape.length,l);let f=KY({inputs:{x:s},attrs:{shape:i.shape},backend:n});return n.disposeData(s.dataId),f}var G1={kernelName:$n,backendName:`wasm`,kernelFunc:W1,setupFunc:U1};J();var K1;function q1(e){K1=e.wasm.cwrap(Br,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`array`,`number`,`number`])}function J1(e){let{inputs:t,backend:n,attrs:r}=e,{image:i}=t,{radians:a,fillValue:o,center:s}=r,c=n.makeOutput(i.shape,i.dtype),l=n.dataIdMap.get(i.dataId).id,u=n.dataIdMap.get(c.dataId).id,[d,f,p,m]=i.shape,[h,g]=uE(s,f,p),_=typeof o==`number`?[o,o,o,o===0?0:255]:[...o,255],v=new Uint8Array(new Int32Array(_).buffer);return K1(l,d,f,p,m,a,h,g,v,_.length,u),c}var Y1={kernelName:Br,backendName:`wasm`,kernelFunc:J1,setupFunc:q1};J();var X1=YJ(er);J();var Z1=YJ(tr);J();var Q1;function $1(e){Q1=e.wasm.cwrap(nr,null,[`number`,`number`,`number`,`number`,`number`,`number`,`array`,`number`,`number`])}function e0(e){let{backend:t,inputs:n,attrs:r}=e,{indices:i,updates:a}=n,{shape:o}=r,s=t.makeOutput(o,a.dtype);if(k(o)===0)return s;let{sliceRank:c,numUpdates:l,sliceSize:u,strides:d,outputSize:f}=Oy(a,i,o),p=t.dataIdMap.get(i.dataId).id,m=t.dataIdMap.get(a.dataId).id,h=new Uint8Array(new Int32Array(d).buffer),g=t.dataIdMap.get(s.dataId).id;return Q1(p,m,UJ[a.dtype],c,l,u,h,f,g),s}var t0={kernelName:nr,backendName:`wasm`,setupFunc:$1,kernelFunc:e0};J();var n0;function r0(e){n0=e.wasm.cwrap(ir,null,[`number`,`number`,`number`,`number`,`number`,`number`,`bool`,`number`])}function i0(e){let{inputs:t,backend:n,attrs:r}=e,{sortedSequence:i,values:a}=t,{side:o}=r;if(i.dtype!==a.dtype)throw Error(`SearchSorted error: sorted_sequence must have the same dtype as values. Got ${i.dtype} and ${a.dtype}`);let s=n.makeOutput(a.shape,`int32`);function c(e){return n.dataIdMap.get(e.dataId).id}return n0(c(i),c(a),i.shape[0],i.shape[1],a.shape[1],UJ[i.dtype],o===`left`,c(s)),s}var a0={kernelName:ir,backendName:`wasm`,setupFunc:r0,kernelFunc:i0};J();var o0;function s0(e){o0=e.wasm.cwrap(`SelectV2`,null,[`number`,`number`,`number`,`number`,`number`])}function c0(e){let{inputs:t,backend:n}=e,{condition:r,t:i,e:a}=t,o=n.dataIdMap.get(r.dataId).id,s=n.dataIdMap.get(i.dataId).id,c=n.dataIdMap.get(a.dataId).id,l=n.makeOutput(i.shape,i.dtype),u=n.dataIdMap.get(l.dataId).id,d=r.shape.length,f=i.shape.length,p=d===0||d>1||f===1?1:k(i.shape.slice(1));return o0(o,s,c,p,u),l}var l0={kernelName:ar,backendName:`wasm`,kernelFunc:c0,setupFunc:s0};J();var u0=YJ(or);J();var d0;function f0(e){d0=e.wasm.cwrap(ur,null,[`number`,`number`])}function p0(e){let{backend:t,inputs:{x:n}}=e,r=t.dataIdMap.get(n.dataId).id,i=t.makeOutput(n.shape,n.dtype),a=t.dataIdMap.get(i.dataId).id;return k(i.shape)===0||d0(r,a),i}var m0={kernelName:`Sigmoid`,backendName:`wasm`,setupFunc:f0,kernelFunc:p0};J();var h0=YJ(lr);J();var g0=YJ(`Sin`);J();var _0=YJ(cr);J();var v0=YJ(dr);J();function y0(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,paddings:o}=r,s=k(a),c=[[0,0]];c.push(...o);for(let e=1+a.length;e<i.shape.length;++e)c.push([0,0]);let l=d1.kernelFunc({inputs:{x:i},backend:n,attrs:{paddings:c,constantValue:0}}),u=fE(l.shape,a,s,!1),d=pE(u.length,a.length,!1),f=mE(l.shape,a,s,!1),p=KY({inputs:{x:l},backend:n,attrs:{shape:u}}),m=lY({inputs:{x:p},backend:n,attrs:{perm:d}}),h=KY({inputs:{x:m},backend:n,attrs:{shape:f}});return n.disposeData(l.dataId),n.disposeData(p.dataId),n.disposeData(m.dataId),h}var b0={kernelName:pr,backendName:`wasm`,kernelFunc:y0};J();var x0;function S0(e){x0=e.wasm.cwrap(`SparseFillEmptyRows`,`number`,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function C0(e){let{backend:t,inputs:n}=e,{indices:r,values:i,denseShape:a,defaultValue:o}=n,s=r.shape[0],c=r.shape[1],l=t.readSync(a.dataId)[0],u=[s+l,c],d=t.dataIdMap.get(r.dataId).id,f=t.dataIdMap.get(i.dataId).id,p=t.dataIdMap.get(o.dataId).id,m=t.makeOutput(u,r.dtype),h=t.dataIdMap.get(m.dataId).id,g=t.makeOutput(u.slice(0,1),i.dtype),_=t.dataIdMap.get(g.dataId).id,v=t.makeOutput([l],`bool`),y=t.dataIdMap.get(v.dataId).id,b=t.makeOutput([s],r.dtype),x=t.dataIdMap.get(b.dataId).id,S=t.makeOutput([4],`int32`),C=t.dataIdMap.get(S.dataId).id,w=x0(d,f,UJ[i.dtype],s,l,c,p,h,_,y,x,C),T=t.readSync(S.dataId),E;switch(T[0]){case 1:E=XE(T[1]);break;case 2:E=ZE(T[1],T[2]);break;case 3:E=QE(T[1],T[2],T[3]);break;default:E=``}if(t.disposeData(S.dataId),E)throw t.disposeData(m.dataId),t.disposeData(g.dataId),t.disposeData(v.dataId),t.disposeData(b.dataId),Error(E);let D=m,O=g;return w!==u[0]&&(D=QY({inputs:{x:m},attrs:{begin:0,size:[w,c]},backend:t}),O=QY({inputs:{x:g},attrs:{begin:0,size:w},backend:t}),t.disposeData(m.dataId),t.disposeData(g.dataId)),[D,O,v,b]}var w0={kernelName:gr,backendName:`wasm`,setupFunc:S0,kernelFunc:C0};J();var T0;function E0(e){T0=e.wasm.cwrap(_r,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function D0(e){let{backend:t,inputs:n}=e,{inputIndices:r,inputShape:i,newShape:a}=n;if(r.shape.length!==2)throw Error(`Input indices should be a matrix but received shape
        ${r.shape}`);if(i.shape.length!==1)throw Error(`Input shape should be a vector but received shape
        ${i.shape}`);if(a.shape.length!==1)throw Error(`Target shape should be a vector but received shape ${a.shape}`);let o=t.dataIdMap.get(r.dataId).id,s=t.dataIdMap.get(i.dataId).id,c=t.dataIdMap.get(a.dataId).id,l=r.shape[0],u=k(a.shape),d=t.makeOutput([l,u],r.dtype),f=t.dataIdMap.get(d.dataId).id,p=t.makeOutput([u],a.dtype),m=t.dataIdMap.get(p.dataId).id,h=t.makeOutput([3],`int32`),g=t.dataIdMap.get(h.dataId).id;T0(o,s,c,l,f,m,g);let _=t.readSync(h.dataId),v;switch(_[0]){case 0:v=eD(_[1],_[2]);break;case 1:v=tD(_[1],_[2]);break;case 2:v=nD();break;case 3:v=rD(Array.from(t.readSync(i.dataId)),Array.from(t.readSync(p.dataId)));break;case 4:v=iD(Array.from(t.readSync(i.dataId)),Array.from(t.readSync(p.dataId)));break;default:v=``}if(t.disposeData(h.dataId),v)throw t.disposeData(d.dataId),t.disposeData(p.dataId),Error(v);return[d,p]}var O0={kernelName:_r,backendName:`wasm`,setupFunc:E0,kernelFunc:D0};J();var k0;function A0(e){k0=e.wasm.cwrap(`SparseSegmentReduction`,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`])}function j0(e,t){let{backend:n,inputs:r}=e,{data:i,indices:a,segmentIds:o}=r,s=a.shape[0],c=n.readSync(o.dataId,s-1,s)[0],l=s>0?c+1:0;if(l<0)throw Error(oD());let u=i.shape.slice();u[0]=l;let d=n.dataIdMap.get(i.dataId).id,f=n.dataIdMap.get(a.dataId).id,p=n.dataIdMap.get(o.dataId).id,m=n.makeOutput(u,i.dtype),h=n.dataIdMap.get(m.dataId).id,g=n.makeOutput([4],`int32`),_=n.dataIdMap.get(g.dataId).id;k0(d,UJ[i.dtype],i.shape[0],f,p,h,_,t,0);let v=n.readSync(g.dataId),y;switch(v[0]){case 0:y=oD();break;case 1:y=sD();break;case 2:y=cD(v[1],v[2]);break;case 3:y=lD(v[1],v[2],v[3]);break;default:y=``}if(n.disposeData(g.dataId),y)throw n.disposeData(m.dataId),Error(y);return m}J();function M0(e){return j0(e,!0)}var N0={kernelName:vr,backendName:`wasm`,setupFunc:A0,kernelFunc:M0};J();function P0(e){return j0(e,!1)}var F0={kernelName:yr,backendName:`wasm`,setupFunc:A0,kernelFunc:P0};J();var I0;function L0(e){I0=e.wasm.cwrap(br,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`array`,`number`,`number`])}function R0(e){let{backend:t,inputs:n,attrs:r}=e,{sparseIndices:i,sparseValues:a,defaultValue:o}=n,{outputShape:s}=r,c=t.makeOutput(s,o.dtype);if(k(s)===0)return c;let{sliceRank:l,numUpdates:u,sliceSize:d,strides:f,outputSize:p}=Oy(a,i,s),m=t.dataIdMap.get(i.dataId).id,h=t.dataIdMap.get(a.dataId).id,g=t.dataIdMap.get(o.dataId).id,_=new Uint8Array(new Int32Array(f).buffer),v=t.dataIdMap.get(c.dataId).id;return I0(m,h,a.shape.length,g,UJ[o.dtype],l,u,d,_,p,v),c}var z0={kernelName:br,backendName:`wasm`,setupFunc:L0,kernelFunc:R0};J();function B0(e){let{inputs:t,attrs:n,backend:r}=e,{x:i}=t,{numOrSizeSplits:a,axis:o}=n,s=j(o,i.shape)[0],c=JE(i,a,s),l=Array(i.shape.length).fill(0),u=i.shape.slice();return c.map(e=>{let t=[...u];t[s]=e;let n=QY({inputs:{x:i},attrs:{begin:l,size:t},backend:r});return l[s]+=e,n})}var V0={kernelName:mr,backendName:`wasm`,kernelFunc:B0};J();var H0=YJ(fr);J();var U0=YJ(Sr);J();var W0=$J(xr,!0);J();var G0;function K0(e){G0=e.wasm.cwrap(Rr,null,[`number`,`number`,`number`,`number`])}function q0(e){let{backend:t,inputs:n,attrs:r}=e,{alpha:i}=r,{x:a}=n,o=t.dataIdMap.get(a.dataId).id,s=t.makeOutput(a.shape,a.dtype),c=t.dataIdMap.get(s.dataId).id;return G0(o,i,UJ[a.dtype],c),s}var J0={kernelName:Rr,backendName:`wasm`,setupFunc:K0,kernelFunc:q0};J();var Y0;function X0(e){Y0=e.wasm.cwrap(wr,null,[`number`,`array`,`number`,`array`,`array`,`array`,`array`,`array`,`number`,`number`])}function Z0(e){let{backend:t,inputs:n,attrs:r}=e,{x:i}=n,{begin:a,end:o,strides:s,beginMask:c,endMask:l,ellipsisMask:u,newAxisMask:d,shrinkAxisMask:f}=r,{finalShapeSparse:p,finalShape:m,isIdentity:h,sliceDim0:g,isSimpleSlice:_,begin:v,end:y,strides:b}=LT(i.shape,a,o,s,c,l,u,d,f),x;if(h)x=KY({inputs:{x:i},backend:t,attrs:{shape:m}});else if(g||_){E(i.shape.length>=1,()=>`Input must have rank at least 1, got: ${i.shape.length}`);let e=wT(v,y,b),n=QY({inputs:{x:i},backend:t,attrs:{begin:v,size:e}});x=KY({inputs:{x:n},backend:t,attrs:{shape:m}}),t.disposeData(n.dataId)}else{let e=t.makeOutput(p,`float32`),n=t.dataIdMap.get(i.dataId).id,r=new Uint8Array(new Int32Array(N(i.shape)).buffer),a=new Uint8Array(new Int32Array(v).buffer),o=new Uint8Array(new Int32Array(y).buffer),s=new Uint8Array(new Int32Array(b).buffer),c=new Uint8Array(new Int32Array(p).buffer),l=new Uint8Array(new Int32Array(N(p)).buffer),u=t.dataIdMap.get(e.dataId).id;Y0(n,r,i.shape.length,a,o,s,c,l,p.length,u),x=KY({inputs:{x:e},backend:t,attrs:{shape:m}}),t.disposeData(e.dataId)}return x}var Q0={kernelName:wr,backendName:`wasm`,setupFunc:X0,kernelFunc:Z0};J();function $0(e){let{backend:t,inputs:n,attrs:r}=e,{data:i,dataSplits:a}=n,{separator:o,nGramWidths:s,leftPad:c,rightPad:l,padWidth:u,preserveShortSequences:d}=r,[f,p]=Uk(t.readSync(i.dataId),t.readSync(a.dataId),o,s,c,l,u,d),m=t.makeOutput([f.length],`string`),h=t.dataIdMap.get(m.dataId);h.stringBytes=f;let g=t.makeOutput(a.shape,`int32`);return t.typedArrayFromHeap(g).set(p),[m,g]}var e2={kernelName:Tr,backendName:`wasm`,kernelFunc:$0};J();function t2(e){let{backend:t,inputs:n,attrs:r}=e,{input:i,delimiter:a}=n,{skipEmpty:o}=r,[s,c,l]=Gk(t.readSync(i.dataId),t.readSync(a.dataId)[0],o),u=c.length,d=t.makeOutput([u,2],`int32`);t.typedArrayFromHeap(d).set(s);let f=t.makeOutput([u],`string`),p=t.dataIdMap.get(f.dataId);p.stringBytes=c;let m=t.makeOutput([2],`int32`);return t.typedArrayFromHeap(m).set(l),[d,f,m]}var n2={kernelName:Er,backendName:`wasm`,kernelFunc:t2};J();function r2(e){let{backend:t,inputs:n,attrs:r}=e,{input:i}=n,{numBuckets:a}=r,o=Kk(t.readSync(i.dataId),a),s=t.makeOutput(i.shape,`int32`);return t.typedArrayFromHeap(s).set(o),s}var i2={kernelName:Dr,backendName:`wasm`,kernelFunc:r2};J();var a2=$J(`Sub`,!0);J();var o2;function s2(e){o2=e.wasm.cwrap(`Sum`,null,[`number`,`number`,`number`,`number`])}function c2(e){let{backend:t,inputs:n,attrs:r}=e,{axis:i,keepDims:a}=r,{x:o}=n,s=t.dataIdMap.get(o.dataId).id,c=s,l=o,{transposed:u,axes:d,originalAxes:f,inputWasTransposed:p}=pY(o,i,t),m=d;if(p){let e=t.dataIdMap.get(u.dataId).id;e!==s&&(l=u,c=e,m=Sf(m.length,l.shape.length))}yf(`sum`,m,l.shape.length);let[h,g]=_f(l.shape,m),_=k(g),v=t.makeOutput(h,l.dtype);if(k(l.shape)!==0){let e=t.dataIdMap.get(v.dataId).id;o2(c,_,UJ[v.dtype],e)}return p&&t.disposeData(u.dataId),a&&(v.shape=vf(v.shape,f)),v}var l2={kernelName:`Sum`,backendName:`wasm`,setupFunc:s2,kernelFunc:c2};J();var u2=YJ(`Tan`);J();var d2=YJ(Or);J();var f2;function p2(e){f2=e.wasm.cwrap(rr,null,[`number`,`number`,`number`,`number`,`number`,`number`,`array`,`number`,`number`,`number`])}function m2(e){let{backend:t,inputs:n,attrs:r}=e,{tensor:i,indices:a,updates:o}=n,{}=r,s=t.makeOutput(i.shape,i.dtype);if(k(i.shape)===0)return s;let{sliceRank:c,numUpdates:l,sliceSize:u,strides:d,outputSize:f}=Oy(o,a,i.shape),p=t.dataIdMap.get(a.dataId).id,m=t.dataIdMap.get(o.dataId).id,h=t.dataIdMap.get(i.dataId).id,g=new Uint8Array(new Int32Array(d).buffer),_=t.dataIdMap.get(s.dataId).id;return f2(p,m,UJ[o.dtype],c,l,u,g,f,_,h),s}var h2={kernelName:rr,backendName:`wasm`,setupFunc:p2,kernelFunc:m2};J();var g2;function _2(e){g2=e.wasm.cwrap(kr,null,[`number`,`array`,`number`,`array`,`number`,`number`])}function v2(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,a=n.dataIdMap.get(i.dataId).id,{reps:o}=r,s=Array(i.shape.length);for(let e=0;e<s.length;e++)s[e]=i.shape[e]*o[e];let c=new Uint8Array(new Int32Array(i.shape).buffer),l=new Uint8Array(new Int32Array(s).buffer),u=n.makeOutput(s,i.dtype),d=n.dataIdMap.get(u.dataId).id;return g2(a,c,i.shape.length,l,s.length,UJ[u.dtype],d),u}var y2={kernelName:kr,backendName:`wasm`,setupFunc:_2,kernelFunc:v2};J();var b2;function x2(e){b2=e.wasm.cwrap(Ar,null,[`number`,`array`,`number`,`number`,`number`,`bool`,`number`,`number`])}var S2={kernelName:Ar,backendName:`wasm`,setupFunc:x2,kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r}=e,{k:i,sorted:a}=n,o=t.dataIdMap.get(r.dataId).id,s=new Uint8Array(new Int32Array(r.shape).buffer),c=r.shape.slice();c[c.length-1]=i;let l=t.makeOutput(c,r.dtype),u=t.dataIdMap.get(l.dataId).id,d=t.makeOutput(c,`int32`),f=t.dataIdMap.get(d.dataId).id;return b2(o,s,r.shape.length,UJ[r.dtype],i,a,u,f),[l,d]}};J();var C2;function w2(e){C2=e.wasm.cwrap(jr,null,[`number`,`number`,`bool`,`number`,`number`,`number`,`number`,`number`,`number`,`array`,`number`,`array`,`number`,`number`,`number`,`number`,`number`])}function T2(e){let{backend:t,inputs:n,attrs:r}=e,{image:i,transforms:a}=n,{interpolation:o,fillMode:s,fillValue:c,outputShape:l}=r,[u,d,f,p]=i.shape,[m,h]=l??[d,f],g=[u,m,h,p],_=new Uint8Array(new Int32Array(N(i.shape)).buffer),v=new Uint8Array(new Int32Array(N(g)).buffer),y=t.makeOutput(g,i.dtype),b=t.dataIdMap.get(y.dataId).id,x=t.dataIdMap.get(i.dataId).id,S=t.dataIdMap.get(a.dataId).id,C=o===`nearest`?1:2,w;switch(s){case`constant`:w=1;break;case`reflect`:w=2;break;case`wrap`:w=3;break;case`nearest`:w=4;break;default:w=1}return C2(x,S,a.shape[0]>1,u,m,h,p,f,d,_,i.shape.length-1,v,g.length-1,C,w,c,b),y}var E2={kernelName:jr,backendName:`wasm`,setupFunc:w2,kernelFunc:T2};J();function D2(e){let{inputs:t,attrs:n,backend:r}=e,{axis:i}=n,{x:a}=t,{outputValues:o,outputShape:s,indices:c}=eA(r.readSync(a.dataId),i,a.shape,a.dtype);return[r.makeOutput(s,a.dtype,void 0,o),r.makeOutput([c.length],`int32`,void 0,c)]}var O2={kernelName:Nr,backendName:`wasm`,kernelFunc:D2};J();function k2(e){let{inputs:t,backend:n,attrs:r}=e,{value:i}=t,{axis:a}=r;a<0&&(a+=i.shape.length);let o=i.shape[a],s=i.shape.length,c=Array(s-1),l=0;for(let e=0;e<s;e++)e!==a&&(c[l++]=i.shape[e]);let u=Array(o),d=Array(s).fill(0),f=i.shape.slice();f[a]=1;for(let e=0;e<u.length;e++)d[a]=e,u[e]=QY({inputs:{x:i},attrs:{begin:d,size:f},backend:n});return u.map(({dataId:e,dtype:t})=>({dataId:e,dtype:t,shape:c}))}var A2={kernelName:Pr,backendName:`wasm`,kernelFunc:k2};J();function j2(e){let{inputs:{x:t},backend:n}=e,r=n.makeOutput(t.shape,t.dtype);return n.typedArrayFromHeap(r).fill(0),r}var M2={kernelName:Lr,backendName:`wasm`,kernelFunc:j2};J();var N2=[JJ,XJ,ZJ,QJ,eY,iY,_Y,xY,CY,wY,TY,EY,DY,OY,kY,NY,GY,LY,VY,ZY,iX,cX,lX,dX,pX,mX,vX,bX,wX,OX,MX,IX,BX,VX,HX,qX,ZX,tZ,aZ,lZ,pZ,_Z,xZ,TZ,kZ,AZ,PZ,FZ,IZ,LZ,zZ,BZ,HZ,KZ,qZ,JZ,QZ,nQ,oQ,uQ,mQ,hQ,gQ,oY,_Q,vQ,yQ,CQ,wQ,TQ,kQ,jQ,AQ,MQ,NQ,PQ,FQ,zQ,UQ,qQ,JQ,QQ,n$,o$,u$,m$,v$,S$,C$,O$,I$,L$,R$,z$,W$,J$,Q$,$$,r1,a1,s1,d1,f1,g1,b1,x1,S1,C1,w1,T1,qY,k1,N1,L1,V1,G1,Y1,X1,Z1,t0,a0,l0,u0,m0,h0,g0,_0,nX,M$,v0,b0,w0,O0,N0,F0,z0,V0,H0,U0,W0,J0,Q0,e2,n2,i2,a2,l2,u2,d2,h2,y2,S2,E2,fY,O2,A2,M2];for(let e of N2)Xr(e);J();var P2=P();P2.registerFlag(`WASM_HAS_SIMD_SUPPORT`,async()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,9,1,7,0,65,0,253,15,26,11]))}catch{return!1}}),P2.registerFlag(`WASM_HAS_MULTITHREAD_SUPPORT`,async()=>{if(P2.get(`IS_NODE`))return!1;try{return new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}});var F2=s(((e,t)=>{var n=(()=>{var e=typeof document<`u`&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<`u`&&(e||=__filename),(function(t){t||={};function n(){return A.buffer!=M&&he(A.buffer),ue}function r(){return A.buffer!=M&&he(A.buffer),de}function i(){return A.buffer!=M&&he(A.buffer),fe}function a(){return A.buffer!=M&&he(A.buffer),pe}function o(){return A.buffer!=M&&he(A.buffer),me}var s=t===void 0?{}:t,c,l;s.ready=new Promise(function(e,t){c=e,l=t});var u;typeof process<`u`&&process.listeners&&(u={uncaughtException:process.listeners(`uncaughtException`),unhandledRejection:process.listeners(`unhandledRejection`)});var d=Object.assign({},s),f=[],p=(e,t)=>{throw t},m=typeof window==`object`,h=typeof importScripts==`function`,g=typeof process==`object`&&typeof process.versions==`object`&&typeof process.versions.node==`string`,_=s.ENVIRONMENT_IS_PTHREAD||!1,v=``;function y(e){return s.locateFile?s.locateFile(e,v):v+e}var b,x,S;function C(e){e instanceof Be||k(`exiting due to exception: `+e)}if(g){var w=Gs(),T=Gs();v=h?T.dirname(v)+`/`:__dirname+`/`,b=(e,t)=>(e=Fe(e)?new URL(e):T.normalize(e),w.readFileSync(e,t?void 0:`utf8`)),S=e=>{var t=b(e,!0);return t.buffer||(t=new Uint8Array(t)),t},x=(e,t,n)=>{e=Fe(e)?new URL(e):T.normalize(e),w.readFile(e,function(e,r){e?n(e):t(r.buffer)})},process.argv.length>1&&process.argv[1].replace(/\\/g,`/`),f=process.argv.slice(2),process.on(`uncaughtException`,function(e){if(!(e instanceof Be))throw e}),process.on(`unhandledRejection`,function(e){throw e}),p=(e,t)=>{if(xe())throw process.exitCode=e,t;C(t),process.exit(e)},s.inspect=function(){return`[Emscripten Module object]`};let e;try{e=Gs()}catch(e){throw console.error(`The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?`),e}global.Worker=e.Worker}else(m||h)&&(h?v=self.location.href:typeof document<`u`&&document.currentScript&&(v=document.currentScript.src),e!==void 0&&e&&(v=e),v=v.indexOf(`blob:`)===0?``:v.substr(0,v.replace(/[?#].*/,``).lastIndexOf(`/`)+1),g||(b=e=>{var t=new XMLHttpRequest;return t.open(`GET`,e,!1),t.send(null),t.responseText},h&&(S=e=>{var t=new XMLHttpRequest;return t.open(`GET`,e,!1),t.responseType=`arraybuffer`,t.send(null),new Uint8Array(t.response)}),x=(e,t,n)=>{var r=new XMLHttpRequest;r.open(`GET`,e,!0),r.responseType=`arraybuffer`,r.onload=()=>{if(r.status==200||r.status==0&&r.response){t(r.response);return}n()},r.onerror=n,r.send(null)}));g&&typeof performance>`u`&&(global.performance=Gs().performance);var E=console.log.bind(console),D=console.warn.bind(console);g&&(E=e=>w.writeSync(1,e+`
`),D=e=>w.writeSync(2,e+`
`));var O=s.print||E,k=s.printErr||D;Object.assign(s,d),d=null,s.arguments&&(f=s.arguments),s.thisProgram&&s.thisProgram,s.quit&&(p=s.quit),Atomics.load,Atomics.store,Atomics.compareExchange;var ee;s.wasmBinary&&(ee=s.wasmBinary);var te=s.noExitRuntime||!0;typeof WebAssembly!=`object`&&Me(`no native wasm support detected`);var A,ne,re=!1,ie;function ae(e,t){e||Me(t)}var oe=typeof TextDecoder<`u`?new TextDecoder(`utf8`):void 0;function se(e,t,n){t>>>=0;for(var r=t+n,i=t;e[i]&&!(i>=r);)++i;if(i-t>16&&e.buffer&&oe)return oe.decode(e.buffer instanceof SharedArrayBuffer?e.slice(t,i):e.subarray(t,i));for(var a=``;t<i;){var o=e[t++];if(!(o&128)){a+=String.fromCharCode(o);continue}var s=e[t++]&63;if((o&224)==192){a+=String.fromCharCode((o&31)<<6|s);continue}var c=e[t++]&63;if(o=(o&240)==224?(o&15)<<12|s<<6|c:(o&7)<<18|s<<12|c<<6|e[t++]&63,o<65536)a+=String.fromCharCode(o);else{var l=o-65536;a+=String.fromCharCode(55296|l>>10,56320|l&1023)}}return a}function ce(e,t){return e>>>=0,e?se(r(),e,t):``}function j(e,t,n,r){if(n>>>=0,!(r>0))return 0;for(var i=n,a=n+r-1,o=0;o<e.length;++o){var s=e.charCodeAt(o);if(s>=55296&&s<=57343){var c=e.charCodeAt(++o);s=65536+((s&1023)<<10)|c&1023}if(s<=127){if(n>=a)break;t[n++>>>0]=s}else if(s<=2047){if(n+1>=a)break;t[n++>>>0]=192|s>>6,t[n++>>>0]=128|s&63}else if(s<=65535){if(n+2>=a)break;t[n++>>>0]=224|s>>12,t[n++>>>0]=128|s>>6&63,t[n++>>>0]=128|s&63}else{if(n+3>=a)break;t[n++>>>0]=240|s>>18,t[n++>>>0]=128|s>>12&63,t[n++>>>0]=128|s>>6&63,t[n++>>>0]=128|s&63}}return t[n>>>0]=0,n-i}function le(e,t,n){return j(e,r(),t,n)}var M,ue,de,fe,pe,me;_&&(M=s.buffer);function he(e){M=e,s.HEAP8=ue=new Int8Array(e),s.HEAP16=new Int16Array(e),s.HEAP32=fe=new Int32Array(e),s.HEAPU8=de=new Uint8Array(e),s.HEAPU16=new Uint16Array(e),s.HEAPU32=pe=new Uint32Array(e),s.HEAPF32=new Float32Array(e),s.HEAPF64=me=new Float64Array(e)}var ge=s.INITIAL_MEMORY||16777216;if(_)A=s.wasmMemory,M=s.buffer;else if(s.wasmMemory)A=s.wasmMemory;else if(A=new WebAssembly.Memory({initial:ge/65536,maximum:65536,shared:!0}),!(A.buffer instanceof SharedArrayBuffer))throw k(`requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag`),g&&k(`(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)`),Error(`bad memory`);A&&(M=A.buffer),ge=M.byteLength,he(M);var _e,ve=[],ye=[],be=[];function xe(){return te}function N(){if(s.preRun)for(typeof s.preRun==`function`&&(s.preRun=[s.preRun]);s.preRun.length;)we(s.preRun.shift());Xe(ve)}function Se(){_||Xe(ye)}function Ce(){if(!_){if(s.postRun)for(typeof s.postRun==`function`&&(s.postRun=[s.postRun]);s.postRun.length;)Ee(s.postRun.shift());Xe(be)}}function we(e){ve.unshift(e)}function Te(e){ye.unshift(e)}function Ee(e){be.unshift(e)}var De=0,Oe=null,ke=null;function Ae(e){De++,s.monitorRunDependencies&&s.monitorRunDependencies(De)}function je(e){if(De--,s.monitorRunDependencies&&s.monitorRunDependencies(De),De==0&&(Oe!==null&&(clearInterval(Oe),Oe=null),ke)){var t=ke;ke=null,t()}}function Me(e){s.onAbort&&s.onAbort(e),e=`Aborted(`+e+`)`,k(e),re=!0,ie=1,e+=`. Build with -sASSERTIONS for more info.`;var t=new WebAssembly.RuntimeError(e);throw l(t),t}var Ne=`data:application/octet-stream;base64,`;function Pe(e){return e.startsWith(Ne)}function Fe(e){return e.startsWith(`file://`)}var P=`tfjs-backend-wasm-threaded-simd.wasm`;Pe(P)||(P=y(P));function Ie(e){try{if(e==P&&ee)return new Uint8Array(ee);if(S)return S(e);throw`both async and sync fetching of the wasm failed`}catch(e){Me(e)}}function Le(){if(!ee&&(m||h)){if(typeof fetch==`function`&&!Fe(P))return fetch(P,{credentials:`same-origin`}).then(function(e){if(!e.ok)throw`failed to load wasm binary file at '`+P+`'`;return e.arrayBuffer()}).catch(function(){return Ie(P)});if(x)return new Promise(function(e,t){x(P,function(t){e(new Uint8Array(t))},t)})}return Promise.resolve().then(function(){return Ie(P)})}function Re(){var e={env:zt,wasi_snapshot_preview1:zt};function t(e,t){if(s.asm=e.exports,nt(s.asm._emscripten_tls_init),_e=s.asm.__indirect_function_table,Te(s.asm.__wasm_call_ctors),ne=t,!_){var n=F.unusedWorkers.length;F.unusedWorkers.forEach(function(e){F.loadWasmModuleToWorker(e,function(){--n||je(`wasm-instantiate`)})})}}_||Ae(`wasm-instantiate`);function n(e){t(e.instance,e.module)}function r(t){return Le().then(function(t){return WebAssembly.instantiate(t,e)}).then(function(e){return e}).then(t,function(e){k(`failed to asynchronously prepare wasm: `+e),Me(e)})}function i(){return!ee&&typeof WebAssembly.instantiateStreaming==`function`&&!Pe(P)&&!Fe(P)&&!g&&typeof fetch==`function`?fetch(P,{credentials:`same-origin`}).then(function(t){return WebAssembly.instantiateStreaming(t,e).then(n,function(e){return k(`wasm streaming compile failed: `+e),k(`falling back to ArrayBuffer instantiation`),r(n)})}):r(n)}if(s.instantiateWasm)try{return s.instantiateWasm(e,t)}catch(e){k(`Module.instantiateWasm callback failed with error: `+e),l(e)}return i().catch(l),{}}var ze={};function Be(e){this.name=`ExitStatus`,this.message=`Program terminated with exit(`+e+`)`,this.status=e}function Ve(e){var t=F.pthreads[e];delete F.pthreads[e],t.terminate(),Ni(e),F.runningWorkers.splice(F.runningWorkers.indexOf(t),1),t.pthread_ptr=0}function He(e){F.pthreads[e].postMessage({cmd:`cancel`})}function Ue(e){var t=F.pthreads[e];ae(t),F.returnWorkerToPool(t)}function We(e){var t=F.getNewWorker();if(!t)return 6;F.runningWorkers.push(t),F.pthreads[e.pthread_ptr]=t,t.pthread_ptr=e.pthread_ptr;var n={cmd:`run`,start_routine:e.startRoutine,arg:e.arg,pthread_ptr:e.pthread_ptr};return t.runPthread=()=>{g&&t.ref(),t.postMessage(n,e.transferList),delete t.runPthread},t.loaded&&t.runPthread(),0}var Ge={varargs:void 0,get:function(){return Ge.varargs+=4,i()[Ge.varargs-4>>>2]},getStr:function(e){return ce(e)}};function Ke(e){if(_)return Ct(1,1,e);ie=e,xe()||(F.terminateAllThreads(),s.onExit&&s.onExit(e),re=!0),p(e,new Be(e))}function qe(e,t){if(ie=e,!t&&_)throw Qe(e),`unwind`;Ke(e)}var Je=qe;function Ye(e){if(e instanceof Be||e==`unwind`)return ie;p(1,e)}var F={unusedWorkers:[],runningWorkers:[],tlsInitFunctions:[],pthreads:{},init:function(){_?F.initWorker():F.initMainThread()},initMainThread:function(){for(var e=8;e--;)F.allocateUnusedWorker()},initWorker:function(){te=!1},setExitStatus:function(e){ie=e},terminateAllThreads:function(){for(var e of Object.values(F.pthreads))F.returnWorkerToPool(e);for(var e of F.unusedWorkers)e.terminate();F.unusedWorkers=[]},returnWorkerToPool:function(e){var t=e.pthread_ptr;delete F.pthreads[t],F.unusedWorkers.push(e),F.runningWorkers.splice(F.runningWorkers.indexOf(e),1),e.pthread_ptr=0,g&&e.unref(),Ni(t)},receiveObjectTransfer:function(e){},threadInitTLS:function(){F.tlsInitFunctions.forEach(e=>e())},loadWasmModuleToWorker:function(t,n){t.onmessage=e=>{var r=e.data,i=r.cmd;if(t.pthread_ptr&&(F.currentProxiedOperationCallerThread=t.pthread_ptr),r.targetThread&&r.targetThread!=wi()){var a=F.pthreads[r.targetThread];a?a.postMessage(r,r.transferList):k(`Internal error! Worker sent a message "`+i+`" to target pthread `+r.targetThread+`, but that thread no longer exists!`),F.currentProxiedOperationCallerThread=void 0;return}i===`processProxyingQueue`?ut(r.queue):i===`spawnThread`?We(r):i===`cleanupThread`?Ue(r.thread):i===`killThread`?Ve(r.thread):i===`cancelThread`?He(r.thread):i===`loaded`?(t.loaded=!0,g&&t.unref(),n&&n(t),t.runPthread&&t.runPthread()):i===`print`?O(`Thread `+r.threadId+`: `+r.text):i===`printErr`?k(`Thread `+r.threadId+`: `+r.text):i===`alert`?alert(`Thread `+r.threadId+`: `+r.text):r.target===`setimmediate`?t.postMessage(r):i===`callHandler`?s[r.handler](...r.args):i&&k(`worker sent an unknown command `+i),F.currentProxiedOperationCallerThread=void 0},t.onerror=e=>{throw k(`worker sent an error! `+e.filename+`:`+e.lineno+`: `+e.message),e},g&&(t.on(`message`,function(e){t.onmessage({data:e})}),t.on(`error`,function(e){t.onerror(e)}),t.on(`detachedExit`,function(){}));var r=[];for(var i of[`onExit`,`onAbort`,`print`,`printErr`])s.hasOwnProperty(i)&&r.push(i);t.postMessage({cmd:`load`,handlers:r,urlOrBlob:s.mainScriptUrlOrBlob||e,wasmMemory:A,wasmModule:ne})},allocateUnusedWorker:function(){var e,t=y(`tfjs-backend-wasm-threaded-simd.worker.js`);e=new Worker(t),F.unusedWorkers.push(e)},getNewWorker:function(){return F.unusedWorkers.length==0&&(F.allocateUnusedWorker(),F.loadWasmModuleToWorker(F.unusedWorkers[0])),F.unusedWorkers.pop()}};s.PThread=F;function Xe(e){for(;e.length>0;)e.shift()(s)}function Ze(){var e=wi(),t=i()[e+52>>>2],n=t-i()[e+56>>>2];Fi(t,n),L(t)}s.establishStackSpace=Ze;function Qe(e){if(_)return Ct(2,0,e);try{Je(e)}catch(e){Ye(e)}}var $e=[];function et(e){var t=$e[e];return t||(e>=$e.length&&($e.length=e+1),$e[e]=t=_e.get(e)),t}function tt(e,t){var n=et(e)(t);xe()?F.setExitStatus(n):Pi(n)}s.invokeEntryPoint=tt;function nt(e){F.tlsInitFunctions.push(e)}function rt(e){Ei(e,!h,1,!m),F.threadInitTLS()}function it(e){_?postMessage({cmd:`cleanupThread`,thread:e}):Ue(e)}function at(e,t,n,r){return _?Ct(3,1,e,t,n,r):ot(e,t,n,r)}function ot(e,t,n,r){if(typeof SharedArrayBuffer>`u`)return k(`Current environment does not support SharedArrayBuffer, pthreads are not available!`),6;var i=[];if(_&&i.length===0)return at(e,t,n,r);var a={startRoutine:n,pthread_ptr:e,arg:r,transferList:i};return _?(a.cmd=`spawnThread`,postMessage(a,i),0):We(a)}function st(){return 65536}var ct=!0;function lt(){return ct}function ut(e){Atomics.store(i(),e>>2,1),wi()&&Mi(e),Atomics.compareExchange(i(),e>>2,1,0)}s.executeNotifiedProxyingQueue=ut;function dt(e,t,n,r){if(e==t)setTimeout(()=>ut(r));else if(_)postMessage({targetThread:e,cmd:`processProxyingQueue`,queue:r});else{var i=F.pthreads[e];if(!i)return;i.postMessage({cmd:`processProxyingQueue`,queue:r})}return 1}function ft(e,t,n){return-1}function pt(){Me(``)}function mt(e){mt.shown||={},mt.shown[e]||(mt.shown[e]=1,g&&(e=`warning: `+e),k(e))}function ht(){g||h||mt(`Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread`)}function gt(){return Date.now()}function _t(){return 4294901760}function vt(){return _t()}var yt=g?()=>{var e=process.hrtime();return e[0]*1e3+e[1]/1e6}:()=>performance.timeOrigin+performance.now();function bt(e,t,n){r().copyWithin(e>>>0,t>>>0,t+n>>>0)}function xt(){return g?Gs().cpus().length:navigator.hardwareConcurrency}function St(e){var t=Ii(),n=e();return L(t),n}function Ct(e,t){var n=arguments.length-2,r=arguments;return St(()=>{for(var i=n,a=Li(i*8),s=a>>3,c=0;c<n;c++){var l=r[2+c];o()[s+c>>>0]=l}return Ai(e,i,a,t)})}var wt=[];function Tt(e,t,n){wt.length=t;for(var r=n>>3,i=0;i<t;i++)wt[i]=o()[r+i>>>0];return(e<0?ze[-e-1]:Rt[e]).apply(null,wt)}function Et(e){try{return A.grow(e-M.byteLength+65535>>>16),he(A.buffer),1}catch{}}function Dt(e){var t=r().length;if(e>>>=0,e<=t)return!1;var n=_t();if(e>n)return!1;let i=(e,t)=>e+(t-e%t)%t;for(var a=1;a<=4;a*=2){var o=t*(1+.2/a);if(o=Math.min(o,e+100663296),Et(Math.min(n,i(Math.max(e,o),65536))))return!0}return!1}function Ot(){throw`unwind`}function kt(e){return _?Ct(4,1,e):52}function At(e,t,n,r,i){return _?Ct(5,1,e,t,n,r,i):70}var jt=[null,[],[]];function Mt(e,t){var n=jt[e];t===0||t===10?((e===1?O:k)(se(n,0)),n.length=0):n.push(t)}function Nt(e,t,n,i){if(_)return Ct(6,1,e,t,n,i);for(var o=0,s=0;s<n;s++){var c=a()[t>>>2],l=a()[t+4>>>2];t+=8;for(var u=0;u<l;u++)Mt(e,r()[c+u>>>0]);o+=l}return a()[i>>>2]=o,0}function Pt(e){return s[`_`+e]}function Ft(e,t){n().set(e,t>>>0)}function It(e,t,n,r,i){var a={string:e=>{var t=0;if(e!=null&&e!==0){var n=(e.length<<2)+1;t=Li(n),le(e,t,n)}return t},array:e=>{var t=Li(e.length);return Ft(e,t),t}};function o(e){return t===`string`?ce(e):t===`boolean`?!!e:e}var s=Pt(e),c=[],l=0;if(r)for(var u=0;u<r.length;u++){var d=a[n[u]];d?(l===0&&(l=Ii()),c[u]=d(r[u])):c[u]=r[u]}var f=s.apply(null,c);function p(e){return l!==0&&L(l),o(e)}return f=p(f),f}function Lt(e,t,n,r){n||=[];var i=n.every(e=>e===`number`||e===`boolean`);return t!==`string`&&i&&!r?Pt(e):function(){return It(e,t,n,arguments,r)}}F.init();var Rt=[null,Ke,Qe,at,kt,At,Nt],zt={__emscripten_init_main_thread_js:rt,__emscripten_thread_cleanup:it,__pthread_create_js:ot,_emscripten_default_pthread_stack_size:st,_emscripten_get_now_is_monotonic:lt,_emscripten_notify_task_queue:dt,_emscripten_set_offscreencanvas_size:ft,abort:pt,emscripten_check_blocking_allowed:ht,emscripten_date_now:gt,emscripten_get_heap_max:vt,emscripten_get_now:yt,emscripten_memcpy_big:bt,emscripten_num_logical_cores:xt,emscripten_receive_on_main_thread_js:Tt,emscripten_resize_heap:Dt,emscripten_unwind_to_js_event_loop:Ot,exit:Je,fd_close:kt,fd_seek:At,fd_write:Nt,memory:A||s.wasmMemory};Re();var Bt=s.___wasm_call_ctors=function(){return(Bt=s.___wasm_call_ctors=s.asm.__wasm_call_ctors).apply(null,arguments)},Vt=s._init=function(){return(Vt=s._init=s.asm.init).apply(null,arguments)},Ht=s._init_with_threads_count=function(){return(Ht=s._init_with_threads_count=s.asm.init_with_threads_count).apply(null,arguments)},Ut=s._get_threads_count=function(){return(Ut=s._get_threads_count=s.asm.get_threads_count).apply(null,arguments)},Wt=s._register_tensor=function(){return(Wt=s._register_tensor=s.asm.register_tensor).apply(null,arguments)},Gt=s._dispose_data=function(){return(Gt=s._dispose_data=s.asm.dispose_data).apply(null,arguments)},Kt=s._dispose=function(){return(Kt=s._dispose=s.asm.dispose).apply(null,arguments)},qt=s._Abs=function(){return(qt=s._Abs=s.asm.Abs).apply(null,arguments)},Jt=s._Acos=function(){return(Jt=s._Acos=s.asm.Acos).apply(null,arguments)},Yt=s._Acosh=function(){return(Yt=s._Acosh=s.asm.Acosh).apply(null,arguments)},Xt=s._Add=function(){return(Xt=s._Add=s.asm.Add).apply(null,arguments)},Zt=s._AddN=function(){return(Zt=s._AddN=s.asm.AddN).apply(null,arguments)},Qt=s._All=function(){return(Qt=s._All=s.asm.All).apply(null,arguments)},$t=s._Any=function(){return($t=s._Any=s.asm.Any).apply(null,arguments)},en=s._ArgMax=function(){return(en=s._ArgMax=s.asm.ArgMax).apply(null,arguments)},tn=s._ArgMin=function(){return(tn=s._ArgMin=s.asm.ArgMin).apply(null,arguments)},nn=s._Asin=function(){return(nn=s._Asin=s.asm.Asin).apply(null,arguments)},rn=s._Asinh=function(){return(rn=s._Asinh=s.asm.Asinh).apply(null,arguments)},an=s._Atan=function(){return(an=s._Atan=s.asm.Atan).apply(null,arguments)},on=s._Atan2=function(){return(on=s._Atan2=s.asm.Atan2).apply(null,arguments)},sn=s._Atanh=function(){return(sn=s._Atanh=s.asm.Atanh).apply(null,arguments)},cn=s._AvgPool=function(){return(cn=s._AvgPool=s.asm.AvgPool).apply(null,arguments)},ln=s._AvgPool3D=function(){return(ln=s._AvgPool3D=s.asm.AvgPool3D).apply(null,arguments)},un=s._AvgPool3DGrad=function(){return(un=s._AvgPool3DGrad=s.asm.AvgPool3DGrad).apply(null,arguments)},dn=s._AvgPoolGrad=function(){return(dn=s._AvgPoolGrad=s.asm.AvgPoolGrad).apply(null,arguments)},fn=s._BatchMatMul=function(){return(fn=s._BatchMatMul=s.asm.BatchMatMul).apply(null,arguments)},pn=s._Bincount=function(){return(pn=s._Bincount=s.asm.Bincount).apply(null,arguments)},mn=s._BitwiseAnd=function(){return(mn=s._BitwiseAnd=s.asm.BitwiseAnd).apply(null,arguments)},hn=s._Ceil=function(){return(hn=s._Ceil=s.asm.Ceil).apply(null,arguments)},gn=s._ClipByValue=function(){return(gn=s._ClipByValue=s.asm.ClipByValue).apply(null,arguments)},_n=s._Conv2D=function(){return(_n=s._Conv2D=s.asm.Conv2D).apply(null,arguments)},vn=s._Conv2DBackpropInput=function(){return(vn=s._Conv2DBackpropInput=s.asm.Conv2DBackpropInput).apply(null,arguments)},yn=s._Conv3D=function(){return(yn=s._Conv3D=s.asm.Conv3D).apply(null,arguments)},bn=s._Conv3DBackpropFilterV2=function(){return(bn=s._Conv3DBackpropFilterV2=s.asm.Conv3DBackpropFilterV2).apply(null,arguments)},xn=s._Conv3DBackpropInputV2=function(){return(xn=s._Conv3DBackpropInputV2=s.asm.Conv3DBackpropInputV2).apply(null,arguments)},Sn=s._Cos=function(){return(Sn=s._Cos=s.asm.Cos).apply(null,arguments)},Cn=s._Cosh=function(){return(Cn=s._Cosh=s.asm.Cosh).apply(null,arguments)},wn=s._CropAndResize=function(){return(wn=s._CropAndResize=s.asm.CropAndResize).apply(null,arguments)},Tn=s._Cumprod=function(){return(Tn=s._Cumprod=s.asm.Cumprod).apply(null,arguments)},En=s._Cumsum=function(){return(En=s._Cumsum=s.asm.Cumsum).apply(null,arguments)},Dn=s._DenseBincount=function(){return(Dn=s._DenseBincount=s.asm.DenseBincount).apply(null,arguments)},On=s._DepthToSpace=function(){return(On=s._DepthToSpace=s.asm.DepthToSpace).apply(null,arguments)},kn=s._DepthwiseConv2dNative=function(){return(kn=s._DepthwiseConv2dNative=s.asm.DepthwiseConv2dNative).apply(null,arguments)},An=s._Diag=function(){return(An=s._Diag=s.asm.Diag).apply(null,arguments)},jn=s._Dilation2D=function(){return(jn=s._Dilation2D=s.asm.Dilation2D).apply(null,arguments)},Mn=s._Dilation2DBackpropFilter=function(){return(Mn=s._Dilation2DBackpropFilter=s.asm.Dilation2DBackpropFilter).apply(null,arguments)},Nn=s._Dilation2DBackpropInput=function(){return(Nn=s._Dilation2DBackpropInput=s.asm.Dilation2DBackpropInput).apply(null,arguments)},Pn=s._Elu=function(){return(Pn=s._Elu=s.asm.Elu).apply(null,arguments)},Fn=s._EluGrad=function(){return(Fn=s._EluGrad=s.asm.EluGrad).apply(null,arguments)},In=s._Equal=function(){return(In=s._Equal=s.asm.Equal).apply(null,arguments)},Ln=s._Erf=function(){return(Ln=s._Erf=s.asm.Erf).apply(null,arguments)},Rn=s._Exp=function(){return(Rn=s._Exp=s.asm.Exp).apply(null,arguments)},zn=s._Expm1=function(){return(zn=s._Expm1=s.asm.Expm1).apply(null,arguments)},Bn=s._FlipLeftRight=function(){return(Bn=s._FlipLeftRight=s.asm.FlipLeftRight).apply(null,arguments)},Vn=s._Floor=function(){return(Vn=s._Floor=s.asm.Floor).apply(null,arguments)},Hn=s._FloorDiv=function(){return(Hn=s._FloorDiv=s.asm.FloorDiv).apply(null,arguments)},Un=s._FusedBatchNorm=function(){return(Un=s._FusedBatchNorm=s.asm.FusedBatchNorm).apply(null,arguments)},Wn=s._FusedConv2D=function(){return(Wn=s._FusedConv2D=s.asm.FusedConv2D).apply(null,arguments)},Gn=s._FusedDepthwiseConv2D=function(){return(Gn=s._FusedDepthwiseConv2D=s.asm.FusedDepthwiseConv2D).apply(null,arguments)},Kn=s._Gather=function(){return(Kn=s._Gather=s.asm.Gather).apply(null,arguments)},qn=s._GatherNd=function(){return(qn=s._GatherNd=s.asm.GatherNd).apply(null,arguments)},Jn=s._Greater=function(){return(Jn=s._Greater=s.asm.Greater).apply(null,arguments)},Yn=s._GreaterEqual=function(){return(Yn=s._GreaterEqual=s.asm.GreaterEqual).apply(null,arguments)},Xn=s._IsFinite=function(){return(Xn=s._IsFinite=s.asm.IsFinite).apply(null,arguments)},Zn=s._IsInf=function(){return(Zn=s._IsInf=s.asm.IsInf).apply(null,arguments)},Qn=s._IsNan=function(){return(Qn=s._IsNan=s.asm.IsNan).apply(null,arguments)},$n=s._LRN=function(){return($n=s._LRN=s.asm.LRN).apply(null,arguments)},er=s._LRNGrad=function(){return(er=s._LRNGrad=s.asm.LRNGrad).apply(null,arguments)},tr=s._LeakyRelu=function(){return(tr=s._LeakyRelu=s.asm.LeakyRelu).apply(null,arguments)},nr=s._Less=function(){return(nr=s._Less=s.asm.Less).apply(null,arguments)},rr=s._LessEqual=function(){return(rr=s._LessEqual=s.asm.LessEqual).apply(null,arguments)},ir=s._LinSpace=function(){return(ir=s._LinSpace=s.asm.LinSpace).apply(null,arguments)},ar=s._Log=function(){return(ar=s._Log=s.asm.Log).apply(null,arguments)},or=s._Log1p=function(){return(or=s._Log1p=s.asm.Log1p).apply(null,arguments)},sr=s._LogicalAnd=function(){return(sr=s._LogicalAnd=s.asm.LogicalAnd).apply(null,arguments)},cr=s._LogicalNot=function(){return(cr=s._LogicalNot=s.asm.LogicalNot).apply(null,arguments)},lr=s._LogicalOr=function(){return(lr=s._LogicalOr=s.asm.LogicalOr).apply(null,arguments)},ur=s._LogicalXor=function(){return(ur=s._LogicalXor=s.asm.LogicalXor).apply(null,arguments)},dr=s._Max=function(){return(dr=s._Max=s.asm.Max).apply(null,arguments)},fr=s._MaxPool=function(){return(fr=s._MaxPool=s.asm.MaxPool).apply(null,arguments)},pr=s._MaxPool3D=function(){return(pr=s._MaxPool3D=s.asm.MaxPool3D).apply(null,arguments)},mr=s._MaxPool3DGrad=function(){return(mr=s._MaxPool3DGrad=s.asm.MaxPool3DGrad).apply(null,arguments)},hr=s._MaxPoolGrad=function(){return(hr=s._MaxPoolGrad=s.asm.MaxPoolGrad).apply(null,arguments)},gr=s._MaxPoolWithArgmax=function(){return(gr=s._MaxPoolWithArgmax=s.asm.MaxPoolWithArgmax).apply(null,arguments)},_r=s._Maximum=function(){return(_r=s._Maximum=s.asm.Maximum).apply(null,arguments)},vr=s._Mean=function(){return(vr=s._Mean=s.asm.Mean).apply(null,arguments)},yr=s._Min=function(){return(yr=s._Min=s.asm.Min).apply(null,arguments)},br=s._Minimum=function(){return(br=s._Minimum=s.asm.Minimum).apply(null,arguments)},xr=s._MirrorPad=function(){return(xr=s._MirrorPad=s.asm.MirrorPad).apply(null,arguments)},Sr=s._Mod=function(){return(Sr=s._Mod=s.asm.Mod).apply(null,arguments)},Cr=s._Multinomial=function(){return(Cr=s._Multinomial=s.asm.Multinomial).apply(null,arguments)},wr=s._Multiply=function(){return(wr=s._Multiply=s.asm.Multiply).apply(null,arguments)},Tr=s._Neg=function(){return(Tr=s._Neg=s.asm.Neg).apply(null,arguments)},Er=s._NonMaxSuppressionV3=function(){return(Er=s._NonMaxSuppressionV3=s.asm.NonMaxSuppressionV3).apply(null,arguments)},Dr=s._NonMaxSuppressionV4=function(){return(Dr=s._NonMaxSuppressionV4=s.asm.NonMaxSuppressionV4).apply(null,arguments)},Or=s._NonMaxSuppressionV5=function(){return(Or=s._NonMaxSuppressionV5=s.asm.NonMaxSuppressionV5).apply(null,arguments)},kr=s._NotEqual=function(){return(kr=s._NotEqual=s.asm.NotEqual).apply(null,arguments)},Ar=s._OneHot=function(){return(Ar=s._OneHot=s.asm.OneHot).apply(null,arguments)},jr=s._PadV2=function(){return(jr=s._PadV2=s.asm.PadV2).apply(null,arguments)},Mr=s._Pow=function(){return(Mr=s._Pow=s.asm.Pow).apply(null,arguments)},Nr=s._Prelu=function(){return(Nr=s._Prelu=s.asm.Prelu).apply(null,arguments)},Pr=s._Prod=function(){return(Pr=s._Prod=s.asm.Prod).apply(null,arguments)},Fr=s._RealDiv=function(){return(Fr=s._RealDiv=s.asm.RealDiv).apply(null,arguments)},Ir=s._Reciprocal=function(){return(Ir=s._Reciprocal=s.asm.Reciprocal).apply(null,arguments)},Lr=s._Relu=function(){return(Lr=s._Relu=s.asm.Relu).apply(null,arguments)},Rr=s._Relu6=function(){return(Rr=s._Relu6=s.asm.Relu6).apply(null,arguments)},zr=s._ResizeBilinear=function(){return(zr=s._ResizeBilinear=s.asm.ResizeBilinear).apply(null,arguments)},Br=s._ResizeBilinearGrad=function(){return(Br=s._ResizeBilinearGrad=s.asm.ResizeBilinearGrad).apply(null,arguments)},Vr=s._ResizeNearestNeighbor=function(){return(Vr=s._ResizeNearestNeighbor=s.asm.ResizeNearestNeighbor).apply(null,arguments)},Hr=s._ResizeNearestNeighborGrad=function(){return(Hr=s._ResizeNearestNeighborGrad=s.asm.ResizeNearestNeighborGrad).apply(null,arguments)},Ur=s._Reverse=function(){return(Ur=s._Reverse=s.asm.Reverse).apply(null,arguments)},I=s._RotateWithOffset=function(){return(I=s._RotateWithOffset=s.asm.RotateWithOffset).apply(null,arguments)},Wr=s._Round=function(){return(Wr=s._Round=s.asm.Round).apply(null,arguments)},Gr=s._Rsqrt=function(){return(Gr=s._Rsqrt=s.asm.Rsqrt).apply(null,arguments)},Kr=s._ScatterNd=function(){return(Kr=s._ScatterNd=s.asm.ScatterNd).apply(null,arguments)},qr=s._SearchSorted=function(){return(qr=s._SearchSorted=s.asm.SearchSorted).apply(null,arguments)},Jr=s._SelectV2=function(){return(Jr=s._SelectV2=s.asm.SelectV2).apply(null,arguments)},Yr=s._Selu=function(){return(Yr=s._Selu=s.asm.Selu).apply(null,arguments)},Xr=s._Sigmoid=function(){return(Xr=s._Sigmoid=s.asm.Sigmoid).apply(null,arguments)},Zr=s._Sign=function(){return(Zr=s._Sign=s.asm.Sign).apply(null,arguments)},Qr=s._Sin=function(){return(Qr=s._Sin=s.asm.Sin).apply(null,arguments)},$r=s._Sinh=function(){return($r=s._Sinh=s.asm.Sinh).apply(null,arguments)},ei=s._Softmax=function(){return(ei=s._Softmax=s.asm.Softmax).apply(null,arguments)},ti=s._Softplus=function(){return(ti=s._Softplus=s.asm.Softplus).apply(null,arguments)},ni=s._SparseFillEmptyRows=function(){return(ni=s._SparseFillEmptyRows=s.asm.SparseFillEmptyRows).apply(null,arguments)},ri=s._SparseReshape=function(){return(ri=s._SparseReshape=s.asm.SparseReshape).apply(null,arguments)},ii=s._SparseSegmentReduction=function(){return(ii=s._SparseSegmentReduction=s.asm.SparseSegmentReduction).apply(null,arguments)},ai=s._SparseToDense=function(){return(ai=s._SparseToDense=s.asm.SparseToDense).apply(null,arguments)},oi=s._Sqrt=function(){return(oi=s._Sqrt=s.asm.Sqrt).apply(null,arguments)},si=s._Square=function(){return(si=s._Square=s.asm.Square).apply(null,arguments)},ci=s._SquaredDifference=function(){return(ci=s._SquaredDifference=s.asm.SquaredDifference).apply(null,arguments)},li=s._Step=function(){return(li=s._Step=s.asm.Step).apply(null,arguments)},ui=s._StridedSlice=function(){return(ui=s._StridedSlice=s.asm.StridedSlice).apply(null,arguments)},di=s._Sub=function(){return(di=s._Sub=s.asm.Sub).apply(null,arguments)},fi=s._Sum=function(){return(fi=s._Sum=s.asm.Sum).apply(null,arguments)},pi=s._Tan=function(){return(pi=s._Tan=s.asm.Tan).apply(null,arguments)},mi=s._Tanh=function(){return(mi=s._Tanh=s.asm.Tanh).apply(null,arguments)},hi=s._TensorScatterUpdate=function(){return(hi=s._TensorScatterUpdate=s.asm.TensorScatterUpdate).apply(null,arguments)},gi=s._Tile=function(){return(gi=s._Tile=s.asm.Tile).apply(null,arguments)},_i=s._TopK=function(){return(_i=s._TopK=s.asm.TopK).apply(null,arguments)},vi=s._Transform=function(){return(vi=s._Transform=s.asm.Transform).apply(null,arguments)},yi=s._Transpose=function(){return(yi=s._Transpose=s.asm.Transpose).apply(null,arguments)},bi=s.__FusedMatMul=function(){return(bi=s.__FusedMatMul=s.asm._FusedMatMul).apply(null,arguments)},xi=s._malloc=function(){return(xi=s._malloc=s.asm.malloc).apply(null,arguments)},Si=s._free=function(){return(Si=s._free=s.asm.free).apply(null,arguments)},Ci=s.__emscripten_tls_init=function(){return(Ci=s.__emscripten_tls_init=s.asm._emscripten_tls_init).apply(null,arguments)},wi=s._pthread_self=function(){return(wi=s._pthread_self=s.asm.pthread_self).apply(null,arguments)},Ti=s.___errno_location=function(){return(Ti=s.___errno_location=s.asm.__errno_location).apply(null,arguments)},Ei=s.__emscripten_thread_init=function(){return(Ei=s.__emscripten_thread_init=s.asm._emscripten_thread_init).apply(null,arguments)},Di=s.__emscripten_thread_crashed=function(){return(Di=s.__emscripten_thread_crashed=s.asm._emscripten_thread_crashed).apply(null,arguments)},Oi=s._emscripten_main_thread_process_queued_calls=function(){return(Oi=s._emscripten_main_thread_process_queued_calls=s.asm.emscripten_main_thread_process_queued_calls).apply(null,arguments)},ki=s._emscripten_main_browser_thread_id=function(){return(ki=s._emscripten_main_browser_thread_id=s.asm.emscripten_main_browser_thread_id).apply(null,arguments)},Ai=s._emscripten_run_in_main_runtime_thread_js=function(){return(Ai=s._emscripten_run_in_main_runtime_thread_js=s.asm.emscripten_run_in_main_runtime_thread_js).apply(null,arguments)},ji=s._emscripten_dispatch_to_thread_=function(){return(ji=s._emscripten_dispatch_to_thread_=s.asm.emscripten_dispatch_to_thread_).apply(null,arguments)},Mi=s.__emscripten_proxy_execute_task_queue=function(){return(Mi=s.__emscripten_proxy_execute_task_queue=s.asm._emscripten_proxy_execute_task_queue).apply(null,arguments)},Ni=s.__emscripten_thread_free_data=function(){return(Ni=s.__emscripten_thread_free_data=s.asm._emscripten_thread_free_data).apply(null,arguments)},Pi=s.__emscripten_thread_exit=function(){return(Pi=s.__emscripten_thread_exit=s.asm._emscripten_thread_exit).apply(null,arguments)},Fi=s._emscripten_stack_set_limits=function(){return(Fi=s._emscripten_stack_set_limits=s.asm.emscripten_stack_set_limits).apply(null,arguments)},Ii=s.stackSave=function(){return(Ii=s.stackSave=s.asm.stackSave).apply(null,arguments)},L=s.stackRestore=function(){return(L=s.stackRestore=s.asm.stackRestore).apply(null,arguments)},Li=s.stackAlloc=function(){return(Li=s.stackAlloc=s.asm.stackAlloc).apply(null,arguments)},Ri=s.dynCall_iijjiiii=function(){return(Ri=s.dynCall_iijjiiii=s.asm.dynCall_iijjiiii).apply(null,arguments)},zi=s.dynCall_jiji=function(){return(zi=s.dynCall_jiji=s.asm.dynCall_jiji).apply(null,arguments)};s.keepRuntimeAlive=xe,s.wasmMemory=A,s.cwrap=Lt,s.ExitStatus=Be,s.PThread=F;var Bi;ke=function e(){Bi||Vi(),Bi||(ke=e)};function Vi(e){if(e||=f,De>0)return;if(_){c(s),Se(),startWorker(s);return}if(N(),De>0)return;function t(){Bi||(Bi=!0,s.calledRun=!0,!re&&(Se(),c(s),s.onRuntimeInitialized&&s.onRuntimeInitialized(),Ce()))}s.setStatus?(s.setStatus(`Running...`),setTimeout(function(){setTimeout(function(){s.setStatus(``)},1),t()},1)):t()}if(s.preInit)for(typeof s.preInit==`function`&&(s.preInit=[s.preInit]);s.preInit.length>0;)s.preInit.pop()();Vi();var Hi;u&&(Hi={uncaughtException:process.listeners(`uncaughtException`).filter(function(e){return!u.uncaughtException.indexOf(e)>-1}),unhandledRejection:process.listeners(`unhandledRejection`).filter(function(e){return!u.unhandledRejection.indexOf(e)>-1})});var Ui;if(typeof WasmBackendModule<`u`)Ui=WasmBackendModule;else if(t!==void 0)Ui=t;else throw Error(`Could not find wasm module in post.js`);if(Hi){var Wi=Ui._dispose;Ui._dispose=function(){Wi(),Hi.uncaughtException.forEach(function(e){process.removeListener(`uncaughtException`,e)}),Hi.unhandledRejection.forEach(function(e){process.removeListener(`unhandledRejection`,e)})}}return t.ready})})();typeof e==`object`&&typeof t==`object`?t.exports=n:typeof define==`function`&&define.amd?define([],function(){return n}):typeof e==`object`&&(e.WasmBackendModuleThreadedSimd=n)})),I2=s(((e,t)=>{t.exports.wasmWorkerContents=`"use strict";var Module={};var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",data=>onmessage({data:data}));var fs=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(f){(0,eval)(fs.readFileSync(f,"utf8")+"//# sourceURL="+f)},postMessage:function(msg){parentPort.postMessage(msg)},performance:global.performance||{now:function(){return Date.now()}}})}var initializedJS=false;var pendingNotifiedProxyingQueues=[];function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+"
");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=(info,receiveInstance)=>{var instance=new WebAssembly.Instance(Module["wasmModule"],info);receiveInstance(instance);Module["wasmModule"]=null;return instance.exports};self.onunhandledrejection=e=>{throw e.reason??e};self.startWorker=instance=>{Module=instance;postMessage({"cmd":"loaded"})};self.onmessage=e=>{try{if(e.data.cmd==="load"){Module["wasmModule"]=e.data.wasmModule;for(const handler of e.data.handlers){Module[handler]=function(){postMessage({cmd:"callHandler",handler:handler,args:[...arguments]})}}Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;if(typeof e.data.urlOrBlob=="string"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}WasmBackendModuleThreadedSimd(Module)}else if(e.data.cmd==="run"){Module["__emscripten_thread_init"](e.data.pthread_ptr,0,0,1);Module["establishStackSpace"]();Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInitTLS();if(!initializedJS){pendingNotifiedProxyingQueues.forEach(queue=>{Module["executeNotifiedProxyingQueue"](queue)});pendingNotifiedProxyingQueues=[];initializedJS=true}try{Module["invokeEntryPoint"](e.data.start_routine,e.data.arg)}catch(ex){if(ex!="unwind"){if(ex instanceof Module["ExitStatus"]){if(Module["keepRuntimeAlive"]()){}else{Module["__emscripten_thread_exit"](ex.status)}}else{throw ex}}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="processProxyingQueue"){if(initializedJS){Module["executeNotifiedProxyingQueue"](e.data.queue)}else{pendingNotifiedProxyingQueues.push(e.data.queue)}}else if(e.data.cmd){err("worker.js received unknown command "+e.data.cmd);err(e.data)}}catch(ex){if(Module["__emscripten_thread_crashed"]){Module["__emscripten_thread_crashed"]()}throw ex}};`})),L2=s(((e,t)=>{var n=(()=>{var e=typeof document<`u`&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<`u`&&(e||=__filename),(function(t){t||={};var n=t===void 0?{}:t,r,i;n.ready=new Promise(function(e,t){r=e,i=t});var a;typeof process<`u`&&process.listeners&&(a={uncaughtException:process.listeners(`uncaughtException`),unhandledRejection:process.listeners(`unhandledRejection`)});var o=Object.assign({},n),s=[],c=typeof window==`object`,l=typeof importScripts==`function`,u=typeof process==`object`&&typeof process.versions==`object`&&typeof process.versions.node==`string`,d=``;function f(e){return n.locateFile?n.locateFile(e,d):d+e}var p,m,h;if(u){var g=Gs(),_=Gs();d=l?_.dirname(d)+`/`:__dirname+`/`,p=(e,t)=>(e=ve(e)?new URL(e):_.normalize(e),g.readFileSync(e,t?void 0:`utf8`)),h=e=>{var t=p(e,!0);return t.buffer||(t=new Uint8Array(t)),t},m=(e,t,n)=>{e=ve(e)?new URL(e):_.normalize(e),g.readFile(e,function(e,r){e?n(e):t(r.buffer)})},process.argv.length>1&&process.argv[1].replace(/\\/g,`/`),s=process.argv.slice(2),process.on(`uncaughtException`,function(e){if(!(e instanceof Se))throw e}),process.on(`unhandledRejection`,function(e){throw e}),n.inspect=function(){return`[Emscripten Module object]`}}else(c||l)&&(l?d=self.location.href:typeof document<`u`&&document.currentScript&&(d=document.currentScript.src),e&&(d=e),d=d.indexOf(`blob:`)===0?``:d.substr(0,d.replace(/[?#].*/,``).lastIndexOf(`/`)+1),p=e=>{var t=new XMLHttpRequest;return t.open(`GET`,e,!1),t.send(null),t.responseText},l&&(h=e=>{var t=new XMLHttpRequest;return t.open(`GET`,e,!1),t.responseType=`arraybuffer`,t.send(null),new Uint8Array(t.response)}),m=(e,t,n)=>{var r=new XMLHttpRequest;r.open(`GET`,e,!0),r.responseType=`arraybuffer`,r.onload=()=>{if(r.status==200||r.status==0&&r.response){t(r.response);return}n()},r.onerror=n,r.send(null)});var v=n.print||console.log.bind(console),y=n.printErr||console.warn.bind(console);Object.assign(n,o),o=null,n.arguments&&(s=n.arguments),n.thisProgram&&n.thisProgram,n.quit&&n.quit;var b;n.wasmBinary&&(b=n.wasmBinary),n.noExitRuntime,typeof WebAssembly!=`object`&&he(`no native wasm support detected`);var x,S=!1,C=typeof TextDecoder<`u`?new TextDecoder(`utf8`):void 0;function w(e,t,n){t>>>=0;for(var r=t+n,i=t;e[i]&&!(i>=r);)++i;if(i-t>16&&e.buffer&&C)return C.decode(e.subarray(t,i));for(var a=``;t<i;){var o=e[t++];if(!(o&128)){a+=String.fromCharCode(o);continue}var s=e[t++]&63;if((o&224)==192){a+=String.fromCharCode((o&31)<<6|s);continue}var c=e[t++]&63;if(o=(o&240)==224?(o&15)<<12|s<<6|c:(o&7)<<18|s<<12|c<<6|e[t++]&63,o<65536)a+=String.fromCharCode(o);else{var l=o-65536;a+=String.fromCharCode(55296|l>>10,56320|l&1023)}}return a}function T(e,t){return e>>>=0,e?w(ee,e,t):``}function E(e,t,n,r){if(n>>>=0,!(r>0))return 0;for(var i=n,a=n+r-1,o=0;o<e.length;++o){var s=e.charCodeAt(o);if(s>=55296&&s<=57343){var c=e.charCodeAt(++o);s=65536+((s&1023)<<10)|c&1023}if(s<=127){if(n>=a)break;t[n++>>>0]=s}else if(s<=2047){if(n+1>=a)break;t[n++>>>0]=192|s>>6,t[n++>>>0]=128|s&63}else if(s<=65535){if(n+2>=a)break;t[n++>>>0]=224|s>>12,t[n++>>>0]=128|s>>6&63,t[n++>>>0]=128|s&63}else{if(n+3>=a)break;t[n++>>>0]=240|s>>18,t[n++>>>0]=128|s>>12&63,t[n++>>>0]=128|s>>6&63,t[n++>>>0]=128|s&63}}return t[n>>>0]=0,n-i}function D(e,t,n){return E(e,ee,t,n)}var O,k,ee,te,A;function ne(e){O=e,n.HEAP8=k=new Int8Array(e),n.HEAP16=new Int16Array(e),n.HEAP32=te=new Int32Array(e),n.HEAPU8=ee=new Uint8Array(e),n.HEAPU16=new Uint16Array(e),n.HEAPU32=A=new Uint32Array(e),n.HEAPF32=new Float32Array(e),n.HEAPF64=new Float64Array(e)}n.INITIAL_MEMORY;var re=[],ie=[],ae=[];function oe(){if(n.preRun)for(typeof n.preRun==`function`&&(n.preRun=[n.preRun]);n.preRun.length;)j(n.preRun.shift());Ce(re)}function se(){Ce(ie)}function ce(){if(n.postRun)for(typeof n.postRun==`function`&&(n.postRun=[n.postRun]);n.postRun.length;)M(n.postRun.shift());Ce(ae)}function j(e){re.unshift(e)}function le(e){ie.unshift(e)}function M(e){ae.unshift(e)}var ue=0,de=null,fe=null;function pe(e){ue++,n.monitorRunDependencies&&n.monitorRunDependencies(ue)}function me(e){if(ue--,n.monitorRunDependencies&&n.monitorRunDependencies(ue),ue==0&&(de!==null&&(clearInterval(de),de=null),fe)){var t=fe;fe=null,t()}}function he(e){n.onAbort&&n.onAbort(e),e=`Aborted(`+e+`)`,y(e),S=!0,e+=`. Build with -sASSERTIONS for more info.`;var t=new WebAssembly.RuntimeError(e);throw i(t),t}var ge=`data:application/octet-stream;base64,`;function _e(e){return e.startsWith(ge)}function ve(e){return e.startsWith(`file://`)}var ye=`tfjs-backend-wasm.wasm`;_e(ye)||(ye=f(ye));function be(e){try{if(e==ye&&b)return new Uint8Array(b);if(h)return h(e);throw`both async and sync fetching of the wasm failed`}catch(e){he(e)}}function xe(){if(!b&&(c||l)){if(typeof fetch==`function`&&!ve(ye))return fetch(ye,{credentials:`same-origin`}).then(function(e){if(!e.ok)throw`failed to load wasm binary file at '`+ye+`'`;return e.arrayBuffer()}).catch(function(){return be(ye)});if(m)return new Promise(function(e,t){m(ye,function(t){e(new Uint8Array(t))},t)})}return Promise.resolve().then(function(){return be(ye)})}function N(){var e={env:ze,wasi_snapshot_preview1:ze};function t(e,t){n.asm=e.exports,x=n.asm.memory,ne(x.buffer),n.asm.__indirect_function_table,le(n.asm.__wasm_call_ctors),me(`wasm-instantiate`)}pe(`wasm-instantiate`);function r(e){t(e.instance)}function a(t){return xe().then(function(t){return WebAssembly.instantiate(t,e)}).then(function(e){return e}).then(t,function(e){y(`failed to asynchronously prepare wasm: `+e),he(e)})}function o(){return!b&&typeof WebAssembly.instantiateStreaming==`function`&&!_e(ye)&&!ve(ye)&&!u&&typeof fetch==`function`?fetch(ye,{credentials:`same-origin`}).then(function(t){return WebAssembly.instantiateStreaming(t,e).then(r,function(e){return y(`wasm streaming compile failed: `+e),y(`falling back to ArrayBuffer instantiation`),a(r)})}):a(r)}if(n.instantiateWasm)try{return n.instantiateWasm(e,t)}catch(e){y(`Module.instantiateWasm callback failed with error: `+e),i(e)}return o().catch(i),{}}function Se(e){this.name=`ExitStatus`,this.message=`Program terminated with exit(`+e+`)`,this.status=e}function Ce(e){for(;e.length>0;)e.shift()(n)}function we(){he(``)}function Te(){return 4294901760}function Ee(){return Te()}function De(e,t,n){ee.copyWithin(e>>>0,t>>>0,t+n>>>0)}function Oe(e){try{return x.grow(e-O.byteLength+65535>>>16),ne(x.buffer),1}catch{}}function ke(e){var t=ee.length;e>>>=0;var n=Te();if(e>n)return!1;let r=(e,t)=>e+(t-e%t)%t;for(var i=1;i<=4;i*=2){var a=t*(1+.2/i);if(a=Math.min(a,e+100663296),Oe(Math.min(n,r(Math.max(e,a),65536))))return!0}return!1}var Ae={varargs:void 0,get:function(){return Ae.varargs+=4,te[Ae.varargs-4>>>2]},getStr:function(e){return T(e)}};function je(e){return 52}function Me(e,t,n,r,i){return 70}var Ne=[null,[],[]];function Pe(e,t){var n=Ne[e];t===0||t===10?((e===1?v:y)(w(n,0)),n.length=0):n.push(t)}function Fe(e,t,n,r){for(var i=0,a=0;a<n;a++){var o=A[t>>>2],s=A[t+4>>>2];t+=8;for(var c=0;c<s;c++)Pe(e,ee[o+c>>>0]);i+=s}return A[r>>>2]=i,0}function P(e){return n[`_`+e]}function Ie(e,t){k.set(e,t>>>0)}function Le(e,t,n,r,i){var a={string:e=>{var t=0;if(e!=null&&e!==0){var n=(e.length<<2)+1;t=Er(n),D(e,t,n)}return t},array:e=>{var t=Er(e.length);return Ie(e,t),t}};function o(e){return t===`string`?T(e):t===`boolean`?!!e:e}var s=P(e),c=[],l=0;if(r)for(var u=0;u<r.length;u++){var d=a[n[u]];d?(l===0&&(l=wr()),c[u]=d(r[u])):c[u]=r[u]}var f=s.apply(null,c);function p(e){return l!==0&&Tr(l),o(e)}return f=p(f),f}function Re(e,t,n,r){n||=[];var i=n.every(e=>e===`number`||e===`boolean`);return t!==`string`&&i&&!r?P(e):function(){return Le(e,t,n,arguments,r)}}var ze={abort:we,emscripten_get_heap_max:Ee,emscripten_memcpy_big:De,emscripten_resize_heap:ke,fd_close:je,fd_seek:Me,fd_write:Fe};N();var Be=n.___wasm_call_ctors=function(){return(Be=n.___wasm_call_ctors=n.asm.__wasm_call_ctors).apply(null,arguments)},Ve=n._init=function(){return(Ve=n._init=n.asm.init).apply(null,arguments)},He=n._init_with_threads_count=function(){return(He=n._init_with_threads_count=n.asm.init_with_threads_count).apply(null,arguments)},Ue=n._get_threads_count=function(){return(Ue=n._get_threads_count=n.asm.get_threads_count).apply(null,arguments)},We=n._register_tensor=function(){return(We=n._register_tensor=n.asm.register_tensor).apply(null,arguments)},Ge=n._dispose_data=function(){return(Ge=n._dispose_data=n.asm.dispose_data).apply(null,arguments)},Ke=n._dispose=function(){return(Ke=n._dispose=n.asm.dispose).apply(null,arguments)},qe=n._Abs=function(){return(qe=n._Abs=n.asm.Abs).apply(null,arguments)},Je=n._Acos=function(){return(Je=n._Acos=n.asm.Acos).apply(null,arguments)},Ye=n._Acosh=function(){return(Ye=n._Acosh=n.asm.Acosh).apply(null,arguments)},F=n._Add=function(){return(F=n._Add=n.asm.Add).apply(null,arguments)},Xe=n._AddN=function(){return(Xe=n._AddN=n.asm.AddN).apply(null,arguments)},Ze=n._All=function(){return(Ze=n._All=n.asm.All).apply(null,arguments)},Qe=n._Any=function(){return(Qe=n._Any=n.asm.Any).apply(null,arguments)},$e=n._ArgMax=function(){return($e=n._ArgMax=n.asm.ArgMax).apply(null,arguments)},et=n._ArgMin=function(){return(et=n._ArgMin=n.asm.ArgMin).apply(null,arguments)},tt=n._Asin=function(){return(tt=n._Asin=n.asm.Asin).apply(null,arguments)},nt=n._Asinh=function(){return(nt=n._Asinh=n.asm.Asinh).apply(null,arguments)},rt=n._Atan=function(){return(rt=n._Atan=n.asm.Atan).apply(null,arguments)},it=n._Atan2=function(){return(it=n._Atan2=n.asm.Atan2).apply(null,arguments)},at=n._Atanh=function(){return(at=n._Atanh=n.asm.Atanh).apply(null,arguments)},ot=n._AvgPool=function(){return(ot=n._AvgPool=n.asm.AvgPool).apply(null,arguments)},st=n._AvgPool3D=function(){return(st=n._AvgPool3D=n.asm.AvgPool3D).apply(null,arguments)},ct=n._AvgPool3DGrad=function(){return(ct=n._AvgPool3DGrad=n.asm.AvgPool3DGrad).apply(null,arguments)},lt=n._AvgPoolGrad=function(){return(lt=n._AvgPoolGrad=n.asm.AvgPoolGrad).apply(null,arguments)},ut=n._BatchMatMul=function(){return(ut=n._BatchMatMul=n.asm.BatchMatMul).apply(null,arguments)},dt=n._Bincount=function(){return(dt=n._Bincount=n.asm.Bincount).apply(null,arguments)},ft=n._BitwiseAnd=function(){return(ft=n._BitwiseAnd=n.asm.BitwiseAnd).apply(null,arguments)},pt=n._Ceil=function(){return(pt=n._Ceil=n.asm.Ceil).apply(null,arguments)},mt=n._ClipByValue=function(){return(mt=n._ClipByValue=n.asm.ClipByValue).apply(null,arguments)},ht=n._Conv2D=function(){return(ht=n._Conv2D=n.asm.Conv2D).apply(null,arguments)},gt=n._Conv2DBackpropInput=function(){return(gt=n._Conv2DBackpropInput=n.asm.Conv2DBackpropInput).apply(null,arguments)},_t=n._Conv3D=function(){return(_t=n._Conv3D=n.asm.Conv3D).apply(null,arguments)},vt=n._Conv3DBackpropFilterV2=function(){return(vt=n._Conv3DBackpropFilterV2=n.asm.Conv3DBackpropFilterV2).apply(null,arguments)},yt=n._Conv3DBackpropInputV2=function(){return(yt=n._Conv3DBackpropInputV2=n.asm.Conv3DBackpropInputV2).apply(null,arguments)},bt=n._Cos=function(){return(bt=n._Cos=n.asm.Cos).apply(null,arguments)},xt=n._Cosh=function(){return(xt=n._Cosh=n.asm.Cosh).apply(null,arguments)},St=n._CropAndResize=function(){return(St=n._CropAndResize=n.asm.CropAndResize).apply(null,arguments)},Ct=n._Cumprod=function(){return(Ct=n._Cumprod=n.asm.Cumprod).apply(null,arguments)},wt=n._Cumsum=function(){return(wt=n._Cumsum=n.asm.Cumsum).apply(null,arguments)},Tt=n._DenseBincount=function(){return(Tt=n._DenseBincount=n.asm.DenseBincount).apply(null,arguments)},Et=n._DepthToSpace=function(){return(Et=n._DepthToSpace=n.asm.DepthToSpace).apply(null,arguments)},Dt=n._DepthwiseConv2dNative=function(){return(Dt=n._DepthwiseConv2dNative=n.asm.DepthwiseConv2dNative).apply(null,arguments)},Ot=n._Diag=function(){return(Ot=n._Diag=n.asm.Diag).apply(null,arguments)},kt=n._Dilation2D=function(){return(kt=n._Dilation2D=n.asm.Dilation2D).apply(null,arguments)},At=n._Dilation2DBackpropFilter=function(){return(At=n._Dilation2DBackpropFilter=n.asm.Dilation2DBackpropFilter).apply(null,arguments)},jt=n._Dilation2DBackpropInput=function(){return(jt=n._Dilation2DBackpropInput=n.asm.Dilation2DBackpropInput).apply(null,arguments)},Mt=n._Elu=function(){return(Mt=n._Elu=n.asm.Elu).apply(null,arguments)},Nt=n._EluGrad=function(){return(Nt=n._EluGrad=n.asm.EluGrad).apply(null,arguments)},Pt=n._Equal=function(){return(Pt=n._Equal=n.asm.Equal).apply(null,arguments)},Ft=n._Erf=function(){return(Ft=n._Erf=n.asm.Erf).apply(null,arguments)},It=n._Exp=function(){return(It=n._Exp=n.asm.Exp).apply(null,arguments)},Lt=n._Expm1=function(){return(Lt=n._Expm1=n.asm.Expm1).apply(null,arguments)},Rt=n._FlipLeftRight=function(){return(Rt=n._FlipLeftRight=n.asm.FlipLeftRight).apply(null,arguments)},zt=n._Floor=function(){return(zt=n._Floor=n.asm.Floor).apply(null,arguments)},Bt=n._FloorDiv=function(){return(Bt=n._FloorDiv=n.asm.FloorDiv).apply(null,arguments)},Vt=n._FusedBatchNorm=function(){return(Vt=n._FusedBatchNorm=n.asm.FusedBatchNorm).apply(null,arguments)},Ht=n._FusedConv2D=function(){return(Ht=n._FusedConv2D=n.asm.FusedConv2D).apply(null,arguments)},Ut=n._FusedDepthwiseConv2D=function(){return(Ut=n._FusedDepthwiseConv2D=n.asm.FusedDepthwiseConv2D).apply(null,arguments)},Wt=n._Gather=function(){return(Wt=n._Gather=n.asm.Gather).apply(null,arguments)},Gt=n._GatherNd=function(){return(Gt=n._GatherNd=n.asm.GatherNd).apply(null,arguments)},Kt=n._Greater=function(){return(Kt=n._Greater=n.asm.Greater).apply(null,arguments)},qt=n._GreaterEqual=function(){return(qt=n._GreaterEqual=n.asm.GreaterEqual).apply(null,arguments)},Jt=n._IsFinite=function(){return(Jt=n._IsFinite=n.asm.IsFinite).apply(null,arguments)},Yt=n._IsInf=function(){return(Yt=n._IsInf=n.asm.IsInf).apply(null,arguments)},Xt=n._IsNan=function(){return(Xt=n._IsNan=n.asm.IsNan).apply(null,arguments)},Zt=n._LRN=function(){return(Zt=n._LRN=n.asm.LRN).apply(null,arguments)},Qt=n._LRNGrad=function(){return(Qt=n._LRNGrad=n.asm.LRNGrad).apply(null,arguments)},$t=n._LeakyRelu=function(){return($t=n._LeakyRelu=n.asm.LeakyRelu).apply(null,arguments)},en=n._Less=function(){return(en=n._Less=n.asm.Less).apply(null,arguments)},tn=n._LessEqual=function(){return(tn=n._LessEqual=n.asm.LessEqual).apply(null,arguments)},nn=n._LinSpace=function(){return(nn=n._LinSpace=n.asm.LinSpace).apply(null,arguments)},rn=n._Log=function(){return(rn=n._Log=n.asm.Log).apply(null,arguments)},an=n._Log1p=function(){return(an=n._Log1p=n.asm.Log1p).apply(null,arguments)},on=n._LogicalAnd=function(){return(on=n._LogicalAnd=n.asm.LogicalAnd).apply(null,arguments)},sn=n._LogicalNot=function(){return(sn=n._LogicalNot=n.asm.LogicalNot).apply(null,arguments)},cn=n._LogicalOr=function(){return(cn=n._LogicalOr=n.asm.LogicalOr).apply(null,arguments)},ln=n._LogicalXor=function(){return(ln=n._LogicalXor=n.asm.LogicalXor).apply(null,arguments)},un=n._Max=function(){return(un=n._Max=n.asm.Max).apply(null,arguments)},dn=n._MaxPool=function(){return(dn=n._MaxPool=n.asm.MaxPool).apply(null,arguments)},fn=n._MaxPool3D=function(){return(fn=n._MaxPool3D=n.asm.MaxPool3D).apply(null,arguments)},pn=n._MaxPool3DGrad=function(){return(pn=n._MaxPool3DGrad=n.asm.MaxPool3DGrad).apply(null,arguments)},mn=n._MaxPoolGrad=function(){return(mn=n._MaxPoolGrad=n.asm.MaxPoolGrad).apply(null,arguments)},hn=n._MaxPoolWithArgmax=function(){return(hn=n._MaxPoolWithArgmax=n.asm.MaxPoolWithArgmax).apply(null,arguments)},gn=n._Maximum=function(){return(gn=n._Maximum=n.asm.Maximum).apply(null,arguments)},_n=n._Mean=function(){return(_n=n._Mean=n.asm.Mean).apply(null,arguments)},vn=n._Min=function(){return(vn=n._Min=n.asm.Min).apply(null,arguments)},yn=n._Minimum=function(){return(yn=n._Minimum=n.asm.Minimum).apply(null,arguments)},bn=n._MirrorPad=function(){return(bn=n._MirrorPad=n.asm.MirrorPad).apply(null,arguments)},xn=n._Mod=function(){return(xn=n._Mod=n.asm.Mod).apply(null,arguments)},Sn=n._Multinomial=function(){return(Sn=n._Multinomial=n.asm.Multinomial).apply(null,arguments)},Cn=n._Multiply=function(){return(Cn=n._Multiply=n.asm.Multiply).apply(null,arguments)},wn=n._Neg=function(){return(wn=n._Neg=n.asm.Neg).apply(null,arguments)},Tn=n._NonMaxSuppressionV3=function(){return(Tn=n._NonMaxSuppressionV3=n.asm.NonMaxSuppressionV3).apply(null,arguments)},En=n._NonMaxSuppressionV4=function(){return(En=n._NonMaxSuppressionV4=n.asm.NonMaxSuppressionV4).apply(null,arguments)},Dn=n._NonMaxSuppressionV5=function(){return(Dn=n._NonMaxSuppressionV5=n.asm.NonMaxSuppressionV5).apply(null,arguments)},On=n._NotEqual=function(){return(On=n._NotEqual=n.asm.NotEqual).apply(null,arguments)},kn=n._OneHot=function(){return(kn=n._OneHot=n.asm.OneHot).apply(null,arguments)},An=n._PadV2=function(){return(An=n._PadV2=n.asm.PadV2).apply(null,arguments)},jn=n._Pow=function(){return(jn=n._Pow=n.asm.Pow).apply(null,arguments)},Mn=n._Prelu=function(){return(Mn=n._Prelu=n.asm.Prelu).apply(null,arguments)},Nn=n._Prod=function(){return(Nn=n._Prod=n.asm.Prod).apply(null,arguments)},Pn=n._RealDiv=function(){return(Pn=n._RealDiv=n.asm.RealDiv).apply(null,arguments)},Fn=n._Reciprocal=function(){return(Fn=n._Reciprocal=n.asm.Reciprocal).apply(null,arguments)},In=n._Relu=function(){return(In=n._Relu=n.asm.Relu).apply(null,arguments)},Ln=n._Relu6=function(){return(Ln=n._Relu6=n.asm.Relu6).apply(null,arguments)},Rn=n._ResizeBilinear=function(){return(Rn=n._ResizeBilinear=n.asm.ResizeBilinear).apply(null,arguments)},zn=n._ResizeBilinearGrad=function(){return(zn=n._ResizeBilinearGrad=n.asm.ResizeBilinearGrad).apply(null,arguments)},Bn=n._ResizeNearestNeighbor=function(){return(Bn=n._ResizeNearestNeighbor=n.asm.ResizeNearestNeighbor).apply(null,arguments)},Vn=n._ResizeNearestNeighborGrad=function(){return(Vn=n._ResizeNearestNeighborGrad=n.asm.ResizeNearestNeighborGrad).apply(null,arguments)},Hn=n._Reverse=function(){return(Hn=n._Reverse=n.asm.Reverse).apply(null,arguments)},Un=n._RotateWithOffset=function(){return(Un=n._RotateWithOffset=n.asm.RotateWithOffset).apply(null,arguments)},Wn=n._Round=function(){return(Wn=n._Round=n.asm.Round).apply(null,arguments)},Gn=n._Rsqrt=function(){return(Gn=n._Rsqrt=n.asm.Rsqrt).apply(null,arguments)},Kn=n._ScatterNd=function(){return(Kn=n._ScatterNd=n.asm.ScatterNd).apply(null,arguments)},qn=n._SearchSorted=function(){return(qn=n._SearchSorted=n.asm.SearchSorted).apply(null,arguments)},Jn=n._SelectV2=function(){return(Jn=n._SelectV2=n.asm.SelectV2).apply(null,arguments)},Yn=n._Selu=function(){return(Yn=n._Selu=n.asm.Selu).apply(null,arguments)},Xn=n._Sigmoid=function(){return(Xn=n._Sigmoid=n.asm.Sigmoid).apply(null,arguments)},Zn=n._Sign=function(){return(Zn=n._Sign=n.asm.Sign).apply(null,arguments)},Qn=n._Sin=function(){return(Qn=n._Sin=n.asm.Sin).apply(null,arguments)},$n=n._Sinh=function(){return($n=n._Sinh=n.asm.Sinh).apply(null,arguments)},er=n._Softmax=function(){return(er=n._Softmax=n.asm.Softmax).apply(null,arguments)},tr=n._Softplus=function(){return(tr=n._Softplus=n.asm.Softplus).apply(null,arguments)},nr=n._SparseFillEmptyRows=function(){return(nr=n._SparseFillEmptyRows=n.asm.SparseFillEmptyRows).apply(null,arguments)},rr=n._SparseReshape=function(){return(rr=n._SparseReshape=n.asm.SparseReshape).apply(null,arguments)},ir=n._SparseSegmentReduction=function(){return(ir=n._SparseSegmentReduction=n.asm.SparseSegmentReduction).apply(null,arguments)},ar=n._SparseToDense=function(){return(ar=n._SparseToDense=n.asm.SparseToDense).apply(null,arguments)},or=n._Sqrt=function(){return(or=n._Sqrt=n.asm.Sqrt).apply(null,arguments)},sr=n._Square=function(){return(sr=n._Square=n.asm.Square).apply(null,arguments)},cr=n._SquaredDifference=function(){return(cr=n._SquaredDifference=n.asm.SquaredDifference).apply(null,arguments)},lr=n._Step=function(){return(lr=n._Step=n.asm.Step).apply(null,arguments)},ur=n._StridedSlice=function(){return(ur=n._StridedSlice=n.asm.StridedSlice).apply(null,arguments)},dr=n._Sub=function(){return(dr=n._Sub=n.asm.Sub).apply(null,arguments)},fr=n._Sum=function(){return(fr=n._Sum=n.asm.Sum).apply(null,arguments)},pr=n._Tan=function(){return(pr=n._Tan=n.asm.Tan).apply(null,arguments)},mr=n._Tanh=function(){return(mr=n._Tanh=n.asm.Tanh).apply(null,arguments)},hr=n._TensorScatterUpdate=function(){return(hr=n._TensorScatterUpdate=n.asm.TensorScatterUpdate).apply(null,arguments)},gr=n._Tile=function(){return(gr=n._Tile=n.asm.Tile).apply(null,arguments)},_r=n._TopK=function(){return(_r=n._TopK=n.asm.TopK).apply(null,arguments)},vr=n._Transform=function(){return(vr=n._Transform=n.asm.Transform).apply(null,arguments)},yr=n._Transpose=function(){return(yr=n._Transpose=n.asm.Transpose).apply(null,arguments)},br=n.__FusedMatMul=function(){return(br=n.__FusedMatMul=n.asm._FusedMatMul).apply(null,arguments)},xr=n._malloc=function(){return(xr=n._malloc=n.asm.malloc).apply(null,arguments)},Sr=n._free=function(){return(Sr=n._free=n.asm.free).apply(null,arguments)},Cr=n.___errno_location=function(){return(Cr=n.___errno_location=n.asm.__errno_location).apply(null,arguments)},wr=n.stackSave=function(){return(wr=n.stackSave=n.asm.stackSave).apply(null,arguments)},Tr=n.stackRestore=function(){return(Tr=n.stackRestore=n.asm.stackRestore).apply(null,arguments)},Er=n.stackAlloc=function(){return(Er=n.stackAlloc=n.asm.stackAlloc).apply(null,arguments)},Dr=n.dynCall_iijjiiii=function(){return(Dr=n.dynCall_iijjiiii=n.asm.dynCall_iijjiiii).apply(null,arguments)},Or=n.dynCall_jiji=function(){return(Or=n.dynCall_jiji=n.asm.dynCall_jiji).apply(null,arguments)};n.cwrap=Re;var kr;fe=function e(){kr||Ar(),kr||(fe=e)};function Ar(e){if(e||=s,ue>0||(oe(),ue>0))return;function t(){kr||(kr=!0,n.calledRun=!0,!S&&(se(),r(n),n.onRuntimeInitialized&&n.onRuntimeInitialized(),ce()))}n.setStatus?(n.setStatus(`Running...`),setTimeout(function(){setTimeout(function(){n.setStatus(``)},1),t()},1)):t()}if(n.preInit)for(typeof n.preInit==`function`&&(n.preInit=[n.preInit]);n.preInit.length>0;)n.preInit.pop()();Ar();var jr;a&&(jr={uncaughtException:process.listeners(`uncaughtException`).filter(function(e){return!a.uncaughtException.indexOf(e)>-1}),unhandledRejection:process.listeners(`unhandledRejection`).filter(function(e){return!a.unhandledRejection.indexOf(e)>-1})});var Mr;if(t!==void 0)Mr=t;else if(typeof WasmBackendModuleThreadedSimd<`u`)Mr=WasmBackendModuleThreadedSimd;else throw Error(`Could not find wasm module in post.js`);if(jr){var Nr=Mr._dispose;Mr._dispose=function(){Nr(),jr.uncaughtException.forEach(function(e){process.removeListener(`uncaughtException`,e)}),jr.unhandledRejection.forEach(function(e){process.removeListener(`unhandledRejection`,e)})}}return t.ready})})();typeof e==`object`&&typeof t==`object`?t.exports=n:typeof define==`function`&&define.amd?define([],function(){return n}):typeof e==`object`&&(e.WasmBackendModule=n)}));J();var R2=u(F2()),z2=I2(),B2=u(L2()),V2=R2.default||R2,H2=B2.default||B2,U2=class extends g{constructor(e){super(),this.wasm=e,this.dataIdNextNumber=1,this.wasm.tfjs.initWithThreadsCount(t4),n4=this.wasm.tfjs.getThreadsCount(),this.dataIdMap=new h(this,fo())}write(e,t,n){let r={id:this.dataIdNextNumber++};return this.move(r,e,t,n,1),r}numDataIds(){return this.dataIdMap.numDataIds()}async time(e){let t=ji();return e(),{kernelMs:ji()-t}}move(e,t,n,r,i){let a=this.dataIdNextNumber++;if(r===`string`){let o=t;this.dataIdMap.set(e,{id:a,stringBytes:o,shape:n,dtype:r,memoryOffset:null,refCount:i});return}let o=k(n),s=o*me(r),c=this.wasm._malloc(s)>>>0;this.dataIdMap.set(e,{id:a,memoryOffset:c,shape:n,dtype:r,refCount:i}),this.wasm.tfjs.registerTensor(a,o,c),t!=null&&this.wasm.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,s),c)}async read(e){return this.readSync(e)}readSync(e,t,n){let{memoryOffset:r,dtype:i,shape:a,stringBytes:o}=this.dataIdMap.get(e);if(i===`string`)return(t==null||t===0)&&(n==null||n>=o.length)?o:o.slice(t,n);t||=0,n||=k(a);let s=me(i);return q2(this.wasm.HEAPU8.slice(r+t*s,r+n*s).buffer,i)}disposeData(e,t=!1){if(this.dataIdMap.has(e)){let n=this.dataIdMap.get(e);if(n.refCount--,!t&&n.refCount>0)return!1;this.wasm._free(n.memoryOffset),this.wasm.tfjs.disposeData(n.id),this.dataIdMap.delete(e)}return!0}refCount(e){return this.dataIdMap.has(e)?this.dataIdMap.get(e).refCount:0}incRef(e){let t=this.dataIdMap.get(e);t!=null&&t.refCount++}floatPrecision(){return 32}getMemoryOffset(e){return this.dataIdMap.get(e).memoryOffset}dispose(){this.wasm.tfjs.dispose(),`PThread`in this.wasm&&this.wasm.PThread.terminateAllThreads(),this.wasm=null}memory(){return{unreliable:!1}}makeOutput(e,t,n,r){let i;if(n==null)i=this.write(r??null,e,t);else{let r=this.dataIdNextNumber++;i={id:r},this.dataIdMap.set(i,{id:r,memoryOffset:n,shape:e,dtype:t,refCount:1});let a=k(e);this.wasm.tfjs.registerTensor(r,a,n)}return{dataId:i,shape:e,dtype:t}}typedArrayFromHeap({shape:e,dtype:t,dataId:n}){let r=this.wasm.HEAPU8.buffer,{memoryOffset:i}=this.dataIdMap.get(n),a=k(e);switch(t){case`float32`:return new Float32Array(r,i,a);case`int32`:return new Int32Array(r,i,a);case`bool`:return new Uint8Array(r,i,a);default:throw Error(`Unknown dtype ${t}`)}}};function W2(e){return(t,n)=>(Mi(e,{credentials:`same-origin`}).then(r=>{r.ok||t.env.a(`failed to load wasm binary file at '${e}'`),r.arrayBuffer().then(e=>{WebAssembly.instantiate(e,t).then(e=>{n(e.instance,e.module)})})}),{})}function G2(e,t,n){if(Y2!=null)return Y2;let r=`tfjs-backend-wasm.wasm`;return e&&t?r=`tfjs-backend-wasm-threaded-simd.wasm`:e&&(r=`tfjs-backend-wasm-simd.wasm`),Z2!=null&&Z2[r]!=null?Z2[r]:n+r}async function K2(){let[e,t]=await Promise.all([P().getAsync(`WASM_HAS_SIMD_SUPPORT`),P().getAsync(`WASM_HAS_MULTITHREAD_SUPPORT`)]);return new Promise((n,r)=>{let i={};i.locateFile=(n,r)=>{if(n.endsWith(`.worker.js`)){let e=z2.wasmWorkerContents.replace(/\n/g,`\\n`),t=new Blob([e],{type:`application/javascript`});return URL.createObjectURL(t)}return n.endsWith(`.wasm`)?G2(e,t,X2??r):r+n},$2&&(i.instantiateWasm=W2(G2(e,t,X2??``)));let a=!1;i.onAbort=()=>{a||Q2||(Q2=!0,r({message:"Make sure the server can serve the `.wasm` file relative to the bundled js file. For more details see https://github.com/tensorflow/tfjs/blob/master/tfjs-backend-wasm/README.md#using-bundlers"}))};let o;t&&e&&Y2==null?(i.mainScriptUrlOrBlob=new Blob([`var WasmBackendModuleThreadedSimd = `+V2.toString()],{type:`text/javascript`}),o=V2(i)):o=H2(i),o.then(e=>{a=!0,Q2=!1,e.tfjs={init:e.cwrap(`init`,null,[]),initWithThreadsCount:e.cwrap(`init_with_threads_count`,null,[`number`]),getThreadsCount:e.cwrap(`get_threads_count`,`number`,[]),registerTensor:e.cwrap(`register_tensor`,null,[`number`,`number`,`number`]),disposeData:e.cwrap(`dispose_data`,null,[`number`]),dispose:e.cwrap(`dispose`,null,[])},n({wasm:e})}).catch(r)})}function q2(e,t){switch(t){case`float32`:return new Float32Array(e);case`int32`:return new Int32Array(e);case`bool`:return new Uint8Array(e);default:throw Error(`Unknown dtype ${t}`)}}var J2=[`tfjs-backend-wasm.wasm`,`tfjs-backend-wasm-simd.wasm`,`tfjs-backend-wasm-threaded-simd.wasm`],Y2=null,X2=null,Z2={},Q2=!1,$2=!1;function e4(e,t=!1){if(Q2)throw Error("The WASM backend was already initialized. Make sure you call `setWasmPaths()` before you call `tf.setBackend()` or `tf.ready()`");if(typeof e==`string`)X2=e;else{Z2=e;let t=J2.filter(e=>Z2[e]==null);if(t.length>0)throw Error(`There were no entries found for the following binaries: ${t.join(`,`)}. Please either call setWasmPaths with a map providing a path for each binary, or with a string indicating the directory where all the binaries can be found.`)}$2=t}var t4=-1,n4=-1;J(),To(`wasm`,async()=>{let{wasm:e}=await K2();return new U2(e)},2);var r4=o((()=>{J(),P().registerFlag(`KEEP_INTERMEDIATE_TENSORS`,()=>!1,e=>{e&&console.warn(`Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.`)})})),i4,a4,o4=o((()=>{(function(e){e[e.DT_INVALID=0]=`DT_INVALID`,e[e.DT_FLOAT=1]=`DT_FLOAT`,e[e.DT_DOUBLE=2]=`DT_DOUBLE`,e[e.DT_INT32=3]=`DT_INT32`,e[e.DT_UINT8=4]=`DT_UINT8`,e[e.DT_INT16=5]=`DT_INT16`,e[e.DT_INT8=6]=`DT_INT8`,e[e.DT_STRING=7]=`DT_STRING`,e[e.DT_COMPLEX64=8]=`DT_COMPLEX64`,e[e.DT_INT64=9]=`DT_INT64`,e[e.DT_BOOL=10]=`DT_BOOL`,e[e.DT_QINT8=11]=`DT_QINT8`,e[e.DT_QUINT8=12]=`DT_QUINT8`,e[e.DT_QINT32=13]=`DT_QINT32`,e[e.DT_BFLOAT16=14]=`DT_BFLOAT16`,e[e.DT_QINT16=15]=`DT_QINT16`,e[e.DT_QUINT16=16]=`DT_QUINT16`,e[e.DT_UINT16=17]=`DT_UINT16`,e[e.DT_COMPLEX128=18]=`DT_COMPLEX128`,e[e.DT_HALF=19]=`DT_HALF`,e[e.DT_RESOURCE=20]=`DT_RESOURCE`,e[e.DT_VARIANT=21]=`DT_VARIANT`,e[e.DT_UINT32=22]=`DT_UINT32`,e[e.DT_UINT64=23]=`DT_UINT64`,e[e.DT_FLOAT_REF=101]=`DT_FLOAT_REF`,e[e.DT_DOUBLE_REF=102]=`DT_DOUBLE_REF`,e[e.DT_INT32_REF=103]=`DT_INT32_REF`,e[e.DT_UINT8_REF=104]=`DT_UINT8_REF`,e[e.DT_INT16_REF=105]=`DT_INT16_REF`,e[e.DT_INT8_REF=106]=`DT_INT8_REF`,e[e.DT_STRING_REF=107]=`DT_STRING_REF`,e[e.DT_COMPLEX64_REF=108]=`DT_COMPLEX64_REF`,e[e.DT_INT64_REF=109]=`DT_INT64_REF`,e[e.DT_BOOL_REF=110]=`DT_BOOL_REF`,e[e.DT_QINT8_REF=111]=`DT_QINT8_REF`,e[e.DT_QUINT8_REF=112]=`DT_QUINT8_REF`,e[e.DT_QINT32_REF=113]=`DT_QINT32_REF`,e[e.DT_BFLOAT16_REF=114]=`DT_BFLOAT16_REF`,e[e.DT_QINT16_REF=115]=`DT_QINT16_REF`,e[e.DT_QUINT16_REF=116]=`DT_QUINT16_REF`,e[e.DT_UINT16_REF=117]=`DT_UINT16_REF`,e[e.DT_COMPLEX128_REF=118]=`DT_COMPLEX128_REF`,e[e.DT_HALF_REF=119]=`DT_HALF_REF`,e[e.DT_RESOURCE_REF=120]=`DT_RESOURCE_REF`,e[e.DT_VARIANT_REF=121]=`DT_VARIANT_REF`,e[e.DT_UINT32_REF=122]=`DT_UINT32_REF`,e[e.DT_UINT64_REF=123]=`DT_UINT64_REF`})(i4||={}),(function(e){(function(e){e[e.LEGACY=0]=`LEGACY`,e[e.V1=1]=`V1`,e[e.V2=2]=`V2`})(e.CheckpointFormatVersion||={})})(a4||={})}));function s4(e,t){u4[e]={tfOpName:e,category:`custom`,inputs:[],attrs:[],customExecutor:t}}function c4(e){return u4[e]}function l4(e){delete u4[e]}var u4,d4=o((()=>{u4={}}));function $(e,t,n,r,i){let a=t.inputParams[e];if(a&&a.inputIndexStart!==void 0){let e=a.inputIndexStart,o=a.inputIndexEnd===0?void 0:a.inputIndexEnd===void 0?e+1:a.inputIndexEnd,s=e<0?t.inputNames.length+e:e;if(a.type===`tensor`)return f4(t.inputNames[s],n,r,i);if(a.type===`tensors`){let a=t.inputs.slice(e,o);return t.inputNames.slice(e,o).filter((e,t)=>a[t]?.op!==`NoOp`).map(e=>f4(e,n,r,i))}let c=f4(t.inputNames[s],n,r,i),l=c.dataSync();return a.type===`number`?l[0]:Ce(c.shape,l)}let o=t.attrParams[e];return o&&o.value}function f4(e,t,n,r){let[i,a]=g4(e,n);if(r!=null){let e=r.getHashTableHandleByName(i);if(e!=null)return e}let o=n.currentContextIds.find(e=>!!t[h4(i,e)]);return o===void 0?void 0:t[h4(i,o)][a]}function p4(e,t,n){return t[h4(e,n.currentContextId)]}function m4(e,t){let[n,r,i]=g4(e,t);return[h4(n,t&&t.currentContextId),r,i]}function h4(e,t){return t?`${e}-${t}`:e}function g4(e,t){if(e===``)return[``,0,void 0];let n=t!=null&&t.parseNodeNameCache!=null;if(n){let n=t.parseNodeNameCache.get(e);if(n!=null)return n}let r=e.split(`:`),i;if(r.length===1)i=[e,0,void 0];else{let e=r[0],t=r.length===3?r[1]:void 0;i=[e,Number(r[r.length-1]),t]}return n&&t.parseNodeNameCache.set(e,i),i}function _4(e,t,n){let r=$(`pad`,e,t,n);if(r===`explicit`){r=$(`explicitPaddings`,e,t,n);let i=[[0,0],[0,0],[0,0],[0,0]];for(let e=0;e<4;e++)i[e][0]=r[e*2],i[e][1]=r[e*2+1];return i}return r}function v4(e){return e.kept?e:nc(e)}var y4=o((()=>{J()})),b4=c({json:()=>x4}),x4,S4=o((()=>{x4=[{tfOpName:`Add`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`AddV2`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`AddN`,category:`arithmetic`,inputs:[{start:0,end:0,name:`tensors`,type:`tensors`}]},{tfOpName:`BiasAdd`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0},{tfName:`data_format`,name:`dataFormat`,type:`string`,notSupported:!0}]},{tfOpName:`Sub`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`RealDiv`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Div`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`DivNoNan`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`FloorDiv`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Mul`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Maximum`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Minimum`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Pow`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`SquaredDifference`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Mod`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`FloorMod`,category:`arithmetic`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]}]})),C4=c({json:()=>w4}),w4,T4=o((()=>{w4=[{tfOpName:`Abs`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Acos`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Asin`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Atan`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Atan2`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`y`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Ceil`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`ClipByValue`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`clipValueMin`,type:`number`},{start:2,name:`clipValueMax`,type:`number`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Complex`,category:`basic_math`,inputs:[{start:0,name:`real`,type:`tensor`},{start:1,name:`imag`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`ComplexAbs`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Cos`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Cosh`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Elu`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Exp`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Floor`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Log`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Imag`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0},{tfName:`Tout`,name:`outputType`,type:`dtype`,notSupported:!0}]},{tfOpName:`Neg`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Real`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0},{tfName:`Tout`,name:`outputType`,type:`dtype`,notSupported:!0}]},{tfOpName:`Prelu`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`alpha`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Relu`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Relu6`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Selu`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Sigmoid`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Sin`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Sinh`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Sqrt`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Rsqrt`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Square`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Tan`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Tanh`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Sign`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Round`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Expm1`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Log1p`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Reciprocal`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Softplus`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Asinh`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Acosh`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Atanh`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Erf`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`LeakyRelu`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`alpha`,name:`alpha`,type:`number`,defaultValue:.2},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`IsNan`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`IsFinite`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`IsInf`,category:`basic_math`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]}]})),E4=c({json:()=>D4}),D4,O4=o((()=>{D4=[{tfOpName:`EmptyTensorList`,category:`control`,inputs:[{start:0,name:`elementShape`,type:`shape`},{start:1,name:`maxNumElements`,type:`number`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`LoopCond`,category:`control`,inputs:[{start:0,name:`pred`,type:`tensor`}]},{tfOpName:`Switch`,category:`control`,inputs:[{start:0,name:`data`,type:`tensor`},{start:1,name:`pred`,type:`tensor`}]},{tfOpName:`Merge`,category:`control`,inputs:[{start:0,end:0,name:`tensors`,type:`tensors`}]},{tfOpName:`Enter`,category:`control`,inputs:[{start:0,name:`tensor`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0},{tfName:`frame_name`,name:`frameName`,type:`string`},{tfName:`is_constant`,name:`isConstant`,type:`bool`}]},{tfOpName:`Exit`,category:`control`,inputs:[{start:0,name:`tensor`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`NextIteration`,category:`control`,inputs:[{start:0,name:`tensor`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`TensorArrayV3`,category:`control`,inputs:[{start:0,name:`size`,type:`number`}],attrs:[{tfName:`dtype`,name:`dtype`,type:`dtype`},{tfName:`element_shape`,name:`elementShape`,type:`shape`},{tfName:`dynamic_size`,name:`dynamicSize`,type:`bool`},{tfName:`clear_after_read`,name:`clearAfterRead`,type:`bool`},{tfName:`identical_element_shapes`,name:`identicalElementShapes`,type:`bool`},{tfName:`tensor_array_name`,name:`name`,type:`string`}]},{tfOpName:`TensorArrayWriteV3`,category:`control`,inputs:[{start:0,name:`tensorArrayId`,type:`tensor`},{start:1,name:`index`,type:`number`},{start:2,name:`tensor`,type:`tensor`},{start:3,name:`flowIn`,type:`number`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`TensorArrayReadV3`,category:`control`,inputs:[{start:0,name:`tensorArrayId`,type:`tensor`},{start:1,name:`index`,type:`number`},{start:2,name:`flowIn`,type:`number`}],attrs:[{tfName:`dtype`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`TensorArrayGatherV3`,category:`control`,inputs:[{start:0,name:`tensorArrayId`,type:`tensor`},{start:1,name:`indices`,type:`number[]`},{start:2,name:`flowIn`,type:`number`}],attrs:[{tfName:`dtype`,name:`dtype`,type:`dtype`},{tfName:`element_shape`,name:`elementShape`,type:`shape`}]},{tfOpName:`TensorArrayScatterV3`,category:`control`,inputs:[{start:0,name:`tensorArrayId`,type:`tensor`},{start:1,name:`indices`,type:`number[]`},{start:2,name:`tensor`,type:`tensor`},{start:3,name:`flowIn`,type:`number`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`}]},{tfOpName:`TensorArrayConcatV3`,category:`control`,inputs:[{start:0,name:`tensorArrayId`,type:`tensor`},{start:1,name:`flowIn`,type:`number`}],attrs:[{tfName:`dtype`,name:`dtype`,type:`dtype`},{tfName:`element_shape_except0`,name:`elementShapeExcept0`,type:`shape`,notSupported:!0}]},{tfOpName:`TensorArraySplitV3`,category:`control`,inputs:[{start:0,name:`tensorArrayId`,type:`tensor`},{start:1,name:`tensor`,type:`tensor`},{start:2,name:`lengths`,type:`number[]`},{start:3,name:`flowIn`,type:`number`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`}]},{tfOpName:`TensorArraySizeV3`,category:`control`,inputs:[{start:0,name:`tensorArrayId`,type:`tensor`},{start:1,name:`flowIn`,type:`number`}]},{tfOpName:`TensorArrayCloseV3`,category:`control`,inputs:[{start:0,name:`tensorArrayId`,type:`tensor`}]},{tfOpName:`StatelessIf`,category:`control`,inputs:[{start:0,name:`cond`,type:`tensor`},{start:1,end:0,name:`args`,type:`tensors`}],attrs:[{tfName:`then_branch`,name:`thenBranch`,type:`func`},{tfName:`else_branch`,name:`elseBranch`,type:`func`}]},{tfOpName:`If`,category:`control`,inputs:[{start:0,name:`cond`,type:`tensor`},{start:1,end:0,name:`args`,type:`tensors`}],attrs:[{tfName:`then_branch`,name:`thenBranch`,type:`func`},{tfName:`else_branch`,name:`elseBranch`,type:`func`}]},{tfOpName:`StatelessWhile`,category:`control`,inputs:[{start:0,end:0,name:`args`,type:`tensors`}],attrs:[{tfName:`cond`,name:`cond`,type:`func`},{tfName:`body`,name:`body`,type:`func`}]},{tfOpName:`While`,category:`control`,inputs:[{start:0,end:0,name:`args`,type:`tensors`}],attrs:[{tfName:`cond`,name:`cond`,type:`func`},{tfName:`body`,name:`body`,type:`func`}]},{tfOpName:`TensorListScatter`,category:`control`,inputs:[{start:0,name:`tensor`,type:`tensor`},{start:1,name:`indices`,type:`number[]`},{start:2,name:`elementShape`,type:`shape`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListScatterV2`,category:`control`,inputs:[{start:0,name:`tensor`,type:`tensor`},{start:1,name:`indices`,type:`number[]`},{start:2,name:`elementShape`,type:`shape`},{start:3,name:`numElements`,type:`number`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListGather`,category:`control`,inputs:[{start:0,name:`tensorListId`,type:`tensor`},{start:1,name:`indices`,type:`number[]`},{start:2,name:`elementShape`,type:`shape`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListGetItem`,category:`control`,inputs:[{start:0,name:`tensorListId`,type:`tensor`},{start:1,name:`index`,type:`number`},{start:2,name:`elementShape`,type:`shape`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListSetItem`,category:`control`,inputs:[{start:0,name:`tensorListId`,type:`tensor`},{start:1,name:`index`,type:`number`},{start:2,name:`tensor`,type:`tensor`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListReserve`,category:`control`,inputs:[{start:0,name:`elementShape`,type:`shape`},{start:1,name:`numElements`,type:`number`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListFromTensor`,category:`control`,inputs:[{start:0,name:`tensor`,type:`tensor`},{start:1,name:`elementShape`,type:`shape`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListStack`,category:`control`,inputs:[{start:0,name:`tensorListId`,type:`tensor`},{start:1,name:`elementShape`,type:`shape`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`},{tfName:`num_elements`,name:`numElements`,type:`dtype`}]},{tfOpName:`TensorListSplit`,category:`control`,inputs:[{start:0,name:`tensor`,type:`tensor`},{start:1,name:`elementShape`,type:`shape`},{start:2,name:`lengths`,type:`number[]`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListConcat`,category:`control`,inputs:[{start:0,name:`tensorListId`,type:`tensor`}],attrs:[{tfName:`element_shape`,name:`elementShape`,type:`shape`},{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListConcatV2`,category:`control`,inputs:[{start:0,name:`tensorListId`,type:`tensor`}],attrs:[{tfName:`element_shape`,name:`elementShape`,type:`shape`},{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListPopBack`,category:`control`,inputs:[{start:0,name:`tensorListId`,type:`tensor`},{start:1,name:`elementShape`,type:`shape`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListPushBack`,category:`control`,inputs:[{start:0,name:`tensorListId`,type:`tensor`},{start:1,name:`tensor`,type:`tensor`}],attrs:[{tfName:`element_dtype`,name:`elementDType`,type:`dtype`}]},{tfOpName:`TensorListLength`,category:`control`,inputs:[{start:0,name:`tensorListId`,type:`tensor`}]},{tfOpName:`TensorListResize`,category:`control`,inputs:[{start:0,name:`tensorListId`,type:`tensor`},{start:1,name:`size`,type:`number`}]}]})),k4=c({json:()=>A4}),A4,j4=o((()=>{A4=[{tfOpName:`AvgPool`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`data_format`,name:`dataFormat`,type:`string`,notSupported:!0},{tfName:`ksize`,name:`kernelSize`,type:`number[]`},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`MaxPool`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`data_format`,name:`dataFormat`,type:`string`,notSupported:!0},{tfName:`ksize`,name:`kernelSize`,type:`number[]`},{tfName:`explicit_paddings`,name:`explicitPaddings`,type:`number[]`,defaultValue:[],notSupported:!0},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`MaxPoolWithArgmax`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`ksize`,name:`kernelSize`,type:`number[]`},{tfName:`include_batch_in_index`,name:`includeBatchInIndex`,type:`bool`},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`AvgPool3D`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`data_format`,name:`dataFormat`,type:`string`,notSupported:!0},{tfName:`ksize`,name:`kernelSize`,type:`number[]`},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`MaxPool3D`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`data_format`,name:`dataFormat`,type:`string`,notSupported:!0},{tfName:`ksize`,name:`kernelSize`,type:`number[]`},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Conv1D`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`filter`,type:`tensor`}],attrs:[{tfName:`stride`,name:`stride`,type:`number`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`data_format`,name:`dataFormat`,type:`string`,defaultValue:`NWC`},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0},{tfName:`dilation`,name:`dilation`,type:`number`,defaultValue:1}]},{tfOpName:`Conv2D`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`filter`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0},{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`useCudnnOnGpu`,name:`useCudnnOnGpu`,type:`bool`},{tfName:`data_format`,name:`dataFormat`,type:`string`,defaultValue:`NHWC`},{tfName:`explicit_paddings`,name:`explicitPaddings`,type:`number[]`,defaultValue:[]},{tfName:`dilations`,name:`dilations`,type:`number[]`}]},{tfOpName:`_FusedConv2D`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`filter`,type:`tensor`},{start:2,end:0,name:`args`,type:`tensors`}],attrs:[{tfName:`num_args`,name:`numArgs`,type:`number`},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0},{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`explicit_paddings`,name:`explicitPaddings`,type:`number[]`,defaultValue:[]},{tfName:`use_cudnn_on_gpu`,name:`useCudnnOnGpu`,type:`bool`,defaultValue:!0},{tfName:`data_format`,name:`dataFormat`,type:`string`,defaultValue:`NHWC`},{tfName:`dilations`,name:`dilations`,type:`number[]`,defaultValue:[1,1,1,1]},{tfName:`fused_ops`,name:`fusedOps`,type:`string[]`,defaultValue:[]},{tfName:`epsilon`,name:`epsilon`,type:`number`,defaultValue:1e-4},{tfName:`leakyrelu_alpha`,name:`leakyreluAlpha`,type:`number`,defaultValue:.2}]},{tfOpName:`Conv2DBackpropInput`,category:`convolution`,inputs:[{start:2,name:`x`,type:`tensor`},{start:1,name:`filter`,type:`tensor`},{start:0,name:`outputShape`,type:`number[]`}],attrs:[{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`data_format`,name:`dataFormat`,type:`string`,notSupported:!0},{tfName:`explicit_paddings`,name:`explicitPaddings`,type:`number[]`,defaultValue:[]},{tfName:`dilations`,name:`dilations`,type:`number[]`,notSupported:!0}]},{tfOpName:`DepthwiseConv2d`,category:`convolution`,inputs:[{start:0,name:`input`,type:`tensor`},{start:1,name:`filter`,type:`tensor`}],attrs:[{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`data_format`,name:`dataFormat`,type:`string`,defaultValue:`NHWC`},{tfName:`explicit_paddings`,name:`explicitPaddings`,type:`number[]`,defaultValue:[]},{tfName:`dilations`,name:`dilations`,type:`number[]`}]},{tfOpName:`DepthwiseConv2dNative`,category:`convolution`,inputs:[{start:0,name:`input`,type:`tensor`},{start:1,name:`filter`,type:`tensor`}],attrs:[{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`data_format`,name:`dataFormat`,type:`string`,defaultValue:`NHWC`},{tfName:`explicit_paddings`,name:`explicitPaddings`,type:`number[]`,defaultValue:[]},{tfName:`dilations`,name:`dilations`,type:`number[]`}]},{tfOpName:`FusedDepthwiseConv2dNative`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`filter`,type:`tensor`},{start:2,end:0,name:`args`,type:`tensors`}],attrs:[{tfName:`num_args`,name:`numArgs`,type:`number`},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0},{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`data_format`,name:`dataFormat`,type:`string`,defaultValue:`NHWC`},{tfName:`dilations`,name:`dilations`,type:`number[]`,defaultValue:[1,1,1,1]},{tfName:`fused_ops`,name:`fusedOps`,type:`string[]`,defaultValue:[]},{tfName:`explicit_paddings`,name:`explicitPaddings`,type:`number[]`,defaultValue:[]}]},{tfOpName:`Conv3D`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`filter`,type:`tensor`}],attrs:[{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`},{tfName:`data_format`,name:`dataFormat`,type:`string`,defaultValue:`NHWC`},{tfName:`dilations`,name:`dilations`,type:`number[]`}]},{tfOpName:`Dilation2D`,category:`convolution`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`filter`,type:`tensor`}],attrs:[{tfName:`strides`,name:`strides`,type:`number[]`},{tfName:`rates`,name:`dilations`,type:`number[]`},{tfName:`padding`,name:`pad`,type:`string`}]}]})),M4=c({json:()=>N4}),N4,P4=o((()=>{N4=[{tfOpName:`Fill`,category:`creation`,inputs:[{start:0,name:`shape`,type:`number[]`},{start:1,name:`value`,type:`number`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`}]},{tfOpName:`LinSpace`,category:`creation`,inputs:[{start:0,name:`start`,type:`number`},{start:1,name:`stop`,type:`number`},{start:2,name:`num`,type:`number`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`OneHot`,category:`creation`,inputs:[{start:0,name:`indices`,type:`tensor`},{start:1,name:`depth`,type:`number`},{start:2,name:`onValue`,type:`number`,defaultValue:1},{start:3,name:`offValue`,type:`number`,defaultValue:0}],attrs:[{tfName:`axis`,name:`axis`,type:`number`,notSupported:!0},{tfName:`T`,name:`dtype`,type:`dtype`}]},{tfOpName:`Ones`,category:`creation`,inputs:[{start:0,name:`shape`,type:`number[]`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`}]},{tfOpName:`OnesLike`,category:`creation`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`dtype`,name:`dtype`,type:`dtype`}]},{tfOpName:`RandomStandardNormal`,category:`creation`,inputs:[{start:0,name:`shape`,type:`number[]`}],attrs:[{tfName:`seed`,name:`seed`,type:`number`,defaultValue:0},{tfName:`seed2`,name:`seed2`,type:`number`,defaultValue:0,notSupported:!0},{tfName:`dtype`,name:`dtype`,type:`dtype`},{tfName:`T`,name:`T`,type:`number`,notSupported:!0}]},{tfOpName:`RandomUniform`,category:`creation`,inputs:[{start:0,name:`shape`,type:`number[]`}],attrs:[{tfName:`minval`,name:`minval`,type:`number`,defaultValue:0},{tfName:`maxval`,name:`maxval`,type:`number`,defaultValue:1},{tfName:`dtype`,name:`dtype`,type:`dtype`},{tfName:`seed`,name:`seed`,type:`number`,defaultValue:0},{tfName:`seed2`,name:`seed2`,type:`number`,defaultValue:0,notSupported:!0},{tfName:`T`,name:`T`,type:`number`,notSupported:!0}]},{tfOpName:`RandomUniformInt`,category:`creation`,inputs:[{start:0,name:`shape`,type:`number[]`}],attrs:[{tfName:`minval`,name:`minval`,type:`number`},{tfName:`maxval`,name:`maxval`,type:`number`},{tfName:`seed`,name:`seed`,type:`number`,defaultValue:0},{tfName:`seed2`,name:`seed2`,type:`number`,defaultValue:0,notSupported:!0}]},{tfOpName:`Range`,category:`creation`,inputs:[{start:0,name:`start`,type:`number`},{start:1,name:`stop`,type:`number`},{start:2,name:`step`,type:`number`,defaultValue:0}],attrs:[{tfName:`Tidx`,name:`dtype`,type:`dtype`}]},{tfOpName:`TruncatedNormal`,category:`creation`,inputs:[{start:0,name:`shape`,type:`number[]`}],attrs:[{tfName:`means`,name:`mean`,type:`number`,defaultValue:0},{tfName:`stddev`,name:`stdDev`,type:`number`,defaultValue:1},{tfName:`seed`,name:`seed`,type:`number`},{tfName:`seed2`,name:`seed2`,type:`number`,defaultValue:0,notSupported:!0},{tfName:`dtype`,name:`dtype`,type:`dtype`},{tfName:`T`,name:`T`,type:`number`,notSupported:!0}]},{tfOpName:`Zeros`,category:`creation`,inputs:[{start:0,name:`shape`,type:`number[]`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`}]},{tfOpName:`ZerosLike`,category:`creation`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`}]},{tfOpName:`Multinomial`,category:`creation`,inputs:[{start:0,name:`logits`,type:`tensor`},{start:1,name:`numSamples`,type:`number`}],attrs:[{tfName:`seed`,name:`seed`,type:`number`},{tfName:`seed2`,name:`seed2`,type:`number`},{tfName:`T`,name:`dtype`,type:`dtype`},{tfName:`output_dtype`,name:`output_dtype`,type:`dtype`}]}]})),F4=c({json:()=>I4}),I4,L4=o((()=>{I4=[{tfOpName:`NonMaxSuppressionV2`,category:`dynamic`,inputs:[{start:0,name:`boxes`,type:`tensor`},{start:1,name:`scores`,type:`tensor`},{start:2,name:`maxOutputSize`,type:`number`},{start:3,name:`iouThreshold`,type:`number`}]},{tfOpName:`NonMaxSuppressionV3`,category:`dynamic`,inputs:[{start:0,name:`boxes`,type:`tensor`},{start:1,name:`scores`,type:`tensor`},{start:2,name:`maxOutputSize`,type:`number`},{start:3,name:`iouThreshold`,type:`number`},{start:4,name:`scoreThreshold`,type:`number`}]},{tfOpName:`NonMaxSuppressionV4`,category:`dynamic`,inputs:[{start:0,name:`boxes`,type:`tensor`},{start:1,name:`scores`,type:`tensor`},{start:2,name:`maxOutputSize`,type:`number`},{start:3,name:`iouThreshold`,type:`number`},{start:4,name:`scoreThreshold`,type:`number`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0},{tfName:`T_threshold`,name:`threshold`,type:`dtype`,notSupported:!0},{tfName:`pad_to_max_output_size`,name:`padToMaxOutputSize`,type:`bool`}]},{tfOpName:`NonMaxSuppressionV5`,category:`dynamic`,inputs:[{start:0,name:`boxes`,type:`tensor`},{start:1,name:`scores`,type:`tensor`},{start:2,name:`maxOutputSize`,type:`number`},{start:3,name:`iouThreshold`,type:`number`},{start:4,name:`scoreThreshold`,type:`number`},{start:5,name:`softNmsSigma`,type:`number`}]},{tfOpName:`Where`,category:`dynamic`,inputs:[{start:0,name:`condition`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`ListDiff`,category:`dynamic`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`y`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]}]})),R4=c({json:()=>z4}),z4,B4=o((()=>{z4=[{tfOpName:`LowerBound`,category:`evaluation`,inputs:[{start:0,name:`sortedSequence`,type:`tensor`},{start:1,name:`values`,type:`tensor`}]},{tfOpName:`TopKV2`,category:`evaluation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`k`,type:`number`}],attrs:[{tfName:`sorted`,name:`sorted`,type:`bool`}]},{tfOpName:`UpperBound`,category:`evaluation`,inputs:[{start:0,name:`sortedSequence`,type:`tensor`},{start:1,name:`values`,type:`tensor`}]},{tfOpName:`Unique`,category:`evaluation`,inputs:[{start:0,name:`x`,type:`tensor`}]},{tfOpName:`UniqueV2`,category:`evaluation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number`}]}]})),V4=c({json:()=>H4}),H4,U4=o((()=>{H4=[{tfOpName:`PlaceholderWithDefault`,category:`graph`,inputs:[{start:0,name:`default`,type:`tensor`}],attrs:[{tfName:`shape`,name:`shape`,type:`shape`},{tfName:`dtype`,name:`dtype`,type:`dtype`}]},{tfOpName:`Placeholder`,category:`graph`,attrs:[{tfName:`shape`,name:`shape`,type:`shape`},{tfName:`dtype`,name:`dtype`,type:`dtype`}]},{tfOpName:`Const`,category:`graph`},{tfOpName:`Identity`,category:`graph`,inputs:[{start:0,name:`x`,type:`tensor`}]},{tfOpName:`IdentityN`,category:`graph`,inputs:[{start:0,end:0,name:`x`,type:`tensors`}]},{tfOpName:`Snapshot`,category:`graph`,inputs:[{start:0,name:`x`,type:`tensor`}]},{tfOpName:`Rank`,category:`graph`,inputs:[{start:0,name:`x`,type:`tensor`}]},{tfOpName:`Size`,category:`graph`,inputs:[{start:0,name:`x`,type:`tensor`}]},{tfOpName:`Shape`,category:`graph`,inputs:[{start:0,name:`x`,type:`tensor`}]},{tfOpName:`ShapeN`,category:`graph`,inputs:[{start:0,end:0,name:`x`,type:`tensors`}]},{tfOpName:`Print`,category:`graph`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`data`,type:`tensors`}],attrs:[{tfName:`message`,name:`message`,type:`string`},{tfName:`first_n`,name:`firstN`,type:`number`,notSupported:!0},{tfName:`summarize`,name:`summarize`,type:`number`,defaultValue:3}]},{tfOpName:`NoOp`,category:`graph`,inputs:[]},{tfOpName:`StopGradient`,category:`graph`,inputs:[{start:0,name:`x`,type:`tensor`}]},{tfOpName:`FakeQuantWithMinMaxVars`,category:`graph`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`min`,name:`min`,type:`number`},{tfName:`max`,name:`max`,type:`number`}]}]})),W4=c({json:()=>G4}),G4,K4=o((()=>{G4=[{tfOpName:`HashTable`,category:`hash_table`,inputs:[],attrs:[{tfName:`shared_name`,name:`sharedName`,type:`string`},{tfName:`use_node_name_sharing`,name:`useNodeNameSharing`,type:`bool`},{tfName:`key_dtype`,name:`keyDType`,type:`dtype`},{tfName:`value_dtype`,name:`valueDType`,type:`dtype`}]},{tfOpName:`HashTableV2`,category:`hash_table`,inputs:[],attrs:[{tfName:`shared_name`,name:`sharedName`,type:`string`},{tfName:`use_node_name_sharing`,name:`useNodeNameSharing`,type:`bool`},{tfName:`key_dtype`,name:`keyDType`,type:`dtype`},{tfName:`value_dtype`,name:`valueDType`,type:`dtype`}]},{tfOpName:`LookupTableImport`,category:`hash_table`,inputs:[{start:0,name:`tableHandle`,type:`tensor`},{start:1,name:`keys`,type:`tensor`},{start:2,name:`values`,type:`tensor`}],attrs:[{tfName:`Tin`,name:`tIn`,type:`dtype`,notSupported:!0},{tfName:`Tout`,name:`tOut`,type:`dtype`,notSupported:!0}]},{tfOpName:`LookupTableImportV2`,category:`hash_table`,inputs:[{start:0,name:`tableHandle`,type:`tensor`},{start:1,name:`keys`,type:`tensor`},{start:2,name:`values`,type:`tensor`}],attrs:[{tfName:`Tin`,name:`tIn`,type:`dtype`,notSupported:!0},{tfName:`Tout`,name:`tOut`,type:`dtype`,notSupported:!0}]},{tfOpName:`LookupTableFind`,category:`hash_table`,inputs:[{start:0,name:`tableHandle`,type:`tensor`},{start:1,name:`keys`,type:`tensor`},{start:2,name:`defaultValue`,type:`tensor`}],attrs:[{tfName:`Tin`,name:`tIn`,type:`dtype`,notSupported:!0},{tfName:`Tout`,name:`tOut`,type:`dtype`,notSupported:!0}]},{tfOpName:`LookupTableFindV2`,category:`hash_table`,inputs:[{start:0,name:`tableHandle`,type:`tensor`},{start:1,name:`keys`,type:`tensor`},{start:2,name:`defaultValue`,type:`tensor`}],attrs:[{tfName:`Tin`,name:`tIn`,type:`dtype`,notSupported:!0},{tfName:`Tout`,name:`tOut`,type:`dtype`,notSupported:!0}]},{tfOpName:`LookupTableSize`,category:`hash_table`,inputs:[{start:0,name:`tableHandle`,type:`tensor`}]},{tfOpName:`LookupTableSizeV2`,category:`hash_table`,inputs:[{start:0,name:`tableHandle`,type:`tensor`}]},{tfOpName:`InitializeTable`,category:`hash_table`,inputs:[{start:0,name:`tableHandle`,type:`tensor`},{start:1,name:`keys`,type:`tensor`},{start:2,name:`values`,type:`tensor`}]},{tfOpName:`InitializeTableV2`,category:`hash_table`,inputs:[{start:0,name:`tableHandle`,type:`tensor`},{start:1,name:`keys`,type:`tensor`},{start:2,name:`values`,type:`tensor`}]}]})),q4=c({json:()=>J4}),J4,Y4=o((()=>{J4=[{tfOpName:`ResizeBilinear`,category:`image`,inputs:[{start:0,name:`images`,type:`tensor`},{start:1,name:`size`,type:`number[]`}],attrs:[{tfName:`align_corners`,name:`alignCorners`,type:`bool`},{tfName:`half_pixel_centers`,name:`halfPixelCenters`,type:`bool`},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`ResizeNearestNeighbor`,category:`image`,inputs:[{start:0,name:`images`,type:`tensor`},{start:1,name:`size`,type:`number[]`}],attrs:[{tfName:`align_corners`,name:`alignCorners`,type:`bool`},{tfName:`half_pixel_centers`,name:`halfPixelCenters`,type:`bool`},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`CropAndResize`,category:`image`,inputs:[{start:0,name:`image`,type:`tensor`},{start:1,name:`boxes`,type:`tensor`},{start:2,name:`boxInd`,type:`tensor`},{start:3,name:`cropSize`,type:`number[]`}],attrs:[{tfName:`method`,name:`method`,type:`string`},{tfName:`extrapolation_value`,name:`extrapolationValue`,type:`number`}]},{tfOpName:`ImageProjectiveTransformV3`,category:`image`,inputs:[{start:0,name:`images`,type:`tensor`},{start:1,name:`transforms`,type:`tensor`},{start:2,name:`outputShape`,type:`number[]`},{start:3,name:`fillValue`,type:`number`}],attrs:[{tfName:`interpolation`,name:`interpolation`,type:`string`},{tfName:`fill_mode`,name:`fillMode`,type:`string`}]}]})),X4=c({json:()=>Z4}),Z4,Q4=o((()=>{Z4=[{tfOpName:`Equal`,category:`logical`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`NotEqual`,category:`logical`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Greater`,category:`logical`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`GreaterEqual`,category:`logical`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Less`,category:`logical`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`LessEqual`,category:`logical`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`LogicalAnd`,category:`logical`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`LogicalNot`,category:`logical`,inputs:[{start:0,name:`a`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`LogicalOr`,category:`logical`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Select`,category:`logical`,inputs:[{start:0,name:`condition`,type:`tensor`},{start:1,name:`a`,type:`tensor`},{start:2,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`SelectV2`,category:`logical`,inputs:[{start:0,name:`condition`,type:`tensor`},{start:1,name:`a`,type:`tensor`},{start:2,name:`b`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`BitwiseAnd`,category:`logical`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`y`,type:`tensor`}]}]})),$4=c({json:()=>e3}),e3,t3=o((()=>{e3=[{tfOpName:`_FusedMatMul`,category:`matrices`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`},{start:2,end:0,name:`args`,type:`tensors`}],attrs:[{tfName:`num_args`,name:`numArgs`,type:`number`},{tfName:`fused_ops`,name:`fusedOps`,type:`string[]`,defaultValue:[]},{tfName:`epsilon`,name:`epsilon`,type:`number`,defaultValue:1e-4},{tfName:`transpose_a`,name:`transposeA`,type:`bool`,defaultValue:!1},{tfName:`transpose_b`,name:`transposeB`,type:`bool`,defaultValue:!1},{tfName:`leakyrelu_alpha`,name:`leakyreluAlpha`,type:`number`,defaultValue:.2},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`MatMul`,category:`matrices`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`transpose_a`,name:`transposeA`,type:`bool`,defaultValue:!1},{tfName:`transpose_b`,name:`transposeB`,type:`bool`,defaultValue:!1},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`BatchMatMul`,category:`matrices`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`adj_x`,name:`transposeA`,type:`bool`,defaultValue:!1},{tfName:`adj_y`,name:`transposeB`,type:`bool`,defaultValue:!1},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`BatchMatMulV2`,category:`matrices`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`b`,type:`tensor`}],attrs:[{tfName:`adj_x`,name:`transposeA`,type:`bool`,defaultValue:!1},{tfName:`adj_y`,name:`transposeB`,type:`bool`,defaultValue:!1},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Transpose`,category:`matrices`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`perm`,type:`number[]`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Einsum`,category:`matrices`,inputs:[{start:0,end:0,name:`tensors`,type:`tensors`}],attrs:[{tfName:`equation`,name:`equation`,type:`string`},{tfName:`N`,name:`n`,type:`number`,defaultValue:2},{tfName:`T`,name:`dtype`,type:`dtype`}]},{tfOpName:`MatrixBandPart`,category:`matrices`,inputs:[{start:0,name:`a`,type:`tensor`},{start:1,name:`numLower`,type:`tensor`},{start:1,name:`numUpper`,type:`tensor`}]}]})),n3=c({json:()=>r3}),r3,i3=o((()=>{r3=[{tfOpName:`EuclideanNorm`,category:`normalization`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number[]`}],attrs:[{tfName:`keep_dims`,name:`keepDims`,type:`bool`,defaultValue:!1}]},{tfOpName:`FusedBatchNorm`,category:`normalization`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`scale`,type:`tensor`},{start:2,name:`offset`,type:`tensor`},{start:3,name:`mean`,type:`tensor`},{start:4,name:`variance`,type:`tensor`}],attrs:[{tfName:`epsilon`,name:`epsilon`,type:`number`,defaultValue:.001},{tfName:`data_format`,name:`dataFormat`,type:`string`,notSupported:!0}]},{tfOpName:`FusedBatchNormV2`,category:`normalization`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`scale`,type:`tensor`},{start:2,name:`offset`,type:`tensor`},{start:3,name:`mean`,type:`tensor`},{start:4,name:`variance`,type:`tensor`}],attrs:[{tfName:`epsilon`,name:`epsilon`,type:`number`,defaultValue:.001},{tfName:`data_format`,name:`dataFormat`,type:`string`,notSupported:!0}]},{tfOpName:`FusedBatchNormV3`,category:`normalization`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`scale`,type:`tensor`},{start:2,name:`offset`,type:`tensor`},{start:3,name:`mean`,type:`tensor`},{start:4,name:`variance`,type:`tensor`}],attrs:[{tfName:`epsilon`,name:`epsilon`,type:`number`,defaultValue:.001},{tfName:`data_format`,name:`dataFormat`,type:`string`,notSupported:!0}]},{tfOpName:`LRN`,category:`normalization`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`depth_radius`,name:`radius`,type:`number`,defaultValue:5},{tfName:`bias`,name:`bias`,type:`number`,defaultValue:1},{tfName:`alpha`,name:`alpha`,type:`number`,defaultValue:1},{tfName:`beta`,name:`beta`,type:`number`,defaultValue:.5}]},{tfOpName:`Softmax`,category:`normalization`,inputs:[{start:0,name:`x`,type:`tensor`}]},{tfOpName:`LogSoftmax`,category:`normalization`,inputs:[{start:0,name:`x`,type:`tensor`}]}]})),a3=c({json:()=>o3}),o3,s3=o((()=>{o3=[{tfOpName:`Bincount`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`size`,type:`number`},{start:2,name:`weights`,type:`tensor`}]},{tfOpName:`DenseBincount`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`size`,type:`number`},{start:2,name:`weights`,type:`tensor`}],attrs:[{tfName:`binary_output`,name:`binaryOutput`,type:`bool`}]},{tfOpName:`Max`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number[]`}],attrs:[{tfName:`keep_dims`,name:`keepDims`,type:`bool`}]},{tfOpName:`Mean`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number[]`}],attrs:[{tfName:`keep_dims`,name:`keepDims`,type:`bool`}]},{tfOpName:`Min`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number[]`}],attrs:[{tfName:`keep_dims`,name:`keepDims`,type:`bool`}]},{tfOpName:`Sum`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number[]`}],attrs:[{tfName:`keep_dims`,name:`keepDims`,type:`bool`}]},{tfOpName:`All`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number[]`}],attrs:[{tfName:`keep_dims`,name:`keepDims`,type:`bool`}]},{tfOpName:`Any`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number[]`}],attrs:[{tfName:`keep_dims`,name:`keepDims`,type:`bool`}]},{tfOpName:`ArgMax`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number`}]},{tfOpName:`ArgMin`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number`}]},{tfOpName:`Prod`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number[]`}],attrs:[{tfName:`keep_dims`,name:`keepDims`,type:`bool`},{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`Cumprod`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number`}],attrs:[{tfName:`exclusive`,name:`exclusive`,type:`bool`},{tfName:`reverse`,name:`reverse`,type:`bool`}]},{tfOpName:`Cumsum`,category:`reduction`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number`}],attrs:[{tfName:`exclusive`,name:`exclusive`,type:`bool`},{tfName:`reverse`,name:`reverse`,type:`bool`}]}]})),c3=c({json:()=>l3}),l3,u3=o((()=>{l3=[{tfOpName:`ConcatV2`,category:`slice_join`,inputs:[{start:0,end:-1,name:`tensors`,type:`tensors`},{start:-1,name:`axis`,type:`number`}],attrs:[{tfName:`N`,name:`n`,type:`number`,defaultValue:2}]},{tfOpName:`Concat`,category:`slice_join`,inputs:[{start:1,end:0,name:`tensors`,type:`tensors`},{start:0,name:`axis`,type:`number`}],attrs:[{tfName:`N`,name:`n`,type:`number`,defaultValue:2}]},{tfOpName:`GatherV2`,category:`slice_join`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`indices`,type:`tensor`},{start:2,name:`axis`,type:`number`,defaultValue:0}],attrs:[{tfName:`batch_dims`,name:`batchDims`,type:`number`,defaultValue:0}]},{tfOpName:`Gather`,category:`slice_join`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`indices`,type:`tensor`}],attrs:[{tfName:`validate_indices`,name:`validateIndices`,type:`bool`,notSupported:!0}]},{tfOpName:`Reverse`,category:`slice_join`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`dims`,type:`bool[]`}]},{tfOpName:`ReverseV2`,category:`slice_join`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number[]`}]},{tfOpName:`Slice`,category:`slice_join`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`begin`,type:`number[]`},{start:2,name:`size`,type:`number[]`}]},{tfOpName:`StridedSlice`,category:`slice_join`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`begin`,type:`number[]`},{start:2,name:`end`,type:`number[]`},{start:3,name:`strides`,type:`number[]`}],attrs:[{tfName:`begin_mask`,name:`beginMask`,type:`number`,defaultValue:0},{tfName:`end_mask`,name:`endMask`,type:`number`,defaultValue:0},{tfName:`new_axis_mask`,name:`newAxisMask`,type:`number`,defaultValue:0},{tfName:`ellipsis_mask`,name:`ellipsisMask`,type:`number`,defaultValue:0},{tfName:`shrink_axis_mask`,name:`shrinkAxisMask`,type:`number`,defaultValue:0}]},{tfOpName:`Pack`,category:`slice_join`,inputs:[{start:0,end:0,name:`tensors`,type:`tensors`}],attrs:[{tfName:`axis`,name:`axis`,type:`number`,defaultValue:0}]},{tfOpName:`Unpack`,category:`slice_join`,inputs:[{start:0,name:`tensor`,type:`tensor`}],attrs:[{tfName:`axis`,name:`axis`,type:`number`,defaultValue:0},{tfName:`num`,name:`num`,type:`number`,defaultValue:0,notSupported:!0}]},{tfOpName:`Tile`,category:`slice_join`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`reps`,type:`number[]`}]},{tfOpName:`Split`,category:`slice_join`,inputs:[{start:0,name:`axis`,type:`number`,defaultValue:0},{start:1,name:`x`,type:`tensor`}],attrs:[{tfName:`num_split`,name:`numOrSizeSplits`,type:`number`,defaultValue:1}]},{tfOpName:`SplitV`,category:`slice_join`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`numOrSizeSplits`,type:`number[]`},{start:2,name:`axis`,type:`number`,defaultValue:0}]},{tfOpName:`ScatterNd`,category:`slice_join`,inputs:[{start:0,name:`indices`,type:`tensor`},{start:1,name:`values`,type:`tensor`},{start:2,name:`shape`,type:`number[]`}]},{tfOpName:`GatherNd`,category:`slice_join`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`indices`,type:`tensor`}]},{tfOpName:`SparseToDense`,category:`slice_join`,inputs:[{start:0,name:`sparseIndices`,type:`tensor`},{start:1,name:`outputShape`,type:`number[]`},{start:2,name:`sparseValues`,type:`tensor`},{start:3,name:`defaultValue`,type:`tensor`}],attrs:[{tfName:`validate_indices`,name:`validateIndices`,type:`bool`,defaultValue:!1,notSupported:!0}]},{tfOpName:`TensorScatterUpdate`,category:`slice_join`,inputs:[{start:0,name:`tensor`,type:`tensor`},{start:1,name:`indices`,type:`tensor`},{start:2,name:`values`,type:`tensor`}]}]})),d3=c({json:()=>f3}),f3,p3=o((()=>{f3=[{tfOpName:`SparseFillEmptyRows`,category:`sparse`,inputs:[{start:0,name:`indices`,type:`tensor`},{start:1,name:`values`,type:`tensor`},{start:2,name:`denseShape`,type:`tensor`},{start:3,name:`defaultValue`,type:`tensor`}]},{tfOpName:`SparseReshape`,category:`sparse`,inputs:[{start:0,name:`inputIndices`,type:`tensor`},{start:1,name:`inputShape`,type:`tensor`},{start:2,name:`newShape`,type:`tensor`}],attrs:[{tfName:`T`,name:`dtype`,type:`dtype`,notSupported:!0}]},{tfOpName:`SparseSegmentMean`,category:`sparse`,inputs:[{start:0,name:`data`,type:`tensor`},{start:1,name:`indices`,type:`tensor`},{start:2,name:`segmentIds`,type:`tensor`}]},{tfOpName:`SparseSegmentSum`,category:`sparse`,inputs:[{start:0,name:`data`,type:`tensor`},{start:1,name:`indices`,type:`tensor`},{start:2,name:`segmentIds`,type:`tensor`}]}]})),m3=c({json:()=>h3}),h3,g3=o((()=>{h3=[{tfOpName:`FFT`,category:`spectral`,inputs:[{start:0,name:`x`,type:`tensor`}]},{tfOpName:`IFFT`,category:`spectral`,inputs:[{start:0,name:`x`,type:`tensor`}]},{tfOpName:`RFFT`,category:`spectral`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`fft_length`,type:`number`,notSupported:!0}]},{tfOpName:`IRFFT`,category:`spectral`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`fft_length`,type:`number`,notSupported:!0}]}]})),_3=c({json:()=>v3}),v3,y3=o((()=>{v3=[{tfOpName:`StaticRegexReplace`,category:`string`,inputs:[{start:0,name:`input`,type:`tensor`}],attrs:[{tfName:`pattern`,name:`pattern`,type:`string`},{tfName:`rewrite`,name:`rewrite`,type:`string`},{tfName:`replace_global`,name:`replaceGlobal`,type:`bool`}]},{tfOpName:`StringNGrams`,category:`string`,inputs:[{start:0,name:`data`,type:`tensor`},{start:1,name:`dataSplits`,type:`tensor`}],attrs:[{tfName:`separator`,name:`separator`,type:`string`},{tfName:`ngram_widths`,name:`nGramWidths`,type:`number[]`},{tfName:`left_pad`,name:`leftPad`,type:`string`},{tfName:`right_pad`,name:`rightPad`,type:`string`},{tfName:`pad_width`,name:`padWidth`,type:`number`},{tfName:`preserve_short_sequences`,name:`preserveShortSequences`,type:`bool`}],outputs:[`ngrams`,`ngrams_splits`]},{tfOpName:`StringSplit`,category:`string`,inputs:[{start:0,name:`input`,type:`tensor`},{start:1,name:`delimiter`,type:`tensor`}],attrs:[{tfName:`skip_empty`,name:`skipEmpty`,type:`bool`}],outputs:[`indices`,`values`,`shape`]},{tfOpName:`StringToHashBucketFast`,category:`string`,inputs:[{start:0,name:`input`,type:`tensor`}],attrs:[{tfName:`num_buckets`,name:`numBuckets`,type:`number`}]}]})),b3=c({json:()=>x3}),x3,S3=o((()=>{x3=[{tfOpName:`Cast`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`SrcT`,name:`sdtype`,type:`dtype`,notSupported:!0},{tfName:`DstT`,name:`dtype`,type:`dtype`}]},{tfOpName:`ExpandDims`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`axis`,type:`number`}]},{tfOpName:`MirrorPad`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`padding`,type:`number[]`}],attrs:[{tfName:`mode`,name:`mode`,type:`string`}]},{tfOpName:`Pad`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`padding`,type:`number[]`}],attrs:[{tfName:`constant_value`,name:`constantValue`,type:`number`,defaultValue:0}]},{tfOpName:`PadV2`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`padding`,type:`number[]`},{start:2,name:`constantValue`,type:`number`,defaultValue:0}]},{tfOpName:`Reshape`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`shape`,type:`number[]`}]},{tfOpName:`EnsureShape`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`shape`,type:`number[]`}]},{tfOpName:`Squeeze`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`axis`,tfDeprecatedName:`squeeze_dims`,name:`axis`,type:`number[]`}]},{tfOpName:`SpaceToBatchND`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`blockShape`,type:`number[]`},{start:2,name:`paddings`,type:`number[]`}]},{tfOpName:`BatchToSpaceND`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`blockShape`,type:`number[]`},{start:2,name:`crops`,type:`number[]`}]},{tfOpName:`DepthToSpace`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`}],attrs:[{tfName:`block_size`,name:`blockSize`,type:`number`},{tfName:`data_format`,name:`dataFormat`,type:`string`}]},{tfOpName:`BroadcastTo`,category:`transformation`,inputs:[{start:0,name:`x`,type:`tensor`},{start:1,name:`shape`,type:`number[]`}],attrs:[]},{tfOpName:`BroadcastArgs`,category:`transformation`,inputs:[{start:0,name:`s0`,type:`tensor`},{start:1,name:`s1`,type:`tensor`}],attrs:[]}]}));function C3(e){let t=P().global;if(t.atob!==void 0)return t.atob(e);if(typeof Buffer<`u`)return new Buffer(e,`base64`).toString();throw Error(`Unable to decode base64 in this environment. Missing built-in atob() or Buffer()`)}function w3(e,t){let n=Array.isArray(e)?String.fromCharCode.apply(null,e):C3(e);return t?n:n.toLowerCase()}function T3(e,t,n,r=!1){let i=e[t];return i==null?n:w3(i.s,r)}function E3(e,t,n){let r=e[t];return r?r.b:n}function D3(e,t,n){let r=e[t]||{},i=r.i==null?r.f==null?n:r.f:r.i;return typeof i==`number`?i:parseInt(i,10)}function O3(e){switch(typeof e==`string`&&(e=i4[e]),e){case i4.DT_FLOAT:case i4.DT_HALF:return`float32`;case i4.DT_INT32:case i4.DT_INT64:case i4.DT_INT8:case i4.DT_UINT8:return`int32`;case i4.DT_BOOL:return`bool`;case i4.DT_DOUBLE:return`float32`;case i4.DT_STRING:return`string`;case i4.DT_COMPLEX64:case i4.DT_COMPLEX128:return`complex64`;default:return null}}function k3(e,t,n){let r=e[t];return r&&r.func?r.func.name:n}function A3(e,t,n){let r=e[t];return r&&r.type?O3(r.type):n}function j3(e,t,n){let r=e[t];return r&&r.list&&r.list.type?r.list.type.map(e=>O3(e)):n}function M3(e){if(!e.unknownRank)return e.dim==null?[]:e.dim.map(e=>typeof e.size==`number`?e.size:parseInt(e.size,10))}function N3(e,t,n){let r=e[t];return r&&r.shape?M3(r.shape):n}function P3(e,t,n){let r=e[t];return r?((r.list.f&&r.list.f.length?r.list.f:r.list.i)||[]).map(e=>typeof e==`number`?e:parseInt(e,10)):n}function F3(e,t,n,r=!1){let i=e[t];return i&&i.list&&i.list.s?i.list.s.map(e=>w3(e,r)):n}function I3(e,t,n){let r=e[t];return r&&r.list&&r.list.shape?r.list.shape.map(e=>M3(e)):n}function L3(e,t,n){let r=e[t];return r&&r.list&&r.list.b?r.list.b:n}var R3,z3=o((()=>{J(),o4(),d4(),y4(),S4(),T4(),O4(),j4(),P4(),L4(),B4(),U4(),K4(),Y4(),Q4(),t3(),i3(),s3(),u3(),p3(),g3(),y3(),S3(),R3=class{static get Instance(){return this._instance||=new this}constructor(){let e=[b4,C4,E4,k4,M4,F4,R4,V4,W4,q4,X4,$4,n3,a3,c3,d3,m3,_3,b3],t=[].concat(...e.map(e=>e.json));this.opMappers=t.reduce((e,t)=>(e[t.tfOpName]=t,e),{})}transformGraph(e,t={}){let n=e.node,r=[],i=[],a=[],o=n.reduce((e,t)=>(e[t.name]=this.mapNode(t),t.op.startsWith(`Placeholder`)?r.push(e[t.name]):t.op===`Const`?i.push(e[t.name]):(t.input==null||t.input.length===0)&&a.push(e[t.name]),e),{}),s=[],c=[],l={},u={};t!=null&&(l=this.mapSignatureEntries(t.inputs),u=this.mapSignatureEntries(t.outputs));let d=Object.keys(o);d.forEach(e=>{let t=o[e];t.inputNames.forEach((e,n)=>{let[r,,i]=m4(e),a=o[r];if(a.outputs!=null){let e=a.outputs.indexOf(i);if(e!==-1){let i=`${r}:${e}`;t.inputNames[n]=i}}t.inputs.push(a),a.children.push(t)})}),Object.keys(u).length===0?d.forEach(e=>{let t=o[e];t.children.length===0&&c.push(t)}):Object.keys(u).forEach(e=>{let[t]=m4(e),n=o[t];n!=null&&(n.signatureKey=u[e],c.push(n))}),Object.keys(l).length>0?Object.keys(l).forEach(e=>{let[t]=m4(e),n=o[t];n&&(n.signatureKey=l[e],s.push(n))}):s=r;let f={};e.library!=null&&e.library.function!=null&&(f=e.library.function.reduce((e,t)=>(e[t.signature.name]=this.mapFunction(t),e),{}));let p={nodes:o,inputs:s,outputs:c,weights:i,placeholders:r,signature:t,functions:f};return a.length>0&&(p.initNodes=a),p}mapSignatureEntries(e){return Object.keys(e||{}).reduce((t,n)=>(t[e[n].name]=n,t),{})}mapNode(e){let t=c4(e.op)||this.opMappers[e.op]||{};e.attr??={};let n={name:e.name,op:e.op,category:t.category,inputNames:(e.input||[]).map(e=>e.startsWith(`^`)?e.slice(1):e),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr,outputs:t.outputs};return t.inputs!=null&&(n.inputParams=t.inputs.reduce((e,t)=>(e[t.name]={type:t.type,inputIndexStart:t.start,inputIndexEnd:t.end},e),{})),t.attrs!=null&&(n.attrParams=t.attrs.reduce((t,n)=>{let r=n.type,i;switch(n.type){case`string`:i=T3(e.attr,n.tfName,n.defaultValue),i===void 0&&n.tfDeprecatedName&&(i=T3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`string[]`:i=F3(e.attr,n.tfName,n.defaultValue),i===void 0&&n.tfDeprecatedName&&(i=F3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`number`:i=D3(e.attr,n.tfName,n.defaultValue||0),i===void 0&&n.tfDeprecatedName&&(i=D3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`number[]`:i=P3(e.attr,n.tfName,n.defaultValue),i===void 0&&n.tfDeprecatedName&&(i=P3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`bool`:i=E3(e.attr,n.tfName,n.defaultValue),i===void 0&&n.tfDeprecatedName&&(i=E3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`bool[]`:i=L3(e.attr,n.tfName,n.defaultValue),i===void 0&&n.tfDeprecatedName&&(i=L3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`shape`:i=N3(e.attr,n.tfName,n.defaultValue),i===void 0&&n.tfDeprecatedName&&(i=N3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`shape[]`:i=I3(e.attr,n.tfName,n.defaultValue),i===void 0&&n.tfDeprecatedName&&(i=I3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`dtype`:i=A3(e.attr,n.tfName,n.defaultValue),i===void 0&&n.tfDeprecatedName&&(i=A3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`dtype[]`:i=j3(e.attr,n.tfName,n.defaultValue),i===void 0&&n.tfDeprecatedName&&(i=j3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`func`:i=k3(e.attr,n.tfName,n.defaultValue),i===void 0&&n.tfDeprecatedName&&(i=k3(e.attr,n.tfDeprecatedName,n.defaultValue));break;case`tensor`:case`tensors`:break;default:throw Error(`Unsupported param type: ${n.type} for op: ${e.op}`)}return t[n.name]={value:i,type:r},t},{})),n}mapFunction(e){let t=e.nodeDef,n=[],r=[],i={};t!=null&&(i=t.reduce((e,t)=>(e[t.name]=this.mapNode(t),t.op===`Const`&&r.push(e[t.name]),e),{}));let a=[],o=[];e.signature.inputArg.forEach(e=>{let[t]=m4(e.name),n={name:t,op:`Placeholder`,inputs:[],inputNames:[],category:`graph`,inputParams:{},attrParams:{dtype:{value:O3(e.type),type:`dtype`}},children:[]};n.signatureKey=e.name,a.push(n),i[t]=n}),Object.keys(i).forEach(e=>{let t=i[e];t.inputNames.forEach((e,n)=>{let[r,,a]=m4(e),o=i[r];if(o.outputs!=null){let e=o.outputs.indexOf(a);if(e!==-1){let i=`${r}:${e}`;t.inputNames[n]=i}}t.inputs.push(o),o.children.push(t)})});let s=e.ret;e.signature.outputArg.forEach(e=>{let[t,n]=m4(s[e.name]),r=i[t];r!=null&&(r.defaultOutput=n,o.push(r))});let c=this.mapArgsToSignature(e);return{nodes:i,inputs:a,outputs:o,weights:r,placeholders:n,signature:c}}mapArgsToSignature(e){return{methodName:e.signature.name,inputs:e.signature.inputArg.reduce((e,t)=>(e[t.name]=this.mapArgToTensorInfo(t),e),{}),outputs:e.signature.outputArg.reduce((t,n)=>(t[n.name]=this.mapArgToTensorInfo(n,e.ret),t),{})}}mapArgToTensorInfo(e,t){let n=e.name;return t!=null&&(n=t[n]),{name:n,dtype:e.type}}}})),B3,V3=o((()=>{y4(),z3(),B3=class{constructor(e,t,n){this.node=e,this.tensorMap=t,this.context=n,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(e=>this.getInput(e)),e.rawAttrs!=null&&(this.attrs=Object.keys(e.rawAttrs).reduce((e,t)=>(e[t]=this.getAttr(t),e),{}))}getInput(e){return f4(e,this.tensorMap,this.context)}getAttr(e,t){let n=this.node.rawAttrs[e];if(n.tensor!=null)return f4(e,this.tensorMap,this.context);if(n.i!=null||n.f!=null)return D3(this.node.rawAttrs,e,t);if(n.s!=null)return T3(this.node.rawAttrs,e,t);if(n.b!=null)return E3(this.node.rawAttrs,e,t);if(n.shape!=null)return N3(this.node.rawAttrs,e,t);if(n.type!=null)return A3(this.node.rawAttrs,e,t);if(n.list!=null){if(n.list.i!=null||n.list.f!=null)return P3(this.node.rawAttrs,e,t);if(n.list.s!=null)return F3(this.node.rawAttrs,e,t);if(n.list.shape!=null)return I3(this.node.rawAttrs,e,t);if(n.list.b!=null)return L3(this.node.rawAttrs,e,t);if(n.list.type!=null)return j3(this.node.rawAttrs,e,t)}return t}}})),H3=c({OP_SCOPE_SUFFIX:()=>qa,abs:()=>vc,acos:()=>xc,acosh:()=>wc,add:()=>W,addN:()=>Dc,all:()=>Ac,any:()=>Nc,argMax:()=>Ic,argMin:()=>zc,asin:()=>Hc,asinh:()=>Gc,atan:()=>Jc,atan2:()=>Zc,atanh:()=>el,avgPool:()=>wl,avgPool3d:()=>Dl,basicLSTMCell:()=>Gl,batchNorm:()=>$l,batchNorm2d:()=>nu,batchNorm3d:()=>au,batchNorm4d:()=>cu,batchToSpaceND:()=>Jl,bincount:()=>du,bitwiseAnd:()=>mu,booleanMaskAsync:()=>ib,broadcastArgs:()=>_u,broadcastTo:()=>bu,buffer:()=>Xs,cast:()=>$s,ceil:()=>Cu,clipByValue:()=>Ou,clone:()=>nc,complex:()=>Ya,concat:()=>Al,concat1d:()=>ju,concat2d:()=>Pu,concat3d:()=>Lu,concat4d:()=>Bu,conv1d:()=>Ku,conv2d:()=>Uu,conv2dTranspose:()=>Qu,conv3d:()=>td,conv3dTranspose:()=>sd,cos:()=>ud,cosh:()=>pd,cosineWindow:()=>kb,cumprod:()=>gd,cumsum:()=>yd,denseBincount:()=>Sd,depthToSpace:()=>Td,depthwiseConv2d:()=>Od,diag:()=>jd,dilation2d:()=>Pd,div:()=>pc,divNoNan:()=>Zd,dot:()=>ef,dropout:()=>Eb,einsum:()=>rf,elu:()=>sf,enclosingPowerOfTwo:()=>Ob,ensureShape:()=>uf,equal:()=>Hd,erf:()=>pf,euclideanNorm:()=>Yf,exp:()=>Qf,expandDims:()=>tp,expm1:()=>ip,eye:()=>up,fft:()=>Fv,fill:()=>Tu,floor:()=>pp,floorDiv:()=>uc,fused:()=>rx,gather:()=>gp,gatherND:()=>xb,greater:()=>yp,greaterEqual:()=>Sp,ifft:()=>Rv,imag:()=>Tp,image:()=>LC,inTopKAsync:()=>Mb,irfft:()=>Vv,isFinite:()=>Op,isInf:()=>jp,isNaN:()=>Pp,leakyRelu:()=>Lp,less:()=>Bp,lessEqual:()=>Up,linalg:()=>RC,linspace:()=>Gp,localResponseNormalization:()=>Jp,log:()=>Zp,log1p:()=>em,logSigmoid:()=>_m,logSoftmax:()=>Cm,logSumExp:()=>Em,logicalAnd:()=>km,logicalNot:()=>Mm,logicalOr:()=>Fm,logicalXor:()=>Rm,losses:()=>zC,lowerBound:()=>Wm,matMul:()=>Nl,max:()=>Tf,maxPool:()=>qm,maxPool3d:()=>Xm,maxPoolWithArgmax:()=>$m,maximum:()=>nh,mean:()=>ah,meshgrid:()=>dh,min:()=>Of,minimum:()=>mh,mirrorPad:()=>_h,mod:()=>bh,moments:()=>Ch,movingAverage:()=>ub,mul:()=>G,multiRNNCell:()=>Eh,multinomial:()=>kh,neg:()=>dm,norm:()=>Kf,notEqual:()=>Mh,oneHot:()=>Fh,ones:()=>lh,onesLike:()=>Rh,op:()=>H,outerProduct:()=>Vh,pad:()=>Wh,pad1d:()=>qh,pad2d:()=>Xh,pad3d:()=>$h,pad4d:()=>ng,pool:()=>ug,pow:()=>jf,prelu:()=>pg,print:()=>ic,prod:()=>gg,raggedGather:()=>yg,raggedRange:()=>Sg,raggedTensorToTensor:()=>Tg,rand:()=>Og,randomGamma:()=>o_,randomNormal:()=>l_,randomStandardNormal:()=>f_,randomUniform:()=>h_,randomUniformInt:()=>v_,range:()=>b_,real:()=>C_,reciprocal:()=>E_,relu:()=>k_,relu6:()=>M_,reshape:()=>K,reverse:()=>F_,reverse1d:()=>R_,reverse2d:()=>V_,reverse3d:()=>W_,reverse4d:()=>q_,rfft:()=>qv,round:()=>X_,rsqrt:()=>$_,scalar:()=>Nf,scatterND:()=>pb,searchSorted:()=>Hm,selu:()=>nv,separableConv2d:()=>av,setdiff1dAsync:()=>cv,sigmoid:()=>Il,sign:()=>dv,signal:()=>IC,sin:()=>mv,sinh:()=>_v,slice:()=>zl,slice1d:()=>bv,slice2d:()=>Cv,slice3d:()=>Ev,slice4d:()=>kv,softmax:()=>Mv,softplus:()=>mm,spaceToBatchND:()=>ag,sparse:()=>BC,sparseToDense:()=>vb,spectral:()=>FC,split:()=>Wv,sqrt:()=>If,square:()=>zf,squaredDifference:()=>Xv,squeeze:()=>$v,stack:()=>ny,step:()=>ay,stridedSlice:()=>cy,string:()=>VC,sub:()=>bm,sum:()=>Hf,tan:()=>dy,tanh:()=>Hl,tensor:()=>$a,tensor1d:()=>py,tensor2d:()=>hy,tensor3d:()=>_y,tensor4d:()=>yy,tensor5d:()=>xy,tensor6d:()=>Cy,tensorScatterUpdate:()=>jy,tile:()=>sp,topk:()=>Py,transpose:()=>sb,truncatedNormal:()=>Ly,unique:()=>By,unsortedSegmentSum:()=>Uy,unstack:()=>Ky,upperBound:()=>Jy,variable:()=>Xy,where:()=>Gd,whereAsync:()=>tb,zeros:()=>sh,zerosLike:()=>Jd}),U3=o((()=>{HC()})),W3,G3=o((()=>{U3(),y4(),W3=(e,t,n,r=H3)=>{switch(e.op){case`BiasAdd`:case`AddV2`:case`Add`:return[r.add($(`a`,e,t,n),$(`b`,e,t,n))];case`AddN`:return[r.addN($(`tensors`,e,t,n))];case`FloorMod`:case`Mod`:return[r.mod($(`a`,e,t,n),$(`b`,e,t,n))];case`Mul`:return[r.mul($(`a`,e,t,n),$(`b`,e,t,n))];case`RealDiv`:case`Div`:return[r.div($(`a`,e,t,n),$(`b`,e,t,n))];case`DivNoNan`:return[r.divNoNan($(`a`,e,t,n),$(`b`,e,t,n))];case`FloorDiv`:return[r.floorDiv($(`a`,e,t,n),$(`b`,e,t,n))];case`Sub`:return[r.sub($(`a`,e,t,n),$(`b`,e,t,n))];case`Minimum`:return[r.minimum($(`a`,e,t,n),$(`b`,e,t,n))];case`Maximum`:return[r.maximum($(`a`,e,t,n),$(`b`,e,t,n))];case`Pow`:return[r.pow($(`a`,e,t,n),$(`b`,e,t,n))];case`SquaredDifference`:return[r.squaredDifference($(`a`,e,t,n),$(`b`,e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),K3,q3=o((()=>{U3(),y4(),K3=(e,t,n,r=H3)=>{switch(e.op){case`Abs`:case`ComplexAbs`:return[r.abs($(`x`,e,t,n))];case`Acos`:return[r.acos($(`x`,e,t,n))];case`Acosh`:return[r.acosh($(`x`,e,t,n))];case`Asin`:return[r.asin($(`x`,e,t,n))];case`Asinh`:return[r.asinh($(`x`,e,t,n))];case`Atan`:return[r.atan($(`x`,e,t,n))];case`Atan2`:return[r.atan2($(`x`,e,t,n),$(`y`,e,t,n))];case`Atanh`:return[r.atanh($(`x`,e,t,n))];case`Ceil`:return[r.ceil($(`x`,e,t,n))];case`Complex`:return[r.complex($(`real`,e,t,n),$(`imag`,e,t,n))];case`Cos`:return[r.cos($(`x`,e,t,n))];case`Cosh`:return[r.cosh($(`x`,e,t,n))];case`Elu`:return[r.elu($(`x`,e,t,n))];case`Erf`:return[r.erf($(`x`,e,t,n))];case`Exp`:return[r.exp($(`x`,e,t,n))];case`Expm1`:return[r.expm1($(`x`,e,t,n))];case`Floor`:return[r.floor($(`x`,e,t,n))];case`Log`:return[r.log($(`x`,e,t,n))];case`Log1p`:return[r.log1p($(`x`,e,t,n))];case`Imag`:return[r.imag($(`x`,e,t,n))];case`Neg`:return[r.neg($(`x`,e,t,n))];case`Reciprocal`:return[r.reciprocal($(`x`,e,t,n))];case`Real`:return[r.real($(`x`,e,t,n))];case`Relu`:return[r.relu($(`x`,e,t,n))];case`Round`:return[r.round($(`x`,e,t,n))];case`Selu`:return[r.selu($(`x`,e,t,n))];case`Sigmoid`:return[r.sigmoid($(`x`,e,t,n))];case`Sin`:return[r.sin($(`x`,e,t,n))];case`Sign`:return[r.sign($(`x`,e,t,n))];case`Sinh`:return[r.sinh($(`x`,e,t,n))];case`Softplus`:return[r.softplus($(`x`,e,t,n))];case`Sqrt`:return[r.sqrt($(`x`,e,t,n))];case`Square`:return[r.square($(`x`,e,t,n))];case`Tanh`:return[r.tanh($(`x`,e,t,n))];case`Tan`:return[r.tan($(`x`,e,t,n))];case`ClipByValue`:return[r.clipByValue($(`x`,e,t,n),$(`clipValueMin`,e,t,n),$(`clipValueMax`,e,t,n))];case`Relu6`:return[r.relu6($(`x`,e,t,n))];case`Rsqrt`:return[r.rsqrt(f4(e.inputNames[0],t,n))];case`LeakyRelu`:return[r.leakyRelu($(`x`,e,t,n),$(`alpha`,e,t,n))];case`Prelu`:return[r.prelu($(`x`,e,t,n),$(`alpha`,e,t,n))];case`IsNan`:return[r.isNaN(f4(e.inputNames[0],t,n))];case`IsInf`:return[r.isInf(f4(e.inputNames[0],t,n))];case`IsFinite`:return[r.isFinite(f4(e.inputNames[0],t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}));function J3(e,t,n=``){if(typeof e!=`number`&&typeof t!=`number`){E(e.length===t.length,()=>n+` Shapes ${e} and ${t} must match`);for(let r=0;r<e.length;r++){let i=e[r],a=t[r];E(i<0||a<0||i===a,()=>n+` Shapes ${e} and ${t} must match`)}}}function Y3(e){return!(typeof e==`number`||e.some(e=>e<0))}function X3(e,t,n){let r=Z3(e,n),i=!Y3(r);if(i&&t.length===0)throw Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${r}`);if(i&&t.forEach(e=>{r=Z3(e.shape,r)}),!Y3(r))throw Error(`Non-fully-defined elementShape: ${r}`);return r}function Z3(e,t){if(typeof e==`number`)return t;if(typeof t==`number`)return e;if(e.length!==t.length)throw Error(`Incompatible ranks during merge: ${e} vs. ${t}`);let n=[];for(let r=0;r<e.length;++r){let i=e[r],a=t[r];if(i>=0&&a>=0&&i!==a)throw Error(`Incompatible shape during merge: ${e} vs. ${t}`);n[r]=i>=0?i:a}return n}var Q3=o((()=>{J()})),$3,e6=o((()=>{J(),Q3(),$3=class{constructor(e,t,n,r,i,a,o){this.name=e,this.dtype=t,this.maxSize=n,this.elementShape=r,this.identicalElementShapes=i,this.dynamicSize=a,this.clearAfterRead=o,this.tensors=[],this.closed_=!1,this.idTensor=Nf(0),_o(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(e){this.tensors.forEach(t=>{(e==null||!e.has(t.tensor.id))&&t.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(e){if(this.closed_)throw Error(`TensorArray ${this.name} has already been closed.`);if(e<0||e>=this.size())throw Error(`Tried to read from index ${e}, but array size is: ${this.size()}`);let t=this.tensors[e];if(t.cleared)throw Error(`TensorArray ${this.name}: Could not read index ${e} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(t.cleared=!0),t.read=!0,t.tensor}readMany(e){return e.map(e=>this.read(e))}write(e,t){if(this.closed_)throw Error(`TensorArray ${this.name} has already been closed.`);if(e<0||!this.dynamicSize&&e>=this.maxSize)throw Error(`Tried to write to index ${e}, but array is not resizeable and size is: ${this.maxSize}`);let n=this.tensors[e]||{};if(t.dtype!==this.dtype)throw Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e},
          because the value dtype is ${t.dtype}, but TensorArray dtype is ${this.dtype}.`);if(this.size()===0&&(this.elementShape==null||this.elementShape.length===0)&&(this.elementShape=t.shape),J3(this.elementShape,t.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${e}.`),n.read)throw Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been read.`);if(n.written)throw Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been written.`);n.tensor=t,_o(t),n.written=!0,this.tensors[e]=n}writeMany(e,t){if(e.length!==t.length)throw Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${e.length} is not the same as tensors size: ${t.length}.`);e.forEach((e,n)=>this.write(e,t[n]))}gather(e,t){if(t&&t!==this.dtype)throw Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${t}`);if(e)e=e.slice(0,this.size());else{e=[];for(let t=0;t<this.size();t++)e.push(t)}if(e.length===0)return $a([],[0].concat(this.elementShape));let n=this.readMany(e);return J3(this.elementShape,n[0].shape,`TensorArray shape mismatch: `),ny(n,0)}concat(e){if(e&&e!==this.dtype)throw Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${e}`);if(this.size()===0)return $a([],[0].concat(this.elementShape));let t=[];for(let e=0;e<this.size();e++)t.push(e);let n=this.readMany(t);return J3(this.elementShape,n[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${n[0].shape})`),Al(n,0)}scatter(e,t){if(t.dtype!==this.dtype)throw Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);if(e.length!==t.shape[0])throw Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${t.shape[0]}`);let n=Math.max(...e);if(!this.dynamicSize&&n>=this.maxSize)throw Error(`Max index must be < array size (${n}  vs. ${this.maxSize})`);this.writeMany(e,Ky(t,0))}split(e,t){if(t.dtype!==this.dtype)throw Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);let n=0,r=e.map(e=>(n+=e,n));if(n!==t.shape[0])throw Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${n}, and tensor's shape is: ${t.shape}`);if(!this.dynamicSize&&e.length!==this.maxSize)throw Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${e.length}), and the TensorArray is not marked as dynamically resizeable`);let i=n===0?0:t.size/n,a=[];ho(()=>{t=K(t,[1,n,i]);for(let n=0;n<e.length;++n){let o=[0,n===0?0:r[n-1],0],s=[1,e[n],i];a[n]=K(zl(t,o,s),this.elementShape)}return a});let o=[];for(let t=0;t<e.length;t++)o[t]=t;this.writeMany(o,a)}}}));function t6(e,t,n){let r=e.dtype;if(e.shape.length<1)throw Error(`Tensor must be at least a vector, but saw shape: ${e.shape}`);if(e.dtype!==n)throw Error(`Invalid data types; op elements ${e.dtype}, but list elements ${n}`);J3(e.shape.slice(1),t,`TensorList shape mismatch: `);let i=Ky(e);return new a6(i,t,r)}function n6(e,t,n,r){return new a6([],e,t,r)}function r6(e,t,n,r){if(t.length!==e.shape[0])throw Error(`Expected len(indices) == tensor.shape[0], but saw: ${t.length} vs. ${e.shape[0]}`);let i=Math.max(...t);if(r!=null&&r!==-1&&i>=r)throw Error(`Max index must be < array size (${i}  vs. ${r})`);let a=new a6([],n,e.dtype,r),o=Ky(e,0);return t.forEach((e,t)=>{a.setItem(e,o[t])}),a}function i6(e,t,n){let r=0,i=t.map(e=>(r+=e,r));if(r!==e.shape[0])throw Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${r}, and tensor's shape is: ${e.shape}`);let a=Z3(e.shape.slice(1),n),o=r===0?0:e.size/r,s=ho(()=>{let n=[];e=K(e,[1,r,o]);for(let r=0;r<t.length;++r){let s=[0,r===0?0:i[r-1],0],c=[1,t[r],o];n[r]=K(zl(e,s,c),a)}return e.dispose(),n}),c=new a6([],n,e.dtype,t.length);for(let e=0;e<s.length;e++)c.setItem(e,s[e]);return c}var a6,o6=o((()=>{J(),Q3(),a6=class e{get id(){return this.idTensor.id}constructor(e,t,n,r=-1){this.tensors=e,this.elementShape=t,this.elementDtype=n,e?.forEach(e=>{if(n!==e.dtype)throw Error(`Invalid data types; op elements ${n}, but list elements ${e.dtype}`);J3(t,e.shape,`TensorList shape mismatch: `),_o(e)}),this.idTensor=Nf(0),this.maxNumElements=r,_o(this.idTensor)}copy(){return new e([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(e){this.tensors.forEach(t=>{(e==null||!e.has(t.id))&&t.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(e,t,n=-1){if(t!==this.elementDtype)throw Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(n!==-1&&this.tensors.length!==n)throw Error(`Operation expected a list with ${n} elements but got a list with ${this.tensors.length} elements.`);J3(e,this.elementShape,`TensorList shape mismatch: `);let r=X3(this.elementShape,this.tensors,e);return ho(()=>{let e=this.tensors.map(e=>K(e,r));return ny(e,0)})}popBack(e,t){if(t!==this.elementDtype)throw Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(this.size()===0)throw Error(`Trying to pop from an empty list.`);let n=X3(this.elementShape,this.tensors,e),r=this.tensors.pop();return r.kept=!1,J3(r.shape,e,`TensorList shape mismatch: `),K(r,n)}pushBack(e){if(e.dtype!==this.elementDtype)throw Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if(J3(e.shape,this.elementShape,`TensorList shape mismatch: `),this.maxNumElements===this.size())throw Error(`Trying to push element into a full list.`);_o(e),this.tensors.push(e)}resize(t){if(t<0)throw Error(`TensorListResize expects size to be non-negative. Got: ${t}`);if(this.maxNumElements!==-1&&t>this.maxNumElements)throw Error(`TensorListResize input size ${t} is greater maxNumElement ${this.maxNumElements}.`);let n=new e([],this.elementShape,this.elementDtype,this.maxNumElements);n.tensors.length=t;for(let e=0;e<Math.min(this.tensors.length,t);++e)n.tensors[e]=this.tensors[e];return n}getItem(e,t,n){if(n!==this.elementDtype)throw Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(e<0||e>this.tensors.length)throw Error(`Trying to access element ${e} in a list with ${this.tensors.length} elements.`);if(this.tensors[e]==null)throw Error(`element at index ${e} is null.`);J3(this.tensors[e].shape,t,`TensorList shape mismatch: `);let r=X3(this.elementShape,this.tensors,t);return K(this.tensors[e],r)}setItem(e,t){if(t.dtype!==this.elementDtype)throw Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(e<0||this.maxNumElements!==-1&&e>=this.maxNumElements)throw Error(`Trying to set element ${e} in a list with max ${this.maxNumElements} elements.`);J3(this.elementShape,t.shape,`TensorList shape mismatch: `),_o(t),this.tensors[e]!=null&&(this.tensors[e].kept=!1),this.tensors[e]=t}gather(e,t,n){if(t!==this.elementDtype)throw Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);J3(this.elementShape,n,`TensorList shape mismatch: `),e=e.slice(0,this.size());let r=X3(this.elementShape,this.tensors,n);return e.length===0?$a([],[0].concat(r)):ho(()=>{let t=e.map(e=>K(this.tensors[e],r));return ny(t,0)})}concat(e,t){if(e&&e!==this.elementDtype)throw Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${e}`);J3(this.elementShape,t,`TensorList shape mismatch: `);let n=X3(this.elementShape,this.tensors,t);return this.size()===0?$a([],[0].concat(n)):ho(()=>{let e=this.tensors.map(e=>K(e,n));return Al(e,0)})}}})),s6,c6=o((()=>{J(),e6(),o6(),y4(),s6=async(e,t,n)=>{switch(e.op){case`If`:case`StatelessIf`:{let r=$(`thenBranch`,e,t,n),i=$(`elseBranch`,e,t,n),a=$(`cond`,e,t,n),o=$(`args`,e,t,n);return(await a.data())[0]?n.functionMap[r].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap):n.functionMap[i].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap)}case`While`:case`StatelessWhile`:{let r=$(`body`,e,t,n),i=$(`cond`,e,t,n),a=$(`args`,e,t,n),o=await n.functionMap[i].executeFunctionAsync(a,n.tensorArrayMap,n.tensorListMap),s=a.map(e=>e.id),c=await o[0].data();o.forEach(e=>{!e.kept&&s.indexOf(e.id)===-1&&e.dispose()});let l=a;for(;c[0];){let e=l;l=await n.functionMap[r].executeFunctionAsync(l,n.tensorArrayMap,n.tensorListMap);let t=l.map(e=>e.id);e.forEach(e=>{!e.kept&&s.indexOf(e.id)===-1&&t.indexOf(e.id)===-1&&e.dispose()});let a=await n.functionMap[i].executeFunctionAsync(l,n.tensorArrayMap,n.tensorListMap);c=await a[0].data(),a.forEach(e=>{!e.kept&&s.indexOf(e.id)===-1&&t.indexOf(e.id)===-1&&e.dispose()})}return l}case`LoopCond`:return[v4($(`pred`,e,t,n))];case`Switch`:{let r=$(`pred`,e,t,n),i=$(`data`,e,t,n);return i.kept||(i=v4(i)),(await r.data())[0]?[void 0,i]:[i,void 0]}case`Merge`:{let r=e.inputNames.find(e=>f4(e,t,n)!==void 0);return r?[v4(f4(r,t,n))]:void 0}case`Enter`:{let r=$(`frameName`,e,t,n),i=$(`tensor`,e,t,n);return n.enterFrame(r),[v4(i)]}case`Exit`:{let r=$(`tensor`,e,t,n);return n.exitFrame(),[v4(r)]}case`NextIteration`:{let r=$(`tensor`,e,t,n);return n.nextIteration(),[v4(r)]}case`TensorArrayV3`:{let r=$(`size`,e,t,n),i=$(`dtype`,e,t,n),a=$(`elementShape`,e,t,n),o=$(`dynamicSize`,e,t,n),s=$(`clearAfterRead`,e,t,n),c=$(`identicalElementShapes`,e,t,n),l=$(`name`,e,t,n),u=new $3(l,i,r,a,c,o,s);return n.addTensorArray(u),[u.idTensor,Nf(1)]}case`TensorArrayWriteV3`:{let r=$(`tensorArrayId`,e,t,n),i=$(`index`,e,t,n),a=$(`tensor`,e,t,n),o=n.getTensorArray(r.id);return o.write(i,a),[o.idTensor]}case`TensorArrayReadV3`:{let r=$(`tensorArrayId`,e,t,n),i=$(`index`,e,t,n);return[n.getTensorArray(r.id).read(i)]}case`TensorArrayGatherV3`:{let r=$(`tensorArrayId`,e,t,n),i=$(`indices`,e,t,n),a=$(`dtype`,e,t,n);return[n.getTensorArray(r.id).gather(i,a)]}case`TensorArrayScatterV3`:{let r=$(`tensorArrayId`,e,t,n),i=$(`indices`,e,t,n),a=$(`tensor`,e,t,n),o=n.getTensorArray(r.id);return o.scatter(i,a),[o.idTensor]}case`TensorArrayConcatV3`:{let r=$(`tensorArrayId`,e,t,n),i=n.getTensorArray(r.id),a=$(`dtype`,e,t,n);return[i.concat(a)]}case`TensorArraySplitV3`:{let r=$(`tensorArrayId`,e,t,n),i=$(`tensor`,e,t,n),a=$(`lengths`,e,t,n),o=n.getTensorArray(r.id);return o.split(a,i),[o.idTensor]}case`TensorArraySizeV3`:{let r=$(`tensorArrayId`,e,t,n);return[Nf(n.getTensorArray(r.id).size(),`int32`)]}case`TensorArrayCloseV3`:{let r=$(`tensorArrayId`,e,t,n),i=n.getTensorArray(r.id);return i.clearAndClose(),[i.idTensor]}case`TensorListSetItem`:{let r=$(`tensorListId`,e,t,n),i=$(`index`,e,t,n),a=$(`tensor`,e,t,n),o=n.getTensorList(r.id);return o.setItem(i,a),[o.idTensor]}case`TensorListGetItem`:{let r=$(`tensorListId`,e,t,n),i=$(`index`,e,t,n),a=$(`elementShape`,e,t,n),o=$(`elementDType`,e,t,n);return[n.getTensorList(r.id).getItem(i,a,o)]}case`TensorListScatterV2`:case`TensorListScatter`:{let r=$(`indices`,e,t,n),i=r6($(`tensor`,e,t,n),r,$(`elementShape`,e,t,n),$(`numElements`,e,t,n));return n.addTensorList(i),[i.idTensor]}case`TensorListReserve`:case`EmptyTensorList`:{let r=$(`elementShape`,e,t,n),i=$(`elementDType`,e,t,n),a;a=e.op===`TensorListReserve`?`numElements`:`maxNumElements`;let o=$(a,e,t,n),s=n6(r,i,o,e.op===`TensorListReserve`?-1:o);return n.addTensorList(s),[s.idTensor]}case`TensorListGather`:{let r=$(`tensorListId`,e,t,n),i=$(`indices`,e,t,n),a=$(`elementShape`,e,t,n),o=$(`elementDType`,e,t,n);return[n.getTensorList(r.id).gather(i,o,a)]}case`TensorListStack`:{let r=$(`tensorListId`,e,t,n),i=$(`elementShape`,e,t,n),a=$(`elementDType`,e,t,n),o=$(`numElements`,e,t,n);return[n.getTensorList(r.id).stack(i,a,o)]}case`TensorListFromTensor`:{let r=t6($(`tensor`,e,t,n),$(`elementShape`,e,t,n),$(`elementDType`,e,t,n));return n.addTensorList(r),[r.idTensor]}case`TensorListConcat`:case`TensorListConcatV2`:{let r=$(`tensorListId`,e,t,n),i=n.getTensorList(r.id),a=$(`dtype`,e,t,n),o=$(`elementShape`,e,t,n);return[i.concat(a,o)]}case`TensorListPushBack`:{let r=$(`tensorListId`,e,t,n),i=$(`tensor`,e,t,n),a=n.getTensorList(r.id);return a.pushBack(i),[a.idTensor]}case`TensorListPopBack`:{let r=$(`tensorListId`,e,t,n),i=$(`elementShape`,e,t,n),a=$(`elementDType`,e,t,n);return[n.getTensorList(r.id).popBack(i,a)]}case`TensorListSplit`:{let r=$(`tensor`,e,t,n),i=$(`elementShape`,e,t,n),a=i6(r,$(`lengths`,e,t,n),i);return n.addTensorList(a),[a.idTensor]}case`TensorListLength`:{let r=$(`tensorListId`,e,t,n);return[Nf(n.getTensorList(r.id).size(),`int32`)]}case`TensorListResize`:{let r=$(`tensorListId`,e,t,n),i=$(`size`,e,t,n),a=n.getTensorList(r.id).resize(i);return n.addTensorList(a),[a.idTensor]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}}));function l6(e,t,n){let[r,i]=$(`fusedOps`,e,t,n),a=r===`biasadd`,o=!a,s=i===`prelu`,c=r===`fusedbatchnorm`,l=$(`numArgs`,e,t,n);if(a){if(s&&l!==2)throw Error(`FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.`);if(!s&&a&&l!==1)throw Error(`FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.`)}if(c)throw Error(`FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported`);let u=$(`strides`,e,t,n),d=_4(e,t,n),f=$(`dataFormat`,e,t,n).toUpperCase(),p=$(`dilations`,e,t,n),[m,h]=$(`args`,e,t,n);o&&(h=m,m=void 0);let g=$(`leakyreluAlpha`,e,t,n);return{stride:u,pad:d,dataFormat:f,dilations:p,biasArg:m,preluArg:h,activationFunc:i,leakyreluAlpha:g}}var u6,d6=o((()=>{U3(),y4(),u6=(e,t,n,r=H3)=>{switch(e.op){case`Conv1D`:{let i=$(`stride`,e,t,n),a=$(`pad`,e,t,n),o=$(`dataFormat`,e,t,n).toUpperCase(),s=$(`dilation`,e,t,n);return[r.conv1d($(`x`,e,t,n),$(`filter`,e,t,n),i,a,o,s)]}case`Conv2D`:{let i=$(`strides`,e,t,n),a=_4(e,t,n),o=$(`dataFormat`,e,t,n).toUpperCase(),s=$(`dilations`,e,t,n);return[r.conv2d($(`x`,e,t,n),$(`filter`,e,t,n),[i[1],i[2]],a,o,[s[1],s[2]])]}case`_FusedConv2D`:{let{stride:i,pad:a,dataFormat:o,dilations:s,biasArg:c,preluArg:l,activationFunc:u,leakyreluAlpha:d}=l6(e,t,n);return[r.fused.conv2d({x:$(`x`,e,t,n),filter:$(`filter`,e,t,n),strides:[i[1],i[2]],pad:a,dataFormat:o,dilations:[s[1],s[2]],bias:c,activation:u,preluActivationWeights:l,leakyreluAlpha:d})]}case`FusedDepthwiseConv2dNative`:{let{stride:i,pad:a,dataFormat:o,dilations:s,biasArg:c,preluArg:l,activationFunc:u,leakyreluAlpha:d}=l6(e,t,n);return[r.fused.depthwiseConv2d({x:$(`x`,e,t,n),filter:$(`filter`,e,t,n),strides:[i[1],i[2]],pad:a,dataFormat:o,dilations:[s[1],s[2]],bias:c,activation:u,preluActivationWeights:l,leakyreluAlpha:d})]}case`Conv2DBackpropInput`:case`Conv2dTranspose`:{let i=$(`outputShape`,e,t,n),a=$(`strides`,e,t,n),o=_4(e,t,n);return[r.conv2dTranspose($(`x`,e,t,n),$(`filter`,e,t,n),i,[a[1],a[2]],o)]}case`DepthwiseConv2dNative`:case`DepthwiseConv2d`:{let i=$(`strides`,e,t,n),a=_4(e,t,n),o=$(`dilations`,e,t,n),s=$(`dataFormat`,e,t,n).toUpperCase();return[r.depthwiseConv2d($(`input`,e,t,n),$(`filter`,e,t,n),[i[1],i[2]],a,s,[o[1],o[2]])]}case`Conv3D`:{let i=$(`strides`,e,t,n),a=$(`pad`,e,t,n),o=$(`dataFormat`,e,t,n).toUpperCase(),s=$(`dilations`,e,t,n);return[r.conv3d($(`x`,e,t,n),$(`filter`,e,t,n),[i[1],i[2],i[3]],a,o,[s[1],s[2],s[3]])]}case`AvgPool`:{let i=$(`strides`,e,t,n),a=$(`pad`,e,t,n),o=$(`kernelSize`,e,t,n);return[r.avgPool($(`x`,e,t,n),[o[1],o[2]],[i[1],i[2]],a)]}case`MaxPool`:{let i=$(`strides`,e,t,n),a=$(`pad`,e,t,n),o=$(`kernelSize`,e,t,n);return[r.maxPool($(`x`,e,t,n),[o[1],o[2]],[i[1],i[2]],a)]}case`MaxPoolWithArgmax`:{let i=$(`strides`,e,t,n),a=$(`pad`,e,t,n),o=$(`kernelSize`,e,t,n),s=$(`includeBatchInIndex`,e,t,n),{result:c,indexes:l}=r.maxPoolWithArgmax($(`x`,e,t,n),[o[1],o[2]],[i[1],i[2]],a,s);return[c,l]}case`AvgPool3D`:{let i=$(`strides`,e,t,n),a=$(`pad`,e,t,n),o=$(`kernelSize`,e,t,n);return[r.avgPool3d($(`x`,e,t,n),[o[1],o[2],o[3]],[i[1],i[2],i[3]],a)]}case`MaxPool3D`:{let i=$(`strides`,e,t,n),a=$(`pad`,e,t,n),o=$(`kernelSize`,e,t,n);return[r.maxPool3d($(`x`,e,t,n),[o[1],o[2],o[3]],[i[1],i[2],i[3]],a)]}case`Dilation2D`:{let i=$(`strides`,e,t,n),a=$(`pad`,e,t,n),o=$(`dilations`,e,t,n),s=i[1],c=i[2],l=o[1],u=o[2];return[r.dilation2d($(`x`,e,t,n),$(`filter`,e,t,n),[s,c],a,[l,u],`NHWC`)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),f6,p6=o((()=>{U3(),y4(),f6=(e,t,n,r=H3)=>{switch(e.op){case`Fill`:{let i=$(`shape`,e,t,n),a=$(`dtype`,e,t,n),o=$(`value`,e,t,n);return[r.fill(i,o,a)]}case`LinSpace`:{let i=$(`start`,e,t,n),a=$(`stop`,e,t,n),o=$(`num`,e,t,n);return[r.linspace(i,a,o)]}case`Multinomial`:{let i=$(`logits`,e,t,n),a=$(`numSamples`,e,t,n),o=$(`seed`,e,t,n);return[r.multinomial(i,a,o)]}case`OneHot`:{let i=$(`indices`,e,t,n),a=$(`depth`,e,t,n),o=$(`onValue`,e,t,n),s=$(`offValue`,e,t,n),c=$(`dtype`,e,t,n);return[r.oneHot(i,a,o,s,c)]}case`Ones`:return[r.ones($(`shape`,e,t,n),$(`dtype`,e,t,n))];case`OnesLike`:return[r.onesLike($(`x`,e,t,n))];case`RandomStandardNormal`:return[r.randomStandardNormal($(`shape`,e,t,n),$(`dtype`,e,t,n),$(`seed`,e,t,n))];case`RandomUniform`:return[r.randomUniform($(`shape`,e,t,n),$(`minval`,e,t,n),$(`maxval`,e,t,n),$(`dtype`,e,t,n))];case`RandomUniformInt`:return[r.randomUniformInt($(`shape`,e,t,n),$(`minval`,e,t,n),$(`maxval`,e,t,n),$(`seed`,e,t,n))];case`Range`:{let i=$(`start`,e,t,n),a=$(`stop`,e,t,n),o=$(`step`,e,t,n);return[r.range(i,a,o,$(`dtype`,e,t,n))]}case`TruncatedNormal`:{let i=$(`shape`,e,t,n),a=$(`mean`,e,t,n),o=$(`stdDev`,e,t,n),s=$(`seed`,e,t,n);return[r.truncatedNormal(i,a,o,$(`dtype`,e,t,n),s)]}case`Zeros`:return[r.zeros($(`shape`,e,t,n),$(`dtype`,e,t,n))];case`ZerosLike`:return[r.zerosLike($(`x`,e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}));function m6(e,t,n){return{boxes:$(`boxes`,e,t,n),scores:$(`scores`,e,t,n),maxOutputSize:$(`maxOutputSize`,e,t,n),iouThreshold:$(`iouThreshold`,e,t,n),scoreThreshold:$(`scoreThreshold`,e,t,n),softNmsSigma:$(`softNmsSigma`,e,t,n)}}var h6,g6=o((()=>{U3(),y4(),h6=async(e,t,n,r,i=H3)=>{switch(e.op){case`NonMaxSuppressionV5`:{let{boxes:r,scores:a,maxOutputSize:o,iouThreshold:s,scoreThreshold:c,softNmsSigma:l}=m6(e,t,n),u=await i.image.nonMaxSuppressionWithScoreAsync(r,a,o,s,c,l);return[u.selectedIndices,u.selectedScores]}case`NonMaxSuppressionV4`:{let{boxes:r,scores:a,maxOutputSize:o,iouThreshold:s,scoreThreshold:c}=m6(e,t,n),l=$(`padToMaxOutputSize`,e,t,n),u=await i.image.nonMaxSuppressionPaddedAsync(r,a,o,s,c,l);return[u.selectedIndices,u.validOutputs]}case`NonMaxSuppressionV3`:case`NonMaxSuppressionV2`:{let{boxes:r,scores:a,maxOutputSize:o,iouThreshold:s,scoreThreshold:c}=m6(e,t,n);return[await i.image.nonMaxSuppressionAsync(r,a,o,s,c)]}case`Where`:{let r=i.cast($(`condition`,e,t,n),`bool`),a=[await i.whereAsync(r)];return r.dispose(),a}case`ListDiff`:return i.setdiff1dAsync($(`x`,e,t,n),$(`y`,e,t,n));default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),_6,v6=o((()=>{U3(),y4(),_6=(e,t,n,r=H3)=>{switch(e.op){case`LowerBound`:{let i=$(`sortedSequence`,e,t,n),a=$(`values`,e,t,n);return[r.lowerBound(i,a)]}case`TopKV2`:{let i=$(`x`,e,t,n),a=$(`k`,e,t,n),o=$(`sorted`,e,t,n),s=r.topk(i,a,o);return[s.values,s.indices]}case`UpperBound`:{let i=$(`sortedSequence`,e,t,n),a=$(`values`,e,t,n);return[r.upperBound(i,a)]}case`Unique`:{let i=$(`x`,e,t,n),a=r.unique(i);return[a.values,a.indices]}case`UniqueV2`:{let i=$(`x`,e,t,n),a=$(`axis`,e,t,n),o=r.unique(i,a);return[o.values,o.indices]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),y6,b6=o((()=>{U3(),y4(),y6=(e,t,n,r=H3)=>{switch(e.op){case`Const`:return t[e.name];case`PlaceholderWithDefault`:let i=$(`default`,e,t,n);return[f4(e.name,t,n)||i];case`Placeholder`:return[f4(e.name,t,n)];case`Identity`:case`StopGradient`:case`FakeQuantWithMinMaxVars`:return[v4($(`x`,e,t,n))];case`IdentityN`:return $(`x`,e,t,n).map(e=>v4(e));case`Snapshot`:return[v4($(`x`,e,t,n))];case`Shape`:return[r.tensor1d($(`x`,e,t,n).shape,`int32`)];case`ShapeN`:return $(`x`,e,t,n).map(e=>r.tensor1d(e.shape));case`Size`:return[r.scalar($(`x`,e,t,n).size,`int32`)];case`Rank`:return[r.scalar($(`x`,e,t,n).rank,`int32`)];case`NoOp`:return[r.scalar(1)];case`Print`:let a=$(`x`,e,t,n),o=$(`data`,e,t,n),s=$(`message`,e,t,n),c=$(`summarize`,e,t,n);console.warn(`The graph has a tf.print() operation,usually used for debugging, which slows down performance.`),console.log(s);for(let e=0;e<o.length;e++)console.log(Array.prototype.slice.call(o[e].dataSync()).slice(0,c));return[a];default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),x6,S6=o((()=>{J(),U3(),x6=class{get id(){return this.handle.id}constructor(e,t){this.keyDType=e,this.valueDType=t,this.handle=Nf(0),this.tensorMap=new Map,_o(this.handle)}clearAndClose(){this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return Nf(this.size(),`int32`)}async import(e,t){this.checkKeyAndValueTensor(e,t);let n=await e.data();return this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),ho(()=>{let e=Ky(t),r=n.length,i=e.length;E(r===i,()=>`The number of elements doesn't match, keys has ${r} elements, the values has ${i} elements.`);for(let t=0;t<r;t++){let r=n[t],i=e[t];_o(i),this.tensorMap.set(r,i)}return this.handle})}async find(e,t){this.checkKeyAndValueTensor(e,t);let n=await e.data();return ho(()=>{let e=[];for(let r=0;r<n.length;r++){let i=n[r],a=this.findWithDefault(i,t);e.push(a)}return ny(e)})}findWithDefault(e,t){return this.tensorMap.get(e)??t}checkKeyAndValueTensor(e,t){if(e.dtype!==this.keyDType)throw Error(`Expect key dtype ${this.keyDType}, but got ${e.dtype}`);if(t.dtype!==this.valueDType)throw Error(`Expect value dtype ${this.valueDType}, but got ${t.dtype}`)}}})),C6,w6=o((()=>{S6(),y4(),C6=async(e,t,n,r)=>{switch(e.op){case`HashTable`:case`HashTableV2`:{let i=r.getHashTableHandleByName(e.name);if(i!=null)return[i];{let i=$(`keyDType`,e,t,n),a=$(`valueDType`,e,t,n),o=new x6(i,a);return r.addHashTable(e.name,o),[o.handle]}}case`InitializeTable`:case`InitializeTableV2`:case`LookupTableImport`:case`LookupTableImportV2`:{let i=$(`tableHandle`,e,t,n,r),a=$(`keys`,e,t,n),o=$(`values`,e,t,n);return[await r.getHashTableById(i.id).import(a,o)]}case`LookupTableFind`:case`LookupTableFindV2`:{let i=$(`tableHandle`,e,t,n,r),a=$(`keys`,e,t,n),o=$(`defaultValue`,e,t,n);return[await r.getHashTableById(i.id).find(a,o)]}case`LookupTableSize`:case`LookupTableSizeV2`:{let i=$(`tableHandle`,e,t,n,r);return[r.getHashTableById(i.id).tensorSize()]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),T6,E6=o((()=>{U3(),y4(),T6=(e,t,n,r=H3)=>{switch(e.op){case`ResizeBilinear`:{let i=$(`images`,e,t,n),a=$(`size`,e,t,n),o=$(`alignCorners`,e,t,n),s=$(`halfPixelCenters`,e,t,n);return[r.image.resizeBilinear(i,[a[0],a[1]],o,s)]}case`ResizeNearestNeighbor`:{let i=$(`images`,e,t,n),a=$(`size`,e,t,n),o=$(`alignCorners`,e,t,n),s=$(`halfPixelCenters`,e,t,n);return[r.image.resizeNearestNeighbor(i,[a[0],a[1]],o,s)]}case`CropAndResize`:{let i=$(`image`,e,t,n),a=$(`boxes`,e,t,n),o=$(`boxInd`,e,t,n),s=$(`cropSize`,e,t,n),c=$(`method`,e,t,n),l=$(`extrapolationValue`,e,t,n);return[r.image.cropAndResize(i,a,o,s,c,l)]}case`ImageProjectiveTransformV3`:{let i=$(`images`,e,t,n),a=$(`transforms`,e,t,n),o=$(`outputShape`,e,t,n),s=$(`fillValue`,e,t,n),c=$(`interpolation`,e,t,n),l=$(`fillMode`,e,t,n);return[r.image.transform(i,a,c.toLowerCase(),l.toLowerCase(),s,o)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),D6,O6=o((()=>{U3(),y4(),D6=(e,t,n,r=H3)=>{switch(e.op){case`Equal`:return[r.equal($(`a`,e,t,n),$(`b`,e,t,n))];case`NotEqual`:return[r.notEqual($(`a`,e,t,n),$(`b`,e,t,n))];case`Greater`:return[r.greater($(`a`,e,t,n),$(`b`,e,t,n))];case`GreaterEqual`:return[r.greaterEqual($(`a`,e,t,n),$(`b`,e,t,n))];case`Less`:return[r.less($(`a`,e,t,n),$(`b`,e,t,n))];case`LessEqual`:return[r.lessEqual($(`a`,e,t,n),$(`b`,e,t,n))];case`LogicalAnd`:return[r.logicalAnd($(`a`,e,t,n),$(`b`,e,t,n))];case`LogicalNot`:return[r.logicalNot($(`a`,e,t,n))];case`LogicalOr`:return[r.logicalOr($(`a`,e,t,n),$(`b`,e,t,n))];case`Select`:case`SelectV2`:return[r.where($(`condition`,e,t,n),$(`a`,e,t,n),$(`b`,e,t,n))];case`BitwiseAnd`:return[r.bitwiseAnd($(`a`,e,t,n),$(`b`,e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),k6,A6=o((()=>{U3(),y4(),k6=(e,t,n,r=H3)=>{switch(e.op){case`BatchMatMul`:case`BatchMatMulV2`:case`MatMul`:return[r.matMul($(`a`,e,t,n),$(`b`,e,t,n),$(`transposeA`,e,t,n),$(`transposeB`,e,t,n))];case`Einsum`:return[r.einsum($(`equation`,e,t,n),...$(`tensors`,e,t,n))];case`Transpose`:return[r.transpose($(`x`,e,t,n),$(`perm`,e,t,n))];case`_FusedMatMul`:let[i,a]=$(`fusedOps`,e,t,n),o=i===`biasadd`,s=a===`prelu`,c=$(`numArgs`,e,t,n),l=$(`leakyreluAlpha`,e,t,n);if(o){if(s&&c!==2)throw Error(`Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.`);if(!s&&c!==1)throw Error(`Fused MatMul with BiasAdd must have one extra argument: bias.`)}let[u,d]=$(`args`,e,t,n);return[r.fused.matMul({a:$(`a`,e,t,n),b:$(`b`,e,t,n),transposeA:$(`transposeA`,e,t,n),transposeB:$(`transposeB`,e,t,n),bias:u,activation:a,preluActivationWeights:d,leakyreluAlpha:l})];case`MatrixBandPart`:return[r.linalg.bandPart($(`a`,e,t,n),$(`numLower`,e,t,n),$(`numUpper`,e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),j6,M6=o((()=>{U3(),y4(),j6=(e,t,n,r=H3)=>{switch(e.op){case`EuclideanNorm`:return[r.euclideanNorm($(`x`,e,t,n),$(`axis`,e,t,n),$(`keepDims`,e,t,n))];case`FusedBatchNorm`:case`FusedBatchNormV2`:return[r.batchNorm($(`x`,e,t,n),$(`mean`,e,t,n),$(`variance`,e,t,n),$(`offset`,e,t,n),$(`scale`,e,t,n),$(`epsilon`,e,t,n))];case`FusedBatchNormV3`:return[r.batchNorm($(`x`,e,t,n),$(`mean`,e,t,n),$(`variance`,e,t,n),$(`offset`,e,t,n),$(`scale`,e,t,n),$(`epsilon`,e,t,n))];case`LRN`:return[r.localResponseNormalization($(`x`,e,t,n),$(`radius`,e,t,n),$(`bias`,e,t,n),$(`alpha`,e,t,n),$(`beta`,e,t,n))];case`Softmax`:return[r.softmax($(`x`,e,t,n))];case`LogSoftmax`:return[r.logSoftmax($(`x`,e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),N6,P6=o((()=>{U3(),y4(),N6=(e,t,n,r=H3)=>{switch(e.op){case`RaggedGather`:{let{outputNestedSplits:i,outputDenseValues:a}=r.raggedGather($(`paramsNestedSplits`,e,t,n),$(`paramsDenseValues`,e,t,n),$(`indices`,e,t,n),$(`outputRaggedRank`,e,t,n));return i.concat(a)}case`RaggedRange`:{let{rtNestedSplits:i,rtDenseValues:a}=r.raggedRange($(`starts`,e,t,n),$(`limits`,e,t,n),$(`splits`,e,t,n));return[i,a]}case`RaggedTensorToTensor`:return[r.raggedTensorToTensor($(`shape`,e,t,n),$(`values`,e,t,n),$(`defaultValue`,e,t,n),$(`rowPartitionTensors`,e,t,n),$(`rowPartitionTypes`,e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),F6,I6=o((()=>{U3(),y4(),F6=(e,t,n,r=H3)=>{switch(e.op){case`Max`:{let i=$(`axis`,e,t,n),a=$(`keepDims`,e,t,n);return[r.max($(`x`,e,t,n),i,a)]}case`Mean`:{let i=$(`axis`,e,t,n),a=$(`keepDims`,e,t,n);return[r.mean($(`x`,e,t,n),i,a)]}case`Min`:{let i=$(`axis`,e,t,n),a=$(`keepDims`,e,t,n);return[r.min($(`x`,e,t,n),i,a)]}case`Sum`:{let i=$(`axis`,e,t,n),a=$(`keepDims`,e,t,n);return[r.sum($(`x`,e,t,n),i,a)]}case`All`:{let i=$(`axis`,e,t,n),a=$(`keepDims`,e,t,n);return[r.all($(`x`,e,t,n),i,a)]}case`Any`:{let i=$(`axis`,e,t,n),a=$(`keepDims`,e,t,n);return[r.any($(`x`,e,t,n),i,a)]}case`ArgMax`:{let i=$(`axis`,e,t,n);return[r.argMax($(`x`,e,t,n),i)]}case`ArgMin`:{let i=$(`axis`,e,t,n);return[r.argMin($(`x`,e,t,n),i)]}case`Prod`:{let i=$(`axis`,e,t,n),a=$(`keepDims`,e,t,n);return[r.prod($(`x`,e,t,n),i,a)]}case`Cumprod`:{let i=$(`axis`,e,t,n),a=$(`exclusive`,e,t,n),o=$(`reverse`,e,t,n);return[r.cumprod($(`x`,e,t,n),i,a,o)]}case`Cumsum`:{let i=$(`axis`,e,t,n),a=$(`exclusive`,e,t,n),o=$(`reverse`,e,t,n);return[r.cumsum($(`x`,e,t,n),i,a,o)]}case`Bincount`:let i=$(`x`,e,t,n),a=$(`weights`,e,t,n),o=$(`size`,e,t,n);return[r.bincount(i,a,o)];case`DenseBincount`:{let i=$(`x`,e,t,n),a=$(`weights`,e,t,n),o=$(`size`,e,t,n),s=$(`binaryOutput`,e,t,n);return[r.denseBincount(i,a,o,s)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),L6,R6=o((()=>{J(),U3(),y4(),L6=(e,t,n,r=H3)=>{switch(e.op){case`ConcatV2`:case`Concat`:{let i=$(`n`,e,t,n),a=$(`axis`,e,t,n),o=$(`tensors`,e,t,n);return o=o.slice(0,i),[r.concat(o,a)]}case`Gather`:{let i=$(`x`,e,t,n),a=$(`indices`,e,t,n);return[r.gather(i,r.cast(a,`int32`),0)]}case`GatherV2`:{let i=$(`axis`,e,t,n),a=$(`batchDims`,e,t,n),o=$(`x`,e,t,n),s=$(`indices`,e,t,n);return[r.gather(o,r.cast(s,`int32`),i,a)]}case`Reverse`:{let i=$(`dims`,e,t,n),a=[];for(let e=0;e<i.length;e++)i[e]&&a.push(e);let o=$(`x`,e,t,n);return[r.reverse(o,a)]}case`ReverseV2`:{let i=$(`axis`,e,t,n),a=$(`x`,e,t,n);return[r.reverse(a,i)]}case`Slice`:{let i=$(`begin`,e,t,n),a=$(`size`,e,t,n);return[r.slice($(`x`,e,t,n),i,a)]}case`StridedSlice`:{let i=$(`begin`,e,t,n),a=$(`end`,e,t,n),o=$(`strides`,e,t,n),s=$(`beginMask`,e,t,n),c=$(`endMask`,e,t,n),l=$(`ellipsisMask`,e,t,n),u=$(`newAxisMask`,e,t,n),d=$(`shrinkAxisMask`,e,t,n),f=$(`x`,e,t,n);return[r.stridedSlice(f,i,a,o,s,c,l,u,d)]}case`Pack`:return ho(()=>{let i=$(`axis`,e,t,n),a=$(`tensors`,e,t,n),o=a[0].shape,s=r.squeeze(a[0]).shape,c=a.map(e=>{let t=A(e.shape,o);if(!t&&!A(r.squeeze(e).shape,s))throw Error(`the input tensors shape does not match`);return t?e:r.reshape(e,o)});return[r.stack(c,i)]});case`Unpack`:{let i=$(`axis`,e,t,n),a=$(`tensor`,e,t,n);return r.unstack(a,i)}case`Tile`:{let i=$(`reps`,e,t,n);return[r.tile($(`x`,e,t,n),i)]}case`Split`:case`SplitV`:{let i=$(`axis`,e,t,n),a=$(`numOrSizeSplits`,e,t,n),o=$(`x`,e,t,n);return r.split(o,a,i)}case`ScatterNd`:{let i=$(`indices`,e,t,n),a=$(`values`,e,t,n),o=$(`shape`,e,t,n);return[r.scatterND(i,a,o)]}case`GatherNd`:{let i=$(`x`,e,t,n),a=$(`indices`,e,t,n);return[r.gatherND(i,a)]}case`SparseToDense`:{let i=$(`sparseIndices`,e,t,n),a=$(`outputShape`,e,t,n),o=$(`sparseValues`,e,t,n),s=$(`defaultValue`,e,t,n);return[r.sparseToDense(i,o,a,o.dtype===s.dtype?s:r.cast(s,o.dtype))]}case`TensorScatterUpdate`:{let i=$(`indices`,e,t,n),a=$(`values`,e,t,n),o=$(`tensor`,e,t,n);return[r.tensorScatterUpdate(o,i,a)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),z6,B6=o((()=>{U3(),y4(),z6=(e,t,n,r=H3)=>{switch(e.op){case`SparseFillEmptyRows`:{let{outputIndices:i,outputValues:a,emptyRowIndicator:o,reverseIndexMap:s}=r.sparse.sparseFillEmptyRows($(`indices`,e,t,n),$(`values`,e,t,n),$(`denseShape`,e,t,n),$(`defaultValue`,e,t,n));return[i,a,o,s]}case`SparseReshape`:{let{outputIndices:i,outputShape:a}=r.sparse.sparseReshape($(`inputIndices`,e,t,n),$(`inputShape`,e,t,n),$(`newShape`,e,t,n));return[i,a]}case`SparseSegmentMean`:return[r.sparse.sparseSegmentMean($(`data`,e,t,n),$(`indices`,e,t,n),$(`segmentIds`,e,t,n))];case`SparseSegmentSum`:return[r.sparse.sparseSegmentSum($(`data`,e,t,n),$(`indices`,e,t,n),$(`segmentIds`,e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),V6,H6=o((()=>{U3(),y4(),V6=(e,t,n,r=H3)=>{switch(e.op){case`FFT`:return[r.fft($(`x`,e,t,n))];case`IFFT`:return[r.ifft($(`x`,e,t,n))];case`RFFT`:return[r.rfft($(`x`,e,t,n))];case`IRFFT`:return[r.irfft($(`x`,e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),U6,W6=o((()=>{U3(),y4(),U6=(e,t,n,r=H3)=>{switch(e.op){case`StaticRegexReplace`:return[r.string.staticRegexReplace($(`input`,e,t,n),$(`pattern`,e,t,n),$(`rewrite`,e,t,n),$(`replaceGlobal`,e,t,n))];case`StringNGrams`:{let{nGrams:i,nGramsSplits:a}=r.string.stringNGrams($(`data`,e,t,n),$(`dataSplits`,e,t,n),$(`separator`,e,t,n),$(`nGramWidths`,e,t,n),$(`leftPad`,e,t,n),$(`rightPad`,e,t,n),$(`padWidth`,e,t,n),$(`preserveShortSequences`,e,t,n));return[i,a]}case`StringSplit`:{let{indices:i,values:a,shape:o}=r.string.stringSplit($(`input`,e,t,n),$(`delimiter`,e,t,n),$(`skipEmpty`,e,t,n));return[i,a,o]}case`StringToHashBucketFast`:return[r.string.stringToHashBucketFast($(`input`,e,t,n),$(`numBuckets`,e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}})),G6,K6=o((()=>{U3(),y4(),G6=(e,t,n,r=H3)=>{switch(e.op){case`Cast`:return[r.cast($(`x`,e,t,n),$(`dtype`,e,t,n))];case`ExpandDims`:{let i=$(`axis`,e,t,n);return[r.expandDims($(`x`,e,t,n),i)]}case`Squeeze`:{let i=$(`axis`,e,t,n);return[r.squeeze($(`x`,e,t,n),i)]}case`Reshape`:return[r.reshape($(`x`,e,t,n),$(`shape`,e,t,n))];case`EnsureShape`:return[r.ensureShape($(`x`,e,t,n),$(`shape`,e,t,n))];case`MirrorPad`:return[r.mirrorPad($(`x`,e,t,n),$(`padding`,e,t,n),$(`mode`,e,t,n))];case`PadV2`:case`Pad`:return[r.pad($(`x`,e,t,n),$(`padding`,e,t,n),$(`constantValue`,e,t,n))];case`SpaceToBatchND`:{let i=$(`blockShape`,e,t,n),a=$(`paddings`,e,t,n);return[r.spaceToBatchND($(`x`,e,t,n),i,a)]}case`BatchToSpaceND`:{let i=$(`blockShape`,e,t,n),a=$(`crops`,e,t,n);return[r.batchToSpaceND($(`x`,e,t,n),i,a)]}case`DepthToSpace`:{let i=$(`blockSize`,e,t,n),a=$(`dataFormat`,e,t,n).toUpperCase();return[r.depthToSpace($(`x`,e,t,n),i,a)]}case`BroadcastTo`:return[r.broadcastTo($(`x`,e,t,n),$(`shape`,e,t,n))];case`BroadcastArgs`:return[r.broadcastArgs($(`s0`,e,t,n),$(`s1`,e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}));function q6(e,t,n,r,i=ho){let a=((e,t,n)=>{switch(e.category){case`arithmetic`:return i(()=>W3(e,t,n));case`basic_math`:return i(()=>K3(e,t,n));case`control`:return s6(e,t,n);case`convolution`:return i(()=>u6(e,t,n));case`creation`:return i(()=>f6(e,t,n));case`dynamic`:return h6(e,t,n);case`evaluation`:return i(()=>_6(e,t,n));case`image`:return i(()=>T6(e,t,n));case`graph`:return i(()=>y6(e,t,n));case`logical`:return i(()=>D6(e,t,n));case`matrices`:return i(()=>k6(e,t,n));case`normalization`:return i(()=>j6(e,t,n));case`ragged`:return i(()=>N6(e,t,n));case`reduction`:return i(()=>F6(e,t,n));case`slice_join`:return i(()=>L6(e,t,n));case`sparse`:return i(()=>z6(e,t,n));case`spectral`:return i(()=>V6(e,t,n));case`string`:return i(()=>U6(e,t,n));case`transformation`:return i(()=>G6(e,t,n));case`hash_table`:return C6(e,t,n,r);case`custom`:let a=c4(e.op);if(a&&a.customExecutor)return a.customExecutor(new B3(e,t,n));throw TypeError(`Custom op ${e.op} is not registered.`);default:throw TypeError(`Unknown op '${e.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(e,t,n);return je(a)?a.then(e=>[].concat(e)):[].concat(a)}var J6=o((()=>{J(),V3(),d4(),G3(),q3(),c6(),d6(),p6(),g6(),v6(),b6(),w6(),E6(),O6(),A6(),M6(),P6(),I6(),R6(),B6(),H6(),W6(),K6()})),Y6,X6=o((()=>{Y6=class{constructor(e={},t={},n={},r={},i){this.weightMap=e,this.tensorArrayMap=t,this.tensorListMap=n,this.functionMap=r,this.parseNodeNameCache=i,this.rootContext={id:0,frameName:``,iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(e,t){return{id:e,frameName:t,iterationId:0}}set currentContext(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){let e=[];for(let t=0;t<this.contexts.length-1;t++){let n=this.contexts.slice(0,this.contexts.length-t);e.push(this.contextIdforContexts(n))}e.push(``),this._currentContextIds=e}contextIdforContexts(e){return e?e.map(e=>e.id===0&&e.iterationId===0?``:`${e.frameName}-${e.iterationId}`).join(`/`):``}enterFrame(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw Error(`Cannot exit frame, the context is empty`)}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;let e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw Error(`Cannot increase frame iteration, the context is empty`)}getWeight(e){return this.weightMap[e]}addTensorArray(e){this.tensorArrayMap[e.id]=e}getTensorArray(e){return this.tensorArrayMap[e]}addTensorList(e){this.tensorListMap[e.id]=e}getTensorList(e){return this.tensorListMap[e]}dispose(e){for(let t in this.tensorArrayMap)this.tensorArrayMap[t].clearAndClose(e);for(let t in this.tensorListMap)this.tensorListMap[t].clearAndClose(e)}}}));function Z6(e,t,n,r){let i=new Set,a=[],o=null,s=null,c=new Set,l=new Set(Object.keys(e).map(e=>g4(e)[0]));r||=[];let u=new Set(r.map(e=>g4(e.name)[0])),d=[...t];for(;d.length>0;){let e=d.pop();if((n8(e)||r8(e)||i8(e))&&(o??(o=e,s=o.children.map(e=>e.name).filter(e=>i.has(e)))),i.add(e.name),n[e.name]==null&&!l.has(e.name)&&!u.has(e.name)){if(e.inputs.length===0){a.push(e.name);continue}e.inputs.forEach(e=>{c.has(e.name)||(c.add(e.name),d.push(e))})}}return{inputs:e,outputs:t,usedNodes:i,missingInputs:a,dynamicNode:o,syncInputs:s}}function Q6(e,t){let{usedNodes:n,inputs:r}=t,i=Object.keys(r).map(e=>g4(e)[0]).map(t=>e.nodes[t]),a=e.initNodes||[],o=e=>n.has(typeof e==`string`?e:e.name);function s(e){return[...new Map(e.map(e=>[e.name,e])).values()]}let c=s([...i,...e.weights,...a]).filter(o),l=s([...c,...Object.values(e.nodes)]).filter(o),u=new Map(l.map(e=>[e.name,e])),d={};for(let e of l){d[e.name]=d[e.name]||0;for(let t of e.children)o(t)||(d[t.name]=1/0),d[t.name]=(d[t.name]||0)+1}let f=Object.entries(d).filter(([,e])=>e===0).map(([e])=>e),p=[...f];for(;f.length>0;){let e=f.pop(),t=u.get(e);for(let e of t.children.filter(o))--d[e.name]===0&&(p.push(e.name),f.push(e.name))}let m=$6(p.map(e=>u.get(e)),c);return e8(m,c),m}function $6(e,t){let n=new Map(e.map(e=>[e.name,e])),r=t.map(e=>e.name),i=new Set(r);for(;r.length>0;){let e=r.pop(),t=n.get(e);for(let e of t.children)n.has(e.name)&&!i.has(e.name)&&(i.add(e.name),r.push(e.name))}return e.filter(e=>i.has(e.name))}function e8(e,t){let n=new Map(e.map((e,t)=>[e.name,t])),r=new Set(t.map(e=>e.name)),i=e=>r.has(typeof e==`string`?e:e.name),a=new Set(e.map(e=>e.name)),o=e=>a.has(typeof e==`string`?e:e.name);for(let t of e){for(let e of t.children.filter(o)){if(!n.has(e.name))throw new a8(`Child ${e.name} of node ${t.name} is unreachable.`);if(n.get(t.name)>n.get(e.name))throw new a8(`Node ${t.name} is scheduled to run after its child ${e.name}.`)}if(!i(t))for(let e of t.inputs){if(!n.has(e.name))throw new a8(`Input ${e.name} of node ${t.name} is unreachable.`);if(n.get(e.name)>n.get(t.name))throw new a8(`Node ${t.name} is scheduled to run before its input ${e.name}.`)}}}function t8(e){let t=new Map(e.map((e,t)=>[e.name,t])),n=2**53-1,r=e.map((e,t)=>n8(e)?n:t),i=e=>r[t.get(e.name)]??-1,a=e.map((e,t)=>e.children.map(i).reduce((e,t)=>Math.max(e,t),r[t])),o=new Map;for(let t=0;t<e.length;++t){let r=a[t];if(r===n)continue;let i=e[t],s=e[r];o.has(s.name)||o.set(s.name,[]),o.get(s.name).push(i)}return o}function n8(e){return o8.has(e.op)}function r8(e){return s8.has(e.op)}function i8(e){return c8.has(e.op)}var a8,o8,s8,c8,l8=o((()=>{y4(),a8=class extends Error{constructor(e){super(`NodesExecutionOrderError: ${e}`)}},o8=new Set([`Switch`,`Merge`,`Enter`,`Exit`,`NextIteration`,`StatelessIf`,`StatelessWhile`,`if`,`While`]),s8=new Set([`NonMaxSuppressionV2`,`NonMaxSuppressionV3`,`NonMaxSuppressionV5`,`Where`]),c8=new Set([`HashTable`,`HashTableV2`,`LookupTableImport`,`LookupTableImportV2`,`LookupTableFind`,`LookupTableFindV2`,`LookupTableSize`,`LookupTableSizeV2`])})),u8,d8=o((()=>{J(),y4(),J6(),X6(),l8(),u8=class e{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(e){let t=Object.keys(e).map(t=>e[t].map(e=>e.id));this._weightIds=[].concat(...t),this._weightMap=e}set resourceManager(e){this._resourceManager=e}get inputs(){return this._inputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(e=>e.signatureKey||e.name)}get outputNodes(){return this._outputs.map(e=>{let t=e.signatureKey||e.name;return e.defaultOutput?`${t}:${e.defaultOutput}`:t})}get functions(){return Object.keys(this._functions).reduce((e,t)=>(e[t]=this._functions[t].signature,e),{})}constructor(t,n){this.graph=t,this.parent=n,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=`,`,this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=t.outputs,this._inputs=t.inputs,this._initNodes=t.initNodes,this._signature=t.signature,this._functions=t.functions,t.functions!=null&&Object.keys(t.functions).forEach(n=>{this._functionExecutorMap[n]=new e(t.functions[n],this)})}getCompilationKey(e,t){let n=e.map(e=>e.name).sort(),r=t.map(e=>e.name).sort();return n.join(this.SEPARATOR)+`--`+r.join(this.SEPARATOR)}compile(e,t){let n=Z6(e,t,this.weightMap,this._initNodes),{missingInputs:r,dynamicNode:i,syncInputs:a}=n;if(i!=null)throw Error(`This execution contains the node '${i.name}', which has the dynamic op '${i.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${a}]`);if(r.length>0){let n=t.map(e=>e.name),i=Object.keys(e);throw Error(`Cannot compute the outputs [${n}] from the provided inputs [${i}]. Missing the following inputs: [${r}]`)}let o=Q6(this.graph,n);return{orderedNodes:o,nodeLiveUntilMap:t8(o)}}cloneAndKeepTensor(e){if(e==null)return null;let t=e.clone();return _o(t),t}cloneTensorList(e){return e?e.map(e=>this.cloneAndKeepTensor(e)):null}cloneTensorMap(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[e,this.cloneTensorList(t)]))}execute(e,t){this.disposeIntermediateTensors(),e=this.mapInputs(e);let n=Object.keys(e).sort();this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t);let r=n.map(e=>this.graph.nodes[g4(e)[0]]),i=t.map(e=>g4(e)[0]),a=new Set(i),o=i.map(e=>this.graph.nodes[e]);o.length===0&&(o=this._outputs);let s=this.getCompilationKey(r,o),c=this.compiledMap.get(s);c??(c=this.compile(e,o),this.compiledMap.set(s,c));try{this.keepIntermediateTensors=P().getBool(`KEEP_INTERMEDIATE_TENSORS`)}catch(e){this.keepIntermediateTensors=!1,console.warn(e.message)}let l={},u={};return ho(()=>{let n=new Y6(this.weightMap,l,u,this.functionExecutorMap,this.parseNodeNameCache),r=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(e).forEach(t=>{let[i,a]=g4(t,n),o=[];o[a]=e[t],r[i]=o,this.keepIntermediateTensors&&(this.clonedTensorsMap[i]=this.cloneTensorList(o))});let i=this.getFrozenTensorIds(r),{orderedNodes:o,nodeLiveUntilMap:s}=c;for(let e of o){if(r[e.name])continue;let t=q6(e,r,n,this._resourceManager);if(je(t))throw Error(`The execution of the op '${e.op}' returned a promise. Please use model.executeAsync() instead.`);r[e.name]=t,this.keepIntermediateTensors&&(this.clonedTensorsMap[e.name]=this.cloneTensorList(t)),this.checkTensorForDisposalWithNodeLiveUntilInfo(e,r,n,i,a,s.get(e.name))}return this.parent??n.dispose(i),t.map(e=>f4(e,r,n))})}getFrozenTensorIds(e){let t=[].concat.apply([],Object.keys(e).map(t=>e[t]).map(e=>e.map(e=>e.id)));return new Set(t)}checkTensorForDisposal(e,t,n,r,i,a,o){if(!(n8(t)||a.has(e))){for(let r of n[e])r!=null&&(o[r.id]=(o[r.id]||0)+t.children.length);for(let e of t.inputs){if(n8(e))continue;let t=p4(e.name,n,r);if(t!=null)for(let e of t){if(!e||e.kept||i.has(e.id))continue;let t=o[e.id];t===1?(e.dispose(),delete o[e.id]):t!=null&&o[e.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(e,t,n,r,i,a){function o(e){return n8(e)||i.has(e.name)}if(!(n8(e)||a==null))for(let e of a){if(o(e))continue;let i=p4(e.name,t,n);for(let e of i)!e||e.kept||r.has(e.id)||e.dispose()}}async executeAsync(e,t){return this._executeAsync(e,t)}disposeIntermediateTensors(){this.clonedTensorsMap&&=(Object.values(this.clonedTensorsMap).forEach(e=>{for(let t of e)t&&!t.isDisposed&&t.dispose()}),null)}getIntermediateTensors(){return this.clonedTensorsMap}async _executeAsync(e,t,n=!1,r={},i={}){this.disposeIntermediateTensors(),n||(e=this.mapInputs(e),this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t));try{this.keepIntermediateTensors=P().getBool(`KEEP_INTERMEDIATE_TENSORS`)}catch(e){this.keepIntermediateTensors=!1,console.warn(e.message)}let a=new Y6(this.weightMap,r,i,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));let o=await this.executeWithControlFlow(e,a,t,n),s=t.map(e=>f4(e,o,a)),c=s.map(e=>e.id),l=Object.keys(e).map(t=>e[t].id),u=new Set([...c,...l,...this.weightIds]);return Object.values(o).forEach(e=>{e.forEach(e=>{e&&!e.isDisposed&&!u.has(e.id)&&e.dispose()})}),this.parent??a.dispose(u),s}async executeFunctionAsync(e,t,n){let r=e.reduce((e,t,n)=>(e[this.inputs[n].name]=t,e),{});return this._executeAsync(r,this.outputNodes,!0,t,n)}async executeWithControlFlow(e,t,n,r){let i=Object.keys(e),a=i.map(e=>this.graph.nodes[g4(e)[0]]),o=n.map(e=>g4(e)[0]),s=new Set(o),c=o.map(e=>this.graph.nodes[e]);c.length===0&&(c=this._outputs);let{usedNodes:l,missingInputs:u,dynamicNode:d,syncInputs:f}=Z6(e,c,this.weightMap,this._initNodes),p=[...a,...this.graph.weights,...this._initNodes||[]].map(e=>({node:e,contexts:t.currentContext})),m=Object.assign({},this.weightMap);Object.keys(e).forEach(t=>{let[n,r]=g4(t),i=[];i[r]=e[t],m[n]=i});let h={},g=this.getFrozenTensorIds(m),_={};for(;p.length>0;){let e=this.processStack(a,p,t,m,_,g,s,h,l);await Promise.all(e)}d==null&&!r&&console.warn(`This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.`);let v=c.filter(e=>!n8(e)&&!f4(e.name,m,t)).map(e=>e.name);if(v.length>0){let e=``;throw d!=null&&(e=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${f}]`),Error(`Cannot compute the outputs [${v}] from the provided inputs [${i}]. Consider providing the following inputs: [${u}]. ${e}`)}return m}processStack(e,t,n,r,i,a,o,s,c){let l=[];for(;t.length>0;){let e=t.pop();n.currentContext=e.contexts;let u=``;if(e.node.op===`Enter`&&$(`isConstant`,e.node,r,n)&&([u]=m4(e.node.name,n)),r[e.node.name]==null){let d=q6(e.node,r,n,this._resourceManager);u||([u]=m4(e.node.name,n));let f=n.currentContext;je(d)?l.push(d.then(l=>(r[u]=l,this.keepIntermediateTensors&&(this.clonedTensorsMap[u]=this.cloneTensorList(l)),n.currentContext=f,this.checkTensorForDisposal(u,e.node,r,n,a,o,s),this.processChildNodes(e.node,t,n,r,i,c),l))):(r[u]=d,this.keepIntermediateTensors&&(this.clonedTensorsMap[u]=this.cloneTensorList(d)),this.checkTensorForDisposal(u,e.node,r,n,a,o,s),this.processChildNodes(e.node,t,n,r,i,c))}else this.processChildNodes(e.node,t,n,r,i,c)}return l}processChildNodes(e,t,n,r,i,a){e.children.forEach(e=>{let[o]=m4(e.name,n);!i[o]&&a.has(e.name)&&(e.op===`Merge`?e.inputNames.some(e=>!!f4(e,r,n))&&(i[o]=!0,t.push({contexts:n.currentContext,node:e})):e.inputNames.every(e=>!!f4(e,r,n))&&(i[o]=!0,t.push({contexts:n.currentContext,node:e})))})}dispose(){Object.keys(this.weightMap).forEach(e=>this.weightMap[e].forEach(e=>e.dispose()))}checkInputShapeAndType(e){Object.keys(e).forEach(t=>{let n=e[t],[r]=g4(t),i=this.graph.nodes[r];if(i.attrParams.shape&&i.attrParams.shape.value){let e=i.attrParams.shape.value;E(e.length===n.shape.length&&n.shape.every((t,n)=>e[n]===-1||e[n]===t),()=>`The shape of dict['${i.name}'] provided in model.execute(dict) must be [${e}], but was [${n.shape}]`)}i.attrParams.dtype&&i.attrParams.dtype.value&&E(n.dtype===i.attrParams.dtype.value,()=>`The dtype of dict['${i.name}'] provided in model.execute(dict) must be ${i.attrParams.dtype.value}, but was ${n.dtype}`)})}mapInputs(e){let t={};for(let n in e){let r=this._signature?.inputs?.[n];r==null?t[n]=e[n]:t[r.name]=e[n]}return t}checkInputs(e){let t=Object.keys(e).filter(e=>{let[t]=g4(e);return this.graph.nodes[t]==null});if(t.length>0)throw Error(`The dict provided in model.execute(dict) has keys: [${t}] that are not part of graph`)}mapOutputs(e){return e.map(e=>{let t=this._signature?.outputs?.[e];return t==null?e:t.name},{})}checkOutputs(e){e.forEach(e=>{let[t]=g4(e);if(!this.graph.nodes[t])throw Error(`The output '${e}' is not found in the graph`)})}}})),f8,p8=o((()=>{f8=class{constructor(e={},t={}){this.hashTableNameToHandle=e,this.hashTableMap=t}addHashTable(e,t){this.hashTableNameToHandle[e]=t.handle,this.hashTableMap[t.id]=t}getHashTableHandleByName(e){return this.hashTableNameToHandle[e]}getHashTableById(e){return this.hashTableMap[e]}dispose(){for(let e in this.hashTableMap)this.hashTableMap[e].clearAndClose(),delete this.hashTableMap[e];for(let e in this.hashTableNameToHandle)this.hashTableNameToHandle[e].dispose(),delete this.hashTableNameToHandle[e]}}}));async function m8(e,t={},n=Xw){if(e==null)throw Error(`modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model`);t??={},t.fromTFHub&&typeof e==`string`&&(e=g8(e));let r=new y8(e,t,n);return await r.load(),r}function h8(e){if(e==null)throw Error(`modelUrl in loadGraphModelSync() cannot be null. Please provide model artifacts or an IOHandler that loads the model`);let t;if(e instanceof Array){let[n,r]=e;if(!n)throw Error(`modelJSON must be the first element of the array`);if(!r||!(r instanceof ArrayBuffer))throw Error(`An ArrayBuffer of weights must be the second element of the array`);if(!(`modelTopology`in n))throw Error(`Model JSON is missing 'modelTopology'`);if(!(`weightsManifest`in n))throw Error(`Model JSON is missing 'weightsManifest'`);t=Uw(Uo(n,Ko(n.weightsManifest),r))}else if(`load`in e)t=e;else if(`modelTopology`in e&&`weightSpecs`in e&&`weightData`in e)t=Uw(e);else throw Error(`Unknown model format`);let n=new y8(t);return n.load(),n}function g8(e){return e.endsWith(`/`)||(e+=`/`),`${e}${v8}${_8}`}var _8,v8,y8,b8=o((()=>{J(),z3(),d8(),p8(),$o(),_8=`?tfjs-format=file`,v8=`model.json`,y8=class{get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(e,t={},n=Xw){this.modelUrl=e,this.loadOptions=t,this.version=`n/a`,this.io=n,t??(this.loadOptions={}),this.resourceManager=new f8}findIOHandler(){let e=this.modelUrl;if(e.load!=null)this.handler=e;else if(this.loadOptions.requestInit!=null)this.handler=this.io.browserHTTPRequest(e,this.loadOptions);else{let t=this.io.getLoadHandlers(e,this.loadOptions);if(t.length===0)t.push(this.io.browserHTTPRequest(e,this.loadOptions));else if(t.length>1)throw Error(`Found more than one (${t.length}) load handlers for URL '${[e]}'`);this.handler=t[0]}}load(){if(this.findIOHandler(),this.handler.load==null)throw Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");let e=this.handler.load();return je(e)?e.then(e=>e.getWeightStream==null?this.loadSync(e):this.loadStreaming(e)):this.loadSync(e)}loadSync(e){let t=this.io.decodeWeights(e.weightData,e.weightSpecs);return this.loadWithWeightMap(e,t)}async loadStreaming(e){if(e.getWeightStream==null)throw Error(`Model artifacts missing streamWeights function`);let t=await Fo(e.getWeightStream(),e.weightSpecs);return this.loadWithWeightMap(e,t)}loadWithWeightMap(e,t){this.artifacts=e;let n=this.artifacts.modelTopology,r=this.artifacts.signature;if(this.artifacts.userDefinedMetadata!=null){let e=this.artifacts.userDefinedMetadata;e.signature!=null&&(r=e.signature),e.structuredOutputKeys!=null&&(this.structuredOutputKeys=e.structuredOutputKeys)}if(this.signature=r,this.version=`${n.versions.producer}.${n.versions.minConsumer}`,this.executor=new u8(R3.Instance.transformGraph(n,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(t),this.executor.resourceManager=this.resourceManager,e.modelInitializer!=null&&e.modelInitializer.node!=null){let t=R3.Instance.transformGraph(e.modelInitializer);this.initializer=new u8(t),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=e.initializerSignature}return!0}async save(e,t){if(typeof e==`string`){let t=this.io.getSaveHandlers(e);if(t.length===0)throw Error(`Cannot find any save handlers for URL '${e}'`);if(t.length>1)throw Error(`Found more than one (${t.length}) save handlers for URL '${e}'`);e=t[0]}if(e.save==null)throw Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return e.save(this.artifacts)}addStructuredOutputNames(e){if(this.structuredOutputKeys){let t=e instanceof oa?[e]:e,n={};return t.forEach((e,t)=>n[this.structuredOutputKeys[t]]=e),n}return e}predict(e,t){let n=this.execute(e,this.outputNodes);return this.addStructuredOutputNames(n)}async predictAsync(e,t){let n=await this.executeAsync(e,this.outputNodes);return this.addStructuredOutputNames(n)}normalizeInputs(e){if(!(e instanceof oa)&&!Array.isArray(e)){let t=this.signature?.inputs;if(t!=null)for(let n in t){let r=t[n];r.resourceId!=null&&(e[n]=this.resourceIdToCapturedInput[r.resourceId])}return e}e=Array.isArray(e)?e:[e];let t=Object.keys(this.resourceIdToCapturedInput).length;if(e.length+t!==this.inputNodes.length)throw Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-t} non-resource placeholders, while there are ${e.length} input tensors provided.`);let n=0;return this.inputNodes.reduce((t,r)=>{let i=this.signature?.inputs?.[r]?.resourceId;return t[r]=i==null?e[n++]:this.resourceIdToCapturedInput[i],t},{})}normalizeOutputs(e){return e||=this.outputNodes,Array.isArray(e)?e:[e]}executeInitializerGraph(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}async executeInitializerGraphAsync(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))}setResourceIdToCapturedInput(e){if(this.resourceIdToCapturedInput={},this.initializerSignature){let t=this.initializerSignature.outputs,n=Object.keys(t);for(let r=0;r<n.length;r++){let i=t[n[r]];this.resourceIdToCapturedInput[i.resourceId]=e[r]}}}execute(e,t){this.resourceIdToCapturedInput??this.setResourceIdToCapturedInput(this.executeInitializerGraph()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);let n=this.executor.execute(e,t);return n.length>1?n:n[0]}async executeAsync(e,t){this.resourceIdToCapturedInput??this.setResourceIdToCapturedInput(await this.executeInitializerGraphAsync()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);let n=await this.executor.executeAsync(e,t);return n.length>1?n:n[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(e){return Object.keys(e).reduce((t,n)=>(t[n]=[e[n]],t),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&go(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}}})),x8,S8=o((()=>{x8=`4.22.0`})),C8=c({GraphModel:()=>y8,deregisterOp:()=>l4,loadGraphModel:()=>m8,loadGraphModelSync:()=>h8,registerOp:()=>s4,version_converter:()=>x8}),w8=o((()=>{r4(),b8(),d4(),S8()})),T8=u(s(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?r(e,(w8(),d(C8)),(J(),d(CD))):typeof define==`function`&&define.amd?define([`exports`,`@tensorflow/tfjs-converter`,`@tensorflow/tfjs-core`],r):r((n||=self).cocoSsd=n.cocoSsd||{},n.tf,n.tf)})(e,(function(e,t,n){let r={1:{name:`/m/01g317`,id:1,displayName:`person`},2:{name:`/m/0199g`,id:2,displayName:`bicycle`},3:{name:`/m/0k4j`,id:3,displayName:`car`},4:{name:`/m/04_sv`,id:4,displayName:`motorcycle`},5:{name:`/m/05czz6l`,id:5,displayName:`airplane`},6:{name:`/m/01bjv`,id:6,displayName:`bus`},7:{name:`/m/07jdr`,id:7,displayName:`train`},8:{name:`/m/07r04`,id:8,displayName:`truck`},9:{name:`/m/019jd`,id:9,displayName:`boat`},10:{name:`/m/015qff`,id:10,displayName:`traffic light`},11:{name:`/m/01pns0`,id:11,displayName:`fire hydrant`},13:{name:`/m/02pv19`,id:13,displayName:`stop sign`},14:{name:`/m/015qbp`,id:14,displayName:`parking meter`},15:{name:`/m/0cvnqh`,id:15,displayName:`bench`},16:{name:`/m/015p6`,id:16,displayName:`bird`},17:{name:`/m/01yrx`,id:17,displayName:`cat`},18:{name:`/m/0bt9lr`,id:18,displayName:`dog`},19:{name:`/m/03k3r`,id:19,displayName:`horse`},20:{name:`/m/07bgp`,id:20,displayName:`sheep`},21:{name:`/m/01xq0k1`,id:21,displayName:`cow`},22:{name:`/m/0bwd_0j`,id:22,displayName:`elephant`},23:{name:`/m/01dws`,id:23,displayName:`bear`},24:{name:`/m/0898b`,id:24,displayName:`zebra`},25:{name:`/m/03bk1`,id:25,displayName:`giraffe`},27:{name:`/m/01940j`,id:27,displayName:`backpack`},28:{name:`/m/0hnnb`,id:28,displayName:`umbrella`},31:{name:`/m/080hkjn`,id:31,displayName:`handbag`},32:{name:`/m/01rkbr`,id:32,displayName:`tie`},33:{name:`/m/01s55n`,id:33,displayName:`suitcase`},34:{name:`/m/02wmf`,id:34,displayName:`frisbee`},35:{name:`/m/071p9`,id:35,displayName:`skis`},36:{name:`/m/06__v`,id:36,displayName:`snowboard`},37:{name:`/m/018xm`,id:37,displayName:`sports ball`},38:{name:`/m/02zt3`,id:38,displayName:`kite`},39:{name:`/m/03g8mr`,id:39,displayName:`baseball bat`},40:{name:`/m/03grzl`,id:40,displayName:`baseball glove`},41:{name:`/m/06_fw`,id:41,displayName:`skateboard`},42:{name:`/m/019w40`,id:42,displayName:`surfboard`},43:{name:`/m/0dv9c`,id:43,displayName:`tennis racket`},44:{name:`/m/04dr76w`,id:44,displayName:`bottle`},46:{name:`/m/09tvcd`,id:46,displayName:`wine glass`},47:{name:`/m/08gqpm`,id:47,displayName:`cup`},48:{name:`/m/0dt3t`,id:48,displayName:`fork`},49:{name:`/m/04ctx`,id:49,displayName:`knife`},50:{name:`/m/0cmx8`,id:50,displayName:`spoon`},51:{name:`/m/04kkgm`,id:51,displayName:`bowl`},52:{name:`/m/09qck`,id:52,displayName:`banana`},53:{name:`/m/014j1m`,id:53,displayName:`apple`},54:{name:`/m/0l515`,id:54,displayName:`sandwich`},55:{name:`/m/0cyhj_`,id:55,displayName:`orange`},56:{name:`/m/0hkxq`,id:56,displayName:`broccoli`},57:{name:`/m/0fj52s`,id:57,displayName:`carrot`},58:{name:`/m/01b9xk`,id:58,displayName:`hot dog`},59:{name:`/m/0663v`,id:59,displayName:`pizza`},60:{name:`/m/0jy4k`,id:60,displayName:`donut`},61:{name:`/m/0fszt`,id:61,displayName:`cake`},62:{name:`/m/01mzpv`,id:62,displayName:`chair`},63:{name:`/m/02crq1`,id:63,displayName:`couch`},64:{name:`/m/03fp41`,id:64,displayName:`potted plant`},65:{name:`/m/03ssj5`,id:65,displayName:`bed`},67:{name:`/m/04bcr3`,id:67,displayName:`dining table`},70:{name:`/m/09g1w`,id:70,displayName:`toilet`},72:{name:`/m/07c52`,id:72,displayName:`tv`},73:{name:`/m/01c648`,id:73,displayName:`laptop`},74:{name:`/m/020lf`,id:74,displayName:`mouse`},75:{name:`/m/0qjjc`,id:75,displayName:`remote`},76:{name:`/m/01m2v`,id:76,displayName:`keyboard`},77:{name:`/m/050k8`,id:77,displayName:`cell phone`},78:{name:`/m/0fx9l`,id:78,displayName:`microwave`},79:{name:`/m/029bxz`,id:79,displayName:`oven`},80:{name:`/m/01k6s3`,id:80,displayName:`toaster`},81:{name:`/m/0130jx`,id:81,displayName:`sink`},82:{name:`/m/040b_t`,id:82,displayName:`refrigerator`},84:{name:`/m/0bt_c3`,id:84,displayName:`book`},85:{name:`/m/01x3z`,id:85,displayName:`clock`},86:{name:`/m/02s195`,id:86,displayName:`vase`},87:{name:`/m/01lsmm`,id:87,displayName:`scissors`},88:{name:`/m/0kmg4`,id:88,displayName:`teddy bear`},89:{name:`/m/03wvsk`,id:89,displayName:`hair drier`},90:{name:`/m/012xff`,id:90,displayName:`toothbrush`}};class i{constructor(e,t){this.modelPath=t||`https://storage.googleapis.com/tfjs-models/savedmodel/${this.getPrefix(e)}/model.json`}getPrefix(e){return e===`lite_mobilenet_v2`?`ssd${e}`:`ssd_${e}`}async load(){this.model=await t.loadGraphModel(this.modelPath);let e=n.zeros([1,300,300,3],`int32`),r=await this.model.executeAsync(e);await Promise.all(r.map((e=>e.data()))),r.map((e=>e.dispose())),e.dispose()}async infer(e,t,r){let i=n.tidy((()=>(e instanceof n.Tensor||(e=n.browser.fromPixels(e)),n.expandDims(e)))),a=i.shape[1],o=i.shape[2],s=await this.model.executeAsync(i),c=s[0].dataSync(),l=s[1].dataSync();i.dispose(),n.dispose(s);let[u,d]=this.calculateMaxScores(c,s[0].shape[1],s[0].shape[2]),f=n.getBackend();n.getBackend()===`webgl`&&n.setBackend(`cpu`);let p=n.tidy((()=>{let e=n.tensor2d(l,[s[1].shape[1],s[1].shape[3]]);return n.image.nonMaxSuppression(e,u,t,r,r)})),m=p.dataSync();return p.dispose(),f!==n.getBackend()&&n.setBackend(f),this.buildDetectedObjects(o,a,l,u,m,d)}buildDetectedObjects(e,t,n,i,a,o){let s=a.length,c=[];for(let l=0;l<s;l++){let s=[];for(let e=0;e<4;e++)s[e]=n[4*a[l]+e];let u=s[0]*t,d=s[1]*e,f=s[2]*t,p=s[3]*e;s[0]=d,s[1]=u,s[2]=p-d,s[3]=f-u,c.push({bbox:s,class:r[o[a[l]]+1].displayName,score:i[a[l]]})}return c}calculateMaxScores(e,t,n){let r=[],i=[];for(let a=0;a<t;a++){let t=Number.MIN_VALUE,o=-1;for(let r=0;r<n;r++)e[a*n+r]>t&&(t=e[a*n+r],o=r);r[a]=t,i[a]=o}return[r,i]}async detect(e,t=20,n=.5){return this.infer(e,t,n)}dispose(){this.model!=null&&this.model.dispose()}}e.ObjectDetection=i,e.load=async function(e={}){if(n==null)throw Error(`Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this model.`);let t=e.base||`lite_mobilenet_v2`,r=e.modelUrl;if([`mobilenet_v1`,`mobilenet_v2`,`lite_mobilenet_v2`].indexOf(t)===-1)throw Error(`ObjectDetection constructed with invalid base model ${t}. Valid names are 'mobilenet_v1', 'mobilenet_v2' and 'lite_mobilenet_v2'.`);let a=new i(t,r);return await a.load(),a},e.version=`2.2.3`,Object.defineProperty(e,"__esModule",{value:!0})}))}))(),1),E8=new URL(`tfjs-backend-wasm-BIA8cDLW.wasm`,import.meta.url).href,D8=new URL(`tfjs-backend-wasm-simd-BrM3BlWr.wasm`,import.meta.url).href,O8=new URL(`tfjs-backend-wasm-threaded-simd-BLCcuiBu.wasm`,import.meta.url).href;J(),e4({"tfjs-backend-wasm.wasm":E8,"tfjs-backend-wasm-simd.wasm":D8,"tfjs-backend-wasm-threaded-simd.wasm":O8}),P().set(`PROD`,!0);var k8=null,A8=null,j8=null;function M8(){try{let e=typeof OffscreenCanvas<`u`?new OffscreenCanvas(1,1):document.createElement(`canvas`),t=e.getContext(`webgl2`)??e.getContext(`webgl`);if(!t)return null;let n=t.getExtension(`WEBGL_debug_renderer_info`),r=String(n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER));return t.getExtension(`WEBGL_lose_context`)?.loseContext(),/swiftshader|llvmpipe|softpipe|software|basic render/i.test(r)?r:null}catch{return null}}var N8=``;async function P8(e=[`webgl`,`wasm`,`cpu`]){let t=e.includes(`webgl`)?M8():null;t&&(N8=`WebGL is software-rendered (${t}); using WASM instead`,e=[...e.filter(e=>e!==`webgl`),`webgl`]);for(let t of e)try{if(await yo(t)){await bo();let e=ho(()=>W(Nf(1),Nf(1)));return await e.data(),e.dispose(),t}}catch{}throw Error(`No TensorFlow.js backend could be initialised (WebGL, WASM and CPU all failed).`)}async function F8(e,t){k8?.dispose(),k8=null;let n=[];for(let r of t)try{if(r.source===`local`){let e=await fetch(r.url,{method:`GET`,cache:`force-cache`}),t=e.headers.get(`content-type`)??``;if(!e.ok||t.includes(`text/html`))throw Error(`HTTP ${e.status}`)}return k8=await T8.load({base:e,modelUrl:I8(r.url)}),r}catch(e){n.push(`${r.source}: ${e instanceof Error?e.message:String(e)}`)}throw Error(`Model download failed (${n.join(`; `)})`)}function I8(e){let t=e.slice(0,e.lastIndexOf(`/`)+1),n=async e=>{let n=await fetch(t+e);if(!n.ok)throw Error(`${e}: HTTP ${n.status}`);if(!e.endsWith(`.b64.txt`))return n.arrayBuffer();let r=atob((await n.text()).trim()),i=new Uint8Array(r.length);for(let e=0;e<r.length;e++)i[e]=r.charCodeAt(e);return i.buffer};return{load:async()=>{let t=await fetch(e);if(!t.ok)throw Error(`model.json: HTTP ${t.status}`);return Wo(await t.json(),async e=>[e.flatMap(e=>e.weights),Bo(await Promise.all(e.flatMap(e=>e.paths).map(n)))])}}}async function L8(e,t,n){if(!k8)throw Error(`Model not loaded`);let r=e.width,i=e.height;if((!A8||A8.width!==r||A8.height!==i)&&(A8=new OffscreenCanvas(r,i),j8=A8.getContext(`2d`,{willReadFrequently:!0})),!j8)throw Error(`OffscreenCanvas 2D context unavailable`);j8.drawImage(e,0,0),e.close();let a=j8.getImageData(0,0,r,i),o=performance.now(),s=gT(a),c;try{c=await k8.detect(s,n,t)}finally{s.dispose()}let l=performance.now()-o,u=po();return{detections:c.map(e=>({label:e.class,score:e.score,bbox:e.bbox})),inferenceMs:l,tensors:u.numTensors,bytes:u.numBytesInGPU??u.numBytes}}function R8(){k8?.dispose(),k8=null}function z8(){return xo()??`none`}export{z8 as backendName,N8 as backendNote,L8 as detect,R8 as dispose,P8 as initBackend,F8 as loadModel,M8 as softwareWebGL};