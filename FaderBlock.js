class FaderBlock {
    constructor(id, el, svgPath, divTarget, sound, minWidth, leftPos){
        this.el = el;
        this.svgPath = svgPath;
        this.divTarget = divTarget;
        this.sound = sound;
        this.id = id;
        this.height = 100;
        this.minWidth = minWidth;
        this.maxWidth = 1000;
        this.width = this.minWidth;
        this.leftPos = leftPos;
        this.grow = false;
        this.currentVol = 0.0;
        this.newVol = 0.0;

        this.fill = 'rgba(245, 132, 66, 1.0)';
        this.nevermind = 0;
        this.targetX = 10;
        this.incVal = 1;
        
    }

    init(){
       this.sound.play();     
       this.render();

        // this.divTarget.addEventListener('mouseenter', (e) => {
        //     this.grow = true;
        //     this.faderUp();
        //  })

        // this.divTarget.addEventListener('mouseleave', (e) => {
        //     this.grow = false;
        //     this.faderDown();
        //  })


        this.divTarget.addEventListener('click', (e) => {
            console.log(e.clientX)
            // this.grow = true;
            let clicked = false;
            setInterval(function(){
                clicked = false;
            },5000);
           
            if(!clicked){
                this.faderTo(Math.floor(e.clientX));
                clicked = true;
            }
            
         })


    }
         faderDown() {
             //grow = true
                console.log(this.grow);
                this.decreaseSize(this.minWidth);
                this.render();
                if(!this.grow){
                    setTimeout( ()=>{this.faderDown(this.minWidth)},10);
                }
         }

         faderUp(){              
                 this.increaseSize(this.maxWidth);
                 this.render();
                 if(this.grow){
                    setTimeout( () => {this.faderUp(this.maxWidth)},10);
                 }
         }
    

         faderTo(clickVal){
            
            if(clickVal > this.leftPos + this.width){
                // console.log(clickVal-this.leftPos, this.width);
                this.increaseSize(clickVal-this.leftPos);
                this.render();
                setTimeout( () => {this.faderTo(clickVal)},1);
            } else if(clickVal < this.leftPos + this.width){
                console.log(clickVal-this.leftPos, this.width);
                this.decreaseSize(clickVal-this.leftPos);
                this.render();
                setTimeout( () => {this.faderTo(clickVal)},1);
            }
         }



         increaseSize(target){
            // console.log('decrease-size')
            if(this.width < target){
           
                this.width += this.incVal;
            }
            if(this.currentVol < 1.0){
                this.newVol+= .008;
            } 
         }

         decreaseSize(target){
            if(this.width > target){
               
            this.width -= this.incVal;
            }   
            if(this.currentVol > 0.0){
                this.newVol-= .008;
            }          
        }


         render (){
              this.divTarget.style.backgroundImage=`url(img/bg/crowd-${this.id}.png)`;
            // this.divTarget.style.opacity  = '1.0';


            this.svgPath.children[0].setAttribute('height', `${this.height}`);
            this.svgPath.children[0].setAttribute('width', `${this.width}`);
            this.svgPath.children[0].setAttribute('fill', `${this.fill}`);
            // this.svgPath.children[0].setAttribute('opacity', `${1.0}`);
            this.sound.fade(this.currentVol, this.newVol, 100);
            this.currentVol = this.newVol;
            // console.log(this.currentVol);
         }
    
}
            // const img = e.target;
            // const idNum = this.el.id.match(/(\d+)/)[0];
            // console.log(this.svgPath.children[0]);
            // console.log( this.svgPath.children[0]);
            // this.svgPath.children[0].setAttribute('height', '0');
            // console.log(e.clientX)