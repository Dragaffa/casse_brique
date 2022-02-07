/**
 * ALGO: ceci est une classe...
 * Vous verrez ça plus tard en détail avec Rémi, pour l'instant on n'a pas trop besoin de savoir à quoi ça sert.
 */
let timeline;
class Tableau1 extends Phaser.Scene{
    /**
     * Précharge les assets
     */
    preload() {
        this.load.image('carre', 'assets/carre.png');
        this.load.image('balle', 'assets/cercle.png');
    }


    create(){

        this.hauteur = 800
        this.largeur = 800


        this.haut = this.physics.add.sprite(0, 0, 'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        this.droite=this.physics.add.sprite(this.largeur-20,0, 'carre').setOrigin(0,0);
        this.droite.setDisplaySize(20,this.hauteur);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

        this.gauche=this.physics.add.sprite(0,0, 'carre').setOrigin(0,0);
        this.gauche.setDisplaySize(20,this.hauteur);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        this.raquette = this.physics.add.sprite(this.largeur/2-100, this.hauteur, 'carre').setOrigin(0,0);
        this.raquette.setDisplaySize(200,20);
        this.raquette.body.setAllowGravity(false);
        this.raquette.setImmovable(true);


        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'balle');
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.5,1.5);
        //this.balle.setVelocityY(Phaser.Math.Between(0, 0));
        this.balle.body.setMaxVelocityX(100)
        this.balle.body.setMaxVelocityY(500)

        this.Initiale();

        let me = this ;
        this.physics.add.collider(this.balle, this.raquette,function(){
            console.log("touche")
            me.rebond(me.raquette);
        } );

        this.physics.add.collider(this.balle, this.haut);
        this.physics.add.collider(this.balle, this.droite);
        this.physics.add.collider(this.balle, this.gauche);


        //this.joueurGauche = new Joueur('Player 1','joueurGauche')
        //this.joueurDroite = new Joueur('Player 2','joueurDroite')
        //console.log(this.joueurGauche)

        this.initKeyboard();
        this.creationBrique()
    }

    creationBrique(){
        let me = this;
        let brique;
        this.obstacles = [];

        for (let e=0;e<5;e++) {
            for (let i=0;i<10;i++) {

                brique = this.physics.add.sprite(i * 61 + 120, e * 31 + 200, 'carre')
                brique.setDisplaySize(60, 30);
                brique.body.setAllowGravity(false);
                brique.setImmovable(true);

                this.obstacles.push(brique);

                this.physics.add.collider(me.balle, brique, function () {
                        me.obstacles[i+10*e].setVisible(false);
                        me.obstacles[i+10*e].destroy(true);

                });

            }

        }
    }


    Initiale (){
        this.balle.setX(this.largeur/2);
        this.balle.setY(this.hauteur/2);

        this.raquette.setX(this.largeur/2-100);
        this.raquette.setY(this.hauteur-20);

        this.balle.setVelocityY(200);


        this.balle.setVelocityX(0);

    }





    rebond(raquette){
            let me=this;

            console.log(raquette.x)
            console.log(me.balle.x)
            console.log((me.balle.x)-(raquette.x))

            let hauteurRaquette=raquette.displayWidth;

            let positionRelativeRaquette =(this.balle.x-raquette.x);

            positionRelativeRaquette =(positionRelativeRaquette/hauteurRaquette);

            positionRelativeRaquette= positionRelativeRaquette*2-1;
            console.log(positionRelativeRaquette);

            this.balle.setVelocityX(this.balle.body.velocity.x + positionRelativeRaquette * hauteurRaquette)
    }



    initKeyboard() {
            let me=this;
            this.input.keyboard.on('keydown', function(kevent)
            {
                switch (kevent.keyCode)
                {
                    case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                        if (me.raquette.x<600){
                            me.raquette.setVelocityX(200)
                        }
                        else{
                            me.raquette.setX(600)
                            me.raquette.setVelocityX(0)
                        }
                        break;

                    case Phaser.Input.Keyboard.KeyCodes.LEFT:
                        if (me.raquette.x>0){
                            me.raquette.setVelocityX(-200)
                        }
                        else{
                            me.raquette.setVelocityX(0)
                            me.raquette.setX(0)
                        }
                        break;



                }
            });
            this.input.keyboard.on('keyup', function(kevent)
            {
                switch (kevent.keyCode)
                {
                    case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                        me.raquette.setVelocityX(0)
                        break
                    case Phaser.Input.Keyboard.KeyCodes.LEFT:
                        me.raquette.setVelocityX(0)
                        break


                }
            });
        }

    update(){

        if(this.balle.y>this.hauteur){
            this.balle.setX(this.largeur/2);
            this.balle.setY(this.hauteur/2);
            this.balle.setVelocityY(200);
        }

        if(this.balle.y < 0){
            this.balle.y = 0
        }
        if(this.balle.y > this.hauteur){
            this.balle.y = this.hauteur
        }
    }


}
