class Runner{
    constructor(x,y,w,h){
        this.body = createSprite(x,y,w,h);
        this.body.addAnimation("animation",runAnime);
        this.body.addAnimation("jumping",r3);
        this.body.addAnimation("pause",r6);
        this.body.addAnimation("pause2",r2);
        this.body.setCollider("rectangle",-10,25,145,180);

        this.dist = null;
    }// constructor
}