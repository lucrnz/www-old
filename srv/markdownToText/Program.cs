using System.Text;
using Markdig;
using HtmlAgilityPack;

var markdownContents = new StringBuilder();
string? line;
while ((line = Console.In.ReadLine()) != null) {
     markdownContents.AppendLine(line.Trim());
}

string htmlCode = Markdown.ToHtml(markdownContents.ToString());

var htmlDoc = new HtmlDocument();
htmlDoc.LoadHtml(htmlCode.ToString());

Console.WriteLine(htmlDoc.DocumentNode.InnerText);
