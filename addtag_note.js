document.selection.Find("\\d+、",eeFindNext | eeFindSaveHistory | eeFindReplaceRegExp);
document.selection.StartOfLine(false,eeLineView | eeLineHomeText);
document.selection.CharLeft(false,1);
document.selection.Text="</note>";
document.selection.CharRight(false,1);
document.selection.Text="<note>";
document.selection.EndOfLine(false,eeLineView);
