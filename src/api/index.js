const activities = {
    '1546968934': {
        id: '1546968934',
        title: 'Learn Vue.js',
        notes: 'I started today and it was not good.',
        progress: 0,
        category: '1546969049',
        createdAt: 1546969144391,
        updatedAt: 1546969144391
    },
    '1546969212': {
        id: '1546969212',
        title: 'Read Witcher Books',
        notes: 'These books are super nice',
        progress: 0,
        category: '1546969049',
        createdAt: 1546969144391,
        updatedAt: 1546969144391
    }
};

const canContinue = () => {
    const ranNumber = Math.floor(Math.random() * 10);
    if(ranNumber > 5){
        return true;
    }

    return false;
}

export const fetchActivities = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(canContinue()){
                resolve(activities);
            }else{
                reject("Can't fetch activites");
            }
        }, 2000)
    });
}

const generateUid = () => Math.floor(new Date() * Math.random());

export const createActivity = (activity) => {
    activity.id = generateUid();
    activity.progress = 0;
    activity.createdAt = new Date();
    activity.updatedAt = new Date();

    return new Promise((resolve, reject) => {
        resolve(activity);
    })
}

export const fetchCategories = () => {
    return {
        '1546969049': {text: 'Books'},
        '1546969225': {text: 'Movies'}
    }
}