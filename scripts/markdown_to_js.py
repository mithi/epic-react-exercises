from os import listdir
from os.path import isfile, join
import glob
import markdown2
import pygments

file_paths = glob.glob("./content/react/*/md/*.md") # from project root
#print(file_paths)

for file_path in file_paths:

    splitted = file_path.split('/')
    #print(splitted)

    file_name, file_extension = splitted[-1].split('.')
    #print(file_name)
    #print(file_extension)

    new_file_path = ("/").join(splitted[:4]) + f"/notes-js/{file_name}.js"
    #print(new_file_path)

    file = open(file_path, mode='r')
    content = all_of_it = file.read()
    file.close()
    #print(content)

    html = markdown2.markdown(content, extras=["fenced-code-blocks", "nofollow", "codehilite", "header-ids", "target-blank-links"])
    #print(html)

    html1 = "function createMarkup() " + "{ return {__html: `" + html + "` } } "
    javascript = html1 + "export default <div dangerouslySetInnerHTML={createMarkup()} />"
    #print(javascript)

    f = open(new_file_path,"w+")
    f.write(javascript)
    f.close()



