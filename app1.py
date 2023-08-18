from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index1():
    return render_template ('1.html')


@app.route('/home')
def index():
    return render_template ('2.html')
    
    
@app.route('/home/games/freshcoin')
def freshcoin():
    return render_template ('games/4.html')
    
    
@app.route('/home/games/freshlend')
def freshlend():
    return render_template ('games/3.html')
    
    
@app.route('/home/bots/petya_ai')
def petya_ai():
    return render_template ('bots/5.html')
    


if __name__ == '__main__':
    app.run(debug=False)