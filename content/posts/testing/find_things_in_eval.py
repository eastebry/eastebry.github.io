import os
from collections.abc import Iterable

def enum_attrs(o):
    visited = {}
    
    def _enum_attrs(o, path):
        attrs = dir(o)
        for name in attrs:
            if '__' in name:
                continue

            attr = getattr(o, name)
            #if attr is None:
            #    continue
            if id(attr) in visited:
                continue
            
            new_path = f"{path}.{name}"
            visited[id(attr)] = new_path

            _enum_attrs(attr, new_path)
        
        if isinstance(o, Iterable):
            for i,a in enumerate(o):
                if id(i) not in visited:
                    _enum_attrs(a, f"{path}[{i}]")
        
    _enum_attrs(o,"")
        
    return visited

def list_attrs(s):
    return e(f'enum_attrs({s})', l={"enum_attrs": enum_attrs})

def e(s,g={'__builtins__': None},l={}):
    return eval(s,g,l) 

if __name__ == '__main__':
    s = "(x for x in [1,2,3])"
    #s = '[{},(),[1,2,3]]'

    attrs = list_attrs(s).values() 
    for a in attrs:
        x = e(f"{s}{a}")
        print(f"{a} -> {x}")
    
    # Just an experiment to see if we can change co_code
    #s = "((x for x in [1]).gi_code:=None,1+1)"
    # We cant
    print(eval(s))