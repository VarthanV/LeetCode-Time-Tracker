
import {getTimeasString} from '../helpers';
import { normalize } from '../helpers';


test('Returns 2m ' ,() =>{
    expect(getTimeasString(0,2,0)).toBe('2 minutes')
})
test('Returns 3 '  , () =>{
    
    expect(normalize(0o3)).toBe(3)
})

test('Returns 1hr 25min ' , () =>{
    expect(getTimeasString(0,25,1)).toBe('1hr 25minutes')
})



