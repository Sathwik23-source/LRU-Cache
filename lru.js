class CDLLNode
{
    constructor(key,val)
    {
        this.key=key;
        this.val=val;
        this.next=null;
        this.prev=null;
    }
}

class CDLL{

    constructor()
    {
        this.head=null;
    }

    InsertatBegin(key,val)
    {
        let nn=new CDLLNode(key,val);
        nn.next=nn;
        nn.prev=nn;
        if(this.head==null)
        {
            this.head=nn;
            return this.head;
        }
        nn.next=this.head;
        nn.prev=this.head.prev;
        this.head.prev.next=nn;
        this.head.prev=nn;
        this.head=nn;
        return this.head;

    }

    movetoFront(x)
    {
        if(x==this.head){
            return this.head;
        }
        x.prev.next=x.next;
        x.next.prev=x.prev;

        x.next=this.head;
        x.prev=this.head.prev;
        this.head.prev.next=x;
        this.head.prev=x;
        this.head=x;
        return this.head;
    }

    deleteAtlast()
    {
        if(this.head==null) return null;
        let last=this.head.prev;
        if(last==this.head){
            this.head=null;
            return last;
        }
        let slast=last.prev;
        slast.next=this.head;
        this.head.prev=slast;
        return last;
    }

   
}

class LRU{
    constructor(capacity)
    {
        this.capacity=capacity;
        this.size=0;
        this.mp=new Map();
        this.cd=new CDLL();
    }

    put(key,val){
        if(this.mp.has(key))
        {
            this.mp.get(key).val=val;
            this.cd.movetoFront(this.mp.get(key));
        }
        else if(this.size<this.capacity)
        {
            let x=this.cd.InsertatBegin(key,val);
            this.size++;
            this.mp.set(key,x);
        }
        else
        {
            let x=this.cd.deleteAtlast();
            this.mp.delete(x.key);
            let y=this.cd.InsertatBegin(key,val);
            this.mp.set(key,y);
        }
        updateCacheDisplay();
    }

    get(key)
    {
        if(this.mp.has(key)){
            this.cd.movetoFront(this.mp.get(key));
            updateCacheDisplay();
        }
        else keyNotfound();
    }
    getEntries()
    {
        let arr=[];
        let ptr=this.cd.head;
        if(ptr!=null) {
        arr.push([ptr.key,ptr.val]);
        ptr=ptr.next;
        while(ptr!=this.cd.head)
            {
                arr.push([ptr.key,ptr.val]);
                ptr=ptr.next;
            } 
        }
        return arr;
    }
}

let c=null;
function initializecache() {
    let size=parseInt(document.getElementById("cacheSize").value);
    if (isNaN(size)||size<=0) {
        alert("Enter a valid cache size!");
        return;
    }
    c=new LRU(size);
    // document.getElementById("cacheContainer").innerHTML="";
    alert(`LRU Cache of size ${size} initialized`);
}

function put()
{

    let key=document.getElementById("key").value.trim();
    let val=document.getElementById("value").value.trim();
    c.put(key,val);
}

function get()
{
    let key=document.getElementById("key").value.trim();
    c.get(key);
}
function updateCacheDisplay()
{
    let cachecontainer=document.getElementById("cacheContainer");
    cachecontainer.innerHTML="";
    let arr=c.getEntries();
    arr.forEach(([key,value],index) => {
        let cacheitem=document.createElement("div");
        cacheitem.classList.add("cache-item");
        cacheitem.textContent=`${key} : ${value}`;
        if(index==0) 
        {
            cacheitem.classList.add("highlight")
           setTimeout(()=>cacheitem.classList.remove("highlight"),500);
        }
        cachecontainer.appendChild(cacheitem);
    });

}

function keyNotfound()  
{
    let cachecontainer=document.getElementById("cache-display");
    cachecontainer.innerHTML="";
    let cacheitem=document.createElement("div");
    console.log("Not found");
    cacheitem.classList.add("cache-item");
    cacheitem.innerText="Key Not Found"; 
    cachecontainer.appendChild(cacheitem);
}

