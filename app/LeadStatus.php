<?php

namespace App;

enum LeadStatus: string
{
    case NewLead = 'new';
    case Contacted = 'contacted';
    case Qualified = 'qualified';
    case Converted = 'converted';
    case Discarded = 'discarded';
}