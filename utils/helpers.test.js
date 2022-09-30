
//import getMonster from '../fetchMonster';
const { getRandomMonsterByUrl } = require('./helpers');
const axios = require('axios');

jest.mock('axios');


describe('fetchMonster', () => {
    let randomMock;

    beforeEach( () => {
        randomMock = jest.spyOn(global.Math, 'floor')
    });

   afterEach(() => {
    jest.clearAllMocks();
   })

   it('should work in the edge case there is only one page, i.e. next pointer is null', async() => {

        randomMock.mockImplementationOnce(() => 0);

        const page1 = {
            data: {
                count: 4,
                next: null,
                prev: null,
                results: [
                    {
                        slug: 'hello1'
                    },
                    {
                        slug: 'hello2'
                    },
                    {
                        slug: 'hello3'
                    },
                    {
                        slug: 'hello4'
                    }
                ]
            }
        }

        axios.get.mockImplementationOnce((url) => {
            switch(url) {
                case 'page1':
                    return Promise.resolve(page1)
            }
        });

        const monster = await getRandomMonsterByUrl('page1');
       
        expect(monster).toEqual(page1.data.results[0]);
    });

    it('should work in the edge case that index to fetch can be found on the first page', async() => {
        randomMock.mockImplementationOnce(() => 2);
       
        const Page1 = {
            data: {
                count: 10,
                next: 'page2',
                prev: null,
                results: [
                    {
                        slug: 'HELLO0'
                    },
                    {
                        slug: 'HELLO1'
                    },
                    {
                        slug: 'HELLO2'
                    },
                    {
                        slug: 'HELLO3'
                    },
                    {
                        slug: 'HELLO4'
                    }
                ]
            }
        }

        const Page2 = {
            data: {
                count: 10,
                next: null,
                prev: 'page1',
                results: [
                    {
                        slug: 'HELLO5'
                    },
                    {
                        slug: 'HELLO6'
                    },
                    {
                        slug: 'HELLO7'
                    },
                    {
                        slug: 'HELLO8'
                    },
                    {
                        slug: 'HELLO9'
                    }
                ]
            }
        }

        axios.get.mockImplementation( (url) => {
            switch(url){
                case 'page1':
                    return Promise.resolve(Page1)
                case 'page2':
                    return Promise.resolve(Page2)
            }
        })

        const monster = await getRandomMonsterByUrl('page1');
        console.log(monster);
        expect(monster).toEqual(Page1.data.results[2]);
    });

    it('should work in the edge case that we are on the last page but not on the first page', async() => {
        randomMock.mockImplementationOnce(() => 7);

        const page1 = {
            data: {
                count: 10,
                next: 'page2',
                prev: null,
                results: [
                    {
                        slug: 'hello0'
                    },
                    {
                        slug: 'hello1'
                    },
                    {
                        slug: 'hello2'
                    },
                    {
                        slug: 'hello3'
                    },
                    {
                        slug: 'hello4'
                    }
                ]
            }
        }
        const page2 = {
            data: {
                count: 10,
                next: null,
                prev: 'page1',
                results: [
                    {
                        slug: 'hello5'
                    },
                    {
                        slug: 'hello6'
                    },
                    {
                        slug: 'hello7'
                    },
                    {
                        slug: 'hello8'
                    },
                    {
                        slug: 'hello9'
                    }
                ]
            }
        }

        axios.get.mockImplementation( (url) => {
            switch(url){
                case 'page1':
                    return Promise.resolve(page1)
                case 'page2':
                    return Promise.resolve(page2)
            }
        })

        const monster = await getRandomMonsterByUrl('page1');
        expect(monster).toEqual(page2.data.results[2]);
    });

    it('testing mocking variables', async() => {
        
        randomMock.mockImplementationOnce(() => 0);

        const data = {
            data: {
                count: 4,
                next: null,
                prev: null,
                results: [
                    {
                        slug: 'hello1'
                    },
                    {
                        slug: 'hello2'
                    },
                    {
                        slug: 'hello3'
                    },
                    {
                        slug: 'hello4'
                    }
                ]
            }
        }

        axios.get.mockImplementationOnce( () => Promise.resolve(data));

        const monster = await getRandomMonsterByUrl('page1');
        console.log(monster);
        expect(monster).toEqual(data.data.results[0]);
    });

})