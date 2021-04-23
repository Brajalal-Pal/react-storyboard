import axios, { AxiosPromise } from "axios";

const getAllStoryIds = (CallBack: any) => {
    const topStoryURI = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    axios.get(topStoryURI).then(({data})=> {
        CallBack(data);
    }).catch(err=>{
        console.log("Error", err);
        CallBack([]);
    });
}

export const getData = (limit: number, data: number[], CallBack: any) => {            
        const stories: AxiosPromise[]  = [];
        let length = data && data.length;
        if(length>limit) length = limit;

        for(let i = 0; i<length; i++){
            let storyURI = `https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`;            
            stories.push(axios.get(storyURI));            
        }
        
        Promise.all(stories).then(d => {
            let allStories: any[] = [];
            d.forEach(item=>{
                allStories.push(item.data)
            });                    
            CallBack(allStories);
        }).catch(err=> {            
            console.log("Error", err);
            CallBack([]);
        });        
}

export const getAllStories = (CallBack: any) =>{
    getAllStoryIds(function(storyIds: number[])  {        
        getData(10, storyIds, function(data: any) {
            CallBack(data);
        })
    });
}


